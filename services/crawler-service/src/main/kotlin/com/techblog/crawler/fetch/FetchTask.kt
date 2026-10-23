package com.techblog.crawler.fetch

import com.techblog.crawler.config.CrawlerProperties
import com.techblog.crawler.domain.Article
import com.techblog.crawler.domain.ArticleFetchState
import com.techblog.crawler.domain.ArticleRepository
import com.techblog.crawler.domain.ConditionalGetStore
import com.techblog.crawler.domain.ConditionalValidators
import com.techblog.crawler.domain.FetchClaim
import com.techblog.crawler.domain.FetchLogEntry
import com.techblog.crawler.domain.FetchLogWriter
import com.techblog.crawler.domain.FetchMessage
import com.techblog.crawler.domain.FetchOutcome
import com.techblog.crawler.domain.FetchPort
import com.techblog.crawler.domain.FetchQueue
import com.techblog.crawler.domain.FetchResult
import com.techblog.crawler.domain.HostGate
import com.techblog.crawler.domain.OutcomeMapper
import com.techblog.crawler.domain.RetryPolicy
import com.techblog.crawler.domain.RetryQueue
import com.techblog.crawler.domain.RobotsGate
import com.techblog.crawler.domain.Urls
import com.techblog.crawler.domain.UserAgent
import com.techblog.crawler.observability.CrawlerMetrics
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Service
import java.time.Duration
import java.time.Instant

/**
 * FetchTask (spec 02 file 01 §4): the fixed order for one claimed article.
 *
 * 1. robots.txt — a denial is a recorded skip, never a request.
 * 2. HostGate — `tb:pause:{host}` means "reschedule, no request, no row, no attempt consumed";
 *    the gate also enforces 1 request per host, the global 4, and the 2000/3000 ms gap.
 * 3. Conditional GET — send `If-None-Match` / `If-Modified-Since` from `http_cache`.
 * 4. FetchClient — one attempt, classified by [OutcomeMapper].
 * 5. 304 guard — a 304 without an archived copy triggers exactly one unconditional re-GET.
 * 6. FetchLogWriter — one `fetch_log` row per HTTP attempt + the article fetch-state in a single
 *    transaction; the queue message is acknowledged only after this returns.
 * 7. Retry — a retryable failure is scheduled into `tb:retry` with score = ready epoch ms.
 *
 * A successful body leaves this component untouched for spec 03 (extraction): the caller owns
 * the archive write and the final `archived` state.
 */
