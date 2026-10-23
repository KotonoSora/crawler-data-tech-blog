package com.techblog.api.config

import jakarta.servlet.FilterChain
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.slf4j.MDC
import org.springframework.stereotype.Component
import org.springframework.web.filter.OncePerRequestFilter

/**
 * Puts the frozen MDC defaults on every request and clears the map in a finally block so a
 * pooled servlet thread never leaks `code`, `host`, `articleId`, or `jobId` to the next request
 * (spec 05-observability file 01 §2).
 */
@Component
class MdcRequestFilter : OncePerRequestFilter() {
    override fun doFilterInternal(
        request: HttpServletRequest,
        response: HttpServletResponse,
        filterChain: FilterChain,
    ) {
        MDC.put("code", "-")
        try {
            filterChain.doFilter(request, response)
        } finally {
            MDC.clear()
        }
    }
}
