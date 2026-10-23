package com.techblog.crawler.api

import com.techblog.crawler.domain.Article
import com.techblog.crawler.domain.ArticleNotFound
import com.techblog.crawler.domain.ArticleRepository
import com.techblog.crawler.domain.ArchiveStore
import com.techblog.crawler.domain.CrawlerException
import com.techblog.crawler.domain.CrawlerErrorCode
import com.techblog.crawler.domain.JobRepository
import com.techblog.crawler.domain.JobService
import com.techblog.crawler.domain.PageRequest
import com.techblog.crawler.domain.RetryResult
import com.techblog.crawler.domain.SourceRepository
import com.techblog.crawler.pipeline.SourceStatsPublisher
import org.springframework.http.HttpHeaders
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PatchMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

/**
 * `/internal/v1` (spec 04 file 03 §1). Compose-internal + loopback only; nginx never proxies
 * it (NFR-24). Every endpoint is used by api-service; nothing here is public.
 */
@RestController
@RequestMapping("/internal/v1")
class InternalJobController(
    private val jobs: JobService,
    private val jobRows: JobRepository,
    private val sources: SourceRepository,
) {

    @PostMapping("/jobs")
    fun create(@RequestBody(required = false) request: JobCreateRequest?): ResponseEntity<JobViewDto> {
        val sourceKey = request?.sourceKey?.takeIf { it.isNotBlank() }
            ?: throw CrawlerException(CrawlerErrorCode.CFG_INVALID_REQUEST, "sourceKey is required.")
        val jobType = request.jobType?.takeIf { it.isNotBlank() }
            ?: throw CrawlerException(CrawlerErrorCode.CFG_INVALID_REQUEST, "jobType is required.")
        if (!SOURCE_KEY.matches(sourceKey)) {
            throw CrawlerException(
                CrawlerErrorCode.CFG_INVALID_REQUEST,
                "sourceKey must match ${SOURCE_KEY.pattern}.",
            )
        }
        val job = jobs.create(sourceKey, jobType)
        val source = sources.findById(job.sourceId)
        return ResponseEntity.accepted().body(InternalMappers.job(job, source?.key ?: sourceKey))
    }

    @GetMapping("/jobs/{id}")
    fun get(@PathVariable id: String): JobViewDto {
        val job = jobs.view(id)
        return InternalMappers.job(job, sourceKeyOf(job))
    }

    @PostMapping("/jobs/{id}/cancel")
    fun cancel(@PathVariable id: String): JobViewDto {
        val job = jobs.cancel(id)
        return InternalMappers.job(job, sourceKeyOf(job))
    }

    @GetMapping("/jobs/{id}/failures")
    fun failures(
        @PathVariable id: String,
        @RequestParam(required = false) page: Int?,
        @RequestParam(required = false) size: Int?,
    ): FailureListDto = InternalMappers.failures(jobs.failures(id, PageRequest.of(page, size)))

    private fun sourceKeyOf(job: com.techblog.crawler.domain.Job): String =
        sources.findById(job.sourceId)?.key ?: ""

    private companion object {
        val SOURCE_KEY = Regex("^[a-z0-9][a-z0-9-]{1,49}$")
    }
}

@RestController
@RequestMapping("/internal/v1")
class InternalSourceController(
    private val sources: SourceRepository,
    private val jobs: JobRepository,
    private val statsPublisher: SourceStatsPublisher,
) {

    @GetMapping("/sources")
    fun list(): SourceListDto =
        SourceListDto(
            sources.registrySnapshot().map { source ->
                val stats = sources.stats(source.id)
                statsPublisher.observe(source, stats)
                InternalMappers.source(
                    source = source,
                    stats = stats,
                    activeJobId = jobs.findActiveForSource(source.id)?.id,
                )
            },
        )

    @PatchMapping("/sources/{key}")
    fun setEnabled(
        @PathVariable key: String,
        @RequestBody(required = false) request: SetEnabledRequest?,
    ): SourceViewDto {
        val enabled = request?.enabled
            ?: throw CrawlerException(CrawlerErrorCode.CFG_INVALID_REQUEST, "enabled is required.")
        val updated = sources.setEnabled(key, enabled)
            ?: throw com.techblog.crawler.domain.SourceNotFound(key)
        val stats = sources.stats(updated.id)
        statsPublisher.observe(updated, stats)
        return InternalMappers.source(
            source = updated,
            stats = stats,
            activeJobId = jobs.findActiveForSource(updated.id)?.id,
        )
    }
}

