package com.techblog.crawler.discovery

import com.techblog.crawler.config.CrawlerProperties
import com.techblog.crawler.config.SourceDiscoveryConfig
import com.techblog.crawler.config.SourceRegistry
import com.techblog.crawler.domain.CandidateNormalizer
import com.techblog.crawler.domain.FeedDiscoverer
import com.techblog.crawler.domain.FetchLogEntry
import com.techblog.crawler.domain.FetchLogRepository
import com.techblog.crawler.domain.FetchOutcome
import com.techblog.crawler.domain.FetchPort
import com.techblog.crawler.domain.FetchResult
import com.techblog.crawler.domain.HostGate
import com.techblog.crawler.domain.JobInvalidState
import com.techblog.crawler.domain.ListingDiscoverer
import com.techblog.crawler.domain.RobotsGate
import com.techblog.crawler.domain.SitemapDiscoverer
import com.techblog.crawler.domain.Source
import com.techblog.crawler.domain.Urls
import com.techblog.crawler.domain.UserAgent
import com.techblog.crawler.fetch.HostGateBusy
import com.techblog.crawler.fetch.HostPaused
import com.techblog.crawler.observability.CrawlerMetrics
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Service
import java.net.URI
import java.time.Duration

/**
 * Discovery orchestrator (spec 01 file 01): feed -> sitemap -> listing, with backfill paging
 * past the feed window. A feed is a window, not an archive (BR-14): an incremental run may
 * stop at the feed, but a backfill continues through the configured sitemap/listing paths.
 *
 * The run is guarded by a Redis `SET NX` lock. Every outbound request goes through robots.txt
 * and the HostGate; a robots denial is a recorded skip, never a silent success.
 */
