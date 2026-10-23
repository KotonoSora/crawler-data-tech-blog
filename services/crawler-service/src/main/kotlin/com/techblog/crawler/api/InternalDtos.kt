package com.techblog.crawler.api

import com.techblog.crawler.domain.Article
import com.techblog.crawler.domain.FailureRow
import com.techblog.crawler.domain.Job
import com.techblog.crawler.domain.Page
import com.techblog.crawler.domain.Source
import com.techblog.crawler.domain.SourceStats
import com.techblog.crawler.domain.Urls
import java.time.Instant

/**
 * Wire DTOs for `/internal/v1` (spec 04 file 03, spec 03 file 03 §4).
 *
 * Additive fields keep `version` at 1: `title`, `author`, `publishedAt`, `originalUrl`,
 * `sourceUrl` and `fetchedAt` are needed by api-service to build ArticleSummary after a retry
 * without a second read. Consumers ignore unknown fields, so this is contract-compatible.
 */

data class JobCreateRequest(
    val sourceKey: String? = null,
    val jobType: String? = null,
)

data class JobCountersDto(
    val discovered: Int,
    val archived: Int,
    val skipped: Int,
    val failed: Int,
)

data class JobViewDto(
    val jobId: String,
    val sourceKey: String,
    val jobType: String,
    val status: String,
    val requestedAt: String,
    val startedAt: String?,
    val finishedAt: String?,
    val counters: JobCountersDto,
    val cursor: String?,
    val lastError: String?,
)

data class ArticleViewDto(
    val articleId: String,
    val sourceKey: String,
    val canonicalUrl: String,
    val host: String,
    val status: String,
    val attemptCount: Int,
    val failureCode: String?,
    val failureReason: String?,
    val nextAttemptAt: String?,
    val lastAttemptAt: String?,
    val slug: String?,
    val contentSha256: String?,
    val wordCount: Int?,
    val archivedAt: String?,
    // Additive (version stays 1) — api-service builds ArticleSummary from these.
    val title: String?,
    val author: String?,
    val publishedAt: String?,
    val originalUrl: String?,
    val sourceUrl: String?,
    val fetchedAt: String?,
)

data class RetryRequest(val force: Boolean? = null)

data class FailureDto(
    val articleId: String,
    val title: String,
    val failureCode: String,
    val failureReason: String,
    val attemptCount: Int,
    val lastAttemptAt: String,
)

data class FailureListDto(
    val items: List<FailureDto>,
    val page: Int,
    val size: Int,
    val total: Long,
)

data class SourceViewDto(
    val sourceKey: String,
    val name: String,
    val enabled: Boolean,
    val discoveryType: String,
    val politenessProfile: String,
    val articleCount: Int,
    val archivedCount: Int,
    val failedCount: Int,
    val lastSuccessAt: String?,
    val activeJobId: String?,
    val consecutiveDiscoveryFailures: Int,
)

data class SourceListDto(val items: List<SourceViewDto>)

/** Reconciliation snapshot page (spec 06 file 01 §4). */
data class ArticleSnapshotDto(
    val articleId: String,
    val contentSha256: String?,
)

data class ArticleSnapshotListDto(
    val items: List<ArticleSnapshotDto>,
    val next: String?,
)

data class SetEnabledRequest(val enabled: Boolean? = null)

object InternalMappers {

    fun job(job: Job, sourceKey: String): JobViewDto = JobViewDto(
        jobId = job.id,
        sourceKey = sourceKey,
        jobType = job.jobType,
        status = job.status,
        requestedAt = iso(job.requestedAt),
        startedAt = job.startedAt?.let(::iso),
        finishedAt = job.finishedAt?.let(::iso),
        counters = JobCountersDto(
            discovered = job.discoveredCount,
            archived = job.archivedCount,
            skipped = job.skippedCount,
            failed = job.failedCount,
        ),
        cursor = job.cursor,
        lastError = job.lastError,
    )

    fun article(article: Article, sourceKey: String, sourceUrl: String?): ArticleViewDto = ArticleViewDto(
        articleId = article.id,
        sourceKey = sourceKey,
        canonicalUrl = article.canonicalUrl,
        host = Urls.host(article.canonicalUrl),
        status = article.status,
        attemptCount = article.attemptCount,
        failureCode = article.failureCode,
        failureReason = article.failureReason,
        nextAttemptAt = article.nextAttemptAt?.let(::iso),
        lastAttemptAt = article.fetchedAt?.let(::iso),
        slug = article.slug,
        contentSha256 = article.contentSha256,
        wordCount = article.wordCount,
        archivedAt = article.archivedAt?.let(::iso),
        title = article.title,
        author = article.author,
        publishedAt = article.publishedAt?.let(::iso),
        originalUrl = article.originalUrl,
        sourceUrl = sourceUrl,
        fetchedAt = article.fetchedAt?.let(::iso),
    )

    fun source(source: Source, stats: SourceStats, activeJobId: String?): SourceViewDto = SourceViewDto(
        sourceKey = source.key,
        name = source.name,
        enabled = source.enabled,
        discoveryType = source.discoveryType,
        politenessProfile = if (source.rateLimitMs >= 3000) "medium" else "default",
        articleCount = stats.articleCount,
        archivedCount = stats.archivedCount,
        failedCount = stats.failedCount,
        lastSuccessAt = stats.lastSuccessAt?.let(::iso),
        activeJobId = activeJobId,
        consecutiveDiscoveryFailures = source.consecutiveDiscoveryFailures,
    )

    fun failure(row: FailureRow): FailureDto = FailureDto(
        articleId = row.articleId,
        title = row.title,
        failureCode = row.failureCode,
        failureReason = row.failureReason,
        attemptCount = row.attemptCount,
        lastAttemptAt = iso(row.lastAttemptAt),
    )

    fun failures(page: Page<FailureRow>): FailureListDto = FailureListDto(
        items = page.items.map(::failure),
        page = page.page,
        size = page.size,
        total = page.total,
    )

    /** ISO 8601 UTC with milliseconds (spec 02 file 03 §1). */
    fun iso(instant: Instant): String = instant.toString()
}
