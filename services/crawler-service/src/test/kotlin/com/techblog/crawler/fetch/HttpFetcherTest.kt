package com.techblog.crawler.fetch

import com.sun.net.httpserver.HttpExchange
import com.sun.net.httpserver.HttpServer
import com.techblog.crawler.config.CrawlerProperties
import com.techblog.crawler.domain.ConditionalValidators
import com.techblog.crawler.domain.FetchOutcome
import com.techblog.crawler.observability.CrawlerMetrics
import io.micrometer.core.instrument.simple.SimpleMeterRegistry
import org.junit.jupiter.api.AfterEach
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertNotNull
import org.junit.jupiter.api.Assertions.assertNull
import org.junit.jupiter.api.Assertions.assertTrue
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import java.io.ByteArrayOutputStream
import java.net.InetSocketAddress
import java.util.concurrent.atomic.AtomicReference
import java.util.zip.GZIPOutputStream

/**
 * Loopback fixture from the spec 02 file 04 plan (DO-02-01): robots/ETag/429/redirect/oversize
 * endpoints on a random 127.0.0.1 port, no Docker. `allowInsecureHttp` is the test-only escape
 * hatch that disables the https/443 + private-IP guard for the fixture host.
 */
class HttpFetcherTest {

    private lateinit var server: HttpServer
    private lateinit var fetcher: HttpFetcher
    private lateinit var base: String

    private val lastRequest = AtomicReference<Map<String, List<String>>>(emptyMap())

    private val html = "<html><body>page</body></html>".toByteArray()
    private val gzipPayload = "hello gzip payload".toByteArray()

    @BeforeEach
    fun start() {
        server = HttpServer.create(InetSocketAddress("127.0.0.1", 0), 0)
        server.createContext("/") { exchange -> handle(exchange) }
        server.start()
        base = "http://127.0.0.1:${server.address.port}"

        val properties = CrawlerProperties(
            allowInsecureHttp = true,
            connectTimeoutMs = 2_000L,
            readTimeoutMs = 5_000L,
            fetchTotalTimeoutMs = 10_000L,
            defaultDelayMs = 0L,
            mediumDelayMs = 0L,
        )
        fetcher = HttpFetcher(properties, CrawlerMetrics(SimpleMeterRegistry()))
    }

    @AfterEach
    fun stop() {
        server.stop(0)
    }

    private fun handle(exchange: HttpExchange) {
        lastRequest.set(exchange.requestHeaders.mapValues { it.value.toList() })
        val path = exchange.requestURI.path
        when (path) {
            "/page" -> {
                val ifNoneMatch = exchange.requestHeaders.getFirst("If-None-Match")
                if (ifNoneMatch == "\"v1\"") {
                    exchange.responseHeaders.add("ETag", "\"v1\"")
                    exchange.sendResponseHeaders(304, -1)
                    exchange.close()
                    return
                }
                exchange.responseHeaders.add("ETag", "\"v1\"")
                exchange.responseHeaders.add("Last-Modified", "Wed, 21 Oct 2026 07:28:00 GMT")
                exchange.responseHeaders.add("Content-Type", "text/html; charset=utf-8")
                send(exchange, 200, html)
            }
            "/gzip" -> {
                exchange.responseHeaders.add("Content-Encoding", "gzip")
                exchange.responseHeaders.add("Content-Type", "text/html; charset=utf-8")
                send(exchange, 200, gzip(gzipPayload))
            }
            "/rate" -> {
                exchange.responseHeaders.add("Retry-After", "7200")
                exchange.sendResponseHeaders(429, -1)
                exchange.close()
            }
            "/redirect" -> {
                exchange.responseHeaders.add("Location", "/page")
                exchange.sendResponseHeaders(302, -1)
                exchange.close()
            }
            "/cross" -> {
                exchange.responseHeaders.add("Location", "https://example.com/elsewhere")
                exchange.sendResponseHeaders(302, -1)
                exchange.close()
            }
            "/big" -> {
                exchange.responseHeaders.add("Content-Type", "text/html")
                send(exchange, 200, ByteArray(64) { 'a'.code.toByte() })
            }
            else -> {
                exchange.sendResponseHeaders(404, -1)
                exchange.close()
            }
        }
    }

