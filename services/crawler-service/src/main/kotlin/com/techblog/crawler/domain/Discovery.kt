package com.techblog.crawler.domain

import org.jsoup.Jsoup
import org.jsoup.nodes.Document
import java.net.URI

/**
 * Discovery (spec 04 file 01, AGENTS.md): RSS/Atom → sitemap → listing pagination.
 * Feed items are a window, not an archive: a backfill pages the sitemap/listing too.
 * This type owns link extraction only; HTTP and robots live in the fetch package.
 */
object Discovery {

    fun linksFromFeed(xml: String, baseUrl: String): List<String> =
        runCatching {
            val doc = Jsoup.parse(xml, baseUrl, org.jsoup.parser.Parser.xmlParser())
            val entries = doc.select("entry, item")
            entries.mapNotNull { entry ->
                val link = entry.selectFirst("link")
                val href = when {
                    link == null -> null
                    link.hasAttr("href") -> link.attr("href")
                    else -> link.text()
                }
                href?.takeIf { it.isNotBlank() }?.let { resolve(baseUrl, it) }
            }.distinct()
        }.getOrDefault(emptyList())

    fun linksFromSitemap(xml: String, baseUrl: String): List<String> =
        runCatching {
            val doc = Jsoup.parse(xml, baseUrl, org.jsoup.parser.Parser.xmlParser())
            doc.select("url > loc").map { it.text() }
                .filter { it.isNotBlank() }
                .map { resolve(baseUrl, it) }
                .distinct()
        }.getOrDefault(emptyList())

    fun linksFromListing(html: String, baseUrl: String, articlePathHint: String?): List<String> {
        val document = Jsoup.parse(html, baseUrl)
        val selector = when {
            articlePathHint.isNullOrBlank() -> "a[href]"
            else -> "a[href*=$articlePathHint]"
        }
        return document.select(selector)
            .mapNotNull { it.absUrl("href").takeIf(String::isNotBlank) }
            .filter { Urls.host(it) == Urls.host(baseUrl) }
            .distinct()
    }

    fun isArticleLike(url: String): Boolean {
        val path = runCatching { URI(url).path.orEmpty() }.getOrDefault("")
        if (path.isBlank() || path == "/") return false
        val lower = path.lowercase()
        if (lower.endsWith(".xml") || lower.endsWith(".rss") || lower.endsWith(".atom")) return false
        if (lower.endsWith(".png") || lower.endsWith(".jpg") || lower.endsWith(".svg")) return false
        if (lower.contains("/feed") || lower.contains("/tag/") || lower.contains("/category/")) return false
        // A slug-looking last segment with a hyphen or a date is the best generic signal.
        val last = lower.trimEnd('/').substringAfterLast('/')
        return last.length >= 8 && (last.contains('-') || last.contains('_') || last.all(Char::isDigit))
    }

    fun resolve(baseUrl: String, href: String): String =
        runCatching { URI(baseUrl).resolve(href.trim()).toString() }.getOrDefault(href.trim())

    fun document(html: String, baseUrl: String): Document = Jsoup.parse(html, baseUrl)
}
