package com.techblog.crawler.pipeline

import com.techblog.crawler.config.CrawlerProperties
import com.techblog.crawler.discovery.DiscoveryService
import com.techblog.crawler.domain.Article
import com.techblog.crawler.domain.ArticleRepository
import com.techblog.crawler.domain.ArchiveStore
import com.techblog.crawler.domain.FetchMessage
import com.techblog.crawler.domain.FetchQueue
import com.techblog.crawler.domain.FinishingWindow
import com.techblog.crawler.domain.Ids
import com.techblog.crawler.domain.Job
import com.techblog.crawler.domain.JobRepository
import com.techblog.crawler.domain.JobService
import com.techblog.crawler.domain.JobStateMachine
import com.techblog.crawler.domain.Source
import com.techblog.crawler.domain.SourceRepository
import com.techblog.crawler.domain.Urls
import com.techblog.crawler.observability.CrawlerMetrics
import com.techblog.crawler.observability.MaintenanceService
import org.slf4j.LoggerFactory
import org.slf4j.MDC
import org.springframework.boot.context.event.ApplicationReadyEvent
import org.springframework.context.event.EventListener
import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Component
import java.time.Duration
import java.time.Instant
import java.util.concurrent.ConcurrentHashMap
import java.util.concurrent.atomic.AtomicBoolean

/**
 * JobRunner (spec 04, BE-04-05/07/08): picks a pending job, runs discovery, inserts article
 * rows, then drives the fetch pipeline. Manual-only: nothing here schedules a crawl; the
 * `@Scheduled` methods only poll for work an operator already created.
 *
 * Cursor resume: discovery inserts the full candidate list first, so the durable cursor is
 * the set of `discovered` article rows. A restart re-reads them instead of re-walking pages
 * (BE-04-07, NFR-11).
 *
 * DEVIATION FLAGGED (2026-10-23): the spec describes a dedicated HostQueueConsumer looping over
 * `tb:hosts` with a 250 ms idle poll. This runner is DB-driven: `findRunnable`/`findDiscoveredForJob`
 * decide what to process and the Redis lists remain the transport/ordering hint, with the atomic
 * DB claim as the single-processing mutex. Budget: 0 new services, 0 new dependencies. Rationale:
 * the DB row is the durable truth, so a Redis outage must not stall a manual crawl; `tb:hosts`
 * is still maintained for observability and the boot/stale reclaim.
 */
