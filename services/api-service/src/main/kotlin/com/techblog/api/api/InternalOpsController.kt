package com.techblog.api.api

import com.techblog.api.data.ReconcileResult
import com.techblog.api.data.ReconciliationService
import io.swagger.v3.oas.annotations.Hidden
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

/**
 * Operator-only consistency actions (spec 06 file 01 §4). Not part of the public `/api/v1`
 * contract and never proxied by nginx; reachable only on the compose network / loopback.
 * `@Hidden` keeps the generated OpenAPI document at the 14 public endpoints.
 */
@Hidden
@RestController
@RequestMapping("/internal/v1")
class InternalOpsController(
    private val reconciliation: ReconciliationService,
) {

    /** Runs one full reconciliation pass (boot also runs it via `ApplicationReadyEvent`). */
    @PostMapping("/reconcile")
    fun reconcile(): ResponseEntity<ReconcileResult> {
        val result = reconciliation.reconcile()
        return if (result.error == null) {
            ResponseEntity.ok(result)
        } else {
            ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(result)
        }
    }
}
