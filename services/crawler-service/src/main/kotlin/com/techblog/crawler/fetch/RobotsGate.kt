package com.techblog.crawler.fetch

import com.techblog.crawler.config.CrawlerProperties
import com.techblog.crawler.domain.FetchLogEntry
import com.techblog.crawler.domain.FetchLogRepository
import com.techblog.crawler.domain.FetchOutcome
import com.techblog.crawler.domain.FetchPort
import com.techblog.crawler.domain.FetchResult
import com.techblog.crawler.domain.HostGate
import com.techblog.crawler.domain.RobotsDecision
import com.techblog.crawler.domain.RobotsGate
import com.techblog.crawler.domain.UserAgent
import crawlercommons.robots.BaseRobotRules
import crawlercommons.robots.SimpleRobotRulesParser
import org.slf4j.LoggerFactory
import org.springframework.data.redis.core.StringRedisTemplate
import org.springframework.stereotype.Component
import java.net.URI
import java.time.Duration
import java.util.concurrent.ConcurrentHashMap

/**
 * robots.txt service (spec 02 file 01 §1, file 05 §1). RFC 9309 via crawler-commons:
 * 4xx → allow all, 5xx/timeout/oversize/parse failure → disallow all, 2xx → parse and evaluate
 * the specific URL.
 *
 * `tb:robots:{host}` caches the robots.txt **body**, not a single allow/deny decision, because
 * rules are per URL. TTL is 24 h after a successful load and 300 s after a failed load, so a
 * broken host is re-probed quickly instead of staying blocked for a day. The robots request
 * itself passes through [HostGate], so it can never overlap another request to the same host.
 */
