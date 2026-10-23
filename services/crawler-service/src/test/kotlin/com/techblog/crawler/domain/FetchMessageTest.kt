package com.techblog.crawler.domain

import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertNull
import org.junit.jupiter.api.Assertions.assertThrows
import org.junit.jupiter.api.Test
import java.time.Instant

class FetchMessageTest {

    private val valid = FetchMessage(
        articleId = "01930000-0000-7000-8000-000000000001",
        sourceKey = "netflix-techblog",
        host = "netflixtechblog.com",
        url = "https://netflixtechblog.com/some-post-1234",
        jobId = null,
        attempt = 1,
        enqueuedAt = Instant.parse("2026-10-22T00:00:00Z"),
    )

    @Test
    fun `valid message keeps all seven fields`() {
        assertEquals("01930000-0000-7000-8000-000000000001", valid.articleId)
        assertEquals("netflix-techblog", valid.sourceKey)
        assertEquals("netflixtechblog.com", valid.host)
        assertEquals("https://netflixtechblog.com/some-post-1234", valid.url)
        assertNull(valid.jobId)
        assertEquals(1, valid.attempt)
        assertEquals(Instant.parse("2026-10-22T00:00:00Z"), valid.enqueuedAt)
    }

    @Test
    fun `non-https url is rejected`() {
        assertThrows<IllegalArgumentException> {
            valid.copy(url = "http://netflixtechblog.com/some-post-1234")
        }
    }

    @Test
    fun `host must match the url host`() {
        assertThrows<IllegalArgumentException> {
            valid.copy(host = "medium.com")
        }
    }

    @Test
    fun `attempt starts at one`() {
        assertThrows<IllegalArgumentException> {
            valid.copy(attempt = 0)
        }
    }

    @Test
    fun `blank identifiers are rejected`() {
        assertThrows<IllegalArgumentException> { valid.copy(articleId = " ") }
        assertThrows<IllegalArgumentException> { valid.copy(host = "") }
    }
}
