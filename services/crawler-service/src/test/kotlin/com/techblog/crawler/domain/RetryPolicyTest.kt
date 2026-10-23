package com.techblog.crawler.domain

import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertFalse
import org.junit.jupiter.api.Assertions.assertNull
import org.junit.jupiter.api.Assertions.assertTrue
import org.junit.jupiter.api.Test
import java.time.Instant

class RetryPolicyTest {

    private val schedule = listOf(30L, 120L, 600L, 3_600L, 21_600L)
    private val now = Instant.parse("2026-10-22T00:00:00Z")

    @Test
    fun `waits follow the frozen schedule`() {
        val expected = listOf(30L, 120L, 600L, 3_600L)
        expected.forEachIndexed { index, seconds ->
            val next = RetryPolicy.nextAttempt(index + 1, schedule, now = now)
            assertEquals(now.plusSeconds(seconds), next)
        }
    }

    @Test
    fun `the fifth failure is exhausted and never schedules attempt six`() {
        assertNull(RetryPolicy.nextAttempt(5, schedule, now = now))
        assertTrue(RetryPolicy.exhausted(5, schedule))
        assertFalse(RetryPolicy.exhausted(4, schedule))
    }

    @Test
    fun `retry after longer than the schedule wins`() {
        val next = RetryPolicy.nextAttempt(1, schedule, retryAfterSeconds = 7_200, now = now)

        assertEquals(now.plusSeconds(7_200), next)
    }

    @Test
    fun `retry after never shortens the schedule`() {
        val next = RetryPolicy.nextAttempt(3, schedule, retryAfterSeconds = 5, now = now)

        assertEquals(now.plusSeconds(600), next)
    }

    @Test
    fun `retry after is capped at 24 hours`() {
        val next = RetryPolicy.nextAttempt(1, schedule, retryAfterSeconds = 100_000, now = now)

        assertEquals(now.plusSeconds(86_400), next)
    }

    @Test
    fun `terminal status matrix`() {
        listOf(400, 404, 410, 451).forEach { status ->
            assertTrue(RetryPolicy.isTerminal(status), "expected $status to be terminal")
        }
        listOf(408, 429, 500, 503).forEach { status ->
            assertFalse(RetryPolicy.isTerminal(status), "expected $status to be retryable")
        }
    }
}
