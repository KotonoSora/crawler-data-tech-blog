package com.techblog.crawler.domain

import org.slf4j.LoggerFactory
import java.net.URI

/**
 * Candidate URL normalization rules (spec 01 file 01 §3). This is the single place where
 * discovery output becomes article identity: fragments and tracking parameters are gone before
 * dedupe or persistence.
 */
object CandidateNormalizer {
    private val log = LoggerFactory.getLogger(javaClass)

    fun normalize(
        raw: String,
        baseUrl: String,
        allowedHosts: Set<String>,
        trackingParams: Collection<String>,
    ): String? {
        val resolved = Discovery.resolve(baseUrl, raw.trim())
        if (resolved.isBlank()) return null
        val parsed = runCatching { URI(resolved) }.getOrNull() ?: return skip(raw, "invalid")
        val scheme = parsed.scheme?.lowercase() ?: return skip(raw, "missing-scheme")
        val host = parsed.host?.lowercase() ?: return skip(raw, "missing-host")
        if (scheme != "http" && scheme != "https") return skip(raw, "non-fetch-scheme")

        val upgraded = if (scheme == "http") {
            if (host !in allowedHosts) return skip(raw, "http-host-not-allowlisted")
            "https${resolved.substring(4)}"
        } else {
            resolved
        }
        val canonical = Urls.canonical(upgraded, trackingParams)
        val canonicalUri = runCatching { URI(canonical) }.getOrNull() ?: return skip(raw, "invalid-canonical")
        if (canonicalUri.scheme?.equals("https", ignoreCase = true) != true || canonicalUri.host.isNullOrBlank()) {
            return skip(raw, "not-https")
        }
        return canonical
    }

    fun normalizeAll(
        rawLinks: Collection<String>,
        baseUrl: String,
        allowedHosts: Set<String>,
        trackingParams: Collection<String>,
        includePathPatterns: List<String> = emptyList(),
    ): List<String> = rawLinks.asSequence()
        .mapNotNull { normalize(it, baseUrl, allowedHosts, trackingParams) }
        .filter { matchesInclude(it, includePathPatterns) }
        .distinct()
        .toList()

    fun allowedHosts(vararg urls: String?): Set<String> =
        urls.filterNotNull().mapNotNull { url ->
            runCatching { URI(url).host?.lowercase() }.getOrNull()?.takeIf { it.isNotBlank() }
        }.toSet()

    private fun matchesInclude(url: String, patterns: List<String>): Boolean {
        if (patterns.isEmpty()) return true
        val path = runCatching { URI(url).path.orEmpty() }.getOrDefault("")
        return patterns.any { path.startsWith(it) }
    }

    private fun skip(raw: String, reason: String): String? {
        log.info("discovery_candidate_skipped reason={} url={}", reason, raw)
        return null
    }
}
