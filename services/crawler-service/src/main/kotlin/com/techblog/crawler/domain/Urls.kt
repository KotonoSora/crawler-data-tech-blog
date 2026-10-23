package com.techblog.crawler.domain

/**
 * URL identity rules (BR-06, AGENTS.md crawl rules): fragments and tracking parameters are
 * stripped before a URL is used as identity; a re-crawl never rewrites a file under a new slug.
 */
object Urls {
    /**
     * Default tracking names (spec 01 file 01 §5). The legacy extras (`ref`, `gclid`, ...) are
     * intentionally retained: identity must not fork on ad/analytics parameters.
     */
    val DEFAULT_TRACKING_PARAMS: List<String> = listOf(
        "source",
        "utm_source",
        "utm_medium",
        "utm_campaign",
        "utm_term",
        "utm_content",
        "ref",
        "fbclid",
        "gclid",
        "mc_cid",
        "mc_eid",
    )

    private val TRACKING: Set<String> = DEFAULT_TRACKING_PARAMS.toSet()

    fun canonical(raw: String, trackingParams: Collection<String> = TRACKING): String {
        val parsed = runCatching { java.net.URI(raw) }.getOrNull() ?: return raw.trim()
        if (parsed.scheme == null || parsed.host == null) return raw.trim()
        val tracking = trackingParams.map { it.lowercase() }.toSet()
        val query = parsed.rawQuery
            ?.split('&')
            ?.filter { it.isNotBlank() }
            ?.filter { part ->
                val name = part.substringBefore('=').lowercase()
                name !in tracking && !name.startsWith("utm_")
            }
            ?.joinToString("&")
            ?.takeIf { it.isNotEmpty() }
        val path = parsed.rawPath?.takeIf { it.isNotEmpty() } ?: "/"
        return buildString {
            append(parsed.scheme.lowercase())
            append("://")
            append(parsed.host.lowercase())
            if (parsed.port != -1 && !isDefaultPort(parsed.scheme, parsed.port)) {
                append(':').append(parsed.port)
            }
            append(path)
            if (query != null) append('?').append(query)
        }
    }

    fun host(raw: String): String =
        runCatching { java.net.URI(raw).host?.lowercase() }.getOrNull() ?: ""

    fun slug(raw: String, title: String?): String {
        val path = runCatching { java.net.URI(raw).path }.getOrNull().orEmpty()
        val fromPath = path.trimEnd('/').substringAfterLast('/').substringBefore('.')
        val candidate = (fromPath.ifBlank { title.orEmpty() })
            .lowercase()
            .replace(Regex("[^a-z0-9]+"), "-")
            .trim('-')
            .take(80)
            .trim('-')
        return candidate.ifBlank { "article" }
    }

    private fun isDefaultPort(scheme: String, port: Int): Boolean =
        (scheme.equals("http", true) && port == 80) || (scheme.equals("https", true) && port == 443)
}