@Service
class DiscoveryService(
    private val fetcher: FetchPort,
    private val robots: RobotsGate,
    private val hostGate: HostGate,
    private val properties: CrawlerProperties,
    private val metrics: CrawlerMetrics,
    private val fetchLog: FetchLogRepository,
    private val sourceRegistry: SourceRegistry,
    private val runLock: DiscoveryRunLock,
) {
    private val log = LoggerFactory.getLogger(javaClass)

    data class Outcome(
        val path: String,
        val links: List<String>,
        val errors: List<DiscoveryError>,
        val robotsDenied: List<String>,
        val counters: Map<String, Int> = emptyMap(),
    )

    data class DiscoveryError(val code: String, val detail: String, val page: Int? = null)

    private class RunCounters {
        var feed = 0
        var sitemap = 0
        var listing = 0
        var pages = 0

        fun toMap(candidates: Int): Map<String, Int> = mapOf(
            "feed" to feed,
            "sitemap" to sitemap,
            "listing" to listing,
            "pages" to pages,
            "candidates" to candidates,
        )
    }

    fun discover(source: Source, jobType: String, jobId: String? = null): Outcome =
        when (val lock = runLock.acquireOrNull(source.key, Duration.ofSeconds(DISCOVERY_LOCK_SECONDS))) {
            DiscoveryRunLock.LockResult.Busy ->
                throw JobInvalidState("Discovery is already running for source '${source.key}'.")
            is DiscoveryRunLock.LockResult.Acquired -> try {
                run(source, jobType, jobId)
            } finally {
                runLock.release(source.key, lock.token)
            }
            DiscoveryRunLock.LockResult.Unavailable -> run(source, jobType, jobId)
        }

    private fun run(source: Source, jobType: String, jobId: String?): Outcome =
        try {
            discoverInternal(source, jobType, jobId).also { outcome ->
                metrics.discoveryItems(source.key, outcome.path, outcome.links.size)
                metrics.discoveryRun(source.key, if (outcome.errors.isEmpty()) "success" else "failure")
                outcome.errors.forEach { metrics.discoveryFailure(source.key, it.code) }
                log.info(
                    "discovery_run source={} jobType={} path={} candidates={} pages={} feed={} sitemap={} listing={} errors={}",
                    source.key,
                    jobType,
                    outcome.path,
                    outcome.links.size,
                    outcome.counters["pages"] ?: 0,
                    outcome.counters["feed"] ?: 0,
                    outcome.counters["sitemap"] ?: 0,
                    outcome.counters["listing"] ?: 0,
                    outcome.errors.size,
                )
            }
        } catch (error: Exception) {
            metrics.discoveryRun(source.key, "failure")
            throw error
        }

    private fun discoverInternal(source: Source, jobType: String, jobId: String?): Outcome {
        val registered = sourceRegistry.resolve(source)
        val config = registered.config
        val backfill = jobType == "backfill"
        val errors = mutableListOf<DiscoveryError>()
        val denied = mutableListOf<String>()
        val counters = RunCounters()
        val allowedHosts = CandidateNormalizer.allowedHosts(
            config.feedUrl,
            config.sitemapUrl,
            config.listingUrl,
            source.discoveryUrl,
            source.listingUrl,
        )
        val limit = if (backfill) properties.maxLinksBackfill else properties.maxLinksIncremental

        val feedRaw = config.feedUrl?.let {
            tryFeed(it, errors, denied, jobId, counters)
        } ?: emptyList()
        val feedLinks = normalizeAndCap(
            feedRaw,
            config.feedUrl ?: source.discoveryUrl,
            config,
            allowedHosts,
            limit,
        )
        counters.feed = feedLinks.size
        if (feedLinks.isNotEmpty() && !backfill) {
            return outcome("feed", feedLinks, errors, denied, counters)
        }

        var sitemapCandidates = emptyList<String>()
        val sitemapUrl = config.sitemapUrl
            ?: if (backfill && config.feedUrl != null) derivedSitemap(config.feedUrl) else null
        if (sitemapUrl != null) {
            val raw = readSitemapLinks(
                sitemapUrl,
                config,
                errors,
                denied,
                counters,
                jobId,
                recordErrors = config.sitemapUrl != null &&
                    (config.feedUrl == null || config.listingUrl != null),
            )
            sitemapCandidates = normalizeAndCap(raw, sitemapUrl, config, allowedHosts, limit)
            counters.sitemap = sitemapCandidates.size
        }
        if (!backfill && sitemapCandidates.isNotEmpty()) {
            return outcome("sitemap", sitemapCandidates, errors, denied, counters)
        }

        var listingCandidates = emptyList<String>()
        if (config.listingUrl != null && (backfill || (feedLinks.isEmpty() && sitemapCandidates.isEmpty()))) {
            val raw = readListingLinks(
                config,
                allowedHosts,
                errors,
                denied,
                counters,
                jobId,
            )
            listingCandidates = raw.take(limit)
            counters.listing = listingCandidates.size
        }

        val combined = (feedLinks + sitemapCandidates + listingCandidates).distinct().take(limit)
        if (combined.isEmpty() && errors.isEmpty()) {
            errors += DiscoveryError(
                "DISC-LISTING-SELECTOR-BROKEN",
                "Discovery returned 0 candidates for ${source.key}; no path produced links.",
            )
        }
        val path = when {
            feedLinks.isNotEmpty() -> "feed"
            sitemapCandidates.isNotEmpty() -> "sitemap"
            listingCandidates.isNotEmpty() -> "listing"
            else -> source.discoveryType
        }
        return outcome(path, combined, errors, denied, counters)
    }

    private fun outcome(
        path: String,
        links: List<String>,
        errors: List<DiscoveryError>,
        denied: List<String>,
        counters: RunCounters,
    ): Outcome = Outcome(path, links, errors, denied, counters.toMap(links.size))

    /** `https://host/sitemap.xml` for a feed source: the feed URL origin is the only hint. */
    private fun derivedSitemap(feedUrl: String): String? {
        val uri = runCatching { URI(feedUrl) }.getOrNull() ?: return null
        val scheme = uri.scheme ?: return null
        val authority = uri.authority ?: return null
        return "$scheme://$authority/sitemap.xml".takeIf { it != feedUrl }
    }

    // -----------------------------------------------------------------------
    // Feed
    // -----------------------------------------------------------------------

    private fun tryFeed(
        feedUrl: String,
        errors: MutableList<DiscoveryError>,
        denied: MutableList<String>,
        jobId: String?,
        counters: RunCounters,
    ): List<String> {
        var last: FetchResult? = null
        repeat(DISCOVERY_ATTEMPTS) {
            val result = fetch(
                feedUrl,
                UserAgent.ACCEPT_DISCOVERY,
                denied,
                jobId,
                counters,
            ) ?: return@repeat
            last = result
            if (result.outcome.wire == "robots_denied") return emptyList()
            if (result.ok) {
                val body = result.body?.toString(Charsets.UTF_8) ?: return@repeat
                val links = FeedDiscoverer.discover(body, feedUrl)
                if (links.isNotEmpty()) return links
            }
        }
        val result = last
        if (result == null) {
            errors += DiscoveryError(
                "DISC-FEED-PARSE-FAILED",
                "Feed $feedUrl could not be fetched after $DISCOVERY_ATTEMPTS attempts.",
            )
            return emptyList()
        }
        val detail = if (result.ok) {
            "contained no usable links after $DISCOVERY_ATTEMPTS attempts."
        } else {
            "answered ${result.statusCode ?: "no status"} after $DISCOVERY_ATTEMPTS attempts: " +
                (result.failureReason ?: "unknown error")
        }
        errors += DiscoveryError("DISC-FEED-PARSE-FAILED", "Feed $feedUrl $detail")
        return emptyList()
    }

    // -----------------------------------------------------------------------
    // Sitemap (sitemap index -> children -> urlset)
    // -----------------------------------------------------------------------

    private fun readSitemapLinks(
        rootUrl: String,
        config: SourceDiscoveryConfig,
        errors: MutableList<DiscoveryError>,
        denied: MutableList<String>,
        counters: RunCounters,
        jobId: String?,
        recordErrors: Boolean = true,
    ): List<String> {
        val root = fetch(rootUrl, "application/xml, text/xml;q=0.9", denied, jobId, counters)
            ?: return emptyList()
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
        val document = SitemapDiscoverer.parse(xml, rootUrl)
        val links = if (!document.isIndex) {
            document.locations
        } else {
            document.locations.asSequence()
                .filter(::isFetchable)
                .take(config.sitemapChildCap)
                .flatMap { child ->
                    val result = fetch(child, "application/xml, text/xml;q=0.9", denied, jobId, counters)
                    if (result?.ok != true) {
                        emptySequence()
                    } else {
                        SitemapDiscoverer.urlSet(
                            result.body?.toString(Charsets.UTF_8).orEmpty(),
                            child,
                        ).asSequence()
                    }
                }
                .toList()
        }
        // Sitemaps also list listing pages; keep article-looking URLs, then fall back to any
        // non-index URL so a site with opaque slugs still produces candidates.
        return links.filter(::isFetchable)
            .filter { Discovery.isArticleLike(it) }
            .ifEmpty { links.filter { isFetchable(it) && !looksLikeIndex(it) } }
            .distinct()
    }

    // -----------------------------------------------------------------------
    // Listing pagination
    // -----------------------------------------------------------------------

    private fun readListingLinks(
        config: SourceDiscoveryConfig,
        allowedHosts: Set<String>,
        errors: MutableList<DiscoveryError>,
        denied: MutableList<String>,
        counters: RunCounters,
        jobId: String?,
    ): List<String> {
        val start = config.listingUrl ?: return emptyList()
        val selectors = config.listingSelectors ?: return emptyList()
        val hint = config.articlePathHint
        val seen = linkedSetOf<String>()
        var emptyRuns = 0
        var page = 0
        var current: String? = start
        var previous: String? = null

        while (current != null && page < config.maxPagesPerRun) {
            if (current == previous) break
            val url = current
            val result = fetch(url, "text/html", denied, jobId, counters) ?: break
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
            val parsed = try {
                ListingDiscoverer.parse(html, url, selectors, config.includePathPatterns, hint)
            } catch (error: Exception) {
                errors += DiscoveryError(
                    "DISC-LISTING-SELECTOR-BROKEN",
                    "Listing $url has an invalid CSS selector: ${error.message}",
                    page,
                )
                break
            }
            val found = CandidateNormalizer.normalizeAll(
                parsed.links,
                url,
                allowedHosts,
                config.trackingParams,
                config.includePathPatterns,
            )
            val fresh = found.filter { seen.add(it) }
            if (fresh.isEmpty()) {
                emptyRuns += 1
                if (emptyRuns >= 2) {
                    errors += DiscoveryError(
                        "DISC-LISTING-SELECTOR-BROKEN",
                        "Listing pagination returned 0 new links on two consecutive pages " +
                            "(stopped after page ${page + 1}); update discovery_config.listingSelectors.",
                        page,
                    )
                    break
                }
            } else {
                emptyRuns = 0
            }
            page += 1
            previous = url
            current = when {
                parsed.nextPageUrl != null -> parsed.nextPageUrl
                selectors.nextPage != null -> null
                else -> pageUrl(start, page)
            }
        }
        return seen.toList()
    }

    private fun pageUrl(start: String, page: Int): String {
        if (page == 0) return start
        val separator = if (start.contains('?')) '&' else '?'
        return "$start${separator}page=$page"
    }

    private fun looksLikeIndex(url: String): Boolean {
        val path = runCatching { URI(url).path.orEmpty() }.getOrDefault("").lowercase()
        return path.endsWith("/blog") || path.endsWith("/blog/") || path.endsWith("/engineering") ||
            path.endsWith("/engineering/")
    }

    private fun isFetchable(url: String): Boolean =
        runCatching { URI(url).scheme?.lowercase() in setOf("http", "https") }.getOrDefault(false)

    // -----------------------------------------------------------------------
    // Shared
    // -----------------------------------------------------------------------

    private fun normalizeAndCap(
        rawLinks: List<String>,
        baseUrl: String,
        config: SourceDiscoveryConfig,
        allowedHosts: Set<String>,
        limit: Int,
    ): List<String> = CandidateNormalizer.normalizeAll(
        rawLinks,
        baseUrl,
        allowedHosts,
        config.trackingParams,
        config.includePathPatterns,
    ).take(limit)

    private fun fetch(
        url: String,
        accept: String,
        denied: MutableList<String>,
        jobId: String?,
        counters: RunCounters? = null,
    ): FetchResult? {
        val host = Urls.host(url)
        if (host.isBlank()) return null
        counters?.let { it.pages += 1 }
        val decision = try {
            robots.check(url, userAgent())
        } catch (paused: HostPaused) {
            // The article stage paused this host (20 consecutive failures). Discovery must not
            // turn that into a job failure; the next run re-probes the source.
            log.warn("discovery_host_paused url={} until={}", url, paused.pausedUntil)
            return null
        } catch (busy: HostGateBusy) {
            log.warn("discovery_host_busy url={} reason={}", url, busy.message)
            return null
        }
        if (!decision.allowed) {
            denied += url
            log.info("discovery_robots_denied url={} reason={}", url, decision.reason)
            val deniedResult = FetchResult.failed(
                FetchOutcome.ROBOTS_DENIED,
                null,
                "DISC-ROBOTS-DENIED",
                decision.reason ?: "robots.txt disallows the URL.",
                0,
            )
            recordFetch(jobId, host, url, deniedResult)
            return deniedResult
        }
        val started = System.nanoTime()
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
            }.also { result -> recordFetch(jobId, host, url, result) }
        } catch (error: Exception) {
            log.warn("discovery_fetch_failed url={} reason={}", url, error.message)
            recordFetch(
                jobId,
                host,
                url,
                FetchResult.failed(
                    FetchOutcome.NETWORK_ERROR,
                    null,
                    "FETCH-TIMEOUT",
                    "Connection failed: ${error.message ?: error.javaClass.simpleName}",
                    ((System.nanoTime() - started) / 1_000_000).toInt(),
                ),
            )
            null
        }
    }

    private fun recordFetch(jobId: String?, host: String, url: String, result: FetchResult) {
        runCatching {
            fetchLog.record(
                FetchLogEntry(
                    articleId = null,
                    jobId = jobId,
                    host = host,
                    url = url,
                    method = "GET",
                    statusCode = result.statusCode,
                    outcome = result.outcome.wire,
                    durationMs = result.durationMs,
                    bytes = result.bytes,
                    attempt = 1,
                ),
            )
        }.onFailure { log.warn("discovery_fetch_log_failed url={} reason={}", url, it.message) }
    }

    private fun sourceDelay(host: String): Long =
        if (com.techblog.crawler.domain.OutcomeMapper.isMediumFamily(host)) {
            properties.mediumDelayMs
        } else {
            properties.defaultDelayMs
        }

    private fun userAgent(): String = UserAgent.header(properties.contact)

    private companion object {
        const val DISCOVERY_ATTEMPTS = 2
        const val DISCOVERY_LOCK_SECONDS = 600L
    }
}
