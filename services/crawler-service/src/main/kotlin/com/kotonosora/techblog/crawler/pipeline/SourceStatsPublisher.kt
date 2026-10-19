package com.kotonosora.techblog.crawler.pipeline

import com.kotonosora.techblog.crawler.domain.ArticleRepository
import com.kotonosora.techblog.crawler.domain.EventPublisher
import com.kotonosora.techblog.crawler.domain.Source
import com.kotonosora.techblog.crawler.domain.SourceRepository
import org.springframework.stereotype.Component
import java.time.Duration
import java.time.Instant

/**
 * `source.stats` publisher (spec 04 file 03 §3): emitted on every job terminal status.
 * `health` is computed here so the api-service projection never has to guess:
 * fresh ≤72 h since the last archived article, stale after that, broken at 5 consecutive
 * discovery failures (BA 03 §6).
 */
@Component
class SourceStatsPublisher(
    private val sources: SourceRepository,
    private val events: EventPublisher,
) {
    fun publish(source: Source) {
        val stats = sources.stats(source.id)
        events.publish(
            "source.stats",
            mapOf(
                "sourceKey" to source.key,
                "archivedCount" to stats.archivedCount,
                "failedCount" to stats.failedCount,
                "lastSuccessAt" to stats.lastSuccessAt?.toString(),
                "health" to health(source, stats.lastSuccessAt),
            ),
        )
    }

    fun health(source: Source, lastSuccessAt: Instant?, now: Instant = Instant.now()): String {
        if (source.consecutiveDiscoveryFailures >= 5) return "broken"
        if (!source.enabled) return "broken"
        val last = lastSuccessAt ?: return "stale"
        return if (Duration.between(last, now) > FRESH_WINDOW) "stale" else "fresh"
    }

    private companion object {
        val FRESH_WINDOW: Duration = Duration.ofHours(72)
    }
}

/**
 * Retry promoter (spec 04 file 01 §4, BE-04-04): moves `queued` articles whose backoff is due
 * back through the pipeline. The DB row is the schedule; no Redis zset is needed for a single
 * worker node, and a restart therefore never loses a due retry.
 */
@Component
class RetryWorker(
    private val articles: ArticleRepository,
    private val sources: SourceRepository,
    private val processor: ArticleProcessor,
) {
    fun promoteDue(limit: Int = 50) {
        for (article in articles.findDueRetries(limit)) {
            val source = sources.findById(article.sourceId) ?: continue
            runCatching { processor.process(article.id, source, article.lastJobId) }
        }
    }
}
