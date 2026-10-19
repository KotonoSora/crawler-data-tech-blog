package com.kotonosora.techblog.crawler.config

import org.springframework.boot.context.properties.ConfigurationProperties

@ConfigurationProperties(prefix = "crawler")
data class CrawlerProperties(
    /** api | worker | all — single node default is all. */
    val role: String = "all",
    /** Global concurrent hosts (NFR-03, spec 02). */
    val globalHosts: Int = 4,
    /** Contact address embedded in the crawler User-Agent. */
    val contact: String = "",
    /** Archive root inside the container. */
    val archiveRoot: String = "/app/data/uploads/crawl",
    /** Politeness delay per host (ms); Medium-family hosts use mediumDelayMs. */
    val defaultDelayMs: Long = 2000,
    val mediumDelayMs: Long = 3000,
    /** HTTP budgets (spec 02 file 03): connect 10 s, read 30 s, HTML cap 10 MB. */
    val connectTimeoutMs: Long = 10_000,
    val readTimeoutMs: Long = 30_000,
    val maxHtmlBytes: Long = 10 * 1024 * 1024,
    /** Content cap before extraction (spec 04 file 03 §3: EXTRACT-EMPTY-CONTENT < 200 chars). */
    val minContentChars: Int = 200,
    /** Assets per article: 100 files / 50 MB (BA 04 §5). */
    val maxAssets: Int = 100,
    val maxAssetBytes: Long = 50L * 1024 * 1024,
    /** Discovery caps per job: backfill pages deeper than an incremental window. */
    val maxLinksBackfill: Int = 500,
    val maxLinksIncremental: Int = 50,
    /** 5 attempts at 30 s, 2 m, 10 m, 1 h, 6 h (BR-04). */
    val retryBackoffSeconds: List<Long> = listOf(30, 120, 600, 3600, 21600),
    /** robots.txt cache lifetime. */
    val robotsTtlSeconds: Long = 3600,
    /** Job lease: a crashed runner's job is reclaimed after this idle window. */
    val jobLeaseSeconds: Long = 300,
    /** Free-space guard (STORE-DISK-FULL): stop the job below this. */
    val minFreeBytes: Long = 5L * 1024 * 1024 * 1024,
)
