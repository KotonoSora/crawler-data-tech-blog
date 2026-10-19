package com.kotonosora.techblog.api.config

import org.springframework.boot.context.properties.ConfigurationProperties

@ConfigurationProperties(prefix = "api")
data class ApiProperties(
    /** crawler-service internal base URL (compose DNS in containers). */
    val crawlerBaseUrl: String = "http://localhost:8080",
    /** Command proxy: connect 2 s / read 5 s (spec 06, file 01). */
    val commandConnectTimeoutMs: Long = 2000,
    val commandReadTimeoutMs: Long = 5000,
    /** Content/asset proxy needs a longer read timeout than a command (file 03 §7). */
    val contentReadTimeoutMs: Long = 30_000,
    /** On-demand content cache (spec 06, file 01). */
    val contentCacheTtlSeconds: Long = 300,
    val contentCacheMaxEntries: Int = 200,
    val contentCacheMaxBodyBytes: Long = 204_800,
    /** Event stream consumer (spec 06, file 01 §4). */
    val eventStream: String = "tb:events",
    val consumerGroup: String = "api-projections",
    val consumerName: String = "api-service-1",
    /** Crawler registry reconciliation cadence (file 01 §4). */
    val reconcileIntervalMs: Long = 60_000,
    /** Dev-only CORS origin for the Vite shell (file 05 §2). */
    val devCorsOrigin: String = "http://localhost:5173",
)
