package com.techblog.api.data

import com.techblog.api.config.ApiProperties
import com.techblog.api.domain.ArticleNotFound
import com.techblog.api.domain.CancelRefused
import com.techblog.api.domain.CrawlerArticle
import com.techblog.api.domain.CrawlerAsset
import com.techblog.api.domain.CrawlerGateway
import com.techblog.api.domain.CrawlerJob
import com.techblog.api.domain.CrawlerSource
import com.techblog.api.domain.DependencyDown
import com.techblog.api.domain.DomainException
import com.techblog.api.domain.DuplicateActiveJob
import com.techblog.api.domain.ErrorCode
import com.techblog.api.domain.InvalidRequest
import com.techblog.api.domain.InvalidState
import com.techblog.api.domain.JobFailure
import com.techblog.api.domain.JobNotFound
import com.techblog.api.domain.Page
import com.techblog.api.domain.PageRequest
import com.techblog.api.domain.SourceNotFound
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Qualifier
import org.springframework.http.HttpHeaders
import org.springframework.http.MediaType
import org.springframework.stereotype.Component
import org.springframework.web.client.ResourceAccessException
import org.springframework.web.client.RestClient
import org.springframework.web.client.RestClientException
import org.springframework.web.client.RestClientResponseException
import java.time.Instant

/**
 * HTTP adapter for the crawler's `/internal/v1` surface (spec 06 file 03 §5).
 * All transport failures become OPS-DEPENDENCY-DOWN; a crawler 4xx becomes the matching
 * BA 05 domain exception so the public ProblemDetail keeps the frozen code strings.
 */
