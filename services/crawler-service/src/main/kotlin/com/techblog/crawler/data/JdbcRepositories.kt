package com.techblog.crawler.data

import com.techblog.crawler.domain.Article
import com.techblog.crawler.domain.ArticleRepository
import com.techblog.crawler.domain.ArticleSnapshot
import com.techblog.crawler.domain.ConditionalGetStore
import com.techblog.crawler.domain.ConditionalValidators
import com.techblog.crawler.domain.FailureRow
import com.techblog.crawler.domain.FetchLogEntry
import com.techblog.crawler.domain.FetchLogRepository
import com.techblog.crawler.domain.Ids
import com.techblog.crawler.domain.Job
import com.techblog.crawler.domain.JobRepository
import com.techblog.crawler.domain.RevisionRepository
import com.techblog.crawler.domain.Source
import com.techblog.crawler.domain.SourceRepository
import com.techblog.crawler.domain.SourceStats
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.jdbc.core.RowMapper
import org.springframework.stereotype.Repository
import java.sql.ResultSet
import java.sql.Timestamp
import java.time.Instant

private fun ResultSet.instant(column: String): Instant? = getTimestamp(column)?.toInstant()

private fun Instant?.timestamp(): Timestamp? = this?.let { Timestamp.from(it) }

@Repository
class JdbcSourceRepository(
    private val jdbc: JdbcTemplate,
) : SourceRepository {

    private val mapper = RowMapper<Source> { rs, _ ->
        Source(
            id = rs.getString("id"),
            key = rs.getString("source_key"),
            name = rs.getString("name"),
            discoveryType = rs.getString("discovery_type"),
            discoveryUrl = rs.getString("discovery_url"),
            listingUrl = rs.getString("listing_url"),
            discoveryConfig = rs.getString("discovery_config"),
            enabled = rs.getBoolean("enabled"),
            rateLimitMs = rs.getInt("rate_limit_ms"),
            notes = rs.getString("notes"),
            consecutiveDiscoveryFailures = rs.getInt("consecutive_discovery_failures"),
            createdAt = rs.getTimestamp("created_at").toInstant(),
            updatedAt = rs.getTimestamp("updated_at").toInstant(),
        )
    }

    override fun findAll(): List<Source> =
        jdbc.query("$SELECT ORDER BY source_key", mapper)

    override fun findByKey(key: String): Source? =
        jdbc.query("$SELECT WHERE source_key = ?", mapper, key).firstOrNull()

    override fun findById(id: String): Source? =
        jdbc.query("$SELECT WHERE id = ?", mapper, id).firstOrNull()

    override fun setEnabled(key: String, enabled: Boolean): Source? =
        jdbc.query(
            "UPDATE source SET enabled = ?, updated_at = now() WHERE source_key = ? RETURNING *",
            mapper,
            enabled,
            key,
        ).firstOrNull()

    override fun recordDiscoveryOutcome(sourceId: String, success: Boolean) {
        if (success) {
            jdbc.update(
                "UPDATE source SET consecutive_discovery_failures = 0, updated_at = now() WHERE id = ?",
                sourceId,
            )
        } else {
            jdbc.update(
                "UPDATE source SET consecutive_discovery_failures = consecutive_discovery_failures + 1, " +
                    "updated_at = now() WHERE id = ?",
                sourceId,
            )
        }
    }

    override fun registrySnapshot(): List<Source> = findAll()

    override fun stats(sourceId: String): SourceStats {
        val rows = jdbc.query(
            """
            SELECT article_count, archived_count, failed_count, last_archived_at
            FROM source_health WHERE source_id = ?
            """.trimIndent(),
            RowMapper { rs, _ ->
                SourceStats(
                    articleCount = rs.getInt("article_count"),
                    archivedCount = rs.getInt("archived_count"),
                    failedCount = rs.getInt("failed_count"),
                    lastSuccessAt = rs.instant("last_archived_at"),
                )
            },
            sourceId,
        )
        return rows.firstOrNull() ?: SourceStats(0, 0, 0, null)
    }

    private companion object {
        const val SELECT = "SELECT id, source_key, name, discovery_type, discovery_url, listing_url, " +
            "discovery_config, enabled, rate_limit_ms, notes, consecutive_discovery_failures, " +
            "created_at, updated_at FROM source"
    }
}

