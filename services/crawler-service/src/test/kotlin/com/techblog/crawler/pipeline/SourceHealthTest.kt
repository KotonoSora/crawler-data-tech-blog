package com.techblog.crawler.pipeline

import com.techblog.crawler.domain.Source
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import java.time.Duration
import java.time.Instant

/**
 * Staleness boundary (spec 05 file 01 §5, AC-12): 71 h 59 m is fresh, 72 h 01 m is stale, the
 * scope is enabled feed sources, and broken wins over freshness.
 */
class SourceHealthTest {

    private val now: Instant = Instant.parse("2026-10-23T12:00:00Z")

    @Test
    fun `just under the window is fresh`() {
        val last = now.minus(Duration.ofHours(71).plusMinutes(59))
        assertEquals("fresh", evaluateSourceHealth(source(), last, now, 72))
    }

    @Test
    fun `just over the window is stale`() {
        val last = now.minus(Duration.ofHours(72).plusMinutes(1))
        assertEquals("stale", evaluateSourceHealth(source(), last, now, 72))
    }

    @Test
    fun `exactly at the window stays fresh`() {
        val last = now.minus(Duration.ofHours(72))
        assertEquals("fresh", evaluateSourceHealth(source(), last, now, 72))
    }

    @Test
    fun `missing last success is stale`() {
        assertEquals("stale", evaluateSourceHealth(source(), null, now, 72))
    }

    @Test
    fun `non-feed sources are outside the staleness scope`() {
        val last = now.minus(Duration.ofDays(30))
        assertEquals("fresh", evaluateSourceHealth(source(discoveryType = "sitemap"), last, now, 72))
    }

    @Test
    fun `disabled source is broken`() {
        assertEquals("broken", evaluateSourceHealth(source(enabled = false), now, now, 72))
    }

    @Test
    fun `five discovery failures make the source broken`() {
        assertEquals("broken", evaluateSourceHealth(source(consecutiveFailures = 5), now, now, 72))
    }

    private fun source(
        discoveryType: String = "feed",
        enabled: Boolean = true,
        consecutiveFailures: Int = 0,
    ): Source = Source(
        id = "src-1",
        key = "cloudflare",
        name = "Cloudflare",
        discoveryType = discoveryType,
        discoveryUrl = "https://blog.cloudflare.com/rss/",
        listingUrl = null,
        discoveryConfig = "{}",
        enabled = enabled,
        rateLimitMs = 2000,
        notes = null,
        consecutiveDiscoveryFailures = consecutiveFailures,
        createdAt = now.minus(Duration.ofDays(365)),
        updatedAt = now,
    )
}