@RestController
@RequestMapping("/internal/v1")
class InternalArticleController(
    private val articles: ArticleRepository,
    private val sources: SourceRepository,
    private val jobs: JobService,
    private val archive: ArchiveStore,
) {

    @GetMapping("/articles/{id}")
    fun get(@PathVariable id: String): ArticleViewDto {
        val article = articles.findById(id) ?: throw ArticleNotFound(id)
        return InternalMappers.article(article, sourceKeyOf(article), sourceUrlOf(article))
    }

    /**
     * Keyset-paged archived-row snapshot for api-service reconciliation (spec 06 §4).
     * DEVIATION FLAGGED in the port: spec 04 exposes single-resource reads only; this bounded
     * list exists solely for the content_sha256 drift audit.
     */
    @GetMapping("/articles/snapshot")
    fun snapshot(
        @RequestParam sourceKey: String,
        @RequestParam(required = false) after: String?,
        @RequestParam(defaultValue = "1000") limit: Int,
    ): ArticleSnapshotListDto {
        val source = sources.findByKey(sourceKey)
            ?: throw com.techblog.crawler.domain.SourceNotFound(sourceKey)
        val size = limit.coerceIn(1, 1000)
        val rows = articles.snapshotArchived(source.id, after, size)
        return ArticleSnapshotListDto(
            items = rows.map { ArticleSnapshotDto(it.articleId, it.contentSha256) },
            next = if (rows.size == size) rows.last().articleId else null,
        )
    }

    @PostMapping("/articles/{id}/retry")
    fun retry(
        @PathVariable id: String,
        @RequestBody(required = false) request: RetryRequest?,
    ): ResponseEntity<ArticleViewDto> {
        val result: RetryResult = jobs.retry(id, request?.force == true)
        val article = result.article
        val body = InternalMappers.article(article, sourceKeyOf(article), sourceUrlOf(article))
        return if (result.queuedNow) ResponseEntity.accepted().body(body) else ResponseEntity.ok(body)
    }

    /**
     * Markdown passthrough (spec 03 file 03 §4): the api-service never mounts crawler disk.
     * A non-archived article has no body and maps to ART-NOT-FOUND.
     */
    @GetMapping("/articles/{id}/content")
    fun content(@PathVariable id: String): ResponseEntity<ByteArray> {
        val article = archivedArticle(id)
        val sourceKey = sourceKeyOf(article)
        val slug = article.slug ?: throw ArticleNotFound(id)
        val body = archive.readContent(sourceKey, slug)
            ?: throw CrawlerException(
                CrawlerErrorCode.ART_NOT_FOUND,
                "Archive file for article '$id' is missing.",
            )
        return ResponseEntity.ok()
            .contentType(Markdown)
            .header(HttpHeaders.CACHE_CONTROL, "no-store")
            .body(body)
    }

    @GetMapping("/articles/{id}/assets/{file}")
    fun asset(@PathVariable id: String, @PathVariable file: String): ResponseEntity<ByteArray> {
        if (!ASSET_FILE.matches(file) || file.contains("..")) {
            throw CrawlerException(CrawlerErrorCode.CFG_INVALID_REQUEST, "Invalid asset name '$file'.")
        }
        val article = archivedArticle(id)
        val slug = article.slug ?: throw ArticleNotFound(id)
        val body = archive.readAsset(sourceKeyOf(article), slug, file)
            ?: throw CrawlerException(
                CrawlerErrorCode.ART_NOT_FOUND,
                "Asset '$file' for article '$id' is missing.",
            )
        return ResponseEntity.ok()
            .contentType(mediaType(file))
            .header(HttpHeaders.CACHE_CONTROL, "no-store")
            .header(HttpHeaders.ETAG, "\"${article.contentSha256 ?: "asset"}\"")
            .body(body)
    }

    private fun archivedArticle(id: String): Article {
        val article = articles.findById(id) ?: throw ArticleNotFound(id)
        if (article.status != "archived") {
            throw ArticleNotFound(id, article.status)
        }
        return article
    }

    private fun sourceKeyOf(article: Article): String =
        sources.findById(article.sourceId)?.key ?: ""

    private fun sourceUrlOf(article: Article): String? =
        sources.findById(article.sourceId)?.discoveryUrl

    private fun mediaType(file: String): MediaType = when (file.substringAfterLast('.').lowercase()) {
        "png" -> MediaType.IMAGE_PNG
        "jpg", "jpeg" -> MediaType.IMAGE_JPEG
        "gif" -> MediaType.IMAGE_GIF
        "webp" -> MediaType.parseMediaType("image/webp")
        "avif" -> MediaType.parseMediaType("image/avif")
        else -> MediaType.APPLICATION_OCTET_STREAM
    }

    private companion object {
        val Markdown: MediaType = MediaType.parseMediaType("text/markdown; charset=utf-8")
        val ASSET_FILE = Regex("^[A-Za-z0-9][A-Za-z0-9._-]{0,127}$")
    }
}