    private fun send(exchange: HttpExchange, status: Int, body: ByteArray) {
        exchange.sendResponseHeaders(status, body.size.toLong())
        exchange.responseBody.use { it.write(body) }
    }

    private fun gzip(bytes: ByteArray): ByteArray {
        val out = ByteArrayOutputStream()
        GZIPOutputStream(out).use { it.write(bytes) }
        return out.toByteArray()
    }

    /** `com.sun.net.httpserver.Headers` normalizes key casing, so match case-insensitively. */
    private fun requestHeader(name: String): String? =
        lastRequest.get().entries
            .firstOrNull { it.key.equals(name, ignoreCase = true) }
            ?.value
            ?.firstOrNull()

    @Test
    fun `conditional validators produce a 304 with no body`() {
        val result = fetcher.get(
            url = "$base/page",
            userAgent = "techblog-archive-crawler/0.1 (+test@example.com)",
            accept = "text/html",
            validators = ConditionalValidators("\"v1\"", "Wed, 21 Oct 2026 07:28:00 GMT"),
            maxBytes = 1_048_576,
            timeoutMs = 5_000,
        )

        assertEquals(FetchOutcome.NOT_MODIFIED, result.outcome)
        assertEquals(304, result.statusCode)
        assertEquals(0L, result.bytes)
        assertNull(result.body)
        assertEquals("\"v1\"", requestHeader("If-None-Match"))
        assertEquals(
            "Wed, 21 Oct 2026 07:28:00 GMT",
            requestHeader("If-Modified-Since"),
        )
    }

    @Test
    fun `gzip body is decoded before the cap is applied`() {
        val result = fetcher.get(
            url = "$base/gzip",
            userAgent = "techblog-archive-crawler/0.1 (+test@example.com)",
            accept = "text/html",
            validators = null,
            maxBytes = 1_048_576,
            timeoutMs = 5_000,
        )

        assertEquals(FetchOutcome.OK, result.outcome)
        assertEquals("hello gzip payload", result.body?.toString(Charsets.UTF_8))
        assertTrue(result.bytes > 0)
        assertEquals(
            "techblog-archive-crawler/0.1 (+test@example.com)",
            requestHeader("User-Agent"),
        )
    }

    @Test
    fun `429 keeps the retry-after seconds`() {
        val result = fetcher.get(
            url = "$base/rate",
            userAgent = "techblog-archive-crawler/0.1 (+test@example.com)",
            accept = "text/html",
            validators = null,
            maxBytes = 1_048_576,
            timeoutMs = 5_000,
        )

        assertEquals(FetchOutcome.HTTP_ERROR, result.outcome)
        assertEquals("FETCH-RATE-LIMITED", result.failureCode)
        assertEquals(7_200L, result.retryAfterSeconds)
    }

    @Test
    fun `same-host redirect is followed`() {
        val result = fetcher.get(
            url = "$base/redirect",
            userAgent = "techblog-archive-crawler/0.1 (+test@example.com)",
            accept = "text/html",
            validators = null,
            maxBytes = 1_048_576,
            timeoutMs = 5_000,
        )

        assertEquals(FetchOutcome.OK, result.outcome)
        assertNotNull(result.body)
        assertTrue(result.body!!.toString(Charsets.UTF_8).contains("page"))
    }

    @Test
    fun `cross-host redirect is terminal and never followed`() {
        val result = fetcher.get(
            url = "$base/cross",
            userAgent = "techblog-archive-crawler/0.1 (+test@example.com)",
            accept = "text/html",
            validators = null,
            maxBytes = 1_048_576,
            timeoutMs = 5_000,
        )

        assertEquals(FetchOutcome.HTTP_ERROR, result.outcome)
        assertEquals("FETCH-HTTP-TERMINAL", result.failureCode)
        assertNull(result.body)
    }

    @Test
    fun `body larger than the cap is too large`() {
        val result = fetcher.get(
            url = "$base/big",
            userAgent = "techblog-archive-crawler/0.1 (+test@example.com)",
            accept = "text/html",
            validators = null,
            maxBytes = 16,
            timeoutMs = 5_000,
        )

        assertEquals(FetchOutcome.TOO_LARGE, result.outcome)
        assertEquals("FETCH-TOO-LARGE", result.failureCode)
        assertNull(result.body)
    }
}
