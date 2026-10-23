package com.techblog.crawler.domain

import org.slf4j.LoggerFactory
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.time.Instant
import java.util.UUID

/**
 * Job use cases (spec 04 file 01/03): create, cancel, retry an article, query failures.
 * Exactly one active job per source is enforced by a unique partial index and re-checked here
 * so the caller gets JOB-DUPLICATE-ACTIVE with the blocking job id instead of a SQL error.
 */
@Service
class JobService(
    private val sources: SourceRepository,
    private val articles: ArticleRepository,
    private val jobs: JobRepository,
    private val events: EventPublisher,
    private val fetchQueue: FetchQueue,
    private val finishingWindow: FinishingWindow,
    private val clock: java.time.Clock = java.time.Clock.systemUTC(),
) {
    private val log = LoggerFactory.getLogger(javaClass)

    @Transactional
    fun create(sourceKey: String, jobType: String): Job {
        if (jobType !in JOB_TYPES) throw InvalidRequest("jobType must be backfill or incremental.")
        val source = sources.findByKey(sourceKey) ?: throw SourceNotFound(sourceKey)
        if (!source.enabled) throw JobInvalidState("Source '$sourceKey' is disabled.")
        val active = jobs.findActiveForSource(source.id)
        if (active != null) throw DuplicateActiveJob(sourceKey, active.id)

        val job = Job(
            id = Ids.uuid7(),
            sourceId = source.id,
            jobType = jobType,
            status = "pending",
            cursor = null,
            requestedAt = Instant.now(clock),
            startedAt = null,
            finishedAt = null,
            discoveredCount = 0,
            archivedCount = 0,
            skippedCount = 0,
            failedCount = 0,
            lastError = null,
        )
        jobs.insert(job)
        events.publish("job.updated", jobPayload(job, source.key))
        log.info("job_created jobId={} source={} type={}", job.id, sourceKey, jobType)
        return job
    }

    @Transactional
    fun cancel(jobId: String): Job {
        val job = jobs.findById(jobId) ?: throw JobNotFound(jobId)
        if (job.terminal) {
            throw JobInvalidState("Job '$jobId' is '${job.status}'; cancel is not allowed.")
        }
        // Finishing window (spec 04 §2): the last in-flight article is already past its atomic
        // rename, so the job is about to freeze its counters; cancelling now would race the
        // terminal write. The caller sees 409 JOB-CANCEL-REFUSED.
        if (job.status == "running" && finishingWindow.contains(jobId)) {
            throw CancelRefused("Job '$jobId' is finishing; cancel is not allowed.")
        }
        val cancelled = job.copy(
            status = "cancelled",
            finishedAt = Instant.now(clock),
        )
        jobs.update(cancelled)
        publishJob(cancelled)
        log.info("job_cancelled jobId={}", jobId)
        return cancelled
    }

    /**
     * Retry matrix (spec 02 file 03 §3, spec 04 file 03 §1, BA 06 AC-05):
     * - failed / needs_review → 202, one new queue entry, attempt window reset;
     * - queued / processing → 200 no-op;
     * - archived / skipped / discovered → 409 JOB-INVALID-STATE;
     * - attempt_count = 5 without force → 409 FETCH-BACKOFF-EXHAUSTED;
     * - FETCH-TOO-LARGE / FETCH-BLOCKED → 409 even with force (never-retry classes).
     */
    @Transactional
    fun retry(articleId: String, force: Boolean): RetryResult {
        val article = articles.findById(articleId) ?: throw ArticleNotFound(articleId)
        when (article.status) {
            "failed", "needs_review" -> {
                val code = article.failureCode
                if (code == "FETCH-TOO-LARGE") {
                    throw RetryRefused(
                        CrawlerErrorCode.FETCH_TOO_LARGE,
                        "Last response exceeded the 10 MB HTML cap; this URL has no retry path.",
                    )
                }
                if (code == "FETCH-BLOCKED") {
                    throw RetryRefused(
                        CrawlerErrorCode.FETCH_BLOCKED,
                        "HTTP 403 from a non-Medium host; treated as a bot block and never retried.",
                    )
                }
                if (article.attemptCount >= MAX_ATTEMPTS && !force) {
                    throw RetryRefused(
                        CrawlerErrorCode.FETCH_BACKOFF_EXHAUSTED,
                        "Article has ${article.attemptCount} recorded attempts; repeat with force=true " +
                            "to start a new 5-attempt window.",
                    )
                }
                val queued = articles.markQueued(articleId, article.lastJobId)
                    ?: throw ArticleNotFound(articleId)
                enqueueRetry(queued)
                log.info("article_retry_queued articleId={} force={}", articleId, force)
                return RetryResult(queued, queuedNow = true)
            }
            "queued", "processing" -> return RetryResult(article, queuedNow = false)
            else -> throw JobInvalidState(
                "Article '$articleId' is '${article.status}'; retry is not allowed.",
            )
        }
    }

    fun failures(jobId: String, page: PageRequest): Page<FailureRow> {
        jobs.findById(jobId) ?: throw JobNotFound(jobId)
        val total = articles.countFailuresForJob(jobId)
        val items = articles.failuresForJob(jobId, page.offset, page.size)
        return Page(items, page.page, page.size, total)
    }

    fun view(jobId: String): Job = jobs.findById(jobId) ?: throw JobNotFound(jobId)

    /** Spec 02 file 03 §3: one queue message per successful retry call. */
    private fun enqueueRetry(article: Article) {
        val source = sources.findById(article.sourceId) ?: return
        val host = Urls.host(article.canonicalUrl)
        if (host.isBlank()) return
        runCatching {
            fetchQueue.enqueue(
                FetchMessage(
                    articleId = article.id,
                    sourceKey = source.key,
                    host = host,
                    url = article.canonicalUrl,
                    jobId = article.lastJobId,
                    attempt = 1,
                    enqueuedAt = Instant.now(),
                ),
            )
        }.onFailure { error ->
            log.warn("retry_enqueue_failed articleId={} reason={}", article.id, error.message)
        }
    }

    fun publishJob(job: Job) {
        val source = sources.findById(job.sourceId) ?: return
        events.publish("job.updated", jobPayload(job, source.key))
    }

    private fun jobPayload(job: Job, sourceKey: String): Map<String, Any?> = mapOf(
        "jobId" to job.id,
        "sourceKey" to sourceKey,
        "jobType" to job.jobType,
        "status" to job.status,
        "requestedAt" to job.requestedAt,
        "startedAt" to job.startedAt,
        "finishedAt" to job.finishedAt,
        "counters" to mapOf(
            "discovered" to job.discoveredCount,
            "archived" to job.archivedCount,
            "skipped" to job.skippedCount,
            "failed" to job.failedCount,
        ),
    )

    private companion object {
        val JOB_TYPES = setOf("backfill", "incremental")
        const val MAX_ATTEMPTS = 5
    }
}

data class RetryResult(val article: Article, val queuedNow: Boolean)

data class PageRequest(val page: Int, val size: Int) {
    val offset: Long get() = page.toLong() * size

    companion object {
        const val DEFAULT_SIZE = 50
        const val MAX_SIZE = 200

        fun of(page: Int?, size: Int?): PageRequest {
            val resolvedPage = page ?: 0
            val resolvedSize = size ?: DEFAULT_SIZE
            if (resolvedPage < 0) throw InvalidRequest("page must be >= 0.")
            if (resolvedSize < 1 || resolvedSize > MAX_SIZE) {
                throw InvalidRequest("size must be between 1 and $MAX_SIZE.")
            }
            return PageRequest(resolvedPage, resolvedSize)
        }
    }
}

data class Page<T>(val items: List<T>, val page: Int, val size: Int, val total: Long)
