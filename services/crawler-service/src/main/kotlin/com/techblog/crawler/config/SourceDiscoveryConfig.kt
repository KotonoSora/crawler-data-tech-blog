package com.techblog.crawler.config

import com.fasterxml.jackson.annotation.JsonIgnoreProperties
import com.techblog.crawler.domain.InvalidRequest
import com.techblog.crawler.domain.Source
import com.techblog.crawler.domain.Urls
import java.net.URI

/**
 * Per-source discovery data (spec 01 file 01 §5). The JSONB column is the source of truth;
 * the three URL columns remain as a compatibility fallback for rows seeded before this model.
 */
@JsonIgnoreProperties(ignoreUnknown = true)
data class SourceDiscoveryConfig(
    val feedUrl: String? = null,
    val sitemapUrl: String? = null,
    val listingUrl: String? = null,
    val listingSelectors: ListingSelectors? = null,
    val includePathPatterns: List<String> = emptyList(),
    val trackingParams: List<String> = Urls.DEFAULT_TRACKING_PARAMS,
    val maxPagesPerRun: Int = MAX_PAGES_DEFAULT,
    val sitemapChildCap: Int = SITEMAP_CHILD_CAP_DEFAULT,
    /** Legacy field kept so existing rows continue to select listing links. */
    val articlePathHint: String? = null,
) {
    fun validate(sourceKey: String? = null) {
        val configured = listOfNotNull(
            feedUrl?.takeIf { it.isNotBlank() },
            sitemapUrl?.takeIf { it.isNotBlank() },
            listingUrl?.takeIf { it.isNotBlank() },
        )
        if (configured.isEmpty()) {
            throw InvalidRequest("Discovery config for '${sourceKey ?: "source"}' must set at least one of feedUrl, sitemapUrl, listingUrl.")
        }
        configured.forEach { requireHttps(it, sourceKey) }

        if (listingUrl != null) {
            val itemLink = listingSelectors?.itemLink
            if (itemLink.isNullOrBlank()) {
                throw InvalidRequest("listingSelectors.itemLink is required when listingUrl is set.")
            }
            if (listingSelectors?.nextPage?.isBlank() == true) {
                throw InvalidRequest("listingSelectors.nextPage must not be blank when supplied.")
            }
        }
        includePathPatterns.forEach { pattern ->
            if (!pattern.startsWith('/')) {
                throw InvalidRequest("includePathPatterns entries must start with '/': '$pattern'.")
            }
        }
        if (maxPagesPerRun !in 1..MAX_PAGES_DEFAULT) {
            throw InvalidRequest("maxPagesPerRun must be between 1 and $MAX_PAGES_DEFAULT.")
        }
        if (sitemapChildCap !in 1..SITEMAP_CHILD_CAP_DEFAULT) {
            throw InvalidRequest("sitemapChildCap must be between 1 and $SITEMAP_CHILD_CAP_DEFAULT.")
        }
        trackingParams.forEach { token ->
            if (token.isBlank() || token != token.lowercase() || !TOKEN.matches(token)) {
                throw InvalidRequest("trackingParams must be lowercase tokens: '$token'.")
            }
        }
    }

    private fun requireHttps(raw: String, sourceKey: String?) {
        val uri = runCatching { URI(raw) }.getOrNull()
        val scheme = uri?.scheme
        if (uri == null || scheme?.equals("https", ignoreCase = true) != true || uri.host.isNullOrBlank()) {
            throw InvalidRequest("Discovery URL for '${sourceKey ?: "source"}' must be an absolute https URL: '$raw'.")
        }
    }

    companion object {
        const val MAX_PAGES_DEFAULT = 500
        const val SITEMAP_CHILD_CAP_DEFAULT = 100
        private val TOKEN = Regex("^[a-z0-9._~-]+$")
    }
}

/**
 * CSS selectors are data: a broken selector is fixed with an UPDATE and a re-run, never a
 * deploy. `itemLink` deliberately has a generic default so old rows with an empty config
 * still produce candidates.
 */
@JsonIgnoreProperties(ignoreUnknown = true)
data class ListingSelectors(
    val itemLink: String = "a[href]",
    val nextPage: String? = null,
)

data class RegisteredSource(
    val source: Source,
    val config: SourceDiscoveryConfig,
)

internal fun String?.blankToNull(): String? = this?.trim()?.takeIf { it.isNotEmpty() }