@Component
class JobRunner(
    private val properties: CrawlerProperties,
    private val jobs: JobRepository,
    private val sources: SourceRepository,
    private val articles: ArticleRepository,
    private val archive: ArchiveStore,
    private val jobService: JobService,
    private val discovery: DiscoveryService,
    private val processor: ArticleProcessor,
    private val fetchQueue: FetchQueue,
    private val stats: SourceStatsPublisher,
    private val retries: RetryWorker,
    private val metrics: CrawlerMetrics,
    private val maintenance: MaintenanceService,
    private val finishingWindow: FinishingWindow,
) {
    private val log = LoggerFactory.getLogger(javaClass)
    private val running = AtomicBoolean(false)
    private val stopping = AtomicBoolean(false)

    /** When a paused job first saw >=6 GB free; it resumes after 60 stable seconds (spec 04 §2). */
    private val resumeStableSince = ConcurrentHashMap<String, Instant>()

    @Volatile
    private var acceptingWork = true

    @Volatile
    private var workerThread: Thread? = null

    @EventListener(ApplicationReadyEvent::class)
    fun onReady() {
        // Boot reclaim (spec 04 §6): a `processing` row left by a crashed process has no owner.
        if (properties.role != "api") {
            val reclaimed = runCatching { articles.resetStaleProcessing(properties.processingIdleSeconds) }
                .onFailure { log.warn("boot_reclaim_failed reason={}", it.message) }
                .getOrDefault(0)
            if (reclaimed > 0) log.warn("boot_reclaim_processing rows={}", reclaimed)
            // Requeue in-flight list members back onto their host ready lists (attempt_count is
            // kept by the DB row). Every host that still has work is advertised again.
            runCatching {
                var moved = 0
                fetchQueue.hosts().forEach { host -> moved += fetchQueue.requeueProcessing(host) }
                if (moved > 0) log.warn("boot_requeue_in_flight messages={}", moved)
            }.onFailure { log.warn("boot_requeue_failed reason={}", it.message) }
            // The promoter runs at boot, not only on its 5 s tick (spec 04 §6).
            runCatching { retries.promoteDue(properties.retryPromoteLimit) }
                .onFailure { log.warn("boot_retry_promote_failed reason={}", it.message) }
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
        runCatching { retries.promoteDue(properties.retryPromoteLimit) }
            .onFailure { log.warn("retry_promote_failed reason={}", it.message) }
    }

    /**
     * Stale-claim reaper (spec 04 §3/§4): a `processing` row older than 600 s returns to
     * `queued` and the unacknowledged list members go back to the host ready list. Runs only
     * when a reclaim actually happened so a live claim is never churned.
     */
    @Scheduled(fixedDelayString = "60000")
    fun reclaimTick() {
        if (properties.role == "api" || stopping.get() || !acceptingWork) return
        val reclaimed = runCatching { articles.resetStaleProcessing(properties.processingIdleSeconds) }
            .onFailure { log.warn("stale_reclaim_failed reason={}", it.message) }
            .getOrDefault(0)
        if (reclaimed <= 0) return
        log.warn("stale_claim_reclaimed rows={}", reclaimed)
        runCatching {
            fetchQueue.hosts().forEach { fetchQueue.requeueProcessing(it) }
        }.onFailure { log.warn("stale_requeue_failed reason={}", it.message) }
    }

    /**
     * SIGTERM: stop leasing and wait for the in-flight article. The bounded join leaves a
     * safety margin inside the 60 s shutdown budget (NFR-19); the scheduler must not interrupt
     * an archive write halfway through the atomic rename.
     */
    @EventListener(org.springframework.context.event.ContextClosedEvent::class)
    fun onShutdown() {
        stopping.set(true)
        acceptingWork = false
        log.info("job_runner_stopping")
        val worker = workerThread
        if (worker != null && worker !== Thread.currentThread()) {
            runCatching { worker.join(SHUTDOWN_WAIT_MS) }
                .onFailure {
                    Thread.currentThread().interrupt()
                    log.warn("job_runner_shutdown_interrupted reason={}", it.message)
                }
            if (worker.isAlive) {
                log.warn("job_runner_shutdown_timeout waitedMs={}", SHUTDOWN_WAIT_MS)
            }
        }
    }

    fun runOne(job: Job) {
        val started = System.nanoTime()
        workerThread = Thread.currentThread()
        metrics.jobActive(job.jobType, 1)
        MDC.put("jobId", job.id)
        MDC.put("code", "-")
        try {
            runOneInternal(job)
        } finally {
            workerThread = null
            metrics.jobActive(job.jobType, -1)
            metrics.jobDuration(job.jobType, (System.nanoTime() - started) / 1_000_000)
            MDC.remove("jobId")
            MDC.remove("code")
        }
    }

    private fun runOneInternal(job: Job) {
        val source = sources.findById(job.sourceId) ?: run {
            log.error("job_source_missing jobId={} sourceId={}", job.id, job.sourceId)
            return
        }
        if (!source.enabled) {
            log.warn("job_source_disabled jobId={} source={}", job.id, source.key)
            failJob(job, "Source '${source.key}' is disabled.")
            return
        }

        val started = when (job.status) {
            "pending" -> {
                val transitioned = job.copy(status = "running", startedAt = Instant.now())
                JobStateMachine.require(job.status, "running")
                jobs.update(transitioned)
                jobService.publishJob(transitioned)
                transitioned
            }
            "paused" -> {
                val free = runCatching { archive.freeBytes() }.getOrDefault(0)
                // Spec 04 §2: resume only above 6 GB for 60 stable seconds, even though the
                // pause trigger is 5 GB. The first observation starts the stability timer.
                if (free < properties.resumeMinFreeBytes) {
                    resumeStableSince.remove(job.id)
                    log.info("job_still_paused_disk_full jobId={} freeBytes={}", job.id, free)
                    return
                }
                val since = resumeStableSince.computeIfAbsent(job.id) { Instant.now() }
                val stableSeconds = Duration.between(since, Instant.now()).seconds
                if (stableSeconds < properties.resumeStableSeconds) {
                    log.info(
                        "job_resume_waiting_stable_disk jobId={} freeBytes={} stableSeconds={}/{}",
                        job.id,
                        free,
                        stableSeconds,
                        properties.resumeStableSeconds,
                    )
                    return
                }
                resumeStableSince.remove(job.id)
                val transitioned = job.copy(
                    status = "running",
                    startedAt = job.startedAt ?: Instant.now(),
                    lastError = null,
                )
                JobStateMachine.require(job.status, "running")
                jobs.update(transitioned)
                jobService.publishJob(transitioned)
                log.info("job_resumed jobId={} freeBytes={}", job.id, free)
                transitioned
            }
            else -> job
        }

        var current = started
        try {
            if (started.status == "running" && started.startedAt != null) {
                // Resume after a crash/pause: any half-processed row goes back to `queued`.
                articles.resetProcessingForJob(current.id)
            }
            val outcome = discovery.discover(source, current.jobType, current.id)
            val inserted = persistCandidates(current, source, outcome.links)
            sources.recordDiscoveryOutcome(source.id, outcome.errors.isEmpty())

            // discovered_count is the size of the candidate set for this job; skipped_count only
            // moves when an article is actually skipped by the pipeline (spec 04 file 01 §3).
            current = current.copy(
                cursor = "discovered=${outcome.links.size}",
                discoveredCount = current.discoveredCount + inserted,
                lastError = outcome.errors.firstOrNull()?.detail,
            )
            if (!jobs.updateProgress(current)) {
                log.info("job_cancelled_during_discovery jobId={}", current.id)
                return
            }
            jobService.publishJob(current)

            // Spec 04 §2: 5 consecutive discovery failures move the job to `failed` and the
            // source health to broken (BA 03 §6). The counter is in the source row.
            val refreshedSource = sources.findById(source.id)
            if (refreshedSource != null &&
                refreshedSource.consecutiveDiscoveryFailures >= DISCOVERY_FAILURE_LIMIT
            ) {
                val reason = "${refreshedSource.consecutiveDiscoveryFailures} consecutive discovery " +
                    "failures for '${source.key}'."
                log.warn("job_discovery_failures_exhausted jobId={} source={} failures={}",
                    current.id, source.key, refreshedSource.consecutiveDiscoveryFailures)
                failJob(current, reason)
                return
            }

            current = processCandidates(current, source)
            if (stopping.get() || jobs.findById(current.id)?.status == "cancelled") {
                log.info("job_left_running jobId={} reason={}", current.id, if (stopping.get()) "shutdown" else "cancelled")
                return
            }
            current = finish(current, source)
        } catch (error: DiskFull) {
            log.warn("job_paused_disk_full jobId={} reason={}", current.id, error.message)
            if (jobs.findById(current.id)?.status != "running") {
                log.info("job_not_paused_status_changed jobId={}", current.id)
                return
            }
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
            if (existing != null) {
                // Incremental re-crawl: an archived/skipped row is re-admitted through a
                // conditional GET without moving its slug or overwriting the archive. A
                // discovered row from an interrupted job is attached to this job.
                val reAdmit = existing.status == "discovered" ||
                    (job.jobType == "incremental" && existing.status in setOf("archived", "skipped"))
                if (reAdmit && articles.requeueForJob(existing.id, job.id)) {
                    // A resumed discovery pass sees rows it already attached to this job; only a
                    // row coming from another job adds to this job's discovered counter.
                    if (existing.lastJobId != job.id) inserted += 1
                    enqueueFetch(existing, source, job.id)
                }
                continue
            }
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
                status = "queued",
                failureCode = null,
                failureReason = null,
                attemptCount = 0,
                nextAttemptAt = Instant.now(),
                lastJobId = job.id,
            )
            val stored = articles.insertIfAbsent(article)
            if (stored.id == article.id) inserted += 1
            enqueueFetch(stored, source, job.id)
        }
        return inserted
    }

    /**
     * Producer side of `tb:q:{host}` (spec 02 file 03 §4): one message per article the job will
     * fetch. The DB row remains the durable record, so a Redis failure only loses ordering.
     */
    private fun enqueueFetch(article: Article, source: Source, jobId: String?) {
        val host = Urls.host(article.canonicalUrl)
        if (host.isBlank()) return
        runCatching {
            fetchQueue.enqueue(
                FetchMessage(
                    articleId = article.id,
                    sourceKey = source.key,
                    host = host,
                    url = article.canonicalUrl,
                    jobId = jobId,
                    attempt = article.attemptCount.coerceAtLeast(0) + 1,
                    enqueuedAt = Instant.now(),
                ),
            )
        }.onFailure { error ->
            log.debug("fetch_enqueue_skipped articleId={} reason={}", article.id, error.message)
        }
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

        // Admission (spec 04 §3): discovered -> queued before the first claim. Rows inserted by
        // this runner are admitted inline; this also covers a resumed/crashed row.
        val admitted = articles.admitForJob(current.id)
        if (admitted > 0) log.info("job_candidates_admitted jobId={} rows={}", current.id, admitted)

        while (!stopping.get()) {
            if (jobs.findById(current.id)?.status != "running") break
            val batch = articles.findDiscoveredForJob(current.id, BATCH)
            if (batch.isEmpty()) break
            var advanced = false
            for (article in batch) {
                if (stopping.get()) break
                if (jobs.findById(current.id)?.status != "running") break
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
                if (result != null) advanced = true
                when (result) {
                    is ArticleProcessor.Result.Archived -> {
                        archived += 1
                        metrics.jobItem(source.key, job.jobType, "archived")
                    }
                    is ArticleProcessor.Result.Skipped -> {
                        skipped += 1
                        metrics.jobItem(source.key, job.jobType, "skipped")
                    }
                    is ArticleProcessor.Result.Failed -> {
                        if (result.retryScheduled) {
                            skipped += 1
                            metrics.jobItem(source.key, job.jobType, "skipped")
                        } else {
                            failed += 1
                            metrics.jobItem(source.key, job.jobType, "failed")
                        }
                    }
                    is ArticleProcessor.Result.NeedsReview -> {
                        failed += 1
                        metrics.jobItem(source.key, job.jobType, "failed")
                    }
                    // A paused host or a busy gate consumed no attempt; the article stays
                    // queued and the retry worker owns it from here, so no counter moves.
                    is ArticleProcessor.Result.Deferred -> Unit
                    null -> Unit
                }
                discovered = maxOf(discovered, archived + skipped + failed)
            }
            if (!advanced) {
                // Every row in the batch is still leased/queued by someone else; do not spin on
                // the same 25 rows. The next tick retries once the lease or claim changes.
                log.info("job_batch_no_progress jobId={}", current.id)
                break
            }

            current = current.copy(
                discoveredCount = discovered,
                archivedCount = archived,
                skippedCount = skipped,
                failedCount = failed,
            )
            if (!jobs.updateProgress(current)) {
                log.info("job_progress_stopped jobId={}", current.id)
                break
            }
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
        return current
    }

    // -----------------------------------------------------------------------
    // Terminal transitions
    // -----------------------------------------------------------------------

    private fun finish(job: Job, source: Source): Job {
        if (jobs.findById(job.id)?.status != "running") {
            log.info("job_not_finished jobId={} statusChanged=true", job.id)
            return job
        }
        // Finishing window (spec 04 §2): a cancel landing between the last archive write and
        // the `completed` update is refused with JOB-CANCEL-REFUSED by JobService.cancel.
        finishingWindow.mark(job.id)
        try {
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
            runCatching { maintenance.purge() }
                .onFailure { log.warn("retention_failed reason={}", it.message) }
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
        } finally {
            finishingWindow.clear(job.id)
        }
    }

    private fun failJob(job: Job, reason: String) {
        val live = jobs.findById(job.id) ?: return
        if (live.terminal) {
            log.info("job_fail_skipped jobId={} status={}", job.id, live.status)
            return
        }
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
        runCatching { maintenance.purge() }
            .onFailure { log.warn("retention_failed reason={}", it.message) }
    }

    private companion object {
        const val BATCH = 25
        const val DISCOVERY_FAILURE_LIMIT = 5
        const val SHUTDOWN_WAIT_MS = 55_000L
    }
}
