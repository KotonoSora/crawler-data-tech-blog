package com.techblog.api.api

import com.techblog.api.domain.ArticleView
import com.techblog.api.domain.JobFailure
import com.techblog.api.domain.JobView
import com.techblog.api.domain.ServiceHealth
import com.techblog.api.domain.SourceView
import com.techblog.api.domain.ProjectionLagTracker

// Domain → wire mapping. Kept in one file so the contract has exactly one translation point.
// `contentSha256` is stored full-length but exposed as the first 12 hex chars (spec 06 §1).

fun SourceView.toDto(health: String): SourceSummaryDto = SourceSummaryDto(
    key = key,
    name = name,
    enabled = enabled,
    discoveryType = discoveryType,
    articleCount = articleCount,
    archivedCount = archivedCount,
    failedCount = failedCount,
    lastSuccessAt = lastSuccessAt,
    health = health,
    updatedAt = updatedAt,
)

fun ArticleView.toSummary(): ArticleSummaryDto = ArticleSummaryDto(
    id = id,
    sourceKey = sourceKey,
    title = title,
    slug = slug,
    author = author,
    publishedAt = publishedAt,
    archivedAt = archivedAt,
    status = status,
    contentSha256 = displaySha(contentSha256),
)

fun ArticleView.toDetail(contentMarkdown: String): ArticleDetailDto = ArticleDetailDto(
    id = id,
    sourceKey = sourceKey,
    title = title,
    slug = slug,
    author = author,
    publishedAt = publishedAt,
    archivedAt = archivedAt,
    status = status,
    contentSha256 = displaySha(contentSha256),
    contentMarkdown = contentMarkdown,
    assetBasePath = "/api/v1/articles/$id/assets",
    originalUrl = originalUrl ?: "",
    sourceUrl = sourceUrl ?: "",
    fetchedAt = fetchedAt,
)

fun JobView.toDto(): JobSummaryDto = JobSummaryDto(
    id = id,
    sourceKey = sourceKey,
    jobType = jobType,
    status = status,
    requestedAt = requestedAt,
    startedAt = startedAt,
    finishedAt = finishedAt,
    discoveredCount = discoveredCount,
    archivedCount = archivedCount,
    skippedCount = skippedCount,
    failedCount = failedCount,
)

fun JobFailure.toDto(): JobFailureDto = JobFailureDto(
    articleId = articleId,
    title = title,
    failureCode = failureCode,
    failureReason = failureReason,
    attemptCount = attemptCount,
    lastAttemptAt = lastAttemptAt,
)

fun ServiceHealth.toDto(): ServiceHealthDto = ServiceHealthDto(
    service = service,
    status = status,
    checkedAt = checkedAt,
    details = details,
)

fun displaySha(value: String?): String = when {
    value.isNullOrBlank() -> ""
    value.length > 12 -> value.take(12)
    else -> value
}

/** Exposed for tests: the header value is the tracker's integer seconds, never negative. */
fun ProjectionLagTracker.headerValue(): String = lagSeconds().toString()
