package com.kotonosora.techblog.crawler.api

import org.springframework.data.redis.core.StringRedisTemplate
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController
import java.time.Instant

/**
 * Contracts: /health/liveness (process alive) and /health/readiness
 * (DB + Redis reachable). See spec 05-observability-and-ops, file 03.
 */
@RestController
class HealthController(
    private val jdbc: JdbcTemplate,
    private val redis: StringRedisTemplate,
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
        }
        val body = mapOf(
            "status" to if (reasons.isEmpty()) "UP" else "DOWN",
            "service" to "crawler-service",
            "reasons" to reasons,
            "checkedAt" to Instant.now().toString(),
        )
        return if (reasons.isEmpty()) {
            ResponseEntity.ok(body)
        } else {
            ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(body)
        }
    }

    private fun dbUp(): Boolean =
        runCatching { jdbc.queryForObject("SELECT 1", Int::class.java) == 1 }.getOrDefault(false)

    private fun redisUp(): Boolean =
        runCatching { redis.execute { it.ping() } == "PONG" }.getOrDefault(false)
}
