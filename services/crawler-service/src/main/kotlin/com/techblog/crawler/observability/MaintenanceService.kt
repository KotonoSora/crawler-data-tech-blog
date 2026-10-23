package com.techblog.crawler.observability

import com.techblog.crawler.config.CrawlerProperties
import org.slf4j.LoggerFactory
import org.slf4j.MDC
import org.springframework.boot.context.event.ApplicationReadyEvent
import org.springframework.context.event.EventListener
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.stereotype.Service
import java.nio.file.Files
import java.nio.file.Path
import java.time.Duration
import java.time.Instant

/**
 * Retention maintenance (spec 05-observability file 01 §6): fetch audit 90 days, conditional-GET
 * validators 30 days, temporary files 1 hour. There is no timer: it runs at boot and after each
 * terminal job (maintenance is operator-triggered only).
 *
 * Deletes are batched (10,000 rows) with an indexed range scan, one statement per batch, so a
 * long purge never holds a lock beyond the 5 s lock_timeout. Every run logs start/end counts at
 * INFO with the `code` MDC field.
 */
@Service
class MaintenanceService(
    private val jdbc: JdbcTemplate,
    private val properties: CrawlerProperties,
    private val metrics: CrawlerMetrics,
) {
    private val log = LoggerFactory.getLogger(javaClass)

    @EventListener(ApplicationReadyEvent::class)
    fun onReady() {
        runCatching { purge() }.onFailure { log.warn("retention_failed reason={}", it.message) }
    }

    fun purge() {
        val started = System.nanoTime()
        MDC.put("code", "-")
        try {
            log.info("retention_purge_start")
            val logs = purgeFetchLog()
            val cache = purgeHttpCache()
            val temporary = purgeTemporary()
            metrics.tmpPurged(temporary)
            log.info(
                "retention_purge_end fetchLog={} httpCache={} tmpFiles={} durationMs={}",
                logs,
                cache,
                temporary,
                (System.nanoTime() - started) / 1_000_000,
            )
        } finally {
            MDC.remove("code")
        }
    }

    private fun purgeFetchLog(): Int {
        var total = 0
        while (true) {
            val batch = jdbc.update(
                """
                DELETE FROM fetch_log
                WHERE id IN (
                    SELECT id FROM fetch_log
                    WHERE occurred_at < now() - INTERVAL '90 days'
                    ORDER BY occurred_at
                    LIMIT ?
                )
                """.trimIndent(),
                BATCH_SIZE,
            )
            if (batch <= 0) break
            total += batch
            metrics.purgeRows("fetch_log", batch)
        }
        return total
    }

    private fun purgeHttpCache(): Int {
        var total = 0
        while (true) {
            val batch = jdbc.update(
                """
                DELETE FROM http_cache
                WHERE url IN (
                    SELECT url FROM http_cache
                    WHERE checked_at < now() - INTERVAL '30 days'
                    ORDER BY checked_at
                    LIMIT ?
                )
                """.trimIndent(),
                BATCH_SIZE,
            )
            if (batch <= 0) break
            total += batch
            metrics.purgeRows("http_cache", batch)
        }
        return total
    }

    private fun purgeTemporary(): Int {
        val root = Path.of(properties.tmpDir).toAbsolutePath().normalize()
        if (!Files.isDirectory(root)) return 0
        val cutoff = Instant.now().minus(Duration.ofHours(1))
        var removed = 0
        Files.walk(root).use { paths ->
            paths.filter { Files.isRegularFile(it) }
                .filter { FILE.matches(it.fileName.toString()) }
                .filter { Files.getLastModifiedTime(it).toInstant() < cutoff }
                .forEach { path ->
                    if (runCatching { Files.deleteIfExists(path) }.getOrDefault(false)) removed += 1
                }
        }
        return removed
    }

    private companion object {
        const val BATCH_SIZE = 10_000
        val FILE = Regex("^\\.tb-.*\\.part$")
    }
}
