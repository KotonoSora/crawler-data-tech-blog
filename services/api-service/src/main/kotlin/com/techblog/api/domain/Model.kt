package com.techblog.api.domain

import java.time.Instant

/**
 * Stable error codes from BA 05 §3. The set is closed: a rate-limited request (429) reuses
 * CFG-INVALID-REQUEST plus Retry-After, exactly as spec 06 file 05 §3 records.
 */
enum class ErrorCode(val wire: String, val status: Int, val title: String) {
    CFG_SOURCE_NOT_FOUND("CFG-SOURCE-NOT-FOUND", 404, "Unknown source"),
    CFG_INVALID_REQUEST("CFG-INVALID-REQUEST", 400, "Invalid request"),
    JOB_DUPLICATE_ACTIVE("JOB-DUPLICATE-ACTIVE", 409, "Job already active"),
    JOB_NOT_FOUND("JOB-NOT-FOUND", 404, "Job not found"),
    JOB_INVALID_STATE("JOB-INVALID-STATE", 409, "Invalid job state"),
    JOB_CANCEL_REFUSED("JOB-CANCEL-REFUSED", 409, "Cancel refused"),
    ART_NOT_FOUND("ART-NOT-FOUND", 404, "Article not found"),
    OPS_DEPENDENCY_DOWN("OPS-DEPENDENCY-DOWN", 503, "Dependency unavailable");

    companion object {
        fun fromWire(code: String): ErrorCode? = entries.firstOrNull { it.wire == code }
    }
}

/** Domain failure raised anywhere below the web layer; the advice turns it into ProblemDetail. */
open class DomainException(
    val code: ErrorCode,
    override val message: String,
    val activeJobId: String? = null,
    cause: Throwable? = null,
) : RuntimeException(message, cause)

class SourceNotFound(key: String) :
    DomainException(ErrorCode.CFG_SOURCE_NOT_FOUND, "No source with key '$key'.")

class ArticleNotFound(id: String, status: String? = null) :
    DomainException(
        ErrorCode.ART_NOT_FOUND,
        if (status == null) "No article with id '$id'." else "Article '$id' is '$status'; it is not archived.",
    )

class JobNotFound(id: String) :
    DomainException(ErrorCode.JOB_NOT_FOUND, "No job with id '$id'.")

class DuplicateActiveJob(key: String, activeJobId: String) :
    DomainException(
        ErrorCode.JOB_DUPLICATE_ACTIVE,
        "Source '$key' has an active job ($activeJobId).",
        activeJobId = activeJobId,
    )

class InvalidState(detail: String) : DomainException(ErrorCode.JOB_INVALID_STATE, detail)

class CancelRefused(detail: String) : DomainException(ErrorCode.JOB_CANCEL_REFUSED, detail)

class InvalidRequest(detail: String) : DomainException(ErrorCode.CFG_INVALID_REQUEST, detail)

class DependencyDown(detail: String, cause: Throwable? = null) :
    DomainException(ErrorCode.OPS_DEPENDENCY_DOWN, detail, cause = cause)

/** Page request after validation: page ≥ 0, size 1..200 (spec 06 file 03 §6). */
data class PageRequest(val page: Int, val size: Int) {
    val offset: Long get() = page.toLong() * size

    companion object {
        const val DEFAULT_SIZE = 50
        const val MAX_SIZE = 200

        fun of(page: Int?, size: Int?): PageRequest {
            val resolvedPage = page ?: 0
            val resolvedSize = size ?: DEFAULT_SIZE
            if (resolvedPage < 0) throw InvalidRequest("page must be >= 0.")
            if (resolvedSize < 1 || resolvedSize > MAX_SIZE) {
                throw InvalidRequest("size must be between 1 and $MAX_SIZE.")
            }
            return PageRequest(resolvedPage, resolvedSize)
        }
    }
}

data class Page<T>(val items: List<T>, val page: Int, val size: Int, val total: Long)

// ---------------------------------------------------------------------------
// Read-model shapes (api_db projections, spec 06 file 02)
// ---------------------------------------------------------------------------

data class SourceView(
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

data class ArticleView(
    val id: String,
    val sourceKey: String,
    val title: String,
    val slug: String,
    val author: String?,
    val publishedAt: Instant?,
    val archivedAt: Instant?,
    val status: String,
    /** Full 64-hex value in api_db; the API renders the first 12 chars. */
    val contentSha256: String?,
    val originalUrl: String?,
    val sourceUrl: String?,
    val fetchedAt: Instant?,
    /** Event time of the last projection that touched the row (monotonic guard). */
    val updatedAt: Instant = Instant.now(),
)

data class JobView(
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
    /** Event time of the last projection that touched the row (monotonic guard). */
    val updatedAt: Instant = Instant.now(),
)

data class JobFailure(
    val articleId: String,
    val title: String,
    val failureCode: String,
    val failureReason: String,
    val attemptCount: Int,
    val lastAttemptAt: Instant,
)
