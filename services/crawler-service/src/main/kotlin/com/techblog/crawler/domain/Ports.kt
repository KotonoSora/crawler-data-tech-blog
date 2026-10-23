package com.techblog.crawler.domain

import java.time.Instant

/**
 * Ports for persistence. Adapters are JdbcTemplate repositories in `data`; the crawler
 * pipeline, job manager and controllers depend only on these interfaces.
 */
interface SourceRepository {
    fun findAll(): List<Source>
    fun findByKey(key: String): Source?
    fun findById(id: String): Source?
    fun setEnabled(key: String, enabled: Boolean): Source?
    fun recordDiscoveryOutcome(sourceId: String, success: Boolean)
    fun registrySnapshot(): List<Source>

    /** Counters for `source.stats`; computed from the article table, never cached. */
    fun stats(sourceId: String): SourceStats
}

interface ArticleRepository {
    fun findById(id: String): Article?
    fun findByCanonicalUrl(url: String): Article?
    fun insertIfAbsent(article: Article): Article
    fun update(article: Article)
    fun claim(articleId: String, jobId: String?): Article?
    fun markQueued(articleId: String, jobId: String?): Article?
    fun failuresForJob(jobId: String, offset: Long, limit: Int): List<FailureRow>
    fun countFailuresForJob(jobId: String): Long

    /**
     * Re-admit an archived/skipped row into a new incremental job, or attach a discovered row
     * left by an interrupted job (BR-05). The archived copy and its slug stay untouched; the row
     * becomes a due queue entry for a conditional GET.
     * @return true when the row was queued by this call.
     */
    fun requeueForJob(articleId: String, jobId: String): Boolean

    /**
     * Work still owed by a job: fresh `discovered` rows plus `queued` rows that are due now
     * (re-crawl admissions and expired backoffs), oldest first.
     */
    fun findDiscoveredForJob(jobId: String, limit: Int): List<Article>

    /** Queued articles whose retry window is due (manual retry or backoff). */
    fun findDueRetries(limit: Int): List<Article>

    /**
     * Admission: `discovered -> queued` for every row of a job that has not been admitted yet
     * (spec 04 §3). Idempotent; the queue entry is published by the caller.
     */
    fun admitForJob(jobId: String): Int

    /** A slug is unique per source (`uq_article_source_slug`); the processor checks before write. */
    fun slugAvailable(sourceId: String, slug: String, articleId: String): Boolean

    /** Resume a paused/failed job: claimed rows return to `discovered` so they are re-fetched. */
    fun resetProcessingForJob(jobId: String): Int

    /** Boot reclaim: a crashed process leaves `processing` rows with no runner (spec 04 §6). */
    fun resetStaleProcessing(olderThanSeconds: Long): Int

    /**
     * Reconciliation snapshot (spec 06 file 01 §4): archived rows for one source, keyset-paged by
     * id. DEVIATION FLAGGED (spec 06 reconciliation): spec 04 limits internal reads to
     * single-resource, but a hash audit needs a bounded list. Budget: 0 images, 0 databases,
     * +1 internal read endpoint. Rationale: api-service cannot compare content_sha256 otherwise.
     */
    fun snapshotArchived(sourceId: String, afterId: String?, limit: Int): List<ArticleSnapshot>
}

interface JobRepository {
    fun findById(id: String): Job?
    fun findActiveForSource(sourceId: String): Job?
    fun insert(job: Job): Job
    fun update(job: Job)

    /**
     * Progress-only update: counters and cursor move only while the row is still `running`.
     * A cancel committed by another request must never be overwritten by a late counter flush.
     */
    fun updateProgress(job: Job): Boolean

    fun findRunnable(): List<Job>
    fun recentForSource(sourceId: String, limit: Int): List<Job>
}

interface RevisionRepository {
    /** Appends the previous sha before an archive overwrite (BR-07, baseline 03 §7). */
    fun append(articleId: String, contentSha256: String)
}

interface FetchLogRepository {
    fun record(entry: FetchLogEntry)
}

/**
 * Conditional GET validators (`http_cache`, V002). A missing row means "no validators yet";
 * a 304 keeps the validators and only refreshes `checked_at` (BR-05).
 */
interface ConditionalGetStore {
    fun find(url: String): ConditionalValidators?
    fun save(url: String, etag: String?, lastModified: String?, statusCode: Int)
}

data class ConditionalValidators(val etag: String?, val lastModified: String?)

data class FetchLogEntry(
    val articleId: String?,
    val jobId: String?,
    val host: String,
    val url: String,
    val method: String,
    val statusCode: Int?,
    val outcome: String,
    val durationMs: Int,
    val bytes: Long?,
    val attempt: Int,
)

data class SourceStats(
    val articleCount: Int,
    val archivedCount: Int,
    val failedCount: Int,
    val lastSuccessAt: Instant?,
)

/** Minimal reconciliation row: identity + archive hash (spec 06 file 01 §4). */
data class ArticleSnapshot(
    val articleId: String,
    val contentSha256: String?,
)

data class FailureRow(
    val articleId: String,
    val title: String,
    val failureCode: String,
    val failureReason: String,
    val attemptCount: Int,
    val lastAttemptAt: Instant,
)

/** Event publication (spec 04 file 03 §3). At-least-once; the consumer dedupes. */
interface EventPublisher {
    fun publish(type: String, payload: Map<String, Any?>)
}

/** Archive layout: `uploads/crawl/<source>/<slug>/{content.md, meta.json, assets/}`. */
interface ArchiveStore {
    fun writeArticle(sourceKey: String, slug: String, markdown: String, meta: Map<String, Any?>)
    fun writeAsset(sourceKey: String, slug: String, fileName: String, bytes: ByteArray)
    /** Default no-op keeps lightweight test doubles source-compatible; the disk adapter prunes. */
    fun pruneAssets(sourceKey: String, slug: String, keep: Set<String>) = Unit
    fun readContent(sourceKey: String, slug: String): ByteArray?
    fun readAsset(sourceKey: String, slug: String, fileName: String): ByteArray?
    fun freeBytes(): Long
}