@Component
class RobotsService(
    private val fetcher: FetchPort,
    private val hostGate: HostGate,
    private val properties: CrawlerProperties,
    private val fetchLog: FetchLogRepository,
    private val redis: StringRedisTemplate,
) : RobotsGate {

    private val log = LoggerFactory.getLogger(javaClass)

    private data class Cached(val value: String, val expiresAt: Long)

    private val local = ConcurrentHashMap<String, Cached>()

    override fun check(url: String, userAgent: String): RobotsDecision {
        val parsed = runCatching { URI(url) }.getOrNull()
            ?: return RobotsDecision(false, "Invalid URL.")
        val scheme = parsed.scheme ?: return RobotsDecision(false, "URL has no scheme.")
        val host = parsed.host ?: return RobotsDecision(false, "URL has no host.")
        if (!scheme.equals("https", ignoreCase = true)) {
            return RobotsDecision(false, "Only https robots.txt is evaluated.")
        }
        val robotsUrl = "https://$host/robots.txt"
        val cached = cachedBody(host) ?: loadAndCache(robotsUrl, host, userAgent)
        return evaluate(cached, url, robotsUrl)
    }

    // -----------------------------------------------------------------------
    // Cache
    // -----------------------------------------------------------------------

    private fun cachedBody(host: String): String? {
        local[host]?.let { entry ->
            if (entry.expiresAt > System.currentTimeMillis()) return entry.value
            local.remove(host)
        }
        val raw = runCatching { redis.opsForValue().get(cacheKey(host)) }.getOrNull() ?: return null
        // A Redis hit is authoritative; restore the local mirror with the shorter failure TTL
        // so a failed load is re-probed after 300 s even if Redis is briefly unreachable.
        val ttl = if (raw.startsWith(FAIL_PREFIX)) {
            properties.robotsFailureTtlSeconds
        } else {
            properties.robotsTtlSeconds
        }
        local[host] = Cached(raw, System.currentTimeMillis() + ttl * 1000)
        return raw
    }

    private fun loadAndCache(robotsUrl: String, host: String, userAgent: String): String {
        val loaded = load(robotsUrl, host, userAgent)
        val ttlSeconds = if (loaded.startsWith(FAIL_PREFIX)) {
            properties.robotsFailureTtlSeconds
        } else {
            properties.robotsTtlSeconds
        }
        local[host] = Cached(loaded, System.currentTimeMillis() + ttlSeconds * 1000)
        runCatching {
            redis.opsForValue().set(cacheKey(host), loaded, Duration.ofSeconds(ttlSeconds))
        }.onFailure { error ->
            log.warn("robots_cache_store_failed host={} reason={}", host, error.message)
        }
        return loaded
    }

    // -----------------------------------------------------------------------
    // Load
    // -----------------------------------------------------------------------

    private fun load(robotsUrl: String, host: String, userAgent: String): String {
        val started = System.nanoTime()
        val result = try {
            hostGate.withPermit(host, delayFor(host)) {
                fetcher.get(
                    url = robotsUrl,
                    userAgent = userAgent,
                    accept = UserAgent.ACCEPT_ROBOTS,
                    validators = null,
                    maxBytes = properties.robotsMaxBytes,
                    timeoutMs = properties.readTimeoutMs,
                )
            }
        } catch (paused: HostPaused) {
            // Not a robots failure: the host is paused, so defer the article instead.
            throw paused
        } catch (busy: HostGateBusy) {
            throw busy
        } catch (error: Exception) {
            log.warn("robots_unavailable host={} reason={}", host, error.message)
            recordFetch(
                host,
                robotsUrl,
                FetchResult.failed(
                    FetchOutcome.NETWORK_ERROR,
                    null,
                    "FETCH-TIMEOUT",
                    "robots.txt request failed: ${error.message ?: error.javaClass.simpleName}",
                    ((System.nanoTime() - started) / 1_000_000).toInt(),
                ),
            )
            return "$FAIL_PREFIX robots.txt could not be read; fail closed."
        }
        recordFetch(host, robotsUrl, result)
        hostGate.recordOutcome(host, result.outcome, result.statusCode)

        val status = result.statusCode
        val code = status ?: 0
        return when {
            // Transient answers must not pin a fail-closed result for 24 h; the 300 s TTL applies.
            code == 0 || code == 408 || code == 429 || code in 500..599 ->
                "$FAIL_PREFIX robots.txt unavailable (status ${status ?: "none"}); fail closed."
            // RFC 9309 §2.3.1.3: 4xx means "no robots.txt", so every path is allowed.
            code in 400..499 -> "$OK_PREFIX"
            !result.ok -> "$FAIL_PREFIX robots.txt could not be read; fail closed."
            else -> {
                val body = result.body?.toString(Charsets.UTF_8).orEmpty()
                "$OK_PREFIX$body"
            }
        }
    }

    // -----------------------------------------------------------------------
    // Evaluate
    // -----------------------------------------------------------------------

    private fun evaluate(cached: String, url: String, robotsUrl: String): RobotsDecision {
        if (cached.startsWith(FAIL_PREFIX)) {
            return RobotsDecision(false, cached.removePrefix(FAIL_PREFIX).trim())
        }
        val body = cached.removePrefix(OK_PREFIX)
        if (body.isBlank()) return RobotsDecision(true)
        val rules: BaseRobotRules = runCatching {
            SimpleRobotRulesParser().parseContent(
                robotsUrl,
                body.toByteArray(Charsets.UTF_8),
                "text/plain",
                UserAgent.robotToken(),
            )
        }.getOrElse { error ->
            log.warn("robots_parse_failed url={} reason={}", robotsUrl, error.message)
            return RobotsDecision(false, "robots.txt could not be parsed; fail closed.")
        }
        val allowed = runCatching { rules.isAllowed(url) }.getOrDefault(false)
        return if (allowed) {
            RobotsDecision(true)
        } else {
            RobotsDecision(false, "robots.txt disallows $url")
        }
    }

    private fun delayFor(host: String): Long =
        if (com.techblog.crawler.domain.OutcomeMapper.isMediumFamily(host)) {
            properties.mediumDelayMs
        } else {
            properties.defaultDelayMs
        }

    private fun recordFetch(host: String, url: String, result: FetchResult) {
        runCatching {
            fetchLog.record(
                FetchLogEntry(
                    articleId = null,
                    jobId = null,
                    host = host,
                    url = url,
                    method = "GET",
                    statusCode = result.statusCode,
                    outcome = result.outcome.wire,
                    durationMs = result.durationMs,
                    bytes = result.bytes,
                    attempt = 1,
                ),
            )
        }.onFailure { log.warn("robots_fetch_log_failed url={} reason={}", url, it.message) }
    }

    private fun cacheKey(host: String): String = "${properties.robotsCachePrefix}$host"

    private companion object {
        const val OK_PREFIX = "OK\n"
        const val FAIL_PREFIX = "FAIL\n"
    }
}