@Service
class FetchTask(
    private val properties: CrawlerProperties,
    private val articles: ArticleRepository,
    private val robots: RobotsGate,
    private val hostGate: HostGate,
    private val conditionalGet: ConditionalGetStore,
    private val fetcher: FetchPort,
    private val fetchLog: FetchLogWriter,
    private val fetchQueue: FetchQueue,
    private val retryQueue: RetryQueue,
    private val metrics: CrawlerMetrics,
) {
    private val log = LoggerFactory.getLogger(javaClass)

    sealed interface Result {
        /** A classified fetch; [article] carries the committed fetch state. */
        data class Fetched(val fetch: FetchResult, val article: Article) : Result

        /** robots.txt denied the URL; `fetch_log` holds a `robots_denied` row. */
        data class Denied(val article: Article, val reason: String) : Result

        /** Host paused or gate busy: nothing written and the attempt was restored. */
        data class Deferred(val reason: String, val pausedUntil: Instant?, val nextAttemptAt: Instant) : Result
    }

    fun execute(article: Article, sourceKey: String, jobId: String?): Result {
        val host = Urls.host(article.canonicalUrl)
        // Step 1 + step 7 of file 01 §4: the producer queued this article on `tb:q:{host}`;
        // claim it and acknowledge only after the row/state commit succeeds. If the commit
        // throws, the message stays in `:processing` (unacknowledged) for a future reaper and
        // the DB `processing` row is reclaimed at boot.
        val claim = claimFor(article, host)
        val result = try {
            executeClaimed(article, sourceKey, jobId, host)
        } catch (error: Throwable) {
            // The state transaction did not commit, so the message must not be acknowledged:
            // put it back on the ready list (the DB `processing` row is reclaimed at boot).
            claim?.let {
                runCatching { fetchQueue.enqueue(it.message) }
                runCatching { fetchQueue.acknowledge(host, it) }
            }
            throw error
        }
        claim?.let { fetchQueue.acknowledge(host, it) }
        return result
    }

    /**
     * Claims the head only when it is this article's message. A foreign head (another source on
     * the same host) stays queued for its own DB row; unlike a blind BLMOVE, that never leaves a
     * message stuck in the processing list. The DB `claim` remains the single-processing mutex.
     */
    private fun claimFor(article: Article, host: String): FetchClaim? = runCatching {
        if (!fetchQueue.available()) return null
        val head = fetchQueue.peek(host) ?: return null
        if (head.articleId != article.id) {
            // A message for an article that is already terminal (job cancelled, row archived by
            // another path) is drained instead of blocking the host queue forever.
            val stale = articles.findById(head.articleId)
            if (stale == null || stale.status !in PENDING_STATUSES) {
                val dropped = fetchQueue.claim(host, CLAIM_TIMEOUT)
                if (dropped != null && dropped.message.articleId == head.articleId) {
                    fetchQueue.acknowledge(host, dropped)
                } else if (dropped != null) {
                    // Raced with another claimant: keep the head we did get.
                    fetchQueue.enqueue(dropped.message)
                    fetchQueue.acknowledge(host, dropped)
                }
            }
            return null
        }
        val claim = fetchQueue.claim(host, CLAIM_TIMEOUT) ?: return null
        if (claim.message.articleId == article.id) {
            claim
        } else {
            fetchQueue.enqueue(claim.message)
            fetchQueue.acknowledge(host, claim)
            null
        }
    }.getOrNull()

    private fun executeClaimed(
        article: Article,
        sourceKey: String,
        jobId: String?,
        host: String,
    ): Result {
        val userAgent = UserAgent.header(properties.contact)
        val attempt = article.attemptCount

        // 1. robots.txt (RFC 9309): no request is made when the URL is disallowed.
        val decision = try {
            robots.check(article.canonicalUrl, userAgent)
        } catch (paused: HostPaused) {
            return defer(article, sourceKey, jobId, host, paused.pausedUntil, "host paused")
        } catch (busy: HostGateBusy) {
            return defer(article, sourceKey, jobId, host, null, busy.message ?: "host gate busy")
        }
        if (!decision.allowed) {
            val reason = decision.reason ?: "robots.txt disallows the URL."
            val denied = FetchResult.failed(FetchOutcome.ROBOTS_DENIED, null, "DISC-ROBOTS-DENIED", reason, 0)
            val updated = fetchLog.write(
                entry(article, jobId, host, attempt, denied),
                ArticleFetchState("skipped", "DISC-ROBOTS-DENIED", reason, attempt, null),
            ) ?: article
            return Result.Denied(updated, reason)
        }

        // 2-4. Conditional GET + one fetch attempt, serialized by the host gate.
        val validators = conditionalGet.find(article.canonicalUrl)
        var result = try {
            fetchOnce(article, host, userAgent, validators)
        } catch (paused: HostPaused) {
            return defer(article, sourceKey, jobId, host, paused.pausedUntil, "host paused")
        } catch (busy: HostGateBusy) {
            return defer(article, sourceKey, jobId, host, null, busy.message ?: "host gate busy")
        }
        hostGate.recordOutcome(host, result.outcome, result.statusCode)
        metrics.fetchAttempt(result.outcome.wire)

        // 5. 304 handling (file 05 §5).
        if (result.outcome == FetchOutcome.NOT_MODIFIED) {
            if (article.archivedAt != null && article.contentSha256 != null) {
                // The archived copy stays the system of record; refresh only `checked_at`.
                conditionalGet.save(
                    article.canonicalUrl,
                    result.etag ?: validators?.etag,
                    result.lastModified ?: validators?.lastModified,
                    304,
                )
                val updated = fetchLog.write(
                    entry(article, jobId, host, attempt, result),
                    ArticleFetchState("archived", null, null, attempt, null),
                ) ?: article
                return Result.Fetched(result, updated)
            }
            // No archived copy yet, so the 304 cannot be trusted: exactly one unconditional
            // re-GET, through the same gate (the 2 s gap still applies).
            fetchLog.write(entry(article, jobId, host, attempt, result), null)
            result = try {
                fetchOnce(article, host, userAgent, null)
            } catch (paused: HostPaused) {
                return defer(article, sourceKey, jobId, host, paused.pausedUntil, "host paused")
            } catch (busy: HostGateBusy) {
                return defer(article, sourceKey, jobId, host, null, busy.message ?: "host gate busy")
            }
            hostGate.recordOutcome(host, result.outcome, result.statusCode)
            metrics.fetchAttempt(result.outcome.wire)
            if (result.outcome == FetchOutcome.NOT_MODIFIED) {
                val reason = "304 without an archived copy after an unconditional re-GET."
                val updated = fetchLog.write(
                    entry(article, jobId, host, attempt, result),
                    ArticleFetchState("failed", "FETCH-HTTP-TERMINAL", reason, attempt, null),
                ) ?: article
                return Result.Fetched(result, updated)
            }
        }

        if (result.ok) {
            conditionalGet.save(article.canonicalUrl, result.etag, result.lastModified, result.statusCode ?: 200)
            val updated = fetchLog.write(entry(article, jobId, host, attempt, result), null) ?: article
            return Result.Fetched(result, updated)
        }

        // 6-7. Failure: row + state in one transaction, then the retry schedule.
        metrics.fetchFailure(sourceKey, result.failureCode ?: "FETCH-HTTP-TERMINAL")
        val state = failureState(article, result)
        val updated = fetchLog.write(entry(article, jobId, host, attempt, result), state) ?: article
        if (state.nextAttemptAt != null) {
            retryQueue.schedule(
                FetchMessage(
                    articleId = article.id,
                    sourceKey = sourceKey,
                    host = host,
                    url = article.canonicalUrl,
                    jobId = jobId,
                    // The message carries the *next* attempt; the DB claim is authoritative.
                    attempt = state.attemptCount + 1,
                    enqueuedAt = Instant.now(),
                ),
                state.nextAttemptAt,
            )
        }
        return Result.Fetched(result, updated)
    }

    // -----------------------------------------------------------------------
    // Steps
    // -----------------------------------------------------------------------

    private fun fetchOnce(
        article: Article,
        host: String,
        userAgent: String,
        validators: ConditionalValidators?,
    ): FetchResult = hostGate.withPermit(host, delayFor(host)) {
        fetcher.get(
            url = article.canonicalUrl,
            userAgent = userAgent,
            accept = UserAgent.ACCEPT_ARTICLE,
            validators = validators,
            maxBytes = properties.maxHtmlBytes,
            timeoutMs = properties.readTimeoutMs,
        )
    }

    /**
     * File 05 §2: "while paused, re-schedule to `tb:retry`, score = pause expiry epoch ms;
     * no request, no row, no `attempt` consumed". `articles.claim` already incremented
     * `attempt_count`, so it is restored here.
     */
    private fun defer(
        article: Article,
        sourceKey: String,
        jobId: String?,
        host: String,
        pausedUntil: Instant?,
        reason: String,
    ): Result.Deferred {
        val readyAt = pausedUntil ?: Instant.now().plusSeconds(properties.retryBackoffSeconds.firstOrNull() ?: 30L)
        val restoredAttempts = (article.attemptCount - 1).coerceAtLeast(0)
        articles.update(
            article.copy(
                status = "queued",
                attemptCount = restoredAttempts,
                nextAttemptAt = readyAt,
            ),
        )
        runCatching {
            retryQueue.schedule(
                FetchMessage(
                    articleId = article.id,
                    sourceKey = sourceKey,
                    host = host,
                    url = article.canonicalUrl,
                    jobId = jobId,
                    attempt = restoredAttempts + 1,
                    enqueuedAt = Instant.now(),
                ),
                readyAt,
            )
        }.onFailure { error ->
            log.warn("fetch_defer_schedule_failed articleId={} reason={}", article.id, error.message)
        }
        log.info("fetch_deferred articleId={} host={} readyAt={} reason={}", article.id, host, readyAt, reason)
        return Result.Deferred(reason, pausedUntil, readyAt)
    }

    private fun failureState(article: Article, result: FetchResult): ArticleFetchState {
        val code = result.failureCode ?: "FETCH-HTTP-TERMINAL"
        val reason = result.failureReason ?: "Fetch failed."

        // File 05 §3: 410 Gone is a recorded skip, not a failure (the article was removed).
        if (result.statusCode == 410) {
            return ArticleFetchState("skipped", code, reason, article.attemptCount, null)
        }

        val terminal = result.outcome == FetchOutcome.TOO_LARGE ||
            result.outcome == FetchOutcome.BLOCKED ||
            code == "FETCH-HTTP-TERMINAL"
        if (terminal) {
            val status = if (result.outcome == FetchOutcome.BLOCKED) "needs_review" else "failed"
            return ArticleFetchState(status, code, reason, article.attemptCount, null)
        }

        val next = RetryPolicy.nextAttempt(
            attemptCount = article.attemptCount,
            backoffSeconds = properties.retryBackoffSeconds,
            retryAfterSeconds = result.retryAfterSeconds,
        ) ?: return ArticleFetchState(
            "failed",
            "FETCH-BACKOFF-EXHAUSTED",
            reason,
            article.attemptCount,
            null,
        )
        // 5xx carries FETCH-BACKOFF-EXHAUSTED only at exhaustion (file 05 §3); while queued the
        // code stays empty so the UI does not claim a terminal state.
        val queuedCode = if (code == "FETCH-BACKOFF-EXHAUSTED") null else code
        return ArticleFetchState("queued", queuedCode, reason, article.attemptCount, next)
    }

    private fun entry(
        article: Article,
        jobId: String?,
        host: String,
        attempt: Int,
        result: FetchResult,
    ): FetchLogEntry = FetchLogEntry(
        articleId = article.id,
        jobId = jobId,
        host = host,
        url = article.canonicalUrl,
        method = "GET",
        statusCode = result.statusCode,
        outcome = result.outcome.wire,
        durationMs = result.durationMs,
        bytes = result.bytes,
        attempt = attempt,
    )

    private fun delayFor(host: String): Long =
        if (OutcomeMapper.isMediumFamily(host)) properties.mediumDelayMs else properties.defaultDelayMs

    private companion object {
        /** Spec 03 §4 `BLMOVE ... 5`; the current adapter never blocks, but keeps the budget. */
        val CLAIM_TIMEOUT: Duration = Duration.ofSeconds(5)
        val PENDING_STATUSES = setOf("discovered", "queued", "processing")
    }
}
