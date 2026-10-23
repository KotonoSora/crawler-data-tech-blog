package com.techblog.crawler.observability

import io.micrometer.core.instrument.Counter
import io.micrometer.core.instrument.MeterRegistry
import io.micrometer.core.instrument.Tags
import io.micrometer.core.instrument.Timer
import org.springframework.stereotype.Component
import java.time.Duration
import java.util.concurrent.ConcurrentHashMap
import java.util.concurrent.atomic.AtomicInteger

/**
 * Crawler metric inventory (spec 05-observability file 01 §3). Labels are closed: source,
 * host, discovery_type, job_type, result, status_class, code and type only. No URL, article,
 * job, slug, or event id ever becomes a tag (file 05 §4).
 */
@Component
class CrawlerMetrics(
    private val registry: MeterRegistry,
) {
    private val activeJobs = ConcurrentHashMap<String, AtomicInteger>()
    private val staleSources = ConcurrentHashMap<String, AtomicInteger>()
    private val queueHosts = ConcurrentHashMap<String, AtomicInteger>()
    private val queueLeased = AtomicInteger(0)
    private val retryZsetSize = AtomicInteger(0)

    init {
        registry.gauge("crawler_queue_leased", queueLeased)
        registry.gauge("crawler_retry_zset_size", retryZsetSize)
    }

    fun discoveryItems(source: String, discoveryType: String, count: Int) {
        counter(
            "crawler_discovery_items_total",
            "source" to label(source),
            "discovery_type" to label(discoveryType),
        ).increment(count.coerceAtLeast(0).toDouble())
    }

    fun discoveryRun(source: String, result: String) {
        counter("crawler_discovery_runs_total", "source" to label(source), "result" to label(result))
            .increment()
    }

    fun discoveryFailure(source: String, code: String) {
        counter("crawler_discovery_failures_total", "source" to label(source), "code" to label(code))
            .increment()
    }

    fun fetchRequest(host: String, statusClass: String) {
        counter("crawler_fetch_requests_total", "host" to label(host), "status_class" to label(statusClass))
            .increment()
    }

    fun fetchDuration(host: String, durationMs: Int) {
        timer("crawler_fetch_duration_seconds", "host" to label(host))
            .record(Duration.ofMillis(durationMs.coerceAtLeast(0).toLong()))
    }

    fun fetchBytes(host: String, bytes: Long) {
        if (bytes > 0) {
            counter("crawler_fetch_bytes_total", "host" to label(host)).increment(bytes.toDouble())
        }
    }

    fun fetchFailure(source: String, code: String) {
        counter("crawler_fetch_failures_total", "source" to label(source), "code" to label(code))
            .increment()
    }

    /** One increment per HTTP attempt, labelled with the frozen outcome (spec 02 file 05 §6). */
    fun fetchAttempt(outcome: String) {
        counter("crawler_fetch_total", "outcome" to label(outcome)).increment()
    }

    /** +1 each time the within-host breaker sets `tb:pause:{host}` (file 05 §2). */
    fun hostPausedTotal(host: String) {
        counter("crawler_host_paused_total", "host" to label(host)).increment()
    }

    fun hostPaused(host: String, paused: Boolean) {
        val gauge = registry.gauge(
            "crawler_host_paused",
            Tags.of("host", label(host)),
            AtomicInteger(0),
        ) ?: return
        gauge.set(if (paused) 1 else 0)
    }

    fun extractDuration(source: String, durationMs: Long) {
        timer("crawler_extract_duration_seconds", "source" to label(source))
            .record(Duration.ofMillis(durationMs.coerceAtLeast(0)))
    }

    fun extractFailure(source: String, code: String) {
        counter("crawler_extract_failures_total", "source" to label(source), "code" to label(code))
            .increment()
    }

    fun contentTruncated(source: String) {
        counter("crawler_content_truncated_total", "source" to label(source)).increment()
    }

    fun asset(result: String) {
        counter("crawler_assets_total", "result" to label(result)).increment()
    }

    fun jobItem(source: String, jobType: String, result: String) {
        counter(
            "crawler_job_items_total",
            "source" to label(source),
            "job_type" to label(jobType),
            "result" to label(result),
        ).increment()
    }

    fun jobDuration(jobType: String, durationMs: Long) {
        timer("crawler_job_duration_seconds", "job_type" to label(jobType))
            .record(Duration.ofMillis(durationMs.coerceAtLeast(0)))
    }

    fun jobActive(jobType: String, delta: Int) {
        val gauge = activeJobs.computeIfAbsent(jobType) {
            registry.gauge(
                "crawler_jobs_active",
                Tags.of("job_type", label(jobType)),
                AtomicInteger(0),
            ) ?: AtomicInteger(0)
        }
        gauge.addAndGet(delta)
    }

    fun eventPublished(type: String) {
        counter("crawler_events_published_total", "type" to label(type)).increment()
    }

    fun sourceStale(source: String, stale: Boolean) {
        val gauge = staleSources.computeIfAbsent(source) {
            registry.gauge(
                "crawler_source_stale",
                Tags.of("source", label(source)),
                AtomicInteger(0),
            ) ?: AtomicInteger(0)
        }
        gauge.set(if (stale) 1 else 0)
    }

    fun purgeRows(table: String, rows: Int) {
        if (rows > 0) {
            counter("crawler_purge_rows_total", "table" to label(table)).increment(rows.toDouble())
        }
    }

    fun tmpPurged(files: Int) {
        if (files > 0) counter("crawler_tmp_purged_files_total").increment(files.toDouble())
    }

    fun queueDepth(host: String, count: Int) {
        val gauge = queueHosts.computeIfAbsent(host) {
            registry.gauge(
                "crawler_queue_depth",
                Tags.of("host", label(host)),
                AtomicInteger(0),
            ) ?: AtomicInteger(0)
        }
        gauge.set(count.coerceAtLeast(0))
    }

    fun queueLeased(count: Int) {
        queueLeased.set(count.coerceAtLeast(0))
    }

    fun retryZsetSize(count: Int) {
        retryZsetSize.set(count.coerceAtLeast(0))
    }

    private fun counter(name: String, vararg tags: Pair<String, String>): Counter =
        Counter.builder(name)
            .tags(Tags.of(*tags.flatMap { listOf(it.first, it.second) }.toTypedArray()))
            .register(registry)

    private fun timer(name: String, vararg tags: Pair<String, String>): Timer =
        Timer.builder(name)
            .tags(Tags.of(*tags.flatMap { listOf(it.first, it.second) }.toTypedArray()))
            .register(registry)

    private fun label(value: String): String = value.ifBlank { "unknown" }
}
