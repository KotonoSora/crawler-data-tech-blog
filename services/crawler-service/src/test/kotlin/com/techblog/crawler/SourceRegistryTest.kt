package com.techblog.crawler

import com.techblog.crawler.config.SourceRegistry
import com.techblog.crawler.domain.InvalidRequest
import com.techblog.crawler.domain.Source
import com.techblog.crawler.domain.SourceRepository
import com.techblog.crawler.domain.SourceStats
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import tools.jackson.databind.json.JsonMapper
import tools.jackson.module.kotlin.KotlinModule
import java.time.Instant

class SourceRegistryTest {

    private val mapper = JsonMapper.builder()
        .addModule(KotlinModule.Builder().build())
        .build()

    @Test
    fun `empty config falls back to the legacy URL column`() {
        val source = source(
            discoveryType = "feed",
            discoveryUrl = "https://blog.example/feed",
            discoveryConfig = "{}",
        )

        val resolved = SourceRegistry(FakeSources(source), mapper).resolve("blog")

        assertEquals("https://blog.example/feed", resolved.config.feedUrl)
        assertEquals(null, resolved.config.sitemapUrl)
    }

    @Test
    fun `json config supplies selectors and tracking parameters`() {
        val source = source(
            discoveryType = "listing",
            discoveryUrl = "https://blog.example/blog",
            discoveryConfig = """
                {
                  "listingUrl": "https://blog.example/blog",
                  "listingSelectors": { "itemLink": "a.post", "nextPage": "a.next" },
                  "trackingParams": ["source", "fbclid"],
                  "maxPagesPerRun": 20
                }
            """.trimIndent(),
        )

        val resolved = SourceRegistry(FakeSources(source), mapper).resolve("blog")

        assertEquals("a.post", resolved.config.listingSelectors?.itemLink)
        assertEquals("a.next", resolved.config.listingSelectors?.nextPage)
        assertEquals(listOf("source", "fbclid"), resolved.config.trackingParams)
        assertEquals(20, resolved.config.maxPagesPerRun)
    }

    @Test
    fun `non-https config is rejected`() {
        val source = source(
            discoveryType = "feed",
            discoveryUrl = "http://blog.example/feed",
            discoveryConfig = "{}",
        )

        assertThrows<InvalidRequest> {
            SourceRegistry(FakeSources(source), mapper).resolve("blog")
        }
    }

    private fun source(
        discoveryType: String,
        discoveryUrl: String,
        discoveryConfig: String,
    ): Source = Source(
        id = "1",
        key = "blog",
        name = "Blog",
        discoveryType = discoveryType,
        discoveryUrl = discoveryUrl,
        listingUrl = null,
        discoveryConfig = discoveryConfig,
        enabled = true,
        rateLimitMs = 2000,
        notes = null,
        consecutiveDiscoveryFailures = 0,
        createdAt = Instant.EPOCH,
        updatedAt = Instant.EPOCH,
    )

    private class FakeSources(private val source: Source) : SourceRepository {
        override fun findAll(): List<Source> = listOf(source)
        override fun findByKey(key: String): Source? = source.takeIf { it.key == key }
        override fun findById(id: String): Source? = source.takeIf { it.id == id }
        override fun setEnabled(key: String, enabled: Boolean): Source? = null
        override fun recordDiscoveryOutcome(sourceId: String, success: Boolean) = Unit
        override fun registrySnapshot(): List<Source> = listOf(source)
        override fun stats(sourceId: String): SourceStats = SourceStats(0, 0, 0, null)
    }
}
