package com.techblog.crawler.domain

import com.techblog.crawler.config.ListingSelectors
import org.jsoup.Jsoup
import org.jsoup.nodes.Element

/**
 * HTML listing parser (spec 01 file 01 §1). The CSS selectors come from
 * `source.discovery_config`; the generic `a[href]` fallback keeps legacy rows usable.
 */
object ListingDiscoverer {
    data class Page(
        val links: List<String>,
        val nextPageUrl: String?,
    )

    fun parse(
        html: String,
        baseUrl: String,
        selectors: ListingSelectors,
        includePathPatterns: List<String> = emptyList(),
        articlePathHint: String? = null,
    ): Page {
        val doc = Jsoup.parse(html, baseUrl)
        val hint = articlePathHint?.trim()?.takeIf { it.isNotEmpty() }
        val configuredSelector = selectors.itemLink.trim()
        val itemSelector = when {
            configuredSelector.isEmpty() -> "a[href]"
            configuredSelector == "a[href]" && hint != null ->
                "a[href*='${hint.replace("'", "\\'")}']"
            else -> configuredSelector
        }
        val anchors = doc.select(itemSelector)
        val links = anchors.mapNotNull { anchor ->
            linkHref(anchor, baseUrl)
        }
            .filter { Urls.host(it) == Urls.host(baseUrl) }
            .filter { matchesIncludes(it, includePathPatterns) }
            .filter { hint == null || pathOf(it).contains(hint) }
            .filter { explicitItemSelector(configuredSelector, hint) || Discovery.isArticleLike(it) }
            .distinct()

        val nextSelector = selectors.nextPage?.trim()?.takeIf { it.isNotEmpty() }
        val nextPage = nextSelector?.let { selector ->
            doc.selectFirst(selector)?.let { element -> linkHref(element, baseUrl) }
        }
        return Page(links = links, nextPageUrl = nextPage)
    }

    private fun explicitItemSelector(selector: String, hint: String?): Boolean =
        selector.isNotEmpty() && selector != "a[href]" && hint == null

    private fun linkHref(element: Element, baseUrl: String): String? {
        val absolute = element.absUrl("href").trim()
        val href = if (absolute.isNotEmpty()) absolute else element.attr("href").trim()
        if (href.isEmpty()) return null
        return Discovery.resolve(baseUrl, href)
    }

    private fun matchesIncludes(url: String, patterns: List<String>): Boolean {
        if (patterns.isEmpty()) return true
        val path = pathOf(url)
        return patterns.any { path.startsWith(it) }
    }

    private fun pathOf(url: String): String =
        runCatching { java.net.URI(url).path.orEmpty() }.getOrDefault("")
}