@Component
class CrawlerGatewayImpl(
    @Qualifier("crawlerCommandClient") private val command: RestClient,
    @Qualifier("crawlerContentClient") private val content: RestClient,
) : CrawlerGateway {

    private val log = LoggerFactory.getLogger(javaClass)

    override fun createJob(sourceKey: String, jobType: String): CrawlerJob = call {
        command.post()
            .uri("/internal/v1/jobs")
            .contentType(MediaType.APPLICATION_JSON)
            .body(mapOf("sourceKey" to sourceKey, "jobType" to jobType))
            .retrieve()
            .body(JobDto::class.java)
            ?.toDomain()
            ?: throw DependencyDown("crawler-service returned an empty job response")
    }

    override fun getJob(jobId: String): CrawlerJob = call {
        command.get()
            .uri("/internal/v1/jobs/{id}", jobId)
            .retrieve()
            .body(JobDto::class.java)
            ?.toDomain()
            ?: throw JobNotFound(jobId)
    }

    override fun cancelJob(jobId: String): CrawlerJob = call {
        command.post()
            .uri("/internal/v1/jobs/{id}/cancel", jobId)
            .retrieve()
            .body(JobDto::class.java)
            ?.toDomain()
            ?: throw JobNotFound(jobId)
    }

    override fun retryArticle(articleId: String): CrawlerArticle = call {
        command.post()
            .uri("/internal/v1/articles/{id}/retry", articleId)
            .contentType(MediaType.APPLICATION_JSON)
            .body(mapOf("force" to false))
            .retrieve()
            .body(ArticleDto::class.java)
            ?.toDomain()
            ?: throw ArticleNotFound(articleId)
    }

    override fun jobFailures(jobId: String, page: PageRequest): Page<JobFailure> = call {
        val response = command.get()
            .uri {
                it.path("/internal/v1/jobs/{id}/failures")
                    .queryParam("page", page.page)
                    .queryParam("size", page.size)
                    .build(jobId)
            }
            .retrieve()
            .body(FailureListDto::class.java)
            ?: throw JobNotFound(jobId)
        Page(
            items = response.items.orEmpty().map { it.toDomain() },
            page = response.page,
            size = response.size,
            total = response.total,
        )
    }

    override fun setSourceEnabled(sourceKey: String, enabled: Boolean): CrawlerSource = call {
        command.patch()
            .uri("/internal/v1/sources/{key}", sourceKey)
            .contentType(MediaType.APPLICATION_JSON)
            .body(mapOf("enabled" to enabled))
            .retrieve()
            .body(SourceDto::class.java)
            ?.toDomain()
            ?: throw SourceNotFound(sourceKey)
    }

    override fun sourceRegistry(): List<CrawlerSource> = call {
        command.get()
            .uri("/internal/v1/sources")
            .retrieve()
            .body(SourceListDto::class.java)
            ?.items
            .orEmpty()
            .map { it.toDomain() }
    }

    /** Full archived snapshot, keyset-paged by article id (spec 06 file 01 §4). */
    override fun archivedArticleSnapshot(sourceKey: String): Map<String, String?> = call {
        val snapshot = LinkedHashMap<String, String?>()
        var after: String? = null
        while (true) {
            val cursor = after
            val page = command.get()
                .uri { builder ->
                    builder.path("/internal/v1/articles/snapshot")
                        .queryParam("sourceKey", sourceKey)
                        .queryParam("limit", 1000)
                        .apply { if (cursor != null) queryParam("after", cursor) }
                        .build()
                }
                .retrieve()
                .body(ArticleSnapshotListDto::class.java)
                ?: break
            page.items.forEach { snapshot[it.articleId] = it.contentSha256 }
            after = page.next ?: break
        }
        snapshot
    }

    override fun article(articleId: String): CrawlerArticle = call {
        command.get()
            .uri("/internal/v1/articles/{id}", articleId)
            .retrieve()
            .body(ArticleDto::class.java)
            ?.toDomain()
            ?: throw ArticleNotFound(articleId)
    }

    override fun content(articleId: String): ByteArray = call {
        content.get()
            .uri("/internal/v1/articles/{id}/content", articleId)
            .retrieve()
            .body(ByteArray::class.java)
            ?: throw ArticleNotFound(articleId)
    }

    override fun asset(articleId: String, file: String): CrawlerAsset = call {
        val response = content.get()
            .uri("/internal/v1/articles/{id}/assets/{file}", articleId, file)
            .retrieve()
            .toEntity(ByteArray::class.java)
        val body = response.body ?: throw ArticleNotFound(articleId)
        CrawlerAsset(
            bytes = body,
            contentType = response.headers.contentType?.toString() ?: MediaType.APPLICATION_OCTET_STREAM.toString(),
        )
    }

    private fun <T> call(block: () -> T): T {
        var retried = false
        while (true) {
            try {
                return block()
            } catch (error: RestClientResponseException) {
                // Spec 06 file 03 §5: exactly one retry on a 5xx after ~200 ms jitter.
                // 4xx is a contract answer and must never be retried.
                if (error.statusCode.is5xxServerError && !retried) {
                    retried = true
                    try {
                        Thread.sleep(200L + java.util.concurrent.ThreadLocalRandom.current().nextLong(0L, 100L))
                    } catch (_: InterruptedException) {
                        Thread.currentThread().interrupt()
                    }
                    continue
                }
                throw mapError(error)
            } catch (error: ResourceAccessException) {
                log.warn("crawler_dependency_down reason={}", error.message)
                throw DependencyDown("crawler-service did not answer within 2 s", error)
            } catch (error: RestClientException) {
                log.warn("crawler_dependency_error reason={}", error.message)
                throw DependencyDown("crawler-service request failed", error)
            }
        }
    }

    private fun mapError(error: RestClientResponseException): DomainException {
        val body = error.responseBodyAsString.orEmpty()
        val code = CODE.find(body)?.groupValues?.get(1)
        val detail = DETAIL.find(body)?.groupValues?.get(1)
            ?: "crawler-service rejected the request (${error.statusCode.value()})."
        val activeJobId = ACTIVE_JOB.find(body)?.groupValues?.get(1)
        return when {
            code == ErrorCode.CFG_SOURCE_NOT_FOUND.wire -> SourceNotFound(detail.substringAfterLast('\'').substringBefore('\'').ifBlank { "unknown" })
            code == ErrorCode.CFG_INVALID_REQUEST.wire -> InvalidRequest(detail)
            code == ErrorCode.JOB_NOT_FOUND.wire -> JobNotFound(detail.substringAfterLast('\'').substringBefore('\'').ifBlank { "unknown" })
            code == ErrorCode.JOB_DUPLICATE_ACTIVE.wire ->
                DomainException(ErrorCode.JOB_DUPLICATE_ACTIVE, detail, activeJobId = activeJobId)
            code == ErrorCode.JOB_CANCEL_REFUSED.wire -> CancelRefused(detail)
            code == ErrorCode.JOB_INVALID_STATE.wire -> InvalidState(detail)
            code == ErrorCode.ART_NOT_FOUND.wire -> ArticleNotFound(detail)
            code?.startsWith("FETCH-") == true -> InvalidState(detail)
            error.statusCode.is5xxServerError ->
                DependencyDown("crawler-service returned ${error.statusCode.value()}", error)
            else -> DependencyDown("crawler-service rejected the request", error)
        }
    }

    private companion object {
        val CODE = Regex("\"code\"\\s*:\\s*\"([^\"]+)\"")
        val DETAIL = Regex("\"detail\"\\s*:\\s*\"([^\"]*)\"")
        val ACTIVE_JOB = Regex("\"activeJobId\"\\s*:\\s*\"([^\"]+)\"")
    }
}

