package com.techblog.crawler.pipeline

import com.techblog.crawler.config.CrawlerProperties
import com.techblog.crawler.domain.ArticleRepository
import com.techblog.crawler.domain.EventPublisher
import com.techblog.crawler.domain.FetchMessage
import com.techblog.crawler.domain.FetchQueue
import com.techblog.crawler.domain.JobRepository
import com.techblog.crawler.domain.RetryQueue
import com.techblog.crawler.domain.Source
import com.techblog.crawler.domain.SourceRepository
import com.techblog.crawler.domain.SourceStats
import com.techblog.crawler.domain.Urls
import com.techblog.crawler.observability.CrawlerMetrics
import org.slf4j.LoggerFactory
import org.slf4j.MDC
import org.springframework.stereotype.Component
import java.time.Clock
import java.time.Duration
import java.time.Instant
import java.util.concurrent.ConcurrentHashMap

/**
 * Read-time staleness rule (spec 05 file 01 §5). Kept as a pure function so the 72 h boundary is
 * unit-testable without repositories or a running scheduler. Sitemap/listing sources are out of
 * scope and never classified stale by this attribute.
 */
internal fun evaluateSourceHealth(
    source: Source,
    lastSuccessAt: Instant?,
    now: Instant,
    staleAfterHours: Long,
): String {
    if (!source.enabled) return "broken"
    if (source.consecutiveDiscoveryFailures >= 5) return "broken"
    if (source.discoveryType != "feed") return "fresh"
    val last = lastSuccessAt ?: return "stale"
    return if (Duration.between(last, now) > Duration.ofHours(staleAfterHours)) "stale" else "fresh"
}

/**
 * `source.stats` publisher (spec 04 file 03 §3): emitted on every job terminal status.
 * `health` is computed here so the api-service projection never has to guess:
 * fresh ≤72 h since the last archived article, stale after that, broken at 5 consecutive
 * discovery failures (BA 03 §6).
 *
 * The stale gauge is updated by `source.stats` publications and by read-time registry observation;
 * the OPS-SOURCE-STALE WARN is emitted once per stale episode and the marker is cleared as soon as
 * the source recovers.
 */
@Component
class SourceStatsPublisher(
    private val sources: SourceRepository,
    private val events: EventPublisher,
    private val properties: CrawlerProperties,
    private val metrics: CrawlerMetrics,
    private val clock: Clock,
) {
    private val log = LoggerFactory.getLogger(javaClass)
    private val staleEpisodes = ConcurrentHashMap.newKeySet<String>()

    fun publish(source: Source) {
        val stats = sources.stats(source.id)
        val state = recordHealth(source, stats.lastSuccessAt)
        events.publish(
            "source.stats",
            mapOf(
                "sourceKey" to source.key,
                "articleCount" to stats.articleCount,
                "archivedCount" to stats.archivedCount,
                "failedCount" to stats.failedCount,
                "lastSuccessAt" to stats.lastSuccessAt?.toString(),
                "health" to state,
            ),
        )
    }

    /**
     * Read-time staleness (spec 05 file 01 §5): the operator reading the source registry is the
     * trigger, so the gauge and the one-per-episode WARN stay current without a scheduled check.
     */
    fun observe(source: Source, stats: SourceStats) {
        runCatching { recordHealth(source, stats.lastSuccessAt) }
            .onFailure { log.warn("source_health_read_failed source={} reason={}", source.key, it.message) }
    }

    private fun recordHealth(source: Source, lastSuccessAt: Instant?): String {
        val state = health(source, lastSuccessAt)
        metrics.sourceStale(source.key, state == "stale")
        when (state) {
            "stale" -> if (staleEpisodes.add(source.key)) {
                val previous = MDC.get("code")
                MDC.put("code", "OPS-SOURCE-STALE")
                try {
                    log.warn(
                        "source_health code=OPS-SOURCE-STALE source={} lastSuccessAt={}",
                        source.key,
                        lastSuccessAt,
                    )
                } finally {
                    if (previous == null) MDC.remove("code") else MDC.put("code", previous)
                }
            }
            else -> staleEpisodes.remove(source.key)
        }
        return state
    }

    fun health(source: Source, lastSuccessAt: Instant?, now: Instant = Instant.now(clock)): String =
        evaluateSourceHealth(source, lastSuccessAt, now, properties.staleAfterHours)
}

