package com.techblog.crawler.domain

import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertFalse
import org.junit.jupiter.api.Assertions.assertNull
import org.junit.jupiter.api.Assertions.assertTrue
import org.junit.jupiter.api.Test

class OutcomeMapperTest {

    private val host = "blog.example"
    private val mediumHost = "netflixtechblog.com"

    @Test
    fun `2xx and 304 are success outcomes`() {
        val ok = OutcomeMapper.classify(200, host)
        assertEquals(FetchOutcome.OK, ok.outcome)
        assertNull(ok.failureCode)

        val notModified = OutcomeMapper.classify(304, host)
        assertEquals(FetchOutcome.NOT_MODIFIED, notModified.outcome)
        assertNull(notModified.failureCode)
    }

    @Test
    fun `terminal 4xx maps to FETCH-HTTP-TERMINAL`() {
        listOf(400, 404, 410).forEach { status ->
            val classified = OutcomeMapper.classify(status, host)
            assertEquals(FetchOutcome.HTTP_ERROR, classified.outcome, "status $status")
            assertEquals("FETCH-HTTP-TERMINAL", classified.failureCode, "status $status")
        }
    }

    @Test
    fun `403 from a non-medium host is a bot block`() {
        val classified = OutcomeMapper.classify(403, host)

        assertEquals(FetchOutcome.BLOCKED, classified.outcome)
        assertEquals("FETCH-BLOCKED", classified.failureCode)
    }

    @Test
    fun `429 is rate limited and retryable`() {
        val classified = OutcomeMapper.classify(429, host)

        assertEquals(FetchOutcome.HTTP_ERROR, classified.outcome)
        assertEquals("FETCH-RATE-LIMITED", classified.failureCode)
    }

    @Test
    fun `5xx is retried with bounded backoff`() {
        listOf(500, 503).forEach { status ->
            val classified = OutcomeMapper.classify(status, host)
            assertEquals(FetchOutcome.HTTP_ERROR, classified.outcome, "status $status")
            assertEquals("FETCH-BACKOFF-EXHAUSTED", classified.failureCode, "status $status")
        }
    }

    @Test
    fun `medium 403 and 000 are transient`() {
        val blocked = OutcomeMapper.classify(403, mediumHost)
        assertEquals(FetchOutcome.HTTP_ERROR, blocked.outcome)
        assertEquals("FETCH-MEDIUM-TRANSIENT", blocked.failureCode)

        val noResponse = OutcomeMapper.classify(0, mediumHost)
        assertEquals(FetchOutcome.NETWORK_ERROR, noResponse.outcome)
        assertEquals("FETCH-MEDIUM-TRANSIENT", noResponse.failureCode)

        val nullStatus = OutcomeMapper.classify(null, mediumHost)
        assertEquals(FetchOutcome.NETWORK_ERROR, nullStatus.outcome)
        assertEquals("FETCH-MEDIUM-TRANSIENT", nullStatus.failureCode)
    }

    @Test
    fun `transport errors use the timeout or network outcome`() {
        val timeout = OutcomeMapper.classify(null, host, transportError = TransportError.TIMEOUT)
        assertEquals(FetchOutcome.TIMEOUT, timeout.outcome)
        assertEquals("FETCH-TIMEOUT", timeout.failureCode)

        val network = OutcomeMapper.classify(null, host, transportError = TransportError.NETWORK)
        assertEquals(FetchOutcome.NETWORK_ERROR, network.outcome)
        assertEquals("FETCH-TIMEOUT", network.failureCode)

        val mediumNetwork = OutcomeMapper.classify(null, mediumHost, transportError = TransportError.NETWORK)
        assertEquals(FetchOutcome.NETWORK_ERROR, mediumNetwork.outcome)
        assertEquals("FETCH-MEDIUM-TRANSIENT", mediumNetwork.failureCode)
    }

    @Test
    fun `oversize body is terminal`() {
        val classified = OutcomeMapper.classify(200, host, tooLarge = true)

        assertEquals(FetchOutcome.TOO_LARGE, classified.outcome)
        assertEquals("FETCH-TOO-LARGE", classified.failureCode)
    }

    @Test
    fun `outcome enum is frozen at nine wire values`() {
        assertEquals(
            listOf(
                "ok",
                "not_modified",
                "robots_denied",
                "http_error",
                "timeout",
                "network_error",
                "parse_error",
                "too_large",
                "blocked",
            ),
            FetchOutcome.entries.map { it.wire },
        )
    }

    @Test
    fun `medium family matches subdomains only`() {
        assertTrue(OutcomeMapper.isMediumFamily("medium.com"))
        assertTrue(OutcomeMapper.isMediumFamily("netflixtechblog.com"))
        assertTrue(OutcomeMapper.isMediumFamily("www.medium.com"))
        assertFalse(OutcomeMapper.isMediumFamily("notmedium.com"))
        assertFalse(OutcomeMapper.isMediumFamily("blog.example"))
    }
}
