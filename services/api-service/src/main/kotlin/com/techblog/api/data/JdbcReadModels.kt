package com.techblog.api.data

import com.techblog.api.domain.ArticleReadModel
import com.techblog.api.domain.ArticleView
import com.techblog.api.domain.JobReadModel
import com.techblog.api.domain.JobView
import com.techblog.api.domain.Page
import com.techblog.api.domain.PageRequest
import com.techblog.api.domain.SourceReadModel
import com.techblog.api.domain.SourceView
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.jdbc.core.RowMapper
import org.springframework.stereotype.Repository
import java.sql.ResultSet
import java.sql.Timestamp
import java.time.Instant

private fun ResultSet.instant(column: String): Instant? = getTimestamp(column)?.toInstant()

private fun Instant?.timestamp(): Timestamp? = this?.let { Timestamp.from(it) }

@Repository
class JdbcSourceReadModel(
    private val jdbc: JdbcTemplate,
) : SourceReadModel {

    private val mapper = RowMapper<SourceView> { rs, _ ->
        SourceView(
            key = rs.getString("source_key"),
            name = rs.getString("name"),
            enabled = rs.getBoolean("enabled"),
            discoveryType = rs.getString("discovery_type"),
            articleCount = rs.getInt("article_count"),
            archivedCount = rs.getInt("archived_count"),
            failedCount = rs.getInt("failed_count"),
            lastSuccessAt = rs.instant("last_success_at"),
            health = rs.getString("health"),
            updatedAt = rs.getTimestamp("updated_at").toInstant(),
        )
    }

    override fun findAll(): List<SourceView> =
        jdbc.query("$SELECT ORDER BY source_key", mapper)

    override fun findByKey(key: String): SourceView? =
        jdbc.query("$SELECT WHERE source_key = ?", mapper, key).firstOrNull()

    override fun setEnabled(key: String, enabled: Boolean): Boolean =
        jdbc.update(
            "UPDATE source_summary SET enabled = ?, updated_at = now() WHERE source_key = ?",
            enabled,
            key,
        ) > 0

    override fun upsert(source: SourceView) {
        jdbc.update(
            """
            INSERT INTO source_summary (
                source_id, source_key, name, enabled, discovery_type, article_count,
                archived_count, failed_count, last_success_at, health, updated_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT (source_key) DO UPDATE SET
                name = EXCLUDED.name,
                enabled = EXCLUDED.enabled,
                discovery_type = EXCLUDED.discovery_type,
                article_count = EXCLUDED.article_count,
                archived_count = EXCLUDED.archived_count,
                failed_count = EXCLUDED.failed_count,
                last_success_at = EXCLUDED.last_success_at,
                health = EXCLUDED.health,
                updated_at = EXCLUDED.updated_at
            WHERE EXCLUDED.updated_at >= source_summary.updated_at
            """.trimIndent(),
            source.key,
            source.key,
            source.name,
            source.enabled,
            source.discoveryType,
            source.articleCount,
            source.archivedCount,
            source.failedCount,
            source.lastSuccessAt.timestamp(),
            source.health,
            Timestamp.from(source.updatedAt),
        )
    }

    override fun applyStats(
        sourceKey: String,
        articleCount: Int,
        archivedCount: Int,
        failedCount: Int,
        lastSuccessAt: Instant?,
        health: String,
        occurredAt: Instant,
    ) {
        jdbc.update(
            """
            INSERT INTO source_summary (
                source_id, source_key, name, enabled, discovery_type, article_count,
                archived_count, failed_count, last_success_at, health, updated_at
            ) VALUES (?, ?, ?, TRUE, 'feed', ?, ?, ?, ?, ?, ?)
            ON CONFLICT (source_key) DO UPDATE SET
                article_count = EXCLUDED.article_count,
                archived_count = EXCLUDED.archived_count,
                failed_count = EXCLUDED.failed_count,
                last_success_at = EXCLUDED.last_success_at,
                health = EXCLUDED.health,
                updated_at = EXCLUDED.updated_at
            WHERE EXCLUDED.updated_at >= source_summary.updated_at
            """.trimIndent(),
            sourceKey,
            sourceKey,
            sourceKey,
            articleCount,
            archivedCount,
            failedCount,
            lastSuccessAt.timestamp(),
            health,
            Timestamp.from(occurredAt),
        )
    }

    private companion object {
        const val SELECT = "SELECT source_key, name, enabled, discovery_type, article_count, " +
            "archived_count, failed_count, last_success_at, health, updated_at FROM source_summary"
    }
}

