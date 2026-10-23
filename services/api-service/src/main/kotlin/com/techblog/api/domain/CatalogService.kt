package com.techblog.api.domain

import org.slf4j.LoggerFactory
import org.springframework.stereotype.Service
import java.time.Duration
import java.time.Instant

/**
 * Catalog + article + job query use cases. Controllers stay thin: validation lives in the
 * request DTOs, pagination rules in PageRequest, and every "not found" becomes a domain error
 * with the BA 05 code.
 */
@Service
class CatalogService(
    private val sources: SourceReadModel,
    private val articles: ArticleReadModel,
    private val jobs: JobReadModel,
) {
    private val log = LoggerFactory.getLogger(javaClass)

    fun listSources(): List<SourceView> = sources.findAll()

    fun source(key: String): SourceView = sources.findByKey(key) ?: throw SourceNotFound(key)

    fun listArticles(q: String?, source: String?, page: PageRequest): Page<ArticleView> {
        val query = q?.trim()?.takeIf { it.isNotEmpty() }
        if (query != null && query.length > MAX_QUERY_LENGTH) {
            throw InvalidRequest("q must be at most $MAX_QUERY_LENGTH characters.")
        }
        val sourceKey = source?.trim()?.takeIf { it.isNotEmpty() }
        if (sourceKey != null && !SOURCE_KEY.matches(sourceKey)) {
            throw InvalidRequest("source must match ${SOURCE_KEY.pattern}.")
        }
        return articles.search(query, sourceKey, page)
    }

    fun article(id: String): ArticleView {
        val article = articles.findById(id) ?: throw ArticleNotFound(id)
        if (article.status != ARCHIVED) {
            // The contract keeps non-archived rows in the list but not in the reader:
            // detail (and its content proxy) is only defined for archived articles.
            throw ArticleNotFound(id, article.status)
        }
        return article
    }

    /** ArticleDetail allows non-archived metadata (the reader needs the status to offer retry). */
    fun articleDetail(id: String): ArticleView = articles.findById(id) ?: throw ArticleNotFound(id)

    /** Retry eligibility for the reader: `failed` / `needs_review` only (spec 06 file 03 §2). */
    fun canRetry(article: ArticleView): Boolean = article.status in RETRYABLE

    fun listJobs(page: PageRequest): Page<JobView> = jobs.findAll(page)

    fun job(id: String): JobView = jobs.findById(id) ?: throw JobNotFound(id)

    /**
     * Health is computed on read (spec 04 file 03 §3): `fresh` ≤72 h since last success,
     * `stale` after that, `broken` after 5 consecutive discovery failures. api_db stores the
     * last projected value; a long-idle archive would otherwise show "fresh" forever.
     */
    fun effectiveHealth(source: SourceView, now: Instant = Instant.now()): String {
        if (source.health == BROKEN) return BROKEN
        if (!source.enabled) return BROKEN
        // Spec 05 file 01 §5: staleness scope is enabled feed sources only.
        if (source.discoveryType != FEED) return FRESH
        val lastSuccess = source.lastSuccessAt ?: return STALE
        return if (Duration.between(lastSuccess, now) > FRESH_WINDOW) STALE else FRESH
    }

    private companion object {
        const val MAX_QUERY_LENGTH = 200
        const val ARCHIVED = "archived"
        const val FEED = "feed"
        const val FRESH = "fresh"
        const val STALE = "stale"
        const val BROKEN = "broken"
        val RETRYABLE = setOf("failed", "needs_review")
        val FRESH_WINDOW: Duration = Duration.ofHours(72)
        val SOURCE_KEY = Regex("^[a-z0-9][a-z0-9-]{0,63}$")
    }
}
