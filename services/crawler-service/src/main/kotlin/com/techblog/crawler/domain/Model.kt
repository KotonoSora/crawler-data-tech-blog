package com.techblog.crawler.domain

import java.time.Instant

/** BA 05 §3 closed error-code set for the internal surface (spec 04 file 03 §4). */
enum class CrawlerErrorCode(val wire: String, val status: Int, val title: String) {
    CFG_SOURCE_NOT_FOUND("CFG-SOURCE-NOT-FOUND", 404, "Unknown source"),
    CFG_INVALID_REQUEST("CFG-INVALID-REQUEST", 400, "Invalid request"),
    JOB_DUPLICATE_ACTIVE("JOB-DUPLICATE-ACTIVE", 409, "Job already active"),
    JOB_NOT_FOUND("JOB-NOT-FOUND", 404, "Job not found"),
    JOB_INVALID_STATE("JOB-INVALID-STATE", 409, "Invalid job state"),
    JOB_CANCEL_REFUSED("JOB-CANCEL-REFUSED", 409, "Cancel refused"),
    ART_NOT_FOUND("ART-NOT-FOUND", 404, "Article not found"),
    FETCH_BACKOFF_EXHAUSTED("FETCH-BACKOFF-EXHAUSTED", 409, "Retry window exhausted"),
    FETCH_TOO_LARGE("FETCH-TOO-LARGE", 409, "Response too large"),
    FETCH_BLOCKED("FETCH-BLOCKED", 409, "Fetch blocked"),
    EXTRACT_PARSE_FAILED("EXTRACT-PARSE-FAILED", 422, "Extraction failed"),
    EXTRACT_EMPTY_CONTENT("EXTRACT-EMPTY-CONTENT", 422, "Extracted content too short"),
    STORE_DISK_FULL("STORE-DISK-FULL", 507, "Archive volume full"),
    STORE_INVALID_SLUG("STORE-INVALID-SLUG", 422, "Invalid archive slug"),
    STORE_RENAME_FAILED("STORE-RENAME-FAILED", 500, "Archive write failed"),
    OPS_DEPENDENCY_DOWN("OPS-DEPENDENCY-DOWN", 503, "Dependency unavailable");

    companion object {
        fun fromWire(code: String): CrawlerErrorCode? = entries.firstOrNull { it.wire == code }
    }
}

class CrawlerException(
    val code: CrawlerErrorCode,
    override val message: String,
    val activeJobId: String? = null,
    cause: Throwable? = null,
) : RuntimeException(message, cause)

class SourceNotFound(key: String) :
    CrawlerException(CrawlerErrorCode.CFG_SOURCE_NOT_FOUND, "No source with key '$key'.")

class JobNotFound(id: String) :
    CrawlerException(CrawlerErrorCode.JOB_NOT_FOUND, "No job with id '$id'.")

class DuplicateActiveJob(key: String, activeJobId: String) :
    CrawlerException(
        CrawlerErrorCode.JOB_DUPLICATE_ACTIVE,
        "source $key already has job $activeJobId in status running",
        activeJobId = activeJobId,
    )

class JobInvalidState(detail: String) : CrawlerException(CrawlerErrorCode.JOB_INVALID_STATE, detail)

class CancelRefused(detail: String) : CrawlerException(CrawlerErrorCode.JOB_CANCEL_REFUSED, detail)

class InvalidRequest(detail: String) : CrawlerException(CrawlerErrorCode.CFG_INVALID_REQUEST, detail)

class ArticleNotFound(id: String, status: String? = null) :
    CrawlerException(
        CrawlerErrorCode.ART_NOT_FOUND,
        if (status == null) "No article with id '$id'." else "Article '$id' is '$status'.",
    )

class RetryRefused(code: CrawlerErrorCode, detail: String) : CrawlerException(code, detail)

// ---------------------------------------------------------------------------
// Domain model (system of record: crawler_db)
// ---------------------------------------------------------------------------

enum class SourceHealth { FRESH, STALE, BROKEN }

data class Source(
    val id: String,
    val key: String,
    val name: String,
    val discoveryType: String,
    val discoveryUrl: String,
    val listingUrl: String?,
    val discoveryConfig: String,
    val enabled: Boolean,
    val rateLimitMs: Int,
    val notes: String?,
    val consecutiveDiscoveryFailures: Int,
    val createdAt: Instant,
    val updatedAt: Instant,
)

data class Article(
    val id: String,
    val sourceId: String,
    val canonicalUrl: String,
    val originalUrl: String?,
    val title: String?,
    val author: String?,
    val slug: String?,
    val publishedAt: Instant?,
    val fetchedAt: Instant?,
    val archivedAt: Instant?,
    val contentSha256: String?,
    val wordCount: Int?,
    val status: String,
    val failureCode: String?,
    val failureReason: String?,
    val attemptCount: Int,
    val nextAttemptAt: Instant?,
    val lastJobId: String?,
)

data class Job(
    val id: String,
    val sourceId: String,
    val jobType: String,
    val status: String,
    val cursor: String?,
    val requestedAt: Instant,
    val startedAt: Instant?,
    val finishedAt: Instant?,
    val discoveredCount: Int,
    val archivedCount: Int,
    val skippedCount: Int,
    val failedCount: Int,
    val lastError: String?,
) {
    val active: Boolean get() = status == "pending" || status == "running" || status == "paused"
    val terminal: Boolean get() = status == "completed" || status == "failed" || status == "cancelled"
}

/** Job lifecycle (spec 04 file 01 §2). Only these transitions are legal. */
object JobStateMachine {
    private val ALLOWED = mapOf(
        "pending" to setOf("running", "cancelled", "failed"),
        "running" to setOf("paused", "completed", "failed", "cancelled"),
        "paused" to setOf("running", "cancelled", "failed"),
        "completed" to emptySet(),
        "failed" to emptySet(),
        "cancelled" to emptySet(),
    )

    fun canTransition(from: String, to: String): Boolean = ALLOWED[from]?.contains(to) == true

    fun require(from: String, to: String) {
        if (!canTransition(from, to)) {
            throw JobInvalidState("Job cannot move from '$from' to '$to'.")
        }
    }
}