@Repository
class JdbcArticleReadModel(
    private val jdbc: JdbcTemplate,
) : ArticleReadModel {

    private val mapper = RowMapper<ArticleView> { rs, _ ->
        ArticleView(
            id = rs.getString("id"),
            sourceKey = rs.getString("source_key"),
            title = rs.getString("title") ?: "",
            slug = rs.getString("slug") ?: "",
            author = rs.getString("author"),
            publishedAt = rs.instant("published_at"),
            archivedAt = rs.instant("archived_at"),
            status = rs.getString("status"),
            contentSha256 = rs.getString("content_sha256"),
            originalUrl = rs.getString("original_url"),
            sourceUrl = rs.getString("source_url"),
            fetchedAt = rs.instant("fetched_at"),
            updatedAt = rs.getTimestamp("updated_at").toInstant(),
        )
    }

    override fun search(q: String?, sourceKey: String?, page: PageRequest): Page<ArticleView> {
        val conditions = mutableListOf<String>()
        val arguments = mutableListOf<Any>()
        if (q != null) {
            val tsQuery = q.split(Regex("[^A-Za-z0-9]+"))
                .filter { it.isNotBlank() }
                .joinToString(" & ") { "$it:*" }
            val titlePattern = "%${q.lowercase()}%"
            if (tsQuery.isNotBlank()) {
                conditions += "(search_tsv @@ to_tsquery('simple', ?) OR lower(title) LIKE ?)"
                arguments += tsQuery
                arguments += titlePattern
            } else {
                conditions += "lower(title) LIKE ?"
                arguments += titlePattern
            }
        }
        if (sourceKey != null) {
            conditions += "source_key = ?"
            arguments += sourceKey
        }
        val where = if (conditions.isEmpty()) "" else " WHERE ${conditions.joinToString(" AND ")}"
        val total = jdbc.queryForObject(
            "SELECT count(*) FROM article_index$where",
            Long::class.java,
            *arguments.toTypedArray(),
        ) ?: 0
        val rows = jdbc.query(
            "$SELECT$where ORDER BY archived_at DESC NULLS LAST, id LIMIT ? OFFSET ?",
            mapper,
            *(arguments + listOf(page.size, page.offset)).toTypedArray(),
        )
        return Page(rows, page.page, page.size, total)
    }

    override fun findById(id: String): ArticleView? =
        jdbc.query("$SELECT WHERE id = ?", mapper, id).firstOrNull()

    override fun upsert(article: ArticleView) {
        jdbc.update(
            """
            INSERT INTO article_index (
                id, source_key, slug, title, author, published_at, archived_at, status,
                content_sha256, original_url, source_url, fetched_at, updated_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT (id) DO UPDATE SET
                source_key = EXCLUDED.source_key,
                slug = EXCLUDED.slug,
                title = EXCLUDED.title,
                author = EXCLUDED.author,
                published_at = EXCLUDED.published_at,
                archived_at = EXCLUDED.archived_at,
                status = EXCLUDED.status,
                content_sha256 = EXCLUDED.content_sha256,
                original_url = EXCLUDED.original_url,
                source_url = EXCLUDED.source_url,
                fetched_at = EXCLUDED.fetched_at,
                updated_at = EXCLUDED.updated_at
            WHERE EXCLUDED.updated_at >= article_index.updated_at
            """.trimIndent(),
            article.id,
            article.sourceKey,
            article.slug,
            article.title,
            article.author,
            article.publishedAt.timestamp(),
            article.archivedAt.timestamp(),
            article.status,
            article.contentSha256,
            article.originalUrl,
            article.sourceUrl,
            article.fetchedAt.timestamp(),
            Timestamp.from(article.updatedAt),
        )
    }

    private companion object {
        const val SELECT = "SELECT id, source_key, slug, title, author, published_at, archived_at, " +
            "status, content_sha256, original_url, source_url, fetched_at, updated_at FROM article_index"
    }
}

@Repository
class JdbcJobReadModel(
    private val jdbc: JdbcTemplate,
) : JobReadModel {

    private val mapper = RowMapper<JobView> { rs, _ ->
        JobView(
            id = rs.getString("id"),
            sourceKey = rs.getString("source_key"),
            jobType = rs.getString("job_type"),
            status = rs.getString("status"),
            requestedAt = rs.getTimestamp("requested_at").toInstant(),
            startedAt = rs.instant("started_at"),
            finishedAt = rs.instant("finished_at"),
            discoveredCount = rs.getInt("discovered_count"),
            archivedCount = rs.getInt("archived_count"),
            skippedCount = rs.getInt("skipped_count"),
            failedCount = rs.getInt("failed_count"),
            updatedAt = rs.getTimestamp("updated_at").toInstant(),
        )
    }

    override fun findAll(page: PageRequest): Page<JobView> {
        val total = jdbc.queryForObject("SELECT count(*) FROM job_view", Long::class.java) ?: 0
        val rows = jdbc.query(
            "$SELECT ORDER BY requested_at DESC LIMIT ? OFFSET ?",
            mapper,
            page.size,
            page.offset,
        )
        return Page(rows, page.page, page.size, total)
    }

    override fun findById(id: String): JobView? =
        jdbc.query("$SELECT WHERE id = ?", mapper, id).firstOrNull()

    override fun upsert(job: JobView) {
        jdbc.update(
            """
            INSERT INTO job_view (
                id, source_key, job_type, status, requested_at, started_at, finished_at,
                discovered_count, archived_count, skipped_count, failed_count, updated_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT (id) DO UPDATE SET
                source_key = EXCLUDED.source_key,
                job_type = EXCLUDED.job_type,
                status = EXCLUDED.status,
                requested_at = EXCLUDED.requested_at,
                started_at = EXCLUDED.started_at,
                finished_at = EXCLUDED.finished_at,
                discovered_count = EXCLUDED.discovered_count,
                archived_count = EXCLUDED.archived_count,
                skipped_count = EXCLUDED.skipped_count,
                failed_count = EXCLUDED.failed_count,
                updated_at = EXCLUDED.updated_at
            WHERE EXCLUDED.updated_at >= job_view.updated_at
            """.trimIndent(),
            job.id,
            job.sourceKey,
            job.jobType,
            job.status,
            Timestamp.from(job.requestedAt),
            job.startedAt.timestamp(),
            job.finishedAt.timestamp(),
            job.discoveredCount,
            job.archivedCount,
            job.skippedCount,
            job.failedCount,
            Timestamp.from(job.updatedAt),
        )
    }

    private companion object {
        const val SELECT = "SELECT id, source_key, job_type, status, requested_at, started_at, " +
            "finished_at, discovered_count, archived_count, skipped_count, failed_count, updated_at " +
            "FROM job_view"
    }
}
