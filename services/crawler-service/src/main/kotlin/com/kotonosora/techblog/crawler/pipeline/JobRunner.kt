package com.kotonosora.techblog.crawler.pipeline

import com.kotonosora.techblog.crawler.config.CrawlerProperties
import com.kotonosora.techblog.crawler.discovery.DiscoveryService
import com.kotonosora.techblog.crawler.domain.Article
import com.kotonosora.techblog.crawler.domain.ArticleRepository
import com.kotonosora.techblog.crawler.domain.Ids
import com.kotonosora.techblog.crawler.domain.Job
import com.kotonosora.techblog.crawler.domain.JobRepository
import com.kotonosora.techblog.crawler.domain.JobService
import com.kotonosora.techblog.crawler.domain.JobStateMachine
import com.kotonosora.techblog.crawler.domain.Source
import com.kotonosora.techblog.crawler.domain.SourceRepository
import org.slf4j.LoggerFactory
import org.springframework.boot.context.event.ApplicationReadyEvent
import org.springframework.context.event.EventListener
import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Component
import java.time.Duration
import java.time.Instant
import java.util.concurrent.atomic.AtomicBoolean

/**
 * JobRunner (spec 04, BE-04-05/07/08): picks a pending job, runs discovery, inserts article
 * rows, then drives the fetch pipeline. Manual-only: nothing here schedules a crawl; the
 * `@Scheduled` methods only poll for work an operator already created.
 *
 * Cursor resume: discovery inserts the full candidate list first, so the durable cursor is
 * the set of `discovered` article rows. A restart re-reads them instead of re-walking pages
 * (BE-04-07, NFR-11).
 */
