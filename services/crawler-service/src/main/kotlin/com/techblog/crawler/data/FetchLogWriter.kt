package com.techblog.crawler.data

import com.techblog.crawler.domain.Article
import com.techblog.crawler.domain.ArticleFetchState
import com.techblog.crawler.domain.ArticleRepository
import com.techblog.crawler.domain.FetchLogEntry
import com.techblog.crawler.domain.FetchLogWriter
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.stereotype.Repository
import org.springframework.transaction.annotation.Transactional
import java.sql.Timestamp

/**
 * FetchLogWriter (spec 02 file 01 §1, file 05 §7): one `fetch_log` row per HTTP attempt plus the
 * article fetch-state columns in a single transaction.
 *
 * A crash between the two statements would either lose the audit row or leave the article in the
 * wrong state; wrapping them makes "logged" and "state moved" atomic. Acknowledging the Redis
 * message happens after this method returns, so a crash before commit redelivers the message.
 */
@Repository
class JdbcFetchLogWriter(
    private val jdbc: JdbcTemplate,
    private val articles: ArticleRepository,
) : FetchLogWriter {

    @Transactional
    override fun write(entry: FetchLogEntry, state: ArticleFetchState?): Article? {
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

        val articleId = entry.articleId ?: return null
        if (state != null) {
            jdbc.update(
                """
                UPDATE article SET
                    status = ?,
                    failure_code = ?,
                    failure_reason = ?,
                    attempt_count = ?,
                    next_attempt_at = ?,
                    updated_at = now()
                WHERE id = ?
                """.trimIndent(),
                state.status,
                state.failureCode,
                state.failureReason,
                state.attemptCount,
                state.nextAttemptAt?.let { Timestamp.from(it) },
                articleId,
            )
        }
        return articles.findById(articleId)
    }
}