@Repository
class JdbcArticleRepository(
    private val jdbc: JdbcTemplate,
) : ArticleRepository {

    private val mapper = RowMapper<Article> { rs, _ ->
        Article(
            id = rs.getString("id"),
            sourceId = rs.getString("source_id"),
            canonicalUrl = rs.getString("canonical_url"),
            originalUrl = rs.getString("original_url"),
            title = rs.getString("title"),
            author = rs.getString("author"),
            slug = rs.getString("slug"),
            publishedAt = rs.instant("published_at"),
            fetchedAt = rs.instant("fetched_at"),
            archivedAt = rs.instant("archived_at"),
            contentSha256 = rs.getString("content_sha256"),
            wordCount = rs.getObject("word_count") as? Int,
            status = rs.getString("status"),
            failureCode = rs.getString("failure_code"),
            failureReason = rs.getString("failure_reason"),
            attemptCount = rs.getInt("attempt_count"),
            nextAttemptAt = rs.instant("next_attempt_at"),
            lastJobId = rs.getString("last_job_id"),
        )
    }

    override fun findById(id: String): Article? =
        jdbc.query("$SELECT WHERE id = ?", mapper, id).firstOrNull()

    override fun findByCanonicalUrl(url: String): Article? =
        jdbc.query("$SELECT WHERE canonical_url = ?", mapper, url).firstOrNull()

    override fun insertIfAbsent(article: Article): Article {
        jdbc.update(
            """
            INSERT INTO article (
                id, source_id, canonical_url, original_url, title, author, slug, published_at,
                fetched_at, archived_at, content_sha256, word_count, status, failure_code,
                failure_reason, attempt_count, next_attempt_at, last_job_id
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT (canonical_url) DO NOTHING
            """.trimIndent(),
            article.id,
            article.sourceId,
            article.canonicalUrl,
            article.originalUrl,
            article.title,
            article.author,
            article.slug,
            article.publishedAt.timestamp(),
            article.fetchedAt.timestamp(),
            article.archivedAt.timestamp(),
            article.contentSha256,
            article.wordCount,
            article.status,
            article.failureCode,
            article.failureReason,
            article.attemptCount,
            article.nextAttemptAt.timestamp(),
            article.lastJobId,
        )
        return findByCanonicalUrl(article.canonicalUrl) ?: article
    }

    override fun update(article: Article) {
        jdbc.update(
            """
            UPDATE article SET
                original_url = ?, title = ?, author = ?, slug = ?, published_at = ?,
                fetched_at = ?, archived_at = ?, content_sha256 = ?, word_count = ?,
                status = ?, failure_code = ?, failure_reason = ?, attempt_count = ?,
                next_attempt_at = ?, last_job_id = ?, updated_at = now()
            WHERE id = ?
            """.trimIndent(),
            article.originalUrl,
            article.title,
            article.author,
            article.slug,
            article.publishedAt.timestamp(),
            article.fetchedAt.timestamp(),
            article.archivedAt.timestamp(),
            article.contentSha256,
            article.wordCount,
            article.status,
            article.failureCode,
            article.failureReason,
            article.attemptCount,
            article.nextAttemptAt.timestamp(),
            article.lastJobId,
            article.id,
        )
    }

    override fun claim(articleId: String, jobId: String?): Article? =
        jdbc.query(
            """
            UPDATE article SET
                status = 'processing',
                attempt_count = attempt_count + 1,
                last_job_id = COALESCE(?, last_job_id),
                updated_at = now()
            WHERE id = ?
              AND status = 'queued'
              AND (next_attempt_at IS NULL OR next_attempt_at <= now())
            RETURNING *
            """.trimIndent(),
            mapper,
            jobId,
            articleId,
        ).firstOrNull()

    override fun markQueued(articleId: String, jobId: String?): Article? =
        jdbc.query(
            """
            UPDATE article SET
                status = 'queued',
                attempt_count = 0,
                failure_code = NULL,
                failure_reason = NULL,
                next_attempt_at = now(),
                last_job_id = COALESCE(?, last_job_id),
                updated_at = now()
            WHERE id = ?
            RETURNING *
            """.trimIndent(),
            mapper,
            jobId,
            articleId,
        ).firstOrNull()

    override fun failuresForJob(jobId: String, offset: Long, limit: Int): List<FailureRow> =
        jdbc.query(
            """
            SELECT id, COALESCE(NULLIF(title, ''), canonical_url) AS title,
                   failure_code, failure_reason, attempt_count, updated_at
            FROM article
            WHERE last_job_id = ?
              AND status IN ('failed', 'needs_review')
              AND failure_code IS NOT NULL
            ORDER BY updated_at DESC
            OFFSET ? LIMIT ?
            """.trimIndent(),
            RowMapper { rs, _ ->
                FailureRow(
                    articleId = rs.getString("id"),
                    title = rs.getString("title"),
                    failureCode = rs.getString("failure_code"),
                    failureReason = rs.getString("failure_reason"),
                    attemptCount = rs.getInt("attempt_count"),
                    lastAttemptAt = rs.getTimestamp("updated_at").toInstant(),
                )
            },
            jobId,
            offset,
            limit,
        )

    override fun countFailuresForJob(jobId: String): Long =
        jdbc.queryForObject(
            """
            SELECT count(*) FROM article
            WHERE last_job_id = ? AND status IN ('failed', 'needs_review') AND failure_code IS NOT NULL
            """.trimIndent(),
            Long::class.java,
            jobId,
        ) ?: 0

    override fun snapshotArchived(sourceId: String, afterId: String?, limit: Int): List<ArticleSnapshot> =
        jdbc.query(
            """
            SELECT id, content_sha256 FROM article
            WHERE source_id = ? AND status = 'archived' AND id > ?
            ORDER BY id
            LIMIT ?
            """.trimIndent(),
            RowMapper { rs, _ ->
                ArticleSnapshot(
                    articleId = rs.getString("id"),
                    contentSha256 = rs.getString("content_sha256"),
                )
            },
            sourceId,
            afterId.orEmpty(),
            limit.coerceIn(1, 1000),
        )

    override fun requeueForJob(articleId: String, jobId: String): Boolean =
        jdbc.update(
            """
            UPDATE article SET
                status = 'queued',
                attempt_count = 0,
                next_attempt_at = now(),
                last_job_id = ?,
                updated_at = now()
            WHERE id = ? AND status IN ('archived', 'skipped', 'discovered')
            """.trimIndent(),
            jobId,
            articleId,
        ) > 0

    override fun findDiscoveredForJob(jobId: String, limit: Int): List<Article> =
        jdbc.query(
            """
            $SELECT
            WHERE last_job_id = ?
              AND status = 'queued'
              AND (next_attempt_at IS NULL OR next_attempt_at <= now())
            ORDER BY created_at, id
            LIMIT ?
            """.trimIndent(),
            mapper,
            jobId,
            limit,
        )

    override fun admitForJob(jobId: String): Int =
        jdbc.update(
            """
            UPDATE article SET
                status = 'queued',
                next_attempt_at = now(),
                updated_at = now()
            WHERE last_job_id = ? AND status = 'discovered'
            """.trimIndent(),
            jobId,
        )

    override fun findDueRetries(limit: Int): List<Article> =
        jdbc.query(
            """
            $SELECT
            WHERE status = 'queued' AND next_attempt_at IS NOT NULL AND next_attempt_at <= now()
              AND (
                last_job_id IS NULL
                OR NOT EXISTS (
                  SELECT 1 FROM crawl_job j
                  WHERE j.id = article.last_job_id
                    AND j.status IN ('pending', 'running', 'paused')
                )
              )
            ORDER BY next_attempt_at, id
            LIMIT ?
            """.trimIndent(),
            mapper,
            limit,
        )

    override fun slugAvailable(sourceId: String, slug: String, articleId: String): Boolean =
        jdbc.queryForObject(
            "SELECT NOT EXISTS (SELECT 1 FROM article WHERE source_id = ? AND slug = ? AND id <> ?)",
            Boolean::class.java,
            sourceId,
            slug,
            articleId,
        ) ?: true

    override fun resetProcessingForJob(jobId: String): Int =
        jdbc.update(
            "UPDATE article SET status = 'queued', next_attempt_at = now(), updated_at = now() " +
                "WHERE last_job_id = ? AND status = 'processing'",
            jobId,
        )

    override fun resetStaleProcessing(olderThanSeconds: Long): Int =
        jdbc.update(
            "UPDATE article SET status = 'queued', next_attempt_at = now(), updated_at = now() " +
                "WHERE status = 'processing' AND updated_at < now() - (? * INTERVAL '1 second')",
            olderThanSeconds,
        )

    private companion object {
        const val SELECT = "SELECT id, source_id, canonical_url, original_url, title, author, slug, " +
            "published_at, fetched_at, archived_at, content_sha256, word_count, status, failure_code, " +
            "failure_reason, attempt_count, next_attempt_at, last_job_id, created_at FROM article"
    }
}