/**
 * Cached Markdown/asset proxy (spec 06 file 03 §7). Content bodies up to 200 KB are cached for
 * 300 s; assets always pass through so a large image cannot fill the heap.
 */
@Component
class ContentProxy(
    @Qualifier("crawlerContentClient") private val content: RestClient,
    private val properties: ApiProperties,
) {
    private data class Cached(val bytes: ByteArray, val expiresAt: Long)

    private val log = LoggerFactory.getLogger(javaClass)
    private val cache = java.util.concurrent.ConcurrentHashMap<String, Cached>()

    fun content(articleId: String): ByteArray {
        val now = System.currentTimeMillis()
        cache[articleId]?.takeIf { it.expiresAt > now }?.let { return it.bytes }

        val bytes = try {
            content.get()
                .uri("/internal/v1/articles/{id}/content", articleId)
                .retrieve()
                .body(ByteArray::class.java)
                ?: throw ArticleNotFound(articleId)
        } catch (error: RestClientResponseException) {
            throw contentError(articleId, error)
        } catch (error: ResourceAccessException) {
            log.warn("content_proxy_down articleId={} reason={}", articleId, error.message)
            throw DependencyDown("crawler-service did not answer within the content timeout", error)
        }

        if (bytes.size <= properties.contentCacheMaxBodyBytes) {
            if (cache.size >= properties.contentCacheMaxEntries) {
                cache.keys.firstOrNull()?.let(cache::remove)
            }
            cache[articleId] = Cached(
                bytes,
                now + properties.contentCacheTtlSeconds * 1000,
            )
        }
        return bytes
    }

    fun asset(articleId: String, file: String): CrawlerAsset {
        if (!FILE.matches(file) || file.contains("..")) throw ArticleNotFound(articleId)
        val response = try {
            content.get()
                .uri("/internal/v1/articles/{id}/assets/{file}", articleId, file)
                .retrieve()
                .toEntity(ByteArray::class.java)
        } catch (error: RestClientResponseException) {
            throw contentError(articleId, error)
        } catch (error: ResourceAccessException) {
            throw DependencyDown("crawler-service did not answer within the content timeout", error)
        }
        return CrawlerAsset(
            bytes = response.body ?: throw ArticleNotFound(articleId),
            contentType = response.headers.contentType?.toString()
                ?: MediaType.APPLICATION_OCTET_STREAM.toString(),
        )
    }

    private fun contentError(articleId: String, error: RestClientResponseException): DomainException {
        val body = error.responseBodyAsString.orEmpty()
        return when {
            error.statusCode.value() == 404 || body.contains(ErrorCode.ART_NOT_FOUND.wire) ->
                ArticleNotFound(articleId)
            error.statusCode.is5xxServerError ->
                DependencyDown("crawler-service returned ${error.statusCode.value()}", error)
            else -> DependencyDown("crawler-service rejected the content request", error)
        }
    }

    private companion object {
        val FILE = Regex("^[A-Za-z0-9][A-Za-z0-9._-]{0,127}$")
    }
}

