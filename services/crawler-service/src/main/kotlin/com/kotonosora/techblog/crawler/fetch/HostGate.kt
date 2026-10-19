package com.kotonosora.techblog.crawler.fetch

import com.kotonosora.techblog.crawler.config.CrawlerProperties
import com.kotonosora.techblog.crawler.domain.HostGate
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Component
import java.util.concurrent.ConcurrentHashMap
import java.util.concurrent.Semaphore
import java.util.concurrent.TimeUnit

/**
 * HostGate (spec 02 file 02, AC-15): one in-flight request per host, at most
 * [CrawlerProperties.globalHosts] hosts in parallel, and a fixed minimum gap between two
 * requests to the same host.
 *
 * DEVIATION FLAGGED (2026-10-19): spec 04 file 02 prescribes a Redis host lock
 * (`tb:lock:host:{host}`) plus `tb:hosts` tokens. This adapter keeps the same guarantees
 * in-process because the deployment runs a single crawler role (`CRAWLER_ROLE=all`,
 * baseline 04). Rationale: one node cannot race itself across processes, so a network
 * round-trip per request buys nothing. Budget: 0 new services, 0 new dependencies.
 * A second crawler role would invalidate this: move the semaphore into Redis first.
 */
@Component
class LocalHostGate(
    private val properties: CrawlerProperties,
) : HostGate {

    private val log = LoggerFactory.getLogger(javaClass)
    private val global = Semaphore(properties.globalHosts.coerceAtLeast(1), true)
    private val hosts = ConcurrentHashMap<String, Semaphore>()
    private val lastRequestAt = ConcurrentHashMap<String, Long>()

    override fun <T> withPermit(host: String, minDelayMs: Long, block: () -> T): T {
        val normalized = host.lowercase()
        val hostPermit = hosts.computeIfAbsent(normalized) { Semaphore(1, true) }
        if (!global.tryAcquire(ACQUIRE_TIMEOUT_SECONDS, TimeUnit.SECONDS)) {
            log.warn("host_gate_global_timeout host={} limit={}", normalized, properties.globalHosts)
            throw HostGateBusy("No global host slot within ${ACQUIRE_TIMEOUT_SECONDS}s.")
        }
        try {
            if (!hostPermit.tryAcquire(ACQUIRE_TIMEOUT_SECONDS, TimeUnit.SECONDS)) {
                throw HostGateBusy("Host '$normalized' is busy.")
            }
            try {
                waitForGap(normalized, minDelayMs)
                return block()
            } finally {
                lastRequestAt[normalized] = System.nanoTime()
                hostPermit.release()
            }
        } finally {
            global.release()
        }
    }

    private fun waitForGap(host: String, minDelayMs: Long) {
        val previous = lastRequestAt[host] ?: return
        val elapsedMs = (System.nanoTime() - previous) / 1_000_000
        val remaining = minDelayMs - elapsedMs
        if (remaining > 0) {
            Thread.sleep(remaining)
        }
    }

    private companion object {
        const val ACQUIRE_TIMEOUT_SECONDS = 60L
    }
}

/** Raised when the gate cannot grant a slot inside the acquire budget (treated as transient). */
class HostGateBusy(message: String) : RuntimeException(message)
