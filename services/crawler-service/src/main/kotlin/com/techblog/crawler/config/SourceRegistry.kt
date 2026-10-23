package com.techblog.crawler.config

import com.techblog.crawler.domain.InvalidRequest
import com.techblog.crawler.domain.Source
import com.techblog.crawler.domain.SourceNotFound
import com.techblog.crawler.domain.SourceRepository
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Component
import tools.jackson.databind.json.JsonMapper

/**
 * Resolves a registry row into the effective discovery configuration.
 *
 * The JSONB document is preferred. Empty or partial documents fall back to the three legacy
 * URL columns so a database upgrade does not require a data rewrite before the first crawl.
 */
@Component
class SourceRegistry(
    private val sources: SourceRepository,
    private val jsonMapper: JsonMapper,
) {
    private val log = LoggerFactory.getLogger(javaClass)

    fun resolve(key: String): RegisteredSource =
        sources.findByKey(key)?.let { resolve(it) } ?: throw SourceNotFound(key)

    fun resolve(source: Source): RegisteredSource {
        val parsed = parse(source)
        val config = merge(source, parsed)
        try {
            config.validate(source.key)
        } catch (error: InvalidRequest) {
            log.warn("discovery_config_invalid source={} reason={}", source.key, error.message)
            throw error
        }
        return RegisteredSource(source, config)
    }

    private fun parse(source: Source): SourceDiscoveryConfig {
        val raw = source.discoveryConfig.blankToNull()
        if (raw == null || raw == "{}") return SourceDiscoveryConfig()
        return try {
            jsonMapper.readValue(raw, SourceDiscoveryConfig::class.java)
        } catch (error: Exception) {
            throw InvalidRequest("Discovery config for '${source.key}' is not valid JSON: ${error.message}")
        }
    }

    private fun merge(source: Source, parsed: SourceDiscoveryConfig): SourceDiscoveryConfig {
        val feed = parsed.feedUrl.blankToNull()
            ?: source.discoveryUrl.blankToNull().takeIf { source.discoveryType == "feed" }
        val sitemap = parsed.sitemapUrl.blankToNull()
            ?: source.discoveryUrl.blankToNull().takeIf { source.discoveryType == "sitemap" }
        val listing = parsed.listingUrl.blankToNull()
            ?: source.listingUrl.blankToNull()
            ?: source.discoveryUrl.blankToNull().takeIf { source.discoveryType == "listing" }

        val hint = parsed.articlePathHint.blankToNull()
        val selectors = parsed.listingSelectors ?: if (listing != null) {
            if (hint != null) {
                ListingSelectors(itemLink = "a[href*='${hint.replace("'", "\\'")}']")
            } else {
                ListingSelectors()
            }
        } else {
            null
        }
        val patterns = parsed.includePathPatterns.ifEmpty {
            listOfNotNull(hint?.takeIf { it.startsWith('/') })
        }
        return parsed.copy(
            feedUrl = feed,
            sitemapUrl = sitemap,
            listingUrl = listing,
            listingSelectors = selectors,
            includePathPatterns = patterns,
        )
    }
}
