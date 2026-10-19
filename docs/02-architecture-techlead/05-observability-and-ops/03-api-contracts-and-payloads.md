# 03 — API Contracts and Payloads

Scope: health contracts (both Spring services), `/actuator/prometheus`, crawler internal ops
summary, api-service ops summary reference, and OPS error payloads. Shapes below are frozen;
change requires an amendment in this file.

## 1. Health endpoints (both services)

```text
200 /health/liveness and /health/readiness
{"status":"UP","service":"crawler-service","checkedAt":"2026-10-19T12:00:00Z"}

503 /health/readiness only
{"status":"DOWN","reasons":["db","redis","disk"]}
```

| Field | Type | Notes |
|---|---|---|
| status | string | `UP` / `DOWN` |
| service | string | `crawler-service` / `api-service` |
| checkedAt | ISO-8601 UTC | when checks finished |
| reasons | array of tokens | `db`, `redis`, `flyway`, `disk`; fixed order db, redis, flyway, disk |

| Rule | Detail |
|---|---|
| liveness | process-only; 200 while the process serves; a dead process returns nothing (compose healthcheck timeout applies) |
| readiness checks | db ping, redis ping, flyway current, disk guard; 2 s timeout per dependency |
| dependency failure | 503 with every failed token listed; a timeout counts as failure |
| independence | api-service readiness = own api_db + Redis; crawler-service reachability is surfaced only in the ops summary (section 3) |
| auth | none (single local user); endpoints reachable only via loopback / compose network |

## 2. /actuator/prometheus (both services)

`Content-Type: text/plain; version=0.0.4; charset=utf-8`; Prometheus exposition format; same
metric inventory as file 01 section 3.

```
# HELP crawler_queue_depth Pending URLs per host queue
# TYPE crawler_queue_depth gauge
crawler_queue_depth{host="blog.cloudflare.com"} 42
crawler_source_stale_total{source="cloudflare"} 1
```

Actuator exposure is limited to `health`, `info`, `prometheus`; not proxied by nginx (file 05).

## 3. crawler-service internal ops summary

`GET /internal/v1/ops/summary` — compose-internal only; `Content-Type: application/json`.

```json
{
  "generatedAt": "2026-10-19T12:00:00Z",
  "flywayVersion": "V005",
  "diskFreeGb": 38.2,
  "sources": [
    {"key": "cloudflare", "enabled": true, "discoveryType": "feed",
     "lastArchivedAt": "2026-10-19T09:12:44Z", "archivedCount": 512,
     "failedCount": 3, "stale": false}
  ],
  "queues": {"depthByHost": {"blog.cloudflare.com": 42}, "leased": 1, "retryZset": 0},
  "hosts": [{"host": "blog.cloudflare.com", "paused": false, "pausedUntil": null}]
}
```

| Field | Type | Source |
|---|---|---|
| generatedAt | ISO-8601 UTC | request time |
| flywayVersion | string | current crawler_db Flyway version, e.g. `V005` |
| diskFreeGb | number, 1 decimal | free space of the filesystem behind `/app/data` |
| sources[] | array, <=20 entries | `source_health` view (file 02) + app-computed `stale` (72 h) |
| queues.depthByHost | map host -> int | Redis per-host queue depths |
| queues.leased, retryZset | int | in-flight leases; retry zset size |
| hosts[] | array, <=20 entries | host gate state; `paused`, `pausedUntil`, pause reason from spec 02 |

## 4. api-service public ops summary (reference)

`GET /api/v1/ops/summary` — full JSON schema owned by spec 06, file 03. Blocks relevant here:

| Block | Content | Owner |
|---|---|---|
| sources | merged source health (counts from api_db read models + crawler summary) | spec 06 |
| crawler | `{"reachable": true/false, "lastSuccessAt": "<ts>", "summary": <passthrough>}` | this file (reachability fields) |
| projection | `{"lastEventAt": "<ts>", "lagSeconds": 4}` | spec 06 |
| hosts, queues | passthrough from section 3; omitted when `reachable=false` | spec 06 |

Crawler unreachability never changes api-service readiness; it is visible only here (block
`crawler`) and in dashboards.

## 5. Projection lag header

| Aspect | Rule |
|---|---|
| Header | `X-Projection-Lag: <s>` integer seconds |
| Applied to | every `/api/v1/**` response when a lag value is known |
| Source | `appliedAt` of the newest projected event vs now (`api_projection_lag_seconds`) |
| Warn | >30 s -> dashboard banner; WARN log code OPS-PROJECTION-LAG, at most once per 10 min per burst |
| Escalation | >30 s sustained beyond 10 min -> ERROR log + reconciliation run (BA 05 section 4) |
| Status | response stays 200; OPS-PROJECTION-LAG is a warning signal, never an error status |

## 6. ProblemDetail example

RFC 9457; `type=urn:tech-blog:error:<CODE>`; `code` extension member mirrors the type suffix for
UI convenience.

```json
{
  "type": "urn:tech-blog:error:OPS-DEPENDENCY-DOWN",
  "title": "Dependency unavailable",
  "status": 503,
  "detail": "crawler-service did not answer within 2 s",
  "instance": "/api/v1/crawl-jobs",
  "code": "OPS-DEPENDENCY-DOWN"
}
```

Used when an api-service endpoint requires the crawler-service (commands, job status) and the
call fails or exceeds its 2 s budget. Health `503` bodies (section 1) are not ProblemDetails:
they are the frozen health contract.
