package com.techblog.crawler

import com.techblog.crawler.config.ListingSelectors
import com.techblog.crawler.domain.CandidateNormalizer
import com.techblog.crawler.domain.FeedDiscoverer
import com.techblog.crawler.domain.ListingDiscoverer
import com.techblog.crawler.domain.SitemapDiscoverer
import com.techblog.crawler.domain.Urls
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertNull
import org.junit.jupiter.api.Assertions.assertTrue
import org.junit.jupiter.api.Test

class SourceDiscoveryTest {

    @Test
    fun `ROME extracts RSS item links and resolves relative URLs`() {
        val rss = """
            <?xml version="1.0" encoding="UTF-8"?>
            <rss version="2.0"><channel>
              <item><title>One</title><link>/post/one</link></item>
              <item><title>Two</title><link>https://blog.example/post/two</link></item>
            </channel></rss>
        """.trimIndent()

        val links = FeedDiscoverer.discover(rss, "https://blog.example/feed")

        assertEquals(listOf("https://blog.example/post/one", "https://blog.example/post/two"), links)
    }

    @Test
    fun `ROME extracts Atom alternate links`() {
        val atom = """
            <?xml version="1.0" encoding="UTF-8"?>
            <feed xmlns="http://www.w3.org/2005/Atom">
              <entry><title>One</title><link rel="alternate" href="https://blog.example/post/one"/></entry>
            </feed>
        """.trimIndent()

        assertEquals(listOf("https://blog.example/post/one"), FeedDiscoverer.discover(atom, "https://blog.example/feed"))
    }

    @Test
    fun `sitemap parser returns URL-set locations`() {
        val xml = """
            <?xml version="1.0" encoding="UTF-8"?>
            <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
              <url><loc>https://blog.example/post/one</loc></url>
              <url><loc>https://blog.example/post/two</loc></url>
            </urlset>
        """.trimIndent()

        val parsed = SitemapDiscoverer.parse(xml, "https://blog.example/sitemap.xml")

        assertEquals(false, parsed.isIndex)
        assertEquals(
            listOf("https://blog.example/post/one", "https://blog.example/post/two"),
            parsed.locations,
        )
    }

    @Test
    fun `sitemap parser identifies an index`() {
        val xml = """
            <?xml version="1.0" encoding="UTF-8"?>
            <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
              <sitemap><loc>https://blog.example/sitemap-posts.xml</loc></sitemap>
            </sitemapindex>
        """.trimIndent()

        val parsed = SitemapDiscoverer.parse(xml, "https://blog.example/sitemap.xml")

        assertTrue(parsed.isIndex)
        assertEquals(listOf("https://blog.example/sitemap-posts.xml"), parsed.locations)
    }

    @Test
    fun `listing parser uses configured CSS selectors and next page`() {
        val html = """
            <html><body>
              <a class="post-link" href="/post/one">One</a>
              <a class="post-link" href="/post/two">Two</a>
              <a class="next" href="/blog?page=2">Next</a>
            </body></html>
        """.trimIndent()

        val page = ListingDiscoverer.parse(
            html,
            "https://blog.example/blog",
            ListingSelectors(itemLink = "a.post-link", nextPage = "a.next"),
        )

        assertEquals(
            listOf("https://blog.example/post/one", "https://blog.example/post/two"),
            page.links,
        )
        assertEquals("https://blog.example/blog?page=2", page.nextPageUrl)
    }

    @Test
    fun `candidate normalization strips tracking and upgrades allowlisted HTTP`() {
        val actual = CandidateNormalizer.normalize(
            "http://blog.example/post/one?utm_source=rss&p=123#comments",
            "https://blog.example/feed",
            setOf("blog.example"),
            Urls.DEFAULT_TRACKING_PARAMS,
        )

        assertEquals("https://blog.example/post/one?p=123", actual)
    }

    @Test
    fun `candidate normalization drops disallowed HTTP and non-fetch schemes`() {
        assertNull(
            CandidateNormalizer.normalize(
                "http://other.example/post/one",
                "https://blog.example/feed",
                setOf("blog.example"),
                Urls.DEFAULT_TRACKING_PARAMS,
            ),
        )
        assertNull(
            CandidateNormalizer.normalize(
                "mailto:editor@blog.example",
                "https://blog.example/feed",
                setOf("blog.example"),
                Urls.DEFAULT_TRACKING_PARAMS,
            ),
        )
    }
}
