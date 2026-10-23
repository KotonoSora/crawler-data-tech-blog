package com.techblog.api.domain

import java.time.Instant

/**
 * Ports for the read models. The data package implements them with JdbcTemplate; the domain
 * and api packages never see SQL. Keeping these interfaces separate is what makes the service
 * testable with a fake repository and keeps api_db as a pure projection.
 */
interface SourceReadModel {
    fun findAll(): List<SourceView>
    fun findByKey(key: String): SourceView?
    fun setEnabled(key: String, enabled: Boolean): Boolean
    fun upsert(source: SourceView)

    /**
     * `source.stats` only carries counts + health. Updating those columns alone keeps the
     * operator-controlled `enabled` flag and the registry metadata from being clobbered by a
     * late event (spec 06 file 02 §3).
     */
    fun applyStats(
        sourceKey: String,
        articleCount: Int,
        archivedCount: Int,
        failedCount: Int,
        lastSuccessAt: Instant?,
        health: String,
        occurredAt: Instant,
    )
}

interface ArticleReadModel {
    fun search(q: String?, sourceKey: String?, page: PageRequest): Page<ArticleView>
    fun findById(id: String): ArticleView?
    fun upsert(article: ArticleView)
}

interface JobReadModel {
    fun findAll(page: PageRequest): Page<JobView>
    fun findById(id: String): JobView?
    fun upsert(job: JobView)
}

/** Crawler internal surface used by command proxies, failures and reconciliation. */
interface CrawlerGateway {
    fun createJob(sourceKey: String, jobType: String): CrawlerJob
    fun getJob(jobId: String): CrawlerJob
    fun cancelJob(jobId: String): CrawlerJob
    fun retryArticle(articleId: String): CrawlerArticle
    fun jobFailures(jobId: String, page: PageRequest): Page<JobFailure>
    fun setSourceEnabled(sourceKey: String, enabled: Boolean): CrawlerSource
    fun sourceRegistry(): List<CrawlerSource>
    fun archivedArticleSnapshot(sourceKey: String): Map<String, String?>
    fun article(articleId: String): CrawlerArticle
    fun content(articleId: String): ByteArray
    fun asset(articleId: String, file: String): CrawlerAsset
}

data class CrawlerJob(
    val jobId: String,
    val sourceKey: String,
    val jobType: String,
    val status: String,
    val requestedAt: Instant,
    val startedAt: Instant?,
    val finishedAt: Instant?,
    val discoveredCount: Int,
    val archivedCount: Int,
    val skippedCount: Int,
    val failedCount: Int,
)

data class CrawlerArticle(
    val articleId: String,
    val sourceKey: String,
    val status: String,
    val title: String?,
    val author: String?,
    val slug: String?,
    val canonicalUrl: String,
    val originalUrl: String?,
    val publishedAt: Instant?,
    val archivedAt: Instant?,
    val fetchedAt: Instant?,
    val contentSha256: String?,
)

data class CrawlerSource(
    val sourceKey: String,
    val name: String,
    val enabled: Boolean,
    val discoveryType: String,
    val archivedCount: Int,
    val failedCount: Int,
    val lastSuccessAt: Instant?,
    val consecutiveDiscoveryFailures: Int = 0,
    val articleCount: Int = 0,
)

data class CrawlerAsset(val bytes: ByteArray, val contentType: String)
