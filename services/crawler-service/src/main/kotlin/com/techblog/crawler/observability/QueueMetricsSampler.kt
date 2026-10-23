package com.techblog.crawler.observability

import com.techblog.crawler.config.CrawlerProperties
import org.slf4j.LoggerFactory
import org.springframework.data.redis.core.StringRedisTemplate
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Component

/**
 * Queue gauges (spec 05 file 01 §3, spec 02 file 05 §1).
 *
 * The durable article table is the record (`crawler_queue_depth{host}` counts
 * discovered/queued rows, `crawler_queue_leased` counts in-flight claims); the Redis transport
 * is sampled for `crawler_retry_zset_size`, with the DB `next_attempt_at` mirror as the fallback
 * when Redis is unavailable.
 *
 * Hosts that disappear from the sample are reset to zero so a Prometheus scrape never keeps a
 * stale series.
 */
@Component
class QueueMetricsSampler(
    private val jdbc: JdbcTemplate,
    private val properties: CrawlerProperties,
    private val metrics: CrawlerMetrics,
    private val redis: StringRedisTemplate,
) {
    private val log = LoggerFactory.getLogger(javaClass)
    private var previousHosts: Set<String> = emptySet()

    @Scheduled(fixedDelayString = "10000", initialDelayString = "5000")
    fun sample() {
        if (properties.role == "api") return
        runCatching {
            val depth = jdbc.query(
                """
                SELECT lower(substring(canonical_url from '^[a-zA-Z]+://([^/]+)')) AS host,
                       count(*) AS depth
                FROM article
                WHERE status IN ('discovered', 'queued')
                  AND canonical_url ~ '^[a-zA-Z]+://'
                GROUP BY 1
                """.trimIndent(),
            ) { rs, _ -> rs.getString("host") to rs.getInt("depth") }
                .filter { it.first != null }
                .associate { it.first!! to it.second }

            (previousHosts - depth.keys).forEach { metrics.queueDepth(it, 0) }
            depth.forEach { (host, count) -> metrics.queueDepth(host, count) }
            previousHosts = depth.keys

            val leased = jdbc.queryForObject(
                "SELECT count(*) FROM article WHERE status = 'processing'",
                Int::class.java,
            ) ?: 0
            metrics.queueLeased(leased)

            val retries = runCatching {
                redis.opsForZSet().size(properties.retryQueueKey)?.toInt()
            }.getOrNull() ?: jdbc.queryForObject(
                "SELECT count(*) FROM article WHERE status = 'queued' AND next_attempt_at > now()",
                Int::class.java,
            ) ?: 0
            metrics.retryZsetSize(retries)
        }.onFailure { log.debug("queue_metrics_sample_failed reason={}", it.message) }
    }
}
