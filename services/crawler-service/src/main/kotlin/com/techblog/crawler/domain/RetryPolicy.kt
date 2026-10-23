package com.techblog.crawler.domain

import java.time.Duration
import java.time.Instant

/**
 * Retry policy (BR-04, spec 02 file 01 §1, file 05 §1): 4xx terminal except 408/429; 5xx/429/
 * timeout/network use the frozen schedule 30 s, 2 m, 10 m, 1 h, 6 h; `Retry-After` is honored
 * up to 24 h and replaces the default wait when it is longer than the schedule.
 *
 * [attemptCount] is the 1-based number of the attempt that just failed, matching
 * `fetch_log.attempt`. AC of BE-02-04: the 5th failure sets `FETCH-BACKOFF-EXHAUSTED`
 * ("no attempt beyond 5"), so the 5th failure never schedules another wait.
 */
object RetryPolicy {
    const val MAX_RETRY_AFTER_SECONDS = 24L * 3600

    fun isTerminal(status: Int): Boolean = status in 400..499 && status != 408 && status != 429

    /**
     * Next ready time, or null when the attempt cap is reached.
     *
     * @param retryAfterSeconds origin `Retry-After` in seconds (clamped to 24 h); it extends the
     *        standard wait but never shortens it below the frozen schedule
     */
    fun nextAttempt(
        attemptCount: Int,
        backoffSeconds: List<Long>,
        retryAfterSeconds: Long? = null,
        now: Instant = Instant.now(),
    ): Instant? {
        if (attemptCount < 1 || attemptCount >= backoffSeconds.size) return null
        val scheduled = backoffSeconds[attemptCount - 1]
        val delay = retryAfterSeconds
            ?.coerceIn(0L, MAX_RETRY_AFTER_SECONDS)
            ?.let { maxOf(it, scheduled) }
            ?: scheduled
        return now.plus(Duration.ofSeconds(delay))
    }

    /** True when no further attempt may be scheduled for this article. */
    fun exhausted(attemptCount: Int, backoffSeconds: List<Long>): Boolean =
        attemptCount < 1 || attemptCount >= backoffSeconds.size

    fun codeForStatus(status: Int): String = when {
        status == 408 -> "FETCH-TIMEOUT"
        status == 429 -> "FETCH-RATE-LIMITED"
        status == 403 -> "FETCH-BLOCKED"
        status in 400..499 -> "FETCH-HTTP-TERMINAL"
        else -> "FETCH-BACKOFF-EXHAUSTED"
    }
}