@Repository
class JdbcJobRepository(
    private val jdbc: JdbcTemplate,
) : JobRepository {

    private val mapper = RowMapper<Job> { rs, _ ->
        Job(
            id = rs.getString("id"),
            sourceId = rs.getString("source_id"),
            jobType = rs.getString("job_type"),
            status = rs.getString("status"),
            cursor = rs.getString("cursor"),
            requestedAt = rs.getTimestamp("requested_at").toInstant(),
            startedAt = rs.instant("started_at"),
            finishedAt = rs.instant("finished_at"),
            discoveredCount = rs.getInt("discovered_count"),
            archivedCount = rs.getInt("archived_count"),
            skippedCount = rs.getInt("skipped_count"),
            failedCount = rs.getInt("failed_count"),
            lastError = rs.getString("last_error"),
        )
    }

    override fun findById(id: String): Job? =
        jdbc.query("$SELECT WHERE id = ?", mapper, id).firstOrNull()

    override fun findActiveForSource(sourceId: String): Job? =
        jdbc.query(
            "$SELECT WHERE source_id = ? AND status IN ('pending', 'running', 'paused') " +
                "ORDER BY requested_at DESC LIMIT 1",
            mapper,
            sourceId,
        ).firstOrNull()

    override fun insert(job: Job): Job {
        jdbc.update(
            """
            INSERT INTO crawl_job (
                id, source_id, job_type, status, cursor, requested_at, started_at, finished_at,
                discovered_count, archived_count, skipped_count, failed_count, last_error
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """.trimIndent(),
            job.id,
            job.sourceId,
            job.jobType,
            job.status,
            job.cursor,
            Timestamp.from(job.requestedAt),
            job.startedAt.timestamp(),
            job.finishedAt.timestamp(),
            job.discoveredCount,
            job.archivedCount,
            job.skippedCount,
            job.failedCount,
            job.lastError,
        )
        return job
    }

    override fun update(job: Job) {
        jdbc.update(
            """
            UPDATE crawl_job SET
                status = ?, cursor = ?, started_at = ?, finished_at = ?,
                discovered_count = ?, archived_count = ?, skipped_count = ?, failed_count = ?,
                last_error = ?
            WHERE id = ?
            """.trimIndent(),
            job.status,
            job.cursor,
            job.startedAt.timestamp(),
            job.finishedAt.timestamp(),
            job.discoveredCount,
            job.archivedCount,
            job.skippedCount,
            job.failedCount,
            job.lastError,
            job.id,
        )
    }

    override fun updateProgress(job: Job): Boolean =
        jdbc.update(
            """
            UPDATE crawl_job SET
                cursor = ?, discovered_count = ?, archived_count = ?, skipped_count = ?,
                failed_count = ?, last_error = ?
            WHERE id = ? AND status = 'running'
            """.trimIndent(),
            job.cursor,
            job.discoveredCount,
            job.archivedCount,
            job.skippedCount,
            job.failedCount,
            job.lastError,
            job.id,
        ) > 0

    override fun findRunnable(): List<Job> =
        jdbc.query(
            "$SELECT WHERE status IN ('pending', 'running', 'paused') ORDER BY requested_at LIMIT 10",
            mapper,
        )

    override fun recentForSource(sourceId: String, limit: Int): List<Job> =
        jdbc.query(
            "$SELECT WHERE source_id = ? ORDER BY requested_at DESC LIMIT ?",
            mapper,
            sourceId,
            limit,
        )

    private companion object {
        const val SELECT = "SELECT id, source_id, job_type, status, cursor, requested_at, started_at, " +
            "finished_at, discovered_count, archived_count, skipped_count, failed_count, last_error " +
            "FROM crawl_job"
    }
}

