package com.kotonosora.techblog.api.domain

import org.slf4j.LoggerFactory
import org.springframework.stereotype.Service
import java.time.Instant

/**
 * Command side (spec 06 file 03 §5): validate, call the crawler, mirror the accepted state into
 * api_db optimistically so the UI sees the job on the next read without waiting for an event.
 *
 * Every crawler 4xx is mapped to the BA 05 code by [CrawlerGateway]; transport failures become
 * OPS-DEPENDENCY-DOWN. The crawler remains the system of record.
 */
@Service
class CommandService(
    private val crawler: CrawlerGateway,
    private val sources: SourceReadModel,
    private val jobs: JobReadModel,
) {
    private val log = LoggerFactory.getLogger(javaClass)

    fun setSourceEnabled(key: String, enabled: Boolean): SourceView {
        val updated = crawler.setSourceEnabled(key, enabled)
        val existing = sources.findByKey(key)
        val view = (existing ?: SourceView(
            key = updated.sourceKey,
            name = updated.name,
            enabled = updated.enabled,
            discoveryType = updated.discoveryType,
            articleCount = updated.archivedCount + updated.failedCount,
            archivedCount = updated.archivedCount,
            failedCount = updated.failedCount,
            lastSuccessAt = updated.lastSuccessAt,
            health = if (updated.enabled) "fresh" else "broken",
            updatedAt = Instant.now(),
        )).copy(enabled = enabled, updatedAt = Instant.now())
        sources.upsert(view)
        return view
    }

    /** `all:true` is expanded by the caller into concrete keys (one crawler call per source). */
    fun startJobs(sourceKeys: List<String>, jobType: String): List<JobView> {
        if (sourceKeys.isEmpty()) throw InvalidRequest("Provide sourceKeys or all:true.")
        if (sourceKeys.size > MAX_SOURCES) throw InvalidRequest("sourceKeys accepts at most $MAX_SOURCES entries.")
        if (jobType !in JOB_TYPES) throw InvalidRequest("jobType must be backfill or incremental.")
        return sourceKeys.distinct().map { key ->
            if (!SOURCE_KEY.matches(key)) throw InvalidRequest("sourceKey '$key' is not a valid key.")
            val source = sources.findByKey(key) ?: throw SourceNotFound(key)
            if (!source.enabled) throw InvalidState("Source '$key' is disabled.")
            val created = crawler.createJob(key, jobType)
            val view = created.toView()
            jobs.upsert(view)
            log.info("job_started jobId={} source={} type={}", view.id, key, jobType)
            view
        }
    }

    fun cancelJob(id: String): JobView {
        val cancelled = crawler.cancelJob(id)
        val view = cancelled.toView()
        jobs.upsert(view)
        log.info("job_cancelled jobId={} status={}", view.id, view.status)
        return view
    }

    fun retryArticle(id: String): ArticleView {
        val article = crawler.retryArticle(id)
        log.info("article_retry_queued articleId={} status={}", article.articleId, article.status)
        // The projection catches up through article.* events; return the crawler's view.
        return ArticleView(
            id = article.articleId,
            sourceKey = article.sourceKey,
            title = article.title ?: "",
            slug = article.slug ?: "",
            author = article.author,
            publishedAt = article.publishedAt,
            archivedAt = article.archivedAt,
            status = article.status,
            contentSha256 = article.contentSha256,
            originalUrl = article.originalUrl,
            sourceUrl = null,
            fetchedAt = article.fetchedAt,
        )
    }

    fun jobFailures(id: String, page: PageRequest): Page<JobFailure> {
        // 404 JOB-NOT-FOUND comes from the crawler; api_db may know the job while the
        // crawler does not (e.g. after a rebuild), so this is a pure pass-through.
        return crawler.jobFailures(id, page)
    }

    private fun CrawlerJob.toView(): JobView = JobView(
        id = jobId,
        sourceKey = sourceKey,
        jobType = jobType,
        status = normaliseStatus(status),
        requestedAt = requestedAt,
        startedAt = startedAt,
        finishedAt = finishedAt,
        discoveredCount = discoveredCount,
        archivedCount = archivedCount,
        skippedCount = skippedCount,
        failedCount = failedCount,
    )

    /**
     * Doc conflict, resolved here: the crawler has a `paused` state (spec 04) but the api_db
     * CHECK and the frozen UI contract only know the five statuses below. `paused` is mapped to
     * `running` so the UI can still cancel it and never renders an unknown badge.
     */
    private fun normaliseStatus(status: String): String = when (status) {
        "paused" -> "running"
        else -> status
    }

    private companion object {
        const val MAX_SOURCES = 20
        val JOB_TYPES = setOf("backfill", "incremental")
        val SOURCE_KEY = Regex("^[a-z0-9][a-z0-9-]{1,49}$")
    }
}
