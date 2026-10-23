package com.techblog.crawler.domain

/**
 * BR-15 / AGENTS.md: Medium-family hosts intermittently answer 403 (or drop the connection, 000)
 * to non-browser agents. Those answers are transient: retry with backoff, never mark the source
 * removed, never record the article as terminal (spec 02 file 01 §1, file 05 §3).
 */
object MediumTransientClassifier {
    private val MEDIUM_HOSTS = listOf(
        "medium.com",
        "netflixtechblog.com",
        "eng.lyft.com",
        "engineering.grab.com",
    )

    fun isMediumFamily(host: String): Boolean {
        val lower = host.lowercase()
        return MEDIUM_HOSTS.any { lower == it || lower.endsWith(".$it") }
    }

    /** 403 from a Medium-family host, or no HTTP response at all (000). */
    fun isTransient(status: Int?, host: String): Boolean {
        if (!isMediumFamily(host)) return false
        return status == null || status == 0 || status == 403
    }

    /** Failure code for a Medium-transient answer, or null when the rule does not apply. */
    fun code(status: Int?, host: String): String? =
        if (isTransient(status, host)) "FETCH-MEDIUM-TRANSIENT" else null
}
