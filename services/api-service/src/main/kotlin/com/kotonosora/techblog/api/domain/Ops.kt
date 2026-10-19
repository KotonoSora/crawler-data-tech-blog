package com.kotonosora.techblog.api.domain

import java.time.Instant
import java.util.concurrent.atomic.AtomicInteger
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
    private val lag = AtomicInteger(0)
    private val lastApplied = AtomicReference<Instant?>(null)

    fun lagSeconds(): Int = lag.get()

    fun lastAppliedAt(): Instant? = lastApplied.get()

    fun record(lagSeconds: Int, appliedAt: Instant) {
        lag.set(lagSeconds.coerceAtLeast(0))
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