@Component
class JobRunner(
    private val properties: CrawlerProperties,
    private val jobs: JobRepository,
    private val sources: SourceRepository,
    private val articles: ArticleRepository,
    private val jobService: JobService,
    private val discovery: DiscoveryService,
    private val processor: ArticleProcessor,
    private val stats: SourceStatsPublisher,
    private val retries: RetryWorker,
) {
    private val log = LoggerFactory.getLogger(javaClass)
    private val running = AtomicBoolean(false)
    private val stopping = AtomicBoolean(false)

    @Volatile
    private var acceptingWork = true

    @EventListener(ApplicationReadyEvent::class)
    fun onReady() {
        // Boot reclaim (spec 04 §6): a `processing` row left by a crashed process has no owner.
        // Ten minutes is safely longer than the 60 s article budget, so a live run is never stolen.
        if (properties.role != "api") {
            val reclaimed = runCatching { articles.resetStaleProcessing(STALE_PROCESSING_SECONDS) }
                .onFailure { log.warn("boot_reclaim_failed reason={}", it.message) }
                .getOrDefault(0)
            if (reclaimed > 0) log.warn("boot_reclaim_processing rows={}", reclaimed)
        }
        log.info("job_runner_ready role={}", properties.role)
    }

    @Scheduled(fixedDelayString = "1000")
    fun tick() {
        if (properties.role == "api") return
        if (stopping.get() || !acceptingWork) return
        if (!running.compareAndSet(false, true)) return
        try {
            val runnable = jobs.findRunnable()
            for (job in runnable) {
                if (stopping.get()) break
                runOne(job)
            }
        } catch (error: Exception) {
            log.error("job_runner_failed reason={}", error.message, error)
        } finally {
            running.set(false)
        }
    }

    /** Due retries are driven separately so a long backfill cannot starve them. */
    @Scheduled(fixedDelayString = "5000")
    fun retryTick() {
        if (properties.role == "api" || stopping.get() || !acceptingWork) return
        runCatching { retries.promoteDue() }
            .onFailure { log.warn("retry_promote_failed reason={}", it.message) }
    }

    /** SIGTERM: stop leasing, let the in-flight article finish (<=60 s budget, NFR-19). */
    @EventListener(org.springframework.context.event.ContextClosedEvent::class)
    fun onShutdown() {
        stopping.set(true)
        acceptingWork = false
        log.info("job_runner_stopping")
    }

    fun runOne(job: Job) {
        val source = sources.findById(job.sourceId) ?: run {
            log.error("job_source_missing jobId={} sourceId={}", job.id, job.sourceId)
            return
        }
        if (!source.enabled) {
            log.warn("job_source_disabled jobId={} source={}", job.id, source.key)
            failJob(job, "Source '${source.key}' is disabled.")
            return
        }

        val started = if (job.status == "pending") {
            val transitioned = job.copy(status = "running", startedAt = Instant.now())
            JobStateMachine.require(job.status, "running")
            jobs.update(transitioned)
            jobService.publishJob(transitioned)
            transitioned
        } else {
            job
        }

        var current = started
        try {
            if (started.status == "running" && started.startedAt != null && started.cursor == null) {
                // Resume after a crash/pause: any half-processed row goes back to discovered.
                articles.resetProcessingForJob(current.id)
            }
            val outcome = discovery.discover(source, current.jobType)
            val inserted = persistCandidates(current, source, outcome.links)
            sources.recordDiscoveryOutcome(source.id, outcome.links.isNotEmpty())

            // discovered_count is the size of the candidate set for this job; skipped_count only
            // moves when an article is actually skipped by the pipeline (spec 04 file 01 §3).
            current = current.copy(
                cursor = "discovered=${outcome.links.size}",
                discoveredCount = current.discoveredCount + inserted,
                lastError = outcome.errors.firstOrNull()?.detail,
            )
            jobs.update(current)
            jobService.publishJob(current)

            current = processCandidates(current, source)
            current = finish(current, source)
        } catch (error: DiskFull) {
            log.warn("job_paused_disk_full jobId={} reason={}", current.id, error.message)
            val paused = current.copy(status = "paused", lastError = error.message)
            jobs.update(paused)
            jobService.publishJob(paused)
        } catch (error: Exception) {
            log.error("job_failed jobId={} reason={}", current.id, error.message, error)
            failJob(current, error.message ?: "Unexpected crawler failure.")
        }
    }

    // -----------------------------------------------------------------------
    // Discovery persistence
    // -----------------------------------------------------------------------

    private fun persistCandidates(job: Job, source: Source, links: List<String>): Int {
        var inserted = 0
        for (url in links) {
            val existing = articles.findByCanonicalUrl(url)
            if (existing != null) continue
            val article = Article(
                id = Ids.uuid7(),
                sourceId = source.id,
                canonicalUrl = url,
                originalUrl = url,
                title = null,
                author = null,
                slug = null,
                publishedAt = null,
                fetchedAt = null,
                archivedAt = null,
                contentSha256 = null,
                wordCount = null,
                status = "discovered",
                failureCode = null,
                failureReason = null,
                attemptCount = 0,
                nextAttemptAt = null,
                lastJobId = job.id,
            )
            val stored = articles.insertIfAbsent(article)
            if (stored.id == article.id) inserted += 1
        }
        return inserted
    }

    // -----------------------------------------------------------------------
    // Fetch pipeline
    // -----------------------------------------------------------------------

    private fun processCandidates(job: Job, source: Source): Job {
        var current = job
        var lastPublish = Instant.now()
        var discovered = current.discoveredCount
        var archived = current.archivedCount
        var skipped = current.skippedCount
        var failed = current.failedCount

        while (!stopping.get()) {
            val batch = articles.findDiscoveredForJob(current.id, BATCH)
            if (batch.isEmpty()) break
            for (article in batch) {
                if (stopping.get()) break
                val result = try {
                    processor.process(article.id, source, current.id)
                } catch (error: DiskFull) {
                    // Pausing the job is the whole point of the guard: never downgrade it to a
                    // per-article failure, or the disk fills while the job keeps running.
                    throw error
                } catch (error: Exception) {
                    log.warn("article_process_failed articleId={} reason={}", article.id, error.message)
                    null
                }
                when (result) {
                    is ArticleProcessor.Result.Archived -> archived += 1
                    is ArticleProcessor.Result.Skipped -> skipped += 1
                    is ArticleProcessor.Result.Failed -> {
                        if (result.retryScheduled) skipped += 1 else failed += 1
                    }
                    is ArticleProcessor.Result.NeedsReview -> failed += 1
                    null -> Unit
                }
                discovered = maxOf(discovered, archived + skipped + failed)
            }

            current = current.copy(
                discoveredCount = discovered,
                archivedCount = archived,
                skippedCount = skipped,
                failedCount = failed,
            )
            jobs.update(current)
            // Counter throttle: at most one `job.updated` per 5 s while running (spec 04 §3).
            if (Duration.between(lastPublish, Instant.now()).seconds >= 5) {
                jobService.publishJob(current)
                lastPublish = Instant.now()
            }
        }

        current = current.copy(
            discoveredCount = discovered,
            archivedCount = archived,
            skippedCount = skipped,
            failedCount = failed,
        )
        jobs.update(current)
        return current
    }

    // -----------------------------------------------------------------------
    // Terminal transitions
    // -----------------------------------------------------------------------

    private fun finish(job: Job, source: Source): Job {
        val pending = articles.findDiscoveredForJob(job.id, 1)
        val completed = job.copy(
            status = "completed",
            finishedAt = Instant.now(),
            lastError = null,
        )
        JobStateMachine.require(job.status, "completed")
        jobs.update(completed)
        jobService.publishJob(completed)
        stats.publish(source)
        if (pending.isNotEmpty()) {
            log.warn("job_completed_with_pending jobId={} pending=true", completed.id)
        }
        log.info(
            "job_completed jobId={} source={} discovered={} archived={} skipped={} failed={}",
            completed.id,
            source.key,
            completed.discoveredCount,
            completed.archivedCount,
            completed.skippedCount,
            completed.failedCount,
        )
        return completed
    }

    private fun failJob(job: Job, reason: String) {
        val failed = job.copy(
            status = "failed",
            finishedAt = Instant.now(),
            lastError = reason,
        )
        runCatching {
            JobStateMachine.require(job.status, "failed")
            jobs.update(failed)
            jobService.publishJob(failed)
            sources.findById(job.sourceId)?.let(stats::publish)
        }.onFailure { error ->
            log.error("job_fail_transition_failed jobId={} reason={}", job.id, error.message)
        }
    }

    private companion object {
        const val BATCH = 25
        const val STALE_PROCESSING_SECONDS = 600L
    }
}
