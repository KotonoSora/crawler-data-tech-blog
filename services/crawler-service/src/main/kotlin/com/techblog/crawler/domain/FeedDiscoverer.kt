package com.techblog.crawler.domain

import com.rometools.rome.feed.synd.SyndFeed
import com.rometools.rome.io.SyndFeedInput
import com.rometools.rome.io.XmlReader
import org.slf4j.LoggerFactory
import java.io.ByteArrayInputStream

/**
 * RSS 2.0 / Atom window parser (spec 01 file 01 §1, §2). ROME handles both wire formats and
 * resolves most link variants; the old XML parser remains the fallback for feeds that are
 * technically malformed but still link-bearing.
 */
object FeedDiscoverer {
    private val log = LoggerFactory.getLogger(javaClass)

    fun discover(xml: String, baseUrl: String): List<String> {
        if (xml.isBlank()) return emptyList()
        val fromRome = runCatching { parseWithRome(xml) }
            .onFailure { log.debug("feed_rome_parse_failed baseUrl={} reason={}", baseUrl, it.message) }
            .getOrDefault(emptyList())
        val links = if (fromRome.isNotEmpty()) fromRome else Discovery.linksFromFeed(xml, baseUrl)
        return links.map { Discovery.resolve(baseUrl, it) }
            .filter { it.isNotBlank() }
            .distinct()
    }

    private fun parseWithRome(xml: String): List<String> {
        val bytes = xml.toByteArray(Charsets.UTF_8)
        val feed: SyndFeed = XmlReader(ByteArrayInputStream(bytes)).use { reader ->
            SyndFeedInput().build(reader)
        }
        return feed.entries.mapNotNull { entry ->
            entry.link?.takeIf { it.isNotBlank() }
                ?: entry.links?.firstOrNull { !it.href.isNullOrBlank() }?.href
        }
    }
}