/**
 * Retry promoter (spec 02 file 01 §1, file 04 BE-04-04): due `tb:retry` members are pushed back
 * to `tb:q:{host}` and driven through the pipeline; the article row keeps the same schedule in
 * `next_attempt_at`, so a Redis restart never loses a due retry.
 */
@Component
class RetryWorker(
    private val articles: ArticleRepository,
    private val sources: SourceRepository,
    private val jobs: JobRepository,
    private val processor: ArticleProcessor,
    private val fetchQueue: FetchQueue,
    private val retryQueue: RetryQueue,
) {
    private val log = LoggerFactory.getLogger(javaClass)

    fun promoteDue(limit: Int = 500) {
        val now = Instant.now()
        val promoted = retryQueue.due(limit, now)
        for (entry in promoted) {
            retryQueue.remove(entry.articleId)
            // The row, not the (possibly stale) message, is authoritative: a job may have
            // requeued the same article since the message was written.
            val article = articles.findById(entry.articleId)
            if (article == null || article.status != "queued") {
                log.debug("retry_row_not_queued articleId={} status={}", entry.articleId, article?.status)
                continue
            }
            // A running/paused/pending job owns its rows (`resetProcessingForJob` on resume).
            // Promoting a retry for those rows could race that reset, so leave the row to the
            // job runner; the DB mirror picks it up once the job is no longer active.
            if (isActiveJob(article.lastJobId)) {
                log.debug("retry_job_active articleId={} jobId={}", entry.articleId, article.lastJobId)
                continue
            }
            val source = sources.findByKey(entry.message.sourceKey)
            if (source == null) {
                log.warn("retry_source_missing articleId={} source={}", entry.articleId, entry.message.sourceKey)
                continue
            }
            fetchQueue.enqueue(entry.message.copy(jobId = article.lastJobId))
            runCatching { processor.process(entry.articleId, source, article.lastJobId) }
                .onFailure { log.warn("retry_process_failed articleId={} reason={}", entry.articleId, it.message) }
        }

        // DB mirror: restart safety and the no-Redis fallback. Rows promoted from the zset above
        // are skipped here; each promoted row is claimed once by its own process() call.
        for (article in articles.findDueRetries(limit)) {
            if (promoted.any { it.articleId == article.id }) continue
            val source = sources.findById(article.sourceId) ?: continue
            enqueue(article.id, source, article.lastJobId, article.canonicalUrl, article.attemptCount + 1)
            runCatching { processor.process(article.id, source, article.lastJobId) }
                .onFailure { log.warn("retry_process_failed articleId={} reason={}", article.id, it.message) }
        }
    }

    private fun enqueue(articleId: String, source: Source, jobId: String?, url: String, attempt: Int) {
        val host = Urls.host(url)
        if (host.isBlank()) return
        runCatching {
            fetchQueue.enqueue(
                FetchMessage(
                    articleId = articleId,
                    sourceKey = source.key,
                    host = host,
                    url = url,
                    jobId = jobId,
                    attempt = attempt.coerceAtLeast(1),
                    enqueuedAt = Instant.now(),
                ),
            )
        }
    }

    private fun isActiveJob(jobId: String?): Boolean {
        if (jobId == null) return false
        return runCatching { jobs.findById(jobId)?.status }.getOrNull() in ACTIVE_JOB_STATUSES
    }

    private companion object {
        /** Mirrors `findDueRetries`: these jobs still own their rows. */
        val ACTIVE_JOB_STATUSES = setOf("pending", "running", "paused")
    }
}
