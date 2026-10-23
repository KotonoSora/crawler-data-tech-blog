package com.techblog.api.config

import com.techblog.api.domain.ProjectionLagTracker
import jakarta.servlet.FilterChain
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Profile
import org.springframework.web.filter.OncePerRequestFilter
import org.springframework.web.servlet.config.annotation.CorsRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer
import org.springframework.stereotype.Component

/**
 * `X-Projection-Lag: <integer seconds>` on every `/api/v1` response (spec 06 file 03 §1,
 * BE-06-09). The value is cached in memory: a header must never add a DB round trip.
 */
@Component
class ProjectionLagHeaderFilter(
    private val tracker: ProjectionLagTracker,
) : OncePerRequestFilter() {
    override fun doFilterInternal(
        request: HttpServletRequest,
        response: HttpServletResponse,
        filterChain: FilterChain,
    ) {
        if (request.requestURI.startsWith("/api/v1")) {
            response.setHeader("X-Projection-Lag", tracker.lagSeconds().toString())
        }
        filterChain.doFilter(request, response)
    }
}

/**
 * Dev profile only: the Vite shell runs on localhost:5173 and calls the API cross-origin
 * (spec 06 file 05 §2). Production is same-origin through nginx and emits no CORS headers.
 */
@Configuration
@Profile("dev")
class DevCorsConfig(
    private val properties: ApiProperties,
) : WebMvcConfigurer {
    override fun addCorsMappings(registry: CorsRegistry) {
        registry.addMapping("/api/**")
            .allowedOrigins(properties.devCorsOrigin)
            .allowedMethods("GET", "POST", "PATCH", "OPTIONS")
            .allowedHeaders("Content-Type")
            .exposedHeaders("X-Projection-Lag")
            .maxAge(600)
    }
}
