package com.kotonosora.techblog.api.api

import com.kotonosora.techblog.api.domain.DomainException
import com.kotonosora.techblog.api.domain.ErrorCode
import jakarta.servlet.http.HttpServletRequest
import org.slf4j.LoggerFactory
import org.springframework.http.HttpStatus
import org.springframework.http.ProblemDetail
import org.springframework.http.ResponseEntity
import org.springframework.http.converter.HttpMessageNotReadableException
import org.springframework.web.bind.MethodArgumentNotValidException
import org.springframework.web.bind.MissingServletRequestParameterException
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException
import org.springframework.web.servlet.resource.NoResourceFoundException
import java.net.URI
import java.time.Instant

/**
 * RFC 9457 ProblemDetail for every failure (BA 05 §2, spec 06 file 03 §4).
 * `type=urn:tech-blog:error:<CODE>`, plus the `code` and `occurredAt` extensions; duplicate
 * active jobs also carry `activeJobId` so the UI can link straight to the blocking job.
 */
@RestControllerAdvice
class ProblemDetailAdvice {

    private val log = LoggerFactory.getLogger(javaClass)

    @ExceptionHandler(DomainException::class)
    fun domain(error: DomainException, request: HttpServletRequest): ResponseEntity<ProblemDetail> {
        val code = error.code
        log.warn("api_error code={} instance={} detail={}", code.wire, request.requestURI, error.message)
        return build(code, error.message, request, error.activeJobId)
    }

    @ExceptionHandler(
        MethodArgumentTypeMismatchException::class,
        MissingServletRequestParameterException::class,
        HttpMessageNotReadableException::class,
        MethodArgumentNotValidException::class,
    )
    fun badRequest(error: Exception, request: HttpServletRequest): ResponseEntity<ProblemDetail> {
        log.warn("api_error code={} instance={} detail={}", ErrorCode.CFG_INVALID_REQUEST.wire, request.requestURI, error.message)
        return build(ErrorCode.CFG_INVALID_REQUEST, error.message ?: "Invalid request.", request)
    }

    @ExceptionHandler(NoResourceFoundException::class)
    fun notFound(error: NoResourceFoundException, request: HttpServletRequest): ResponseEntity<ProblemDetail> =
        build(ErrorCode.CFG_INVALID_REQUEST, "No route for ${request.requestURI}.", request)

    @ExceptionHandler(Exception::class)
    fun unexpected(error: Exception, request: HttpServletRequest): ResponseEntity<ProblemDetail> {
        log.error("api_error code=UI-UNKNOWN instance={}", request.requestURI, error)
        val detail = ProblemDetail.forStatusAndDetail(
            HttpStatus.INTERNAL_SERVER_ERROR,
            "Unexpected server error.",
        )
        detail.type = URI.create("urn:tech-blog:error:UI-UNKNOWN")
        detail.title = "Request failed"
        detail.setProperty("code", "UI-UNKNOWN")
        detail.setProperty("occurredAt", Instant.now().toString())
        detail.instance = URI.create(request.requestURI)
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .contentType(org.springframework.http.MediaType.APPLICATION_PROBLEM_JSON)
            .body(detail)
    }

    private fun build(
        code: ErrorCode,
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
            .contentType(org.springframework.http.MediaType.APPLICATION_PROBLEM_JSON)
            .body(detail)
    }
}
