package com.kotonosora.techblog.api.api

import com.kotonosora.techblog.api.domain.Page
import java.time.Instant

/**
 * Wire DTOs for `/api/v1` (spec 06 file 03). Field names are the frozen contract: the web
 * client, the E2E suite and BA 04 §2 all use these exact camelCase names.
 */

data class SourceSummaryDto(
    val key: String,
    val name: String,
    val enabled: Boolean,
    val discoveryType: String,
    val articleCount: Int,
    val archivedCount: Int,
    val failedCount: Int,
    val lastSuccessAt: Instant?,
    val health: String,
    val updatedAt: Instant,
)

data class SourceListDto(val items: List<SourceSummaryDto>)

data class ArticleSummaryDto(
    val id: String,
    val sourceKey: String,
    val title: String,
    val slug: String,
    val author: String?,
    val publishedAt: Instant?,
    val archivedAt: Instant?,
    val status: String,
    /** Display form: first 12 hex chars (spec 06 file 03 §1). */
    val contentSha256: String,
)

data class ArticleDetailDto(
    val id: String,
    val sourceKey: String,
    val title: String,
    val slug: String,
    val author: String?,
    val publishedAt: Instant?,
    val archivedAt: Instant?,
    val status: String,
    val contentSha256: String,
    val contentMarkdown: String,
    val assetBasePath: String,
    val originalUrl: String,
    val sourceUrl: String,
    val fetchedAt: Instant?,
)

data class JobSummaryDto(
    val id: String,
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

data class JobFailureDto(
    val articleId: String,
    val title: String,
    val failureCode: String,
    val failureReason: String,
    val attemptCount: Int,
    val lastAttemptAt: Instant,
)

data class ListResponse<T>(
    val items: List<T>,
    val page: Int,
    val size: Int,
    val total: Long,
) {
    companion object {
        fun <T, R> of(page: Page<T>, map: (T) -> R): ListResponse<R> =
            ListResponse(page.items.map(map), page.page, page.size, page.total)
    }
}

data class CreateJobsRequest(
    val sourceKeys: List<String>? = null,
    val all: Boolean? = null,
    val jobType: String? = null,
)

data class CreateJobsResponse(val items: List<JobSummaryDto>)

data class SetEnabledRequest(val enabled: Boolean? = null)

data class OpsSummaryDto(
    val checkedAt: Instant,
    val projectionLagSeconds: Int,
    val services: List<ServiceHealthDto>,
)

data class ServiceHealthDto(
    val service: String,
    val status: String,
    val checkedAt: Instant,
    val details: List<String>,
)
