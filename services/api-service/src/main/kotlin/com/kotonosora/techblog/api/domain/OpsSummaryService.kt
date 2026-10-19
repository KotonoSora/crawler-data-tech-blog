package com.kotonosora.techblog.api.domain

import org.springframework.stereotype.Service
import java.time.Instant

/**
 * `/api/v1/ops/summary` (spec 06 file 03 §3): two probe rows, api-service and crawler-service.
 * api-service probes its own DB + Redis; the crawler row comes from the internal health probe.
 * A crawler outage is reported as DOWN in the payload but never fails the endpoint — the UI
 * needs the summary precisely when something is broken (file 05 §7).
 */
@Service
class OpsSummaryService(
    private val selfProbe: SelfProbe,
    private val crawlerProbe: CrawlerProbe,
    private val lag: ProjectionLagTracker,
) {
    fun summary(): OpsSummary {
        val now = Instant.now()
        val self = selfProbe.probe()
        val crawler = crawlerProbe.probe()
        return OpsSummary(
            checkedAt = now,
            projectionLagSeconds = lag.lagSeconds(),
            services = listOf(self, crawler),
        )
    }
}

interface SelfProbe {
    fun probe(): ServiceHealth
}

interface CrawlerProbe {
    fun probe(): ServiceHealth
}
