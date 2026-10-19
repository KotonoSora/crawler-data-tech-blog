package com.kotonosora.techblog.api.api

import com.kotonosora.techblog.api.data.ContentProxy
import com.kotonosora.techblog.api.domain.CatalogService
import com.kotonosora.techblog.api.domain.CommandService
import com.kotonosora.techblog.api.domain.OpsSummaryService
import com.kotonosora.techblog.api.domain.PageRequest
import com.kotonosora.techblog.api.domain.SourceView
import com.kotonosora.techblog.api.domain.InvalidRequest
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
 * Public read surface (spec 06 file 03 §2, BE-06-04..BE-06-06). Validation and pagination live
 * in PageRequest/domain; this controller only maps domain → wire.
 */
@RestController
@RequestMapping("/api/v1")
class CatalogController(
    private val catalog: CatalogService,
    private val commands: CommandService,
    private val contentProxy: ContentProxy,
    private val ops: OpsSummaryService,
) {

    @GetMapping("/sources")
    fun sources(): SourceListDto =
        SourceListDto(catalog.listSources().map { it.toDto(catalog.effectiveHealth(it)) })

    @GetMapping("/sources/{key}")
    fun source(@PathVariable key: String): SourceSummaryDto {
        val source = catalog.source(key)
        return source.toDto(catalog.effectiveHealth(source))
    }

    @GetMapping("/articles")
    fun articles(
        @RequestParam(required = false) q: String?,
        @RequestParam(required = false) source: String?,
        @RequestParam(required = false) page: Int?,
        @RequestParam(required = false) size: Int?,
    ): ListResponse<ArticleSummaryDto> {
        val pageRequest = PageRequest.of(page, size)
        return ListResponse.of(catalog.listArticles(q, source, pageRequest)) { it.toSummary() }
    }

    @GetMapping("/articles/{id}")
    fun article(@PathVariable id: String): ArticleDetailDto {
        val article = catalog.articleDetail(id)
        val markdown = if (article.status == "archived") {
            contentProxy.content(article.id).toString(Charsets.UTF_8)
        } else {
            // The reader still needs metadata (status, retry affordance) for a failed article,
            // but never a body: BA 05 §3 says non-archived content is 404 ART-NOT-FOUND.
            ""
        }
        return article.toDetail(markdown)
    }

    @GetMapping("/articles/{id}/content")
    fun content(@PathVariable id: String): ResponseEntity<ByteArray> {
        // Detail first: an unarchived article is ART-NOT-FOUND, not an empty 200.
        catalog.article(id)
        val body = contentProxy.content(id)
        return ResponseEntity.ok()
            .contentType(MediaType.parseMediaType("text/markdown; charset=utf-8"))
            .header(HttpHeaders.CACHE_CONTROL, "no-store")
            .body(body)
    }

    @GetMapping("/articles/{id}/assets/{file}")
    fun asset(@PathVariable id: String, @PathVariable file: String): ResponseEntity<ByteArray> {
        catalog.article(id)
        val asset = contentProxy.asset(id, file)
        return ResponseEntity.ok()
            .contentType(MediaType.parseMediaType(asset.contentType))
            .header(HttpHeaders.CACHE_CONTROL, "private, max-age=86400")
            .body(asset.bytes)
    }

    @GetMapping("/jobs")
    fun jobs(
        @RequestParam(required = false) page: Int?,
        @RequestParam(required = false) size: Int?,
    ): ListResponse<JobSummaryDto> =
        ListResponse.of(catalog.listJobs(PageRequest.of(page, size))) { it.toDto() }

    @GetMapping("/jobs/{id}")
    fun job(@PathVariable id: String): JobSummaryDto = catalog.job(id).toDto()

    @GetMapping("/jobs/{id}/failures")
    fun jobFailures(
        @PathVariable id: String,
        @RequestParam(required = false) page: Int?,
        @RequestParam(required = false) size: Int?,
    ): ListResponse<JobFailureDto> {
        // 404 JOB-NOT-FOUND for an unknown job even before hitting the crawler.
        catalog.job(id)
        return ListResponse.of(commands.jobFailures(id, PageRequest.of(page, size))) { it.toDto() }
    }

    @GetMapping("/ops/summary")
    fun opsSummary(): OpsSummaryDto {
        val summary = ops.summary()
        return OpsSummaryDto(
            checkedAt = summary.checkedAt,
            projectionLagSeconds = summary.projectionLagSeconds,
            services = summary.services.map { it.toDto() },
        )
    }
}

/**
 * Command surface (spec 06 file 03 §2, BE-06-07): every call proxies to crawler-service and
 * mirrors the accepted state. `all:true` is expanded from the read model (≤19 enabled sources).
 */
@RestController
@RequestMapping("/api/v1")
class CommandController(
    private val commands: CommandService,
    private val catalog: CatalogService,
) {

    @PatchMapping("/sources/{key}")
    fun setEnabled(
        @PathVariable key: String,
        @RequestBody(required = false) request: SetEnabledRequest?,
    ): SourceSummaryDto {
        val enabled = request?.enabled ?: throw InvalidRequest("enabled is required.")
        val updated = commands.setSourceEnabled(key, enabled)
        return updated.toDto(catalog.effectiveHealth(updated))
    }

    @PostMapping("/crawl-jobs")
    fun createJobs(
        @RequestBody(required = false) request: CreateJobsRequest?,
    ): ResponseEntity<CreateJobsResponse> {
        val body = request ?: throw InvalidRequest("Request body is required.")
        val jobType = body.jobType ?: throw InvalidRequest("jobType is required.")
        val hasKeys = body.sourceKeys != null
        val all = body.all == true
        if (hasKeys == all) {
            throw InvalidRequest("Provide exactly one of sourceKeys or all:true.")
        }
        val keys = if (all) {
            catalog.listSources().filter(SourceView::enabled).map(SourceView::key)
        } else {
            body.sourceKeys.orEmpty()
        }
        val created = commands.startJobs(keys, jobType)
        return ResponseEntity.accepted().body(CreateJobsResponse(created.map { it.toDto() }))
    }

    @PostMapping("/crawl-jobs/{id}/cancel")
    fun cancel(@PathVariable id: String): ResponseEntity<JobSummaryDto> =
        ResponseEntity.accepted().body(commands.cancelJob(id).toDto())

    @PostMapping("/articles/{id}/retry")
    fun retry(@PathVariable id: String): ResponseEntity<ArticleSummaryDto> =
        ResponseEntity.accepted().body(commands.retryArticle(id).toSummary())
}
