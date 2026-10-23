package com.techblog.crawler.domain

import java.time.Duration
import java.time.Instant

/**
 * Fetch-stage transport and audit ports (spec 02 file 01 §4, file 03 §4, file 05 §1-§2).
 *
 * The durable article row stays in `crawler_db`; Redis only carries work in flight:
 * `tb:q:{host}` (ready), `tb:q:{host}:processing` (claimed, unacknowledged) and `tb:retry`
 * (zset, member = articleId, score = ready epoch ms).
 */
data class FetchMessage(
    val articleId: String,
    val sourceKey: String,
    val host: String,
    val url: String,
    val jobId: String?,
    val attempt: Int,
    val enqueuedAt: Instant,
) {
    init {
        require(articleId.isNotBlank()) { "articleId is required" }
        require(host.isNotBlank()) { "host is required" }
        require(url.startsWith("https://")) { "only https URLs are queued" }
        require(attempt >= 1) { "attempt starts at 1" }
        // File 03 §4 validation: host must equal the host part of the URL.
        require(host.equals(Urls.host(url), ignoreCase = true)) { "host must match the URL host" }
    }
}

/** A claimed queue message plus the exact payload moved to the processing list. */
data class FetchClaim(val message: FetchMessage, val payload: String)

interface FetchQueue {
    /** RPUSH `tb:q:{host}` <json> (file 03 §4); false when the broker is unavailable. */
    fun enqueue(message: FetchMessage): Boolean

    /**
     * Moves `tb:q:{host}` -> `tb:q:{host}:processing` (file 03 §4). The message stays in the
     * processing list until [acknowledge] runs after the fetch_log commit.
     */
    fun claim(host: String, timeout: Duration): FetchClaim?

    /** LREM `tb:q:{host}:processing` 1 <payload> after the fetch_log commit (file 03 §4). */
    fun acknowledge(host: String, claim: FetchClaim)

    /** Head of `tb:q:{host}` without removing it; null when empty. */
    fun peek(host: String): FetchMessage?

    /** Pending messages in `tb:q:{host}`. */
    fun pending(host: String): Long

    /** Members of `tb:hosts` (spec 04 §4); empty when Redis is unavailable. */
    fun hosts(): Set<String>

    /**
     * Moves every unacknowledged member of `tb:q:{host}:processing` back to the ready list and
     * re-adds the host to `tb:hosts`. Used by the boot reclaim and by the stale-claim reaper;
     * the DB claim keeps a duplicate message a no-op (spec 04 §4/§6).
     * @return number of messages moved.
     */
    fun requeueProcessing(host: String): Int

    /** Redis reachability; false means "run without the queue" (single-node fallback). */
    fun available(): Boolean
}

data class RetryEntry(val articleId: String, val readyAt: Instant, val message: FetchMessage)

interface RetryQueue {
    /** `tb:retry` zset add: member = articleId, score = ready epoch ms (file 05 §1). */
    fun schedule(message: FetchMessage, readyAt: Instant)

    /** Members with score <= [now], oldest first. */
    fun due(limit: Int, now: Instant): List<RetryEntry>

    fun remove(articleId: String)

    fun size(): Long
}

/** Article fetch-state columns written in the same transaction as the fetch_log row. */
data class ArticleFetchState(
    val status: String,
    val failureCode: String?,
    val failureReason: String?,
    val attemptCount: Int,
    val nextAttemptAt: Instant?,
)

interface FetchLogWriter {
    /**
     * Writes exactly one `fetch_log` row per HTTP attempt and, when [state] is not null, the
     * article fetch-state columns **in one transaction** (spec 02 file 01 §1, file 05 §7).
     * Returns the updated article row (null when the article was deleted mid-flight).
     */
    fun write(entry: FetchLogEntry, state: ArticleFetchState?): Article?
}