@Repository
class JdbcRevisionRepository(
    private val jdbc: JdbcTemplate,
) : RevisionRepository {
    override fun append(articleId: String, contentSha256: String) {
        jdbc.update(
            "INSERT INTO article_revision (id, article_id, content_sha256, captured_at) VALUES (?, ?, ?, now())",
            Ids.uuid7(),
            articleId,
            contentSha256,
        )
    }
}

@Repository
class JdbcFetchLogRepository(
    private val jdbc: JdbcTemplate,
) : FetchLogRepository {
    override fun record(entry: FetchLogEntry) {
        jdbc.update(
            """
            INSERT INTO fetch_log (
                article_id, job_id, host, url, method, status_code, outcome, duration_ms, bytes, attempt
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """.trimIndent(),
            entry.articleId,
            entry.jobId,
            entry.host,
            entry.url,
            entry.method,
            entry.statusCode,
            entry.outcome,
            entry.durationMs,
            entry.bytes,
            entry.attempt,
        )
    }
}

@Repository
class JdbcConditionalGetStore(
    private val jdbc: JdbcTemplate,
) : ConditionalGetStore {
    override fun find(url: String): ConditionalValidators? =
        jdbc.query(
            "SELECT etag, last_modified FROM http_cache WHERE url = ?",
            RowMapper { rs, _ ->
                ConditionalValidators(rs.getString("etag"), rs.getString("last_modified"))
            },
            url,
        ).firstOrNull()

    override fun save(url: String, etag: String?, lastModified: String?, statusCode: Int) {
        jdbc.update(
            """
            INSERT INTO http_cache (url, etag, last_modified, status_code, checked_at)
            VALUES (?, ?, ?, ?, now())
            ON CONFLICT (url) DO UPDATE SET
                etag = EXCLUDED.etag,
                last_modified = EXCLUDED.last_modified,
                status_code = EXCLUDED.status_code,
                checked_at = now()
            """.trimIndent(),
            url,
            etag,
            lastModified,
            statusCode,
        )
    }
}
