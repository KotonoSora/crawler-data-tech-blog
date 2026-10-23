package com.techblog.api.observability

import io.micrometer.core.instrument.Counter
import io.micrometer.core.instrument.MeterRegistry
import io.micrometer.core.instrument.Tags
import org.springframework.stereotype.Component
import java.util.concurrent.atomic.AtomicInteger

/** api-service metric inventory (spec 05 file 01 §3, spec 06 file 05). */
@Component
class ApiMetrics(
    private val registry: MeterRegistry,
) {
    private val lag = AtomicInteger(0)

    init {
        registry.gauge("api_projection_lag_seconds", lag)
    }

    fun projectionLag(seconds: Int) {
        lag.set(seconds.coerceAtLeast(0))
    }

    fun eventConsumed(type: String) {
        counter("api_events_consumed_total", "type" to label(type)).increment()
    }

    fun eventFailed(type: String, reason: String) {
        counter(
            "api_events_failed_total",
            "type" to label(type),
            "reason" to label(reason),
        ).increment()
    }

    private fun counter(name: String, vararg tags: Pair<String, String>): Counter =
        Counter.builder(name)
            .tags(Tags.of(*tags.flatMap { listOf(it.first, it.second) }.toTypedArray()))
            .register(registry)

    private fun label(value: String): String = value.ifBlank { "unknown" }
}
