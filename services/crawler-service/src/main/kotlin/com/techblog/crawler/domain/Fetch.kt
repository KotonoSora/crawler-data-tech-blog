package com.techblog.crawler.domain

import java.time.Instant

/**
 * Fetch outcome enum (spec 02 file 03 §5, frozen). Exactly one code or none per outcome;
 * [OutcomeMapper] is the only place a status becomes a code.
 */
enum class FetchOutcome(val wire: String, val retryable: Boolean) {
    OK("ok", false),
    NOT_MODIFIED("not_modified", false),
    ROBOTS_DENIED("robots_denied", false),
    HTTP_ERROR("http_error", true),
    TIMEOUT("timeout", true),
    NETWORK_ERROR("network_error", true),
    PARSE_ERROR("parse_error", true),
    TOO_LARGE("too_large", false),
    BLOCKED("blocked", false),
}

/** One HTTP response, already capped and classified. [body] is null unless the outcome is OK. */
data class FetchResult(
    val outcome: FetchOutcome,
    val statusCode: Int?,
    val body: ByteArray?,
    val contentType: String?,
    val etag: String?,
    val lastModified: String?,
    val durationMs: Int,
    val bytes: Long,
    val failureCode: String?,
    val failureReason: String?,
    val retryAfterSeconds: Long? = null,
) {
    val ok: Boolean get() = outcome == FetchOutcome.OK

    companion object {
        fun failed(
            outcome: FetchOutcome,
            statusCode: Int?,
            code: String,
            reason: String,
            durationMs: Int,
            bytes: Long = 0,
            retryAfterSeconds: Long? = null,
        ): FetchResult = FetchResult(
            outcome = outcome,
            statusCode = statusCode,
            body = null,
            contentType = null,
            etag = null,
            lastModified = null,
            durationMs = durationMs,
            bytes = bytes,
            failureCode = code,
            failureReason = reason,
            retryAfterSeconds = retryAfterSeconds,
        )
    }
}

/**
 * Status → outcome/failure-code table (spec 02 file 03 §5; BA 05 §3 closed code set).
 *
 * Medium-family hosts answer 000/403 to non-browser agents; those are transient and must never
 * mark the source removed (BR-15, AGENTS.md). The classifier receives the host so it can make
 * that call without a second lookup.
 */
object OutcomeMapper {
    fun isMediumFamily(host: String): Boolean = MediumTransientClassifier.isMediumFamily(host)

    /**
     * @param transportError non-null when the request never produced a status (timeout,
     *        connection reset, DNS failure).
     */
    fun classify(
        status: Int?,
        host: String,
        transportError: TransportError? = null,
        tooLarge: Boolean = false,
    ): Classification {
        if (tooLarge) {
            return Classification(
                FetchOutcome.TOO_LARGE,
                "FETCH-TOO-LARGE",
                "Response exceeded the 10 MB HTML cap.",
            )
        }
        if (transportError != null) {
            return when (transportError) {
                TransportError.TIMEOUT -> Classification(
                    FetchOutcome.TIMEOUT,
                    "FETCH-TIMEOUT",
                    "Read or connect budget exceeded.",
                )
                TransportError.NETWORK -> Classification(
                    FetchOutcome.NETWORK_ERROR,
                    if (isMediumFamily(host)) "FETCH-MEDIUM-TRANSIENT" else "FETCH-TIMEOUT",
                    "Connection failed: ${transportError.name.lowercase()}.",
                )
            }
        }
        val code = status ?: 0
        // "000" (no HTTP response) from a Medium-family host is transient (BR-15, file 05 §3).
        if (code == 0 && isMediumFamily(host)) {
            return Classification(
                FetchOutcome.NETWORK_ERROR,
                "FETCH-MEDIUM-TRANSIENT",
                "No HTTP response from a Medium-family host; treated as transient.",
            )
        }
        return when {
            code in 200..299 -> Classification(FetchOutcome.OK, null, null)
            code == 304 -> Classification(FetchOutcome.NOT_MODIFIED, null, null)
            code == 408 -> Classification(FetchOutcome.TIMEOUT, "FETCH-TIMEOUT", "HTTP 408 from the origin.")
            code == 429 -> Classification(
                FetchOutcome.HTTP_ERROR,
                "FETCH-RATE-LIMITED",
                "HTTP 429 from the origin; Retry-After honored up to 24 h.",
            )
            code == 403 && isMediumFamily(host) -> Classification(
                FetchOutcome.HTTP_ERROR,
                "FETCH-MEDIUM-TRANSIENT",
                "Medium-family host answered 403 to a non-browser agent; treated as transient.",
            )
            code == 403 -> Classification(
                FetchOutcome.BLOCKED,
                "FETCH-BLOCKED",
                "HTTP 403 from a non-Medium host; treated as a bot block.",
            )
            code == 410 -> Classification(FetchOutcome.HTTP_ERROR, "FETCH-HTTP-TERMINAL", "HTTP 410; article removed.")
            code in 400..499 -> Classification(
                FetchOutcome.HTTP_ERROR,
                "FETCH-HTTP-TERMINAL",
                "HTTP $code; 4xx is terminal.",
            )
            code in 500..599 -> Classification(
                FetchOutcome.HTTP_ERROR,
                "FETCH-BACKOFF-EXHAUSTED",
                "HTTP $code; retried with bounded backoff.",
            )
            else -> Classification(
                FetchOutcome.NETWORK_ERROR,
                "FETCH-TIMEOUT",
                "Unexpected transport state.",
            )
        }
    }

    data class Classification(val outcome: FetchOutcome, val failureCode: String?, val reason: String?)
}

enum class TransportError { TIMEOUT, NETWORK }

/** robots.txt decision for one URL (RFC 9309). */
data class RobotsDecision(val allowed: Boolean, val reason: String? = null)

/**
 * Per-host politeness gate (spec 02 file 01 §1, file 05 §1-§2): one in-flight request per host,
 * a global cap of `CRAWLER_GLOBAL_HOSTS`, a minimum gap between two requests to the same host,
 * the `tb:lock:host:{host}` cross-role lock, `tb:pause:{host}` and the within-host breaker.
 */
interface HostGate {
    /**
     * @throws HostPaused when `tb:pause:{host}` is set and not expired.
     * @throws HostGateBusy when no slot could be granted inside the acquire budget.
     */
    fun <T> withPermit(host: String, minDelayMs: Long, block: () -> T): T

    /**
     * Circuit-breaker accounting (file 05 §2): counted outcomes are 5xx, timeout and network
     * error. 20 consecutive counted failures set `tb:pause:{host}` for 1800 s. A success resets
     * the counter; 429 and 4xx answers do not count.
     */
    fun recordOutcome(host: String, outcome: FetchOutcome, statusCode: Int?)

    /** Pause deadline for the host, or null when the host may be contacted (file 05 §2). */
    fun pauseUntil(host: String): Instant?
}

/** robots.txt fetch + cache. Fail-open on 4xx, fail-closed on 5xx/timeout (RFC 9309). */
interface RobotsGate {
    fun check(url: String, userAgent: String): RobotsDecision
}

/** Minimal HTTP port so tests can replace the network with a fixture server. */
interface FetchPort {
    fun get(
        url: String,
        userAgent: String,
        accept: String?,
        validators: ConditionalValidators?,
        maxBytes: Long,
        timeoutMs: Long,
    ): FetchResult
}

/** A due article work item, ordered by discovery. */
data class WorkItem(
    val article: Article,
    val source: Source,
    val jobId: String?,
    val enqueuedAt: Instant,
)
