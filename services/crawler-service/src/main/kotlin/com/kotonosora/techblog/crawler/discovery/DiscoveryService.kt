package com.kotonosora.techblog.crawler.discovery

import com.kotonosora.techblog.crawler.config.CrawlerProperties
import com.kotonosora.techblog.crawler.domain.Discovery
import com.kotonosora.techblog.crawler.domain.FetchPort
import com.kotonosora.techblog.crawler.domain.FetchResult
import com.kotonosora.techblog.crawler.domain.HostGate
import com.kotonosora.techblog.crawler.domain.RobotsGate
import com.kotonosora.techblog.crawler.domain.Source
import com.kotonosora.techblog.crawler.domain.Urls
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Service
import java.net.URI

/**
 * Discovery pipeline (spec 01, BE-01-06): RSS/Atom → sitemap → listing, with backfill paging
 * past the feed window. A feed is a window, not an archive (BR-14): an incremental run may
 * stop at the feed, but a backfill must page the sitemap/listing to reach history.
 *
 * Every outbound request goes through robots.txt and the HostGate; a robots denial is a
 * recorded skip, never a silent success.
 */
@Service
class DiscoveryService(
    private val fetcher: FetchPort,
    private val robots: RobotsGate,
    private val hostGate: HostGate,
    private val properties: CrawlerProperties,
) {
    private val log = LoggerFactory.getLogger(javaClass)

    data class Outcome(
        val path: String,
        val links: List<String>,
        val errors: List<DiscoveryError>,
        val robotsDenied: List<String>,
    )

    data class DiscoveryError(val code: String, val detail: String, val page: Int? = null)

    fun discover(source: Source, jobType: String): Outcome {
        val errors = mutableListOf<DiscoveryError>()
        val denied = mutableListOf<String>()
        val backfill = jobType == "backfill"

        // Only a `feed` source has a feed URL: for sitemap/listing sources discovery_url points
        // at the sitemap or listing, and parsing it as XML feed would only invent an error.
        val feedLinks = if (source.discoveryType == "feed") tryFeed(source, errors, denied) else emptyList()

        if (feedLinks.isNotEmpty() && !backfill) {
            return Outcome("feed", cap(feedLinks, properties.maxLinksIncremental), errors, denied)
        }

        val secondary = when (source.discoveryType) {
            "sitemap" -> sitemapLinks(source.discoveryUrl, errors, denied)
            "listing" -> listingLinks(source, jobType, errors, denied)
            // A feed is a window (BR-14): backfill pages the site's sitemap for history. A
            // missing sitemap is expected for Medium-family hosts, so it is not an error there.
            "feed" -> if (backfill) {
                sitemapLinks(derivedSitemap(source), errors, denied, recordErrors = false)
            } else {
                emptyList()
            }
            else -> emptyList()
        }

        val combined = (feedLinks + secondary).distinct()
        if (combined.isEmpty() && errors.isEmpty()) {
            errors += DiscoveryError(
                "DISC-LISTING-SELECTOR-BROKEN",
                "Discovery returned 0 candidates for ${source.key}; no path produced links.",
            )
        }
        val path = when {
            secondary.isNotEmpty() && source.discoveryType != "feed" -> source.discoveryType
            feedLinks.isNotEmpty() -> "feed"
            else -> source.discoveryType
        }
        val limit = if (backfill) properties.maxLinksBackfill else properties.maxLinksIncremental
        return Outcome(path, cap(combined, limit), errors, denied)
    }

    /** `https://host/sitemap.xml` for a feed source; the feed URL's origin is the only hint we have. */
    private fun derivedSitemap(source: Source): String {
        val origin = runCatching {
            val uri = URI(source.discoveryUrl)
            "${uri.scheme}://${uri.authority}"
        }.getOrDefault("")
        return if (origin.isBlank()) source.discoveryUrl else "$origin/sitemap.xml"
    }

    // -----------------------------------------------------------------------
    // Feed
    // -----------------------------------------------------------------------

    private fun tryFeed(
        source: Source,
        errors: MutableList<DiscoveryError>,
        denied: MutableList<String>,
    ): List<String> {
        if (source.discoveryType == "listing" && source.discoveryUrl == source.listingUrl) return emptyList()
        val result = fetch(source.discoveryUrl, "application/rss+xml, application/atom+xml, application/xml;q=0.9", denied)
            ?: return emptyList()
        if (!result.ok) {
            if (result.outcome.wire != "robots_denied") {
                errors += DiscoveryError(
                    "DISC-FEED-PARSE-FAILED",
                    "Feed ${source.discoveryUrl} answered ${result.statusCode ?: "no status"}: " +
                        (result.failureReason ?: "unknown error"),
                )
            }
            return emptyList()
        }
        val body = result.body?.toString(Charsets.UTF_8) ?: return emptyList()
        val links = Discovery.linksFromFeed(body, source.discoveryUrl)
            .filter { isHttps(it) }
        if (links.isEmpty()) {
            errors += DiscoveryError(
                "DISC-FEED-PARSE-FAILED",
                "Feed ${source.discoveryUrl} contained no usable links.",
            )
        }
        return links
    }

    // -----------------------------------------------------------------------
    // Sitemap (sitemap index → children → urlset)
    // -----------------------------------------------------------------------

    private fun sitemapLinks(
        rootUrl: String,
        errors: MutableList<DiscoveryError>,
        denied: MutableList<String>,
        recordErrors: Boolean = true,
    ): List<String> {
        val root = fetch(rootUrl, "application/xml, text/xml;q=0.9", denied) ?: return emptyList()
        if (!root.ok) {
            if (recordErrors) {
                errors += DiscoveryError(
                    "DISC-SITEMAP-MISSING",
                    "Sitemap $rootUrl answered ${root.statusCode ?: "no status"}.",
                )
            }
            return emptyList()
        }
        val xml = root.body?.toString(Charsets.UTF_8) ?: return emptyList()
        val locations = Discovery.linksFromSitemap(xml, rootUrl)
        val isIndex = xml.contains("<sitemapindex", ignoreCase = true)

        val links = if (!isIndex) {
            locations
        } else {
            locations.asSequence()
                .filter { isHttps(it) }
                .take(MAX_SITEMAP_CHILDREN)
                .flatMap { child ->
                    val result = fetch(child, "application/xml, text/xml;q=0.9", denied)
                    if (result?.ok != true) {
                        emptySequence()
                    } else {
                        Discovery.linksFromSitemap(
                            result.body?.toString(Charsets.UTF_8).orEmpty(),
                            child,
                        ).asSequence()
                    }
                }
                .toList()
        }
        // The sitemap also lists listing pages; keep only article-looking URLs.
        return links.filter { isHttps(it) && Discovery.isArticleLike(it) }
            .ifEmpty { links.filter { isHttps(it) && !looksLikeIndex(it) } }
    }

    // -----------------------------------------------------------------------
    // Listing pagination
    // -----------------------------------------------------------------------

    private fun listingLinks(
        source: Source,
        jobType: String,
        errors: MutableList<DiscoveryError>,
        denied: MutableList<String>,
    ): List<String> {
        val start = source.listingUrl ?: source.discoveryUrl
        val hint = articlePathHint(source.discoveryConfig)
        val maxPages = if (jobType == "backfill") properties.maxLinksBackfill else MAX_LISTING_PAGES
        val seen = linkedSetOf<String>()
        var emptyRuns = 0
        var page = 0
        while (page < maxPages) {
            val url = pageUrl(start, page)
            val result = fetch(url, "text/html", denied) ?: break
            if (!result.ok) {
                if (page == 0) {
                    errors += DiscoveryError(
                        "DISC-LISTING-SELECTOR-BROKEN",
                        "Listing $url answered ${result.statusCode ?: "no status"}.",
                    )
                }
                break
            }
            val html = result.body?.toString(Charsets.UTF_8).orEmpty()
            val found = Discovery.linksFromListing(html, url, hint)
                .filter { isHttps(it) && (hint.isNullOrBlank() || it.contains(hint)) }
                .filter(::isArticleLikeOrHint)
            val fresh = found.filter { seen.add(it) }
            if (fresh.isEmpty()) {
                emptyRuns += 1
                if (emptyRuns >= 2) {
                    if (page == 0) {
                        errors += DiscoveryError(
                            "DISC-LISTING-SELECTOR-BROKEN",
                            "Listing pagination returned 0 new links on page 1; update discovery_config.selectors.",
                            page,
                        )
                    }
                    break
                }
            } else {
                emptyRuns = 0
            }
            page += 1
            if (jobType != "backfill") break
        }
        return seen.toList()
    }

    private fun articlePathHint(config: String): String? =
        Regex("\"(?:articlePathHint|pathHint|article_path)\"\\s*:\\s*\"([^\"]+)\"")
            .find(config)
            ?.groupValues
            ?.get(1)

    private fun pageUrl(start: String, page: Int): String {
        if (page == 0) return start
        val separator = if (start.contains('?')) '&' else '?'
        return "$start${separator}page=$page"
    }

    private fun isArticleLikeOrHint(url: String): Boolean =
        Discovery.isArticleLike(url) || runCatching { URI(url).path.orEmpty() }.getOrDefault("")
            .trimEnd('/')
            .substringAfterLast('/')
            .length >= 6

    private fun looksLikeIndex(url: String): Boolean {
        val path = runCatching { URI(url).path.orEmpty() }.getOrDefault("").lowercase()
        return path.endsWith("/blog") || path.endsWith("/blog/") || path.endsWith("/engineering") ||
            path.endsWith("/engineering/")
    }

    // -----------------------------------------------------------------------
    // Shared
    // -----------------------------------------------------------------------

    private fun fetch(url: String, accept: String, denied: MutableList<String>): FetchResult? {
        val host = Urls.host(url)
        if (host.isBlank()) return null
        val decision = robots.check(url, userAgent())
        if (!decision.allowed) {
            denied += url
            log.info("discovery_robots_denied url={} reason={}", url, decision.reason)
            return FetchResult.failed(
                com.kotonosora.techblog.crawler.domain.FetchOutcome.ROBOTS_DENIED,
                null,
                "DISC-ROBOTS-DENIED",
                decision.reason ?: "robots.txt disallows the URL.",
                0,
            )
        }
        return try {
            hostGate.withPermit(host, sourceDelay(host)) {
                fetcher.get(
                    url = url,
                    userAgent = userAgent(),
                    accept = accept,
                    validators = null,
                    maxBytes = properties.maxHtmlBytes,
                    timeoutMs = properties.readTimeoutMs,
                )
            }
        } catch (error: Exception) {
            log.warn("discovery_fetch_failed url={} reason={}", url, error.message)
            null
        }
    }

    private fun sourceDelay(host: String): Long =
        if (com.kotonosora.techblog.crawler.domain.OutcomeMapper.isMediumFamily(host)) {
            properties.mediumDelayMs
        } else {
            properties.defaultDelayMs
        }

    private fun userAgent(): String =
        "tech-blog-archiver/1.0 (+${properties.contact.ifBlank { "local operator" }})"

    private fun cap(links: List<String>, max: Int): List<String> =
        links.asSequence().map(Urls::canonical).filter(::isHttps).distinct().take(max).toList()

    private fun isHttps(url: String): Boolean = url.startsWith("https://", ignoreCase = true)

    private companion object {
        const val MAX_SITEMAP_CHILDREN = 100
        const val MAX_LISTING_PAGES = 5
    }
}
