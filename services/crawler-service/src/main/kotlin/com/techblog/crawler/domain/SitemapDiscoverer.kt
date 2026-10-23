package com.techblog.crawler.domain

import crawlercommons.sitemaps.SiteMap
import crawlercommons.sitemaps.SiteMapIndex
import crawlercommons.sitemaps.SiteMapParser
import org.jsoup.Jsoup
import org.jsoup.parser.Parser
import org.slf4j.LoggerFactory
import java.net.URI

/**
 * Sitemap index -> child sitemap -> URL set parser (spec 01 file 01 §1). crawler-commons
 * validates the sitemap protocol and exposes lastmod; the jsoup fallback keeps malformed but
 * still useful XML crawlable.
 */
object SitemapDiscoverer {
    private val log = LoggerFactory.getLogger(javaClass)

    data class Document(
        val isIndex: Boolean,
        val locations: List<String>,
    )

    fun parse(xml: String, baseUrl: String): Document {
        if (xml.isBlank()) return Document(false, emptyList())
        val parsed = runCatching { parseWithCrawlerCommons(xml, baseUrl) }
            .onFailure { log.debug("sitemap_parse_failed baseUrl={} reason={}", baseUrl, it.message) }
            .getOrNull()
        return parsed?.takeIf { it.isIndex || it.locations.isNotEmpty() } ?: parseFallback(xml, baseUrl)
    }

    fun urlSet(xml: String, baseUrl: String): List<String> {
        val document = parse(xml, baseUrl)
        return if (document.isIndex) emptyList() else document.locations
    }

    private fun parseWithCrawlerCommons(xml: String, baseUrl: String): Document {
        val parser = SiteMapParser(false)
        val parsed = parser.parseSiteMap(
            "application/xml",
            xml.toByteArray(Charsets.UTF_8),
            URI(baseUrl).toURL(),
        )
        return when (parsed) {
            is SiteMapIndex -> Document(
                isIndex = true,
                locations = parsed.sitemaps.mapNotNull { it.url?.toString() },
            )
            is SiteMap -> Document(
                isIndex = false,
                locations = parsed.siteMapUrls.mapNotNull { it.url?.toString() },
            )
            else -> Document(false, emptyList())
        }
    }

    private fun parseFallback(xml: String, baseUrl: String): Document {
        val doc = Jsoup.parse(xml, baseUrl, Parser.xmlParser())
        val index = doc.select("sitemapindex").isNotEmpty()
        val selector = if (index) "sitemap > loc" else "url > loc"
        return Document(
            isIndex = index,
            locations = doc.select(selector).map { it.text() }
                .filter { it.isNotBlank() }
                .map { Discovery.resolve(baseUrl, it) }
                .distinct(),
        )
    }
}
