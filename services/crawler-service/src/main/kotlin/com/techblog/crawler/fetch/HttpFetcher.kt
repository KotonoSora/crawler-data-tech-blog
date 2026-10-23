package com.techblog.crawler.fetch

import com.techblog.crawler.config.CrawlerProperties
import com.techblog.crawler.domain.ConditionalValidators
import com.techblog.crawler.domain.FetchOutcome
import com.techblog.crawler.domain.FetchPort
import com.techblog.crawler.domain.FetchResult
import com.techblog.crawler.domain.OutcomeMapper
import com.techblog.crawler.observability.CrawlerMetrics
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Component
import java.io.IOException
import java.io.InputStream
import java.net.InetAddress
import java.net.URI
import java.net.http.HttpClient
import java.net.http.HttpRequest
import java.net.http.HttpResponse
import java.net.http.HttpTimeoutException
import java.time.Duration
import java.time.Instant
import java.time.ZonedDateTime
import java.time.format.DateTimeFormatter
import java.util.concurrent.CompletableFuture
import java.util.concurrent.TimeUnit

/**
 * JDK `HttpClient` fetch adapter (spec 02 file 03 §1): HTTP/1.1, connect 10 s, read 30 s,
 * at most 3 same-host redirects, streaming body cap (HTML 10 MB / robots 512 KB).
 *
 * A cross-host redirect is terminal: following it would silently widen the crawl beyond the
 * source catalog. The body is read incrementally so an 11 MB response aborts at the cap
 * instead of buffering the whole thing.
 */