// ---------------------------------------------------------------------------
// Internal wire shapes (spec 04 file 03). Defaults keep Jackson 3 forward-compatible;
// additive fields are ignored by the consumer.
// ---------------------------------------------------------------------------

private data class JobDto(
    val jobId: String = "",
    val sourceKey: String = "",
    val jobType: String = "",
    val status: String = "",
    val requestedAt: String? = null,
    val startedAt: String? = null,
    val finishedAt: String? = null,
    val counters: CountersDto? = null,
    val cursor: String? = null,
    val lastError: String? = null,
) {
    fun toDomain(): CrawlerJob = CrawlerJob(
        jobId = jobId,
        sourceKey = sourceKey,
        jobType = jobType,
        status = status,
        requestedAt = requestedAt?.let(::parseInstant) ?: Instant.now(),
        startedAt = startedAt?.let(::parseInstant),
        finishedAt = finishedAt?.let(::parseInstant),
        discoveredCount = counters?.discovered ?: 0,
        archivedCount = counters?.archived ?: 0,
        skippedCount = counters?.skipped ?: 0,
        failedCount = counters?.failed ?: 0,
    )
}

private data class CountersDto(
    val discovered: Int = 0,
    val archived: Int = 0,
    val skipped: Int = 0,
    val failed: Int = 0,
)

private data class ArticleDto(
    val articleId: String = "",
    val sourceKey: String = "",
    val status: String = "",
    val title: String? = null,
    val author: String? = null,
    val slug: String? = null,
    val canonicalUrl: String = "",
    val originalUrl: String? = null,
    val publishedAt: String? = null,
    val archivedAt: String? = null,
    val fetchedAt: String? = null,
    val contentSha256: String? = null,
) {
    fun toDomain(): CrawlerArticle = CrawlerArticle(
        articleId = articleId,
        sourceKey = sourceKey,
        status = status,
        title = title,
        author = author,
        slug = slug,
        canonicalUrl = canonicalUrl,
        originalUrl = originalUrl,
        publishedAt = publishedAt?.let(::parseInstant),
        archivedAt = archivedAt?.let(::parseInstant),
        fetchedAt = fetchedAt?.let(::parseInstant),
        contentSha256 = contentSha256,
    )
}

private data class SourceListDto(val items: List<SourceDto> = emptyList())

private data class ArticleSnapshotListDto(
    val items: List<ArticleSnapshotDto> = emptyList(),
    val next: String? = null,
)

private data class ArticleSnapshotDto(
    val articleId: String = "",
    val contentSha256: String? = null,
)

private data class SourceDto(
    val sourceKey: String = "",
    val name: String = "",
    val enabled: Boolean = false,
    val discoveryType: String = "feed",
    val articleCount: Int = 0,
    val archivedCount: Int = 0,
    val failedCount: Int = 0,
    val lastSuccessAt: String? = null,
    val consecutiveDiscoveryFailures: Int = 0,
) {
    fun toDomain(): CrawlerSource = CrawlerSource(
        sourceKey = sourceKey,
        name = name,
        enabled = enabled,
        discoveryType = discoveryType,
        archivedCount = archivedCount,
        failedCount = failedCount,
        lastSuccessAt = lastSuccessAt?.let(::parseInstant),
        consecutiveDiscoveryFailures = consecutiveDiscoveryFailures,
        articleCount = if (articleCount > 0) articleCount else archivedCount + failedCount,
    )
}

private data class FailureListDto(
    val items: List<FailureDto> = emptyList(),
    val page: Int = 0,
    val size: Int = 50,
    val total: Long = 0,
)

private data class FailureDto(
    val articleId: String = "",
    val title: String = "",
    val failureCode: String = "",
    val failureReason: String = "",
    val attemptCount: Int = 0,
    val lastAttemptAt: String? = null,
) {
    fun toDomain(): JobFailure = JobFailure(
        articleId = articleId,
        title = title,
        failureCode = failureCode,
        failureReason = failureReason,
        attemptCount = attemptCount,
        lastAttemptAt = lastAttemptAt?.let(::parseInstant) ?: Instant.now(),
    )
}

private fun parseInstant(value: String): Instant? =
    runCatching { Instant.parse(value) }.getOrNull()
