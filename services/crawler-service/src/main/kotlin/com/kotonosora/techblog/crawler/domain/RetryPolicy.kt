package com.kotonosora.techblog.crawler.domain

import java.time.Duration
import java.time.Instant

/**
 * Retry policy (BR-04): 4xx terminal except 408/429; 5xx/429 use 5 attempts at
 * 30 s, 2 m, 10 m, 1 h, 6 h; Retry-After honored up to 24 h.
 */
object RetryPolicy {
    fun isTerminal(status: Int): Boolean = status in 400..499 && status != 408 && status != 429

    fun nextAttempt(
        attemptCount: Int,
        backoffSeconds: List<Long>,
        retryAfterSeconds: Long? = null,
    ): Instant? {
        if (attemptCount >= backoffSeconds.size) return null
        val delay = retryAfterSeconds?.coerceAtMost(MAX_RETRY_AFTER_SECONDS)
            ?: backoffSeconds[attemptCount]
        return Instant.now().plus(Duration.ofSeconds(delay))
    }

    fun codeForStatus(status: Int): String = when {
        status == 408 -> "FETCH-TIMEOUT"
        status == 429 -> "FETCH-RATE-LIMITED"
        status in 400..499 -> "FETCH-HTTP-TERMINAL"
        status == 403 -> "FETCH-BLOCKED"
        else -> "FETCH-BACKOFF-EXHAUSTED"
    }

    private const val MAX_RETRY_AFTER_SECONDS = 24L * 3600
}
