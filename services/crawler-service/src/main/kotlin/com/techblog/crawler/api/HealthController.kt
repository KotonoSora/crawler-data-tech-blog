package com.techblog.crawler.api

import org.flywaydb.core.Flyway
import org.springframework.data.redis.core.RedisCallback
import org.springframework.data.redis.core.StringRedisTemplate
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.jdbc.core.ConnectionCallback
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController
import java.io.File
import java.time.Instant

/**
 * Contracts: /health/liveness (process alive) and /health/readiness
 * (DB + Redis reachable). See spec 05-observability-and-ops, file 03.
 */
@RestController
class HealthController(
    private val jdbc: JdbcTemplate,
    private val redis: StringRedisTemplate,
    private val flyway: Flyway,
) {

    @GetMapping("/health/liveness")
    fun liveness(): Map<String, Any> = mapOf(
        "status" to "UP",
        "service" to "crawler-service",
        "checkedAt" to Instant.now().toString(),
    )

    @GetMapping("/health/readiness")
    fun readiness(): ResponseEntity<Map<String, Any>> {
        val reasons = buildList {
            if (!dbUp()) add("db")
            if (!redisUp()) add("redis")
            if (!flywayCurrent()) add("flyway")
            if (!diskAvailable()) add("disk")
        }
        val now = Instant.now().toString()
        return if (reasons.isEmpty()) {
            ResponseEntity.ok(
                mapOf<String, Any>(
                    "status" to "UP",
                    "service" to "crawler-service",
                    "checkedAt" to now,
                ),
            )
        } else {
            ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(
                mapOf<String, Any>(
                    "status" to "DOWN",
                    "reasons" to reasons,
                ),
            )
        }
    }

    private fun dbUp(): Boolean =
        runCatching {
            jdbc.execute(
                ConnectionCallback { connection ->
                    connection.createStatement().use { statement ->
                        statement.queryTimeout = HEALTH_CHECK_TIMEOUT_SECONDS
                        statement.executeQuery("SELECT 1").use { rows -> rows.next() }
                    }
                },
            ) ?: false
        }.getOrDefault(false)

    private fun redisUp(): Boolean =
        runCatching {
            redis.execute(RedisCallback { connection -> connection.ping() }) == "PONG"
        }.getOrDefault(false)

    private fun flywayCurrent(): Boolean =
        runCatching { flyway.info().pending().isEmpty() }.getOrDefault(false)

    private fun diskAvailable(): Boolean =
        runCatching {
            val root = File("/app/data")
            !root.exists() || root.usableSpace >= 5L * 1024 * 1024 * 1024
        }.getOrDefault(true)

    private companion object {
        /** Each readiness dependency gets a 2 s budget (spec 05 file 01 §4). */
        const val HEALTH_CHECK_TIMEOUT_SECONDS = 2
    }
}
