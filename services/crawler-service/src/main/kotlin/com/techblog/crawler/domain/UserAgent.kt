package com.techblog.crawler.domain

/**
 * Single crawler identity (spec 02 file 01 §3, file 05 §4).
 *
 * One token is used for every request (discovery, robots.txt, article, asset) and for the
 * robots.txt group match, so a host sees one stable agent. The contact comes from
 * `CRAWLER_CONTACT`; it is never baked into the image.
 */
object UserAgent {
    const val TOKEN = "techblog-archive-crawler/0.1"

    /** `techblog-archive-crawler/0.1 (+contact)`; bare token when no contact is configured. */
    fun header(contact: String): String {
        val trimmed = contact.trim()
        return if (trimmed.isEmpty()) TOKEN else "$TOKEN (+$trimmed)"
    }

    /** Robots.txt product token: `techblog-archive-crawler` (RFC 9309 §2.2.1). */
    fun robotToken(): String = TOKEN.substringBefore('/')

    /** Article Accept header (spec 02 file 01 §3). */
    const val ACCEPT_ARTICLE = "text/html,application/xhtml+xml;q=0.9,*/*;q=0.5"

    /** Discovery Accept header: feeds first, then XML, then HTML (spec 02 file 01 §3). */
    const val ACCEPT_DISCOVERY = "application/rss+xml,application/atom+xml,application/xml;q=0.9,text/html;q=0.8"

    /** robots.txt Accept header. */
    const val ACCEPT_ROBOTS = "text/plain"
}
