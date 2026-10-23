package com.techblog.crawler.observability

import io.micrometer.core.instrument.simple.SimpleMeterRegistry
import org.junit.jupiter.api.Assertions.assertFalse
import org.junit.jupiter.api.Test

/**
 * Label allowlist (spec 05 file 01 §3, file 05 §4): no high-cardinality or sensitive label may
 * become a Prometheus tag. Every meter is exercised so a new method cannot silently add one.
 */
class MetricLabelsTest {

    @Test
    fun `no forbidden metric label keys are registered`() {
        val registry = SimpleMeterRegistry()
        val metrics = CrawlerMetrics(registry)

        metrics.discoveryItems("cloudflare", "feed", 3)
        metrics.discoveryRun("cloudflare", "success")
        metrics.discoveryFailure("cloudflare", "DISC-FETCH-FAILED")
        metrics.fetchRequest("blog.cloudflare.com", "2xx")
        metrics.fetchDuration("blog.cloudflare.com", 120)
        metrics.fetchBytes("blog.cloudflare.com", 1024L)
        metrics.fetchFailure("cloudflare", "FETCH-TIMEOUT")
        metrics.fetchAttempt("ok")
        metrics.hostPausedTotal("blog.cloudflare.com")
        metrics.hostPaused("blog.cloudflare.com", true)
        metrics.extractDuration("cloudflare", 42L)
        metrics.extractFailure("cloudflare", "EXTRACT-PARSE-FAILED")
        metrics.contentTruncated("cloudflare")
        metrics.asset("archived")
        metrics.jobItem("cloudflare", "backfill", "archived")
        metrics.jobDuration("backfill", 1000L)
        metrics.jobActive("backfill", 1)
        metrics.eventPublished("article.archived")
        metrics.sourceStale("cloudflare", true)
        metrics.purgeRows("fetch_log", 10)
        metrics.tmpPurged(2)
        metrics.queueDepth("blog.cloudflare.com", 5)
        metrics.queueLeased(1)
        metrics.retryZsetSize(0)

        val forbidden = setOf("url", "canonical_url", "article_id", "slug", "job_id", "event_id", "title")
        registry.meters.forEach { meter ->
            meter.id.tags.forEach { tag ->
                assertFalse(
                    tag.key in forbidden,
                    "forbidden label '${tag.key}' on meter '${meter.id.name}'",
                )
            }
        }
    }
}
