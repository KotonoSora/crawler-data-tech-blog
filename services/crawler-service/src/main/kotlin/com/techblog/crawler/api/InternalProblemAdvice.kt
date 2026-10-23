package com.techblog.crawler.api

import com.techblog.crawler.domain.CrawlerErrorCode
import com.techblog.crawler.domain.CrawlerException
import jakarta.servlet.http.HttpServletRequest
import org.slf4j.LoggerFactory
import org.springframework.dao.DataAccessException
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.http.ProblemDetail
import org.springframework.http.ResponseEntity
import org.springframework.http.converter.HttpMessageNotReadableException
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException
import org.springframework.web.servlet.resource.NoResourceFoundException
import java.net.URI
import java.time.Instant

/**
 * RFC 9457 ProblemDetail for the internal surface (spec 04 file 03 §4, BA 05 §2):
 * `type=urn:tech-blog:error:<CODE>` plus `code` and `occurredAt`; a duplicate active job also
 * carries `activeJobId` so api-service can link to the blocking job.
 */
@RestControllerAdvice
class InternalProblemAdvice {

    private val log = LoggerFactory.getLogger(javaClass)

    @ExceptionHandler(CrawlerException::class)
    fun crawler(error: CrawlerException, request: HttpServletRequest): ResponseEntity<ProblemDetail> {
        log.warn(
            "crawler_api_error code={} instance={} detail={}",
            error.code.wire,
            request.requestURI,
            error.message,
        )
        return build(error.code, error.message, request, error.activeJobId)
    }

    @ExceptionHandler(
        MethodArgumentTypeMismatchException::class,
        HttpMessageNotReadableException::class,
    )
    fun badRequest(error: Exception, request: HttpServletRequest): ResponseEntity<ProblemDetail> {
        log.warn("crawler_api_error code=CFG-INVALID-REQUEST instance={}", request.requestURI)
        return build(
            CrawlerErrorCode.CFG_INVALID_REQUEST,
            error.message ?: "Invalid request.",
            request,
        )
    }

    @ExceptionHandler(NoResourceFoundException::class)
    fun notFound(error: NoResourceFoundException, request: HttpServletRequest): ResponseEntity<ProblemDetail> =
        build(
            CrawlerErrorCode.CFG_INVALID_REQUEST,
            "No route for ${request.requestURI}.",
            request,
        )

    @ExceptionHandler(DataAccessException::class)
    fun dependency(error: DataAccessException, request: HttpServletRequest): ResponseEntity<ProblemDetail> {
        log.error(
            "crawler_api_error code={} instance={} reason={}",
            CrawlerErrorCode.OPS_DEPENDENCY_DOWN.wire,
            request.requestURI,
            error.message,
        )
        return build(
            CrawlerErrorCode.OPS_DEPENDENCY_DOWN,
            "A required dependency (PostgreSQL or Redis) is unavailable.",
            request,
        )
    }

    @ExceptionHandler(Exception::class)
    fun unexpected(error: Exception, request: HttpServletRequest): ResponseEntity<ProblemDetail> {
        log.error("crawler_api_error code=CFG-INVALID-REQUEST instance={}", request.requestURI, error)
        val detail = ProblemDetail.forStatusAndDetail(
            HttpStatus.INTERNAL_SERVER_ERROR,
            "Unexpected crawler error.",
        )
        detail.type = URI.create("urn:tech-blog:error:CFG-INVALID-REQUEST")
        detail.title = "Request failed"
        detail.instance = URI.create(request.requestURI)
        detail.setProperty("code", CrawlerErrorCode.CFG_INVALID_REQUEST.wire)
        detail.setProperty("occurredAt", Instant.now().toString())
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .contentType(MediaType.APPLICATION_PROBLEM_JSON)
            .body(detail)
    }

    private fun build(
        code: CrawlerErrorCode,
        message: String,
        request: HttpServletRequest,
        activeJobId: String? = null,
    ): ResponseEntity<ProblemDetail> {
        val detail = ProblemDetail.forStatusAndDetail(HttpStatus.valueOf(code.status), message)
        detail.type = URI.create("urn:tech-blog:error:${code.wire}")
        detail.title = code.title
        detail.instance = URI.create(request.requestURI)
        detail.setProperty("code", code.wire)
        detail.setProperty("occurredAt", Instant.now().toString())
        if (activeJobId != null) detail.setProperty("activeJobId", activeJobId)
        return ResponseEntity.status(code.status)
            .contentType(MediaType.APPLICATION_PROBLEM_JSON)
            .body(detail)
    }
}
