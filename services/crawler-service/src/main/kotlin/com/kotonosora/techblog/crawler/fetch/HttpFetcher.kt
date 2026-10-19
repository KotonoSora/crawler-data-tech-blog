package com.kotonosora.techblog.crawler.fetch

import com.kotonosora.techblog.crawler.config.CrawlerProperties
import com.kotonosora.techblog.crawler.domain.ConditionalValidators
import com.kotonosora.techblog.crawler.domain.FetchOutcome
import com.kotonosora.techblog.crawler.domain.FetchPort
import com.kotonosora.techblog.crawler.domain.FetchResult
import com.kotonosora.techblog.crawler.domain.OutcomeMapper
import com.kotonosora.techblog.crawler.domain.TransportError
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Component
import java.io.IOException
import java.net.URI
import java.net.http.HttpClient
import java.net.http.HttpRequest
import java.net.http.HttpResponse
import java.net.http.HttpTimeoutException
import java.time.Duration

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
        val started = System.nanoTime()
        fun elapsedMs(): Int = ((System.nanoTime() - started) / 1_000_000).toInt()

        var current = url
        var redirects = 0
        while (true) {
            val request = try {
                HttpRequest.newBuilder(URI.create(current))
                    .GET()
                    .timeout(Duration.ofMillis(timeoutMs))
                    .header("User-Agent", userAgent)
                    .header("Accept", accept ?: "text/html,application/xhtml+xml;q=0.9,*/*;q=0.8")
                    // Identity encoding only: the body is parsed and hashed as-is, so advertising
                    // gzip/deflate without a decoder would archive compressed bytes (BR-09).
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
                    "Read or connect budget exceeded (${timeoutMs} ms).",
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
                if (location.isNullOrBlank() || redirects >= MAX_REDIRECTS) {
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
                val retryAfter = response.headers().firstValue("retry-after").orElse(null)
                    ?.toLongOrNull()
                return FetchResult.failed(
                    outcome = classification.outcome,
                    statusCode = status,
                    code = classification.failureCode ?: "FETCH-HTTP-TERMINAL",
                    reason = classification.reason ?: "HTTP $status.",
                    durationMs = elapsedMs(),
                    retryAfterSeconds = retryAfter,
                )
            }

            val (bytes, tooLarge) = readCapped(body, maxBytes)
            if (tooLarge) {
                val classification = OutcomeMapper.classify(status, URI.create(current).host ?: "", tooLarge = true)
                log.warn("fetch_too_large url={} capBytes={}", current, maxBytes)
                return FetchResult.failed(
                    outcome = classification.outcome,
                    statusCode = status,
                    code = classification.failureCode ?: "FETCH-TOO-LARGE",
                    reason = classification.reason ?: "Response too large.",
                    durationMs = elapsedMs(),
                    bytes = bytes.size.toLong(),
                )
            }
            return FetchResult(
                outcome = FetchOutcome.OK,
                statusCode = status,
                body = bytes,
                contentType = response.headers().firstValue("content-type").orElse(null),
                etag = response.headers().firstValue("etag").orElse(null),
                lastModified = response.headers().firstValue("last-modified").orElse(null),
                durationMs = elapsedMs(),
                bytes = bytes.size.toLong(),
                failureCode = null,
                failureReason = null,
            )
        }
    }

    /** Reads at most [cap] + 1 bytes; one extra byte is enough to prove the cap was exceeded. */
    private fun readCapped(stream: java.io.InputStream, cap: Long): Pair<ByteArray, Boolean> {
        stream.use { input ->
            val out = java.io.ByteArrayOutputStream(minOf(cap, 64 * 1024).toInt())
            val buffer = ByteArray(16 * 1024)
            var total = 0L
            while (true) {
                val read = input.read(buffer)
                if (read < 0) break
                total += read
                if (total > cap) return ByteArray(0) to true
                out.write(buffer, 0, read)
            }
            return out.toByteArray() to false
        }
    }

    private companion object {
        val REDIRECTS = setOf(301, 302, 303, 307, 308)
        const val MAX_REDIRECTS = 3
    }
}
