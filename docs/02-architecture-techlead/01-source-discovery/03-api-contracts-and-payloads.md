# 03 — Source Discovery: API Contracts and Payloads

Base: `crawler-service` `/internal/v1`, reachable on the compose-internal network only (NFR-24);
nginx never proxies it and the SPA never calls it (BR-16). The public `/api/v1` surface belongs to
api-service (spec 06) and proxies these commands. springdoc (Boot 4 line) generates the OpenAPI
document for the three endpoints below.

## 1. Endpoints

| Method | Path | Purpose | Success | Error codes |
|---|---|---|---|---|
| POST | /internal/v1/jobs | start one discovery run for one source | 202 | CFG-INVALID-REQUEST (400), CFG-SOURCE-NOT-FOUND (404), JOB-INVALID-STATE (409), JOB-DUPLICATE-ACTIVE (409) |
| GET | /internal/v1/jobs/{jobId} | job counters, chosen path, discovery errors | 200 | JOB-NOT-FOUND (404) |
| GET | /internal/v1/sources | registry snapshot for the trigger UI | 200 | — |

Content type: `application/json`; errors: `application/problem+json`. Unknown JSON fields are
rejected (`fail-on-unknown-properties=true`).

## 2. POST /internal/v1/jobs

Request:

```json
{ "sourceKey": "cloudflare", "jobType": "backfill" }
```

```kotlin
data class DiscoveryRunRequest(
    @field:NotBlank
    @field:Pattern(regexp = "^[a-z0-9][a-z0-9-]{1,49}$")
    val sourceKey: String,
    @field:NotNull val jobType: JobType,
)

enum class JobType {
    @JsonProperty("backfill") BACKFILL,
    @JsonProperty("incremental") INCREMENTAL,
}
```

Response 202:

```json
{
  "jobId": "0192f0c1-6a1e-7c3a-9d2f-4b8f0e5a77c1",
  "sourceKey": "cloudflare",
  "jobType": "backfill",
  "status": "pending",
  "requestedAt": "2026-10-19T09:15:00Z"
}
```

## 3. GET /internal/v1/jobs/{jobId}

Response 200:

```json
{
  "jobId": "0192f0c1-6a1e-7c3a-9d2f-4b8f0e5a77c1",
  "sourceKey": "cloudflare",
  "jobType": "backfill",
  "status": "running",
  "path": "sitemap",
  "counters": { "discovered": 812, "archived": 640, "skipped": 31, "failed": 3 },
  "startedAt": "2026-10-19T09:15:02Z",
  "finishedAt": null,
  "errors": [
    {
      "code": "DISC-FEED-PARSE-FAILED",
      "occurredAt": "2026-10-19T09:15:31Z",
      "page": 1,
      "problem": {
        "type": "urn:tech-blog:error:DISC-FEED-PARSE-FAILED",
        "title": "Feed parse failed",
        "status": 502,
        "detail": "RSS XML invalid after 2 attempts; fell back to sitemap.",
        "instance": "/internal/v1/jobs/0192f0c1-6a1e-7c3a-9d2f-4b8f0e5a77c1",
        "code": "DISC-FEED-PARSE-FAILED"
      }
    }
  ]
}
```

Discovery errors are asynchronous (the 202 was already returned), so they are embedded in the job
payload using the exact RFC 9457 shape; api-service can re-serve them unchanged. The embedded
`status` is informational; a live HTTP status appears only on synchronous responses.

## 4. GET /internal/v1/sources

Response 200 (excerpt):

```json
[
  { "sourceKey": "cloudflare", "name": "Cloudflare", "enabled": true,
    "discoveryType": "feed", "politenessProfile": "default",
    "lastSuccessAt": "2026-10-19T08:02:11Z", "activeJobId": null, "lastError": null },
  { "sourceKey": "linkedin-engineering", "name": "LinkedIn Engineering", "enabled": true,
    "discoveryType": "listing", "politenessProfile": "default",
    "lastSuccessAt": "2026-10-18T03:12:44Z", "activeJobId": null,
    "lastError": {
      "type": "urn:tech-blog:error:DISC-LISTING-SELECTOR-BROKEN",
      "title": "Listing selector broken",
      "status": 500,
      "detail": "Pagination returned 0 new links twice (pages 4-5); update listingSelectors.",
      "instance": "/internal/v1/sources",
      "code": "DISC-LISTING-SELECTOR-BROKEN"
    } },
  { "sourceKey": "doordash", "name": "DoorDash", "enabled": false,
    "discoveryType": "feed", "politenessProfile": "default",
    "lastSuccessAt": null, "activeJobId": null, "lastError": null }
]
```

## 5. Validation and error rules

| Input / state | Rule | HTTP | Code |
|---|---|---|---|
| sourceKey | required, `^[a-z0-9][a-z0-9-]{1,49}$` (2-50 chars) | 400 | CFG-INVALID-REQUEST |
| jobType | one of `backfill`, `incremental` (lowercase on the wire) | 400 | CFG-INVALID-REQUEST |
| unknown JSON field | rejected | 400 | CFG-INVALID-REQUEST |
| body >4 KB | rejected before parsing | 413 | CFG-INVALID-REQUEST |
| sourceKey absent from registry | query miss on `uq_source_key` | 404 | CFG-SOURCE-NOT-FOUND |
| source disabled (e.g. DoorDash) | trigger refused; never a silent 0-candidate run | 409 | JOB-INVALID-STATE |
| active `pending`/`running` job for the source | refused by `uq_crawl_job_active_source` (BR-18) | 409 | JOB-DUPLICATE-ACTIVE |
| jobId unknown | any 36-char string accepted, then miss | 404 | JOB-NOT-FOUND |

404 CFG-SOURCE-NOT-FOUND example:

```json
{
  "type": "urn:tech-blog:error:CFG-SOURCE-NOT-FOUND",
  "title": "Source not found",
  "status": 404,
  "detail": "No source with key 'clodflare' exists in the registry.",
  "instance": "/internal/v1/jobs",
  "code": "CFG-SOURCE-NOT-FOUND"
}
```

## 6. Consumer contract (api-service, spec 06)

| Direction | Contract |
|---|---|
| api-service -> crawler-service | start job (202), poll job (200), list sources (200) |
| Error passthrough | ProblemDetail bodies re-served unchanged; `type` and `code` are stable |
| Retry rule | api-service retries transport errors only (timeout 5 s, 1 retry); 4xx is terminal |
| Polling | job poll every 5 s while `pending`/`running`; stop after 3 consecutive transport failures, surface OPS-DEPENDENCY-DOWN |