@Component
class HttpFetcher(
    private val properties: CrawlerProperties,
    private val metrics: CrawlerMetrics,
) : FetchPort {

    private val log = LoggerFactory.getLogger(javaClass)

    private val client: HttpClient = HttpClient.newBuilder()
        .version(HttpClient.Version.HTTP_1_1)
        .connectTimeout(Duration.ofMillis(properties.connectTimeoutMs))
        .followRedirects(HttpClient.Redirect.NEVER)
        .build()

    override fun get(
        url: String,
        userAgent: String,
        accept: String?,
        validators: ConditionalValidators?,
        maxBytes: Long,
        timeoutMs: Long,
    ): FetchResult {
        val host = runCatching { URI.create(url).host.orEmpty() }.getOrDefault("")
        // Network policy (spec 02 file 05 §4): https on 443 only; literal and private addresses
        // are rejected before a connection is attempted (SSRF guard).
        policyViolation(url)?.let { reason ->
            metrics.fetchRequest(host, "5xx")
            metrics.fetchDuration(host, 0)
            return FetchResult.failed(
                FetchOutcome.HTTP_ERROR,
                null,
                "FETCH-HTTP-TERMINAL",
                reason,
                0,
            )
        }
        val result = fetch(url, userAgent, accept, validators, maxBytes, timeoutMs)
        metrics.fetchRequest(host, statusClass(result.statusCode))
        metrics.fetchDuration(host, result.durationMs)
        metrics.fetchBytes(host, result.bytes)
        return result
    }

    private fun policyViolation(url: String): String? {
        if (properties.allowInsecureHttp) return null
        val uri = runCatching { URI.create(url) }.getOrNull() ?: return "Invalid URL."
        if (!uri.scheme.equals("https", ignoreCase = true)) {
            return "Only https URLs are fetched; '$url' was dropped at the network policy."
        }
        if (uri.port != -1 && uri.port != 443) {
            return "Only port 443 is fetched; '$url' was dropped at the network policy."
        }
        val host = uri.host ?: return "URL has no host."
        if (isLiteralOrPrivateHost(host)) {
            return "Host '$host' is a literal or private address; refused."
        }
        return null
    }

    /** Literal IPs are refused outright; hostnames that resolve private are refused too. */
    private fun isLiteralOrPrivateHost(host: String): Boolean {
        if (host.startsWith("[") || host.contains(':') || IPV4_LITERAL.matches(host)) return true
        val addresses = runCatching { InetAddress.getAllByName(host) }.getOrNull() ?: return false
        return addresses.any { address ->
            address.isAnyLocalAddress ||
                address.isLoopbackAddress ||
                address.isLinkLocalAddress ||
                address.isSiteLocalAddress ||
                address.isMulticastAddress
        }
    }

    private fun fetch(
        url: String,
        userAgent: String,
        accept: String?,
        validators: ConditionalValidators?,
        maxBytes: Long,
        timeoutMs: Long,
    ): FetchResult {
        val started = System.nanoTime()
        val deadlineNanos = started + Duration.ofMillis(properties.fetchTotalTimeoutMs).toNanos()
        fun elapsedMs(): Int = ((System.nanoTime() - started) / 1_000_000).toInt()

        var current = url
        var redirects = 0
        while (true) {
            val remainingBudgetMs = remainingMillis(deadlineNanos)
            if (remainingBudgetMs <= 0) {
                return FetchResult.failed(
                    FetchOutcome.TIMEOUT,
                    null,
                    "FETCH-TIMEOUT",
                    "Total fetch budget of ${properties.fetchTotalTimeoutMs} ms exceeded.",
                    elapsedMs(),
                )
            }
            val requestTimeoutMs = minOf(timeoutMs, remainingBudgetMs).coerceAtLeast(1L)
            val request = try {
                HttpRequest.newBuilder(URI.create(current))
                    .GET()
                    .timeout(Duration.ofMillis(requestTimeoutMs))
                    .header("User-Agent", userAgent)
                    .header("Accept", accept ?: "text/html,application/xhtml+xml;q=0.9,*/*;q=0.5")
                    // Gzip is decoded before the body is capped, hashed and extracted (file 01 §3).
                    .header("Accept-Encoding", "gzip")
                    .apply {
                        validators?.etag?.let { header("If-None-Match", it) }
                        validators?.lastModified?.let { header("If-Modified-Since", it) }
                    }
                    .build()
            } catch (error: IllegalArgumentException) {
                return FetchResult.failed(
                    FetchOutcome.NETWORK_ERROR,
                    null,
                    "FETCH-TIMEOUT",
                    "Invalid URL: ${error.message}",
                    elapsedMs(),
                )
            }

            val response = try {
                client.send(request, HttpResponse.BodyHandlers.ofInputStream())
            } catch (error: HttpTimeoutException) {
                return FetchResult.failed(
                    FetchOutcome.TIMEOUT,
                    null,
                    "FETCH-TIMEOUT",
                    "Read or connect budget exceeded (${requestTimeoutMs} ms; total ${properties.fetchTotalTimeoutMs} ms).",
                    elapsedMs(),
                )
            } catch (error: IOException) {
                val medium = OutcomeMapper.isMediumFamily(URI.create(current).host ?: "")
                return FetchResult.failed(
                    FetchOutcome.NETWORK_ERROR,
                    null,
                    if (medium) "FETCH-MEDIUM-TRANSIENT" else "FETCH-TIMEOUT",
                    "Connection failed: ${error.message ?: error.javaClass.simpleName}",
                    elapsedMs(),
                )
            } catch (error: InterruptedException) {
                Thread.currentThread().interrupt()
                return FetchResult.failed(
                    FetchOutcome.NETWORK_ERROR,
                    null,
                    "FETCH-TIMEOUT",
                    "Fetch interrupted.",
                    elapsedMs(),
                )
            }

            val status = response.statusCode()
            if (status in REDIRECTS) {
                val location = response.headers().firstValue("location").orElse(null)
                response.body().close()
                if (location.isNullOrBlank() || redirects >= properties.maxRedirects) {
                    return FetchResult.failed(
                        FetchOutcome.HTTP_ERROR,
                        status,
                        "FETCH-HTTP-TERMINAL",
                        "Redirect without a usable target (status $status).",
                        elapsedMs(),
                    )
                }
                val target = runCatching { URI.create(current).resolve(location) }.getOrNull()
                    ?: return FetchResult.failed(
                        FetchOutcome.HTTP_ERROR,
                        status,
                        "FETCH-HTTP-TERMINAL",
                        "Redirect target is not a valid URL.",
                        elapsedMs(),
                    )
                if (target.host?.lowercase() != URI.create(current).host?.lowercase()) {
                    return FetchResult.failed(
                        FetchOutcome.HTTP_ERROR,
                        status,
                        "FETCH-HTTP-TERMINAL",
                        "Cross-host redirect to ${target.host}; not followed.",
                        elapsedMs(),
                    )
                }
                // A redirect must not downgrade the network policy (https/443, file 05 §4).
                if (!properties.allowInsecureHttp &&
                    (!target.scheme.equals("https", ignoreCase = true) ||
                        (target.port != -1 && target.port != 443))
                ) {
                    return FetchResult.failed(
                        FetchOutcome.HTTP_ERROR,
                        status,
                        "FETCH-HTTP-TERMINAL",
                        "Redirect to a non-https/non-443 target; not followed.",
                        elapsedMs(),
                    )
                }
                redirects += 1
                current = target.toString()
                continue
            }

            val body = response.body()
            if (status == 304) {
                body.close()
                return FetchResult(
                    outcome = FetchOutcome.NOT_MODIFIED,
                    statusCode = 304,
                    body = null,
                    contentType = response.headers().firstValue("content-type").orElse(null),
                    etag = response.headers().firstValue("etag").orElse(null),
                    lastModified = response.headers().firstValue("last-modified").orElse(null),
                    durationMs = elapsedMs(),
                    bytes = 0,
                    failureCode = null,
                    failureReason = null,
                )
            }

            if (status !in 200..299) {
                body.close()
                val classification = OutcomeMapper.classify(status, URI.create(current).host ?: "")
                val retryAfter = parseRetryAfter(response.headers().firstValue("retry-after").orElse(null))
                return FetchResult.failed(
                    outcome = classification.outcome,
                    statusCode = status,
                    code = classification.failureCode ?: "FETCH-HTTP-TERMINAL",
                    reason = classification.reason ?: "HTTP $status.",
                    durationMs = elapsedMs(),
                    retryAfterSeconds = retryAfter,
                )
            }

            val encoding = response.headers().firstValue("content-encoding").orElse("").lowercase()
            val payload = if (encoding == "gzip" || encoding == "x-gzip") {
                try {
                    java.util.zip.GZIPInputStream(body)
                } catch (error: IOException) {
                    body.close()
                    return FetchResult.failed(
                        FetchOutcome.NETWORK_ERROR,
                        status,
                        "FETCH-TIMEOUT",
                        "Gzip body could not be decoded: ${error.message ?: error.javaClass.simpleName}",
                        elapsedMs(),
                    )
                }
            } else {
                body
            }
            val bodyRead = readCapped(payload, maxBytes, deadlineNanos)
            if (bodyRead.timedOut) {
                return FetchResult.failed(
                    outcome = FetchOutcome.TIMEOUT,
                    statusCode = status,
                    code = "FETCH-TIMEOUT",
                    reason = "Total fetch budget of ${properties.fetchTotalTimeoutMs} ms exceeded while reading the body.",
                    durationMs = elapsedMs(),
                )
            }
            if (bodyRead.error != null) {
                return FetchResult.failed(
                    outcome = FetchOutcome.NETWORK_ERROR,
                    statusCode = status,
                    code = "FETCH-TIMEOUT",
                    reason = "Body read failed: ${bodyRead.error}",
                    durationMs = elapsedMs(),
                )
            }
            if (bodyRead.tooLarge) {
                val classification = OutcomeMapper.classify(status, URI.create(current).host ?: "", tooLarge = true)
                log.warn("fetch_too_large url={} capBytes={}", current, maxBytes)
                return FetchResult.failed(
                    outcome = classification.outcome,
                    statusCode = status,
                    code = classification.failureCode ?: "FETCH-TOO-LARGE",
                    reason = classification.reason ?: "Response too large.",
                    durationMs = elapsedMs(),
                    bytes = bodyRead.bytes.size.toLong(),
                )
            }
            return FetchResult(
                outcome = FetchOutcome.OK,
                statusCode = status,
                body = bodyRead.bytes,
                contentType = response.headers().firstValue("content-type").orElse(null),
                etag = response.headers().firstValue("etag").orElse(null),
                lastModified = response.headers().firstValue("last-modified").orElse(null),
                durationMs = elapsedMs(),
                bytes = bodyRead.bytes.size.toLong(),
                failureCode = null,
                failureReason = null,
            )
        }
    }

    /**
     * RFC 9110 allows `Retry-After` as delay-seconds or an HTTP-date. Both are accepted;
     * `RetryPolicy` clamps the result to 24 h.
     */
    private fun parseRetryAfter(value: String?): Long? {
        if (value.isNullOrBlank()) return null
        val raw = value.trim()
        raw.toLongOrNull()?.let { return it.coerceAtLeast(0L) }
        return runCatching {
            Duration.between(
                Instant.now(),
                ZonedDateTime.parse(raw, DateTimeFormatter.RFC_1123_DATE_TIME).toInstant(),
            ).seconds
        }.getOrNull()?.coerceAtLeast(0L)
    }

    /**
     * Reads at most [cap] + 1 bytes; one extra byte is enough to prove the cap was exceeded.
     * The watchdog closes the stream when the total fetch deadline expires, so a server that
     * trickles bytes cannot hold an article beyond the 60 s budget (NFR-04).
     */
    private fun readCapped(stream: InputStream, cap: Long, deadlineNanos: Long): BodyRead {
        val watchdog = CompletableFuture.runAsync(
            Runnable { runCatching { stream.close() } },
            CompletableFuture.delayedExecutor(
                remainingMillis(deadlineNanos).coerceIn(1L, properties.fetchTotalTimeoutMs),
                TimeUnit.MILLISECONDS,
            ),
        )
        try {
            stream.use { input ->
                val out = java.io.ByteArrayOutputStream(minOf(cap, 64L * 1024).toInt())
                val buffer = ByteArray(16 * 1024)
                var total = 0L
                while (true) {
                    if (System.nanoTime() >= deadlineNanos) {
                        return BodyRead(ByteArray(0), tooLarge = false, timedOut = true)
                    }
                    val read = try {
                        input.read(buffer)
                    } catch (error: IOException) {
                        return BodyRead(
                            ByteArray(0),
                            tooLarge = false,
                            timedOut = System.nanoTime() >= deadlineNanos,
                            error = error.message ?: error.javaClass.simpleName,
                        )
                    }
                    if (read < 0) break
                    total += read
                    if (total > cap) return BodyRead(ByteArray(0), tooLarge = true, timedOut = false)
                    out.write(buffer, 0, read)
                }
                return BodyRead(out.toByteArray(), tooLarge = false, timedOut = false)
            }
        } finally {
            watchdog.cancel(false)
        }
    }

    private fun remainingMillis(deadlineNanos: Long): Long =
        ((deadlineNanos - System.nanoTime()) / 1_000_000).coerceAtLeast(0L)

    private data class BodyRead(
        val bytes: ByteArray,
        val tooLarge: Boolean,
        val timedOut: Boolean,
        val error: String? = null,
    )

    private fun statusClass(status: Int?): String = when {
        status == null -> "5xx"
        status in 200..299 -> "2xx"
        status in 300..399 -> "3xx"
        status in 400..499 -> "4xx"
        else -> "5xx"
    }

    private companion object {
        val REDIRECTS = setOf(301, 302, 303, 307, 308)
        val IPV4_LITERAL = Regex("^\\d{1,3}(\\.\\d{1,3}){3}$")
    }
}
