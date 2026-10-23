package com.techblog.api.domain

import java.time.Instant
import java.util.concurrent.atomic.AtomicReference

/**
 * In-memory view of projection freshness (spec 06 file 01 §4, BE-06-09).
 * The consumer updates it after each committed event; the request filter reads it without I/O.
 *
 * Registered as a bean here rather than in `config` so the domain owns its own state holder;
 * the consumer and the header filter both inject this single instance.
 */
@org.springframework.stereotype.Component
class ProjectionLagTracker {
    private val lastApplied = AtomicReference<Instant?>(null)

    /** `now − occurredAt` of the newest applied event; grows while the stream is idle. */
    fun lagSeconds(now: Instant = Instant.now()): Int {
        val last = lastApplied.get() ?: return 0
        return java.time.Duration.between(last, now).seconds.coerceAtLeast(0).toInt()
    }

    fun lastAppliedAt(): Instant? = lastApplied.get()

    fun record(appliedAt: Instant) {
        lastApplied.set(appliedAt)
    }
}

/** One ops probe row (spec 06 file 03 §3 `OpsSummary.services`). */
data class ServiceHealth(
    val service: String,
    val status: String,
    val checkedAt: Instant,
    val details: List<String>,
)

data class OpsSummary(
    val checkedAt: Instant,
    val projectionLagSeconds: Int,
    val services: List<ServiceHealth>,
)
