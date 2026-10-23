package com.techblog.crawler.fetch

import com.techblog.crawler.config.CrawlerProperties
import com.techblog.crawler.domain.FetchOutcome
import com.techblog.crawler.domain.HostGate
import com.techblog.crawler.observability.CrawlerMetrics
import org.slf4j.LoggerFactory
import org.springframework.data.redis.core.StringRedisTemplate
import org.springframework.data.redis.core.script.DefaultRedisScript
import org.springframework.stereotype.Component
import java.time.Duration
import java.time.Instant
import java.util.UUID
import java.util.concurrent.ConcurrentHashMap
import java.util.concurrent.Executors
import java.util.concurrent.ScheduledFuture
import java.util.concurrent.Semaphore
import java.util.concurrent.TimeUnit
import java.util.concurrent.atomic.AtomicInteger

/**
 * HostGate (spec 02 file 01 §1, file 05 §1-§2): one in-flight request per host, at most
 * [CrawlerProperties.globalHosts] hosts in parallel, a fixed minimum gap between two requests to
 * the same host, the `tb:lock:host:{host}` cross-role lock, and `tb:pause:{host}`.
 *
 * Flow inside a permit:
 * 1. `tb:pause:{host}` is checked before anything else; an unexpired pause raises [HostPaused]
 *    so the caller reschedules to `tb:retry` without consuming an attempt.
 * 2. The global and per-host semaphores bound concurrency in-process.
 * 3. The min-delay gate sleeps until `>=2000 ms` (`>=3000 ms` Medium-family) since the last
 *    request to the host.
 * 4. `tb:lock:host:{host}` (SET NX, 90 s) serializes with a second crawler role. Redis being
 *    unavailable downgrades to the in-process semaphore only.
 *
 * DEVIATION CARRIED (2026-10-22): the lock is best-effort rather than a hard requirement; a
 * single crawler role (`CRAWLER_ROLE=all`) cannot race itself across processes, so a Redis blip
 * must not stop fetching. Budget: 0 new services, 0 new dependencies.
 */
