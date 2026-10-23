package com.techblog.crawler.config

import org.springframework.boot.context.properties.ConfigurationProperties

@ConfigurationProperties(prefix = "crawler")
data class CrawlerProperties(
    /** api | worker | all — single node default is all. */
    val role: String = "all",
    /** Global concurrent hosts (NFR-03, spec 02). */
    val globalHosts: Int = 4,
    /** Contact address embedded in the crawler User-Agent (CRAWLER_CONTACT). */
    val contact: String = "",
    /** Archive root inside the container. */
    val archiveRoot: String = "/app/data/uploads/crawl",
    /** Temporary write area; stale `.tb-*.part` files are purged after one hour. */
    val tmpDir: String = "/app/data/tmp",
    /** Politeness delay per host (ms); Medium-family hosts use mediumDelayMs. */
    val defaultDelayMs: Long = 2000,
    val mediumDelayMs: Long = 3000,
    /** HTTP budgets (spec 02 file 01/05): connect 10 s, read 30 s, total 60 s, HTML cap 10 MB. */
    val connectTimeoutMs: Long = 10_000,
    val readTimeoutMs: Long = 30_000,
    val fetchTotalTimeoutMs: Long = 60_000,
    val maxHtmlBytes: Long = 10 * 1024 * 1024,
    /** Redirects: <=3, same host only (file 05 §1). */
    val maxRedirects: Int = 3,
    /**
     * HTTPS on 443 only (file 05 §4). The flag exists for fixture servers in tests; production
     * configuration must never enable it.
     */
    val allowInsecureHttp: Boolean = false,
    /** robots.txt cap and cache lifetimes (file 05 §1): 512 KB; 24 h success, 300 s failure. */
    val robotsMaxBytes: Long = 512L * 1024,
    val robotsTtlSeconds: Long = 86_400,
    val robotsFailureTtlSeconds: Long = 300,
    /** Within-host breaker: 20 consecutive counted failures pause the host for 1800 s (file 05 §2). */
    val breakerThreshold: Int = 20,
    val hostPauseSeconds: Long = 1800,
    /** Redis fetch-stage keys (spec 02 file 03 §4, file 05 §1; spec 04 file 01 §4). */
    val fetchQueuePrefix: String = "tb:q:",
    val retryQueueKey: String = "tb:retry",
    val pauseKeyPrefix: String = "tb:pause:",
    val robotsCachePrefix: String = "tb:robots:",
    val hostLockPrefix: String = "tb:lock:host:",
    /** Set of hosts with work (spec 04 §4): `SADD` on enqueue, `SREM` when both lists are empty. */
    val hostsKey: String = "tb:hosts",
    /** Per-article lease (spec 04 §4): `SET NX PX 300000`, heartbeat every 60 s. */
    val articleLockPrefix: String = "tb:lock:article:",
    val hostLockTtlSeconds: Long = 60,
    val hostLockRenewSeconds: Long = 20,
    val articleLockTtlSeconds: Long = 300,
    val articleLockHeartbeatSeconds: Long = 60,
    /** A claim older than this is reclaimed (spec 04 §4: idle >600 s). */
    val processingIdleSeconds: Long = 600,
    /** `ZRANGEBYSCORE ... LIMIT 0 500` (spec 04 §4). */
    val retryPromoteLimit: Int = 500,
    /** Resume a paused job only above this free space for [resumeStableSeconds] (spec 04 §2). */
    val resumeMinFreeBytes: Long = 6L * 1024 * 1024 * 1024,
    val resumeStableSeconds: Long = 60,
    /** One queue message is <=4 KB (file 03 §4). */
    val maxQueueMessageBytes: Int = 4096,
    /** Content cap before extraction (spec 04 file 03 §3: EXTRACT-EMPTY-CONTENT < 200 chars). */
    val minContentChars: Int = 200,
    /** Assets per article: 100 files / 50 MB (BA 04 §5). */
    val maxAssets: Int = 100,
    val maxAssetBytes: Long = 50L * 1024 * 1024,
    /** Total article budget (NFR-08): content is capped at 2 MB, so assets get the remainder. */
    val maxArticleBytes: Long = 50L * 1024 * 1024,
    /** Discovery caps per job: backfill pages deeper than an incremental window. */
    val maxLinksBackfill: Int = 500,
    val maxLinksIncremental: Int = 50,
    /** 5 attempts at 30 s, 2 m, 10 m, 1 h, 6 h (BR-04). */
    val retryBackoffSeconds: List<Long> = listOf(30, 120, 600, 3600, 21600),
    /** Job lease: a crashed runner's job is reclaimed after this idle window. */
    val jobLeaseSeconds: Long = 300,
    /** Free-space guard (STORE-DISK-FULL): stop the job below this. */
    val minFreeBytes: Long = 5L * 1024 * 1024 * 1024,
    /** Redis Streams event channel (spec 04 file 03 §3). */
    val eventStream: String = "tb:events",
    /** Staleness threshold shown by ops/dashboard (spec 05 file 01 §5). */
    val staleAfterHours: Long = 72,
)