@Component
class LocalHostGate(
    private val properties: CrawlerProperties,
    private val redis: StringRedisTemplate,
    private val metrics: CrawlerMetrics,
) : HostGate {

    private val log = LoggerFactory.getLogger(javaClass)
    private val global = Semaphore(properties.globalHosts.coerceAtLeast(1), true)
    private val hosts = ConcurrentHashMap<String, Semaphore>()
    private val lastRequestAt = ConcurrentHashMap<String, Long>()
    private val consecutiveFailures = ConcurrentHashMap<String, AtomicInteger>()
    /** Mirror of `tb:pause:{host}` so a Redis outage cannot un-pause a tripped host. */
    private val localPauses = ConcurrentHashMap<String, Instant>()

    override fun <T> withPermit(host: String, minDelayMs: Long, block: () -> T): T {
        val normalized = host.lowercase()
        pauseUntil(normalized)?.let { throw HostPaused(normalized, it) }

        val hostPermit = hosts.computeIfAbsent(normalized) { Semaphore(1, true) }
        if (!global.tryAcquire(ACQUIRE_TIMEOUT_SECONDS, TimeUnit.SECONDS)) {
            log.warn("host_gate_global_timeout host={} limit={}", normalized, properties.globalHosts)
            throw HostGateBusy("No global host slot within ${ACQUIRE_TIMEOUT_SECONDS}s.")
        }
        try {
            if (!hostPermit.tryAcquire(ACQUIRE_TIMEOUT_SECONDS, TimeUnit.SECONDS)) {
                throw HostGateBusy("Host '$normalized' is busy.")
            }
            var lockToken: String? = null
            var renewal: ScheduledFuture<*>? = null
            try {
                waitForGap(normalized, minDelayMs)
                val token = acquireHostLock(normalized)
                lockToken = token
                if (token != null) {
                    // Spec 04 §4: SET NX PX 60000, renew every 20 s while the request runs.
                    val renewSeconds = properties.hostLockRenewSeconds.coerceAtLeast(1)
                    val ttlMs = (properties.hostLockTtlSeconds * 1000).toString()
                    renewal = RENEWER.scheduleAtFixedRate(
                        { renewHostLock(normalized, token, ttlMs) },
                        renewSeconds,
                        renewSeconds,
                        TimeUnit.SECONDS,
                    )
                }
                return block()
            } finally {
                renewal?.cancel(false)
                releaseHostLock(normalized, lockToken)
                lastRequestAt[normalized] = System.nanoTime()
                hostPermit.release()
            }
        } finally {
            global.release()
        }
    }

    override fun recordOutcome(host: String, outcome: FetchOutcome, statusCode: Int?) {
        val normalized = host.lowercase()
        when (outcome) {
            FetchOutcome.OK, FetchOutcome.NOT_MODIFIED -> {
                consecutiveFailures.remove(normalized)
                metrics.hostPaused(normalized, false)
            }
            FetchOutcome.HTTP_ERROR -> {
                // 429 means "slow down", not "the host is broken": Retry-After already governs
                // the next attempt and the breaker must not trip on rate limiting (file 05 §2).
                if (statusCode != null && statusCode in 500..599) {
                    countFailure(normalized, statusCode)
                }
            }
            FetchOutcome.TIMEOUT, FetchOutcome.NETWORK_ERROR -> countFailure(normalized, statusCode)
            else -> Unit
        }
    }

    override fun pauseUntil(host: String): Instant? {
        val normalized = host.lowercase()
        val now = Instant.now()
        val stored = localPauses[normalized]
        val localUntil = if (stored != null && !stored.isAfter(now)) {
            localPauses.remove(normalized, stored)
            null
        } else {
            stored
        }
        val ttlMs = runCatching { redis.getExpire(pauseKey(normalized)) }.getOrNull() ?: 0L
        val redisUntil = if (ttlMs > 0) now.plusMillis(ttlMs) else null
        return when {
            localUntil == null -> redisUntil
            redisUntil == null -> localUntil
            localUntil.isAfter(redisUntil) -> localUntil
            else -> redisUntil
        }
    }

    private fun countFailure(host: String, statusCode: Int?) {
        val failures = consecutiveFailures.computeIfAbsent(host) { AtomicInteger() }.incrementAndGet()
        if (failures >= properties.breakerThreshold) {
            pause(host, failures, statusCode)
        }
    }

    private fun pause(host: String, failures: Int, statusCode: Int?) {
        val until = Instant.now().plusSeconds(properties.hostPauseSeconds)
        localPauses[host] = until
        runCatching {
            redis.opsForValue().set(
                pauseKey(host),
                until.toString(),
                Duration.ofSeconds(properties.hostPauseSeconds),
            )
        }.onFailure { error ->
            log.warn("host_pause_store_failed host={} reason={}", host, error.message)
        }
        consecutiveFailures.remove(host)
        metrics.hostPausedTotal(host)
        metrics.hostPaused(host, true)
        log.warn(
            "host_paused host={} pausedUntil={} consecutiveFailures={} lastStatus={}",
            host,
            until,
            failures,
            statusCode,
        )
    }

    private fun waitForGap(host: String, minDelayMs: Long) {
        val previous = lastRequestAt[host] ?: return
        val elapsedMs = (System.nanoTime() - previous) / 1_000_000
        val remaining = minDelayMs - elapsedMs
        if (remaining > 0) {
            Thread.sleep(remaining)
        }
    }

    private fun acquireHostLock(host: String): String? {
        val token = UUID.randomUUID().toString()
        return runCatching {
            val acquired = redis.opsForValue().setIfAbsent(
                "${properties.hostLockPrefix}$host",
                token,
                Duration.ofSeconds(properties.hostLockTtlSeconds),
            )
            if (acquired == true) token else null
        }.getOrElse { error ->
            // Best-effort (DEVIATION CARRIED above): in-process permits still hold.
            log.debug("host_lock_unavailable host={} reason={}", host, error.message)
            null
        }
    }

    private fun renewHostLock(host: String, token: String, ttlMs: String) {
        runCatching {
            redis.execute(renewScript, listOf("${properties.hostLockPrefix}$host"), token, ttlMs)
        }.onFailure { error ->
            log.debug("host_lock_renew_failed host={} reason={}", host, error.message)
        }
    }

    private fun releaseHostLock(host: String, token: String?) {
        if (token == null) return
        runCatching {
            redis.execute(releaseScript, listOf("${properties.hostLockPrefix}$host"), token)
        }
    }

    private fun pauseKey(host: String): String = "${properties.pauseKeyPrefix}$host"

    private companion object {
        const val ACQUIRE_TIMEOUT_SECONDS = 60L

        val RENEWER = Executors.newScheduledThreadPool(1) { runnable ->
            Thread(runnable, "host-lock-renewer").apply { isDaemon = true }
        }

        /** KEYS: lock. ARGV: token, ttl ms. */
        val renewScript: DefaultRedisScript<Long> = DefaultRedisScript(
            """
            if redis.call('GET', KEYS[1]) == ARGV[1] then
              return redis.call('PEXPIRE', KEYS[1], ARGV[2])
            end
            return 0
            """.trimIndent(),
            Long::class.java,
        )

        /** KEYS: lock. ARGV: token. */
        val releaseScript: DefaultRedisScript<Long> = DefaultRedisScript(
            """
            if redis.call('GET', KEYS[1]) == ARGV[1] then
              return redis.call('DEL', KEYS[1])
            end
            return 0
            """.trimIndent(),
            Long::class.java,
        )
    }
}

/** Raised when the gate cannot grant a slot inside the acquire budget (treated as transient). */
class HostGateBusy(message: String) : RuntimeException(message)

/**
 * Raised when `tb:pause:{host}` is set (file 05 §2). The caller reschedules to `tb:retry` with
 * score = pause expiry: no request, no fetch_log row, no attempt consumed.
 */
class HostPaused(val host: String, val pausedUntil: Instant) :
    RuntimeException("Host '$host' is paused until $pausedUntil.")
