# 01 — Document Context and Scope

Scope of this BA document set: the local archive crawler product "tech-blog" — its crawling
pipeline, data, local web UI, and operating rules. Source of truth for open decisions: AGENTS.md.

## 1. Product context

| Item | Description |
|---|---|
| Product | Personal archive crawler for 20 engineering blogs |
| Output | Per article: `content.md` + `meta.json` + `assets/` on local disk; browsable via local web UI |
| Architecture | Microservices: crawler-service, api-service, web (React 19.3.1), infra (nginx, Postgres 18.6, Redis 7.4) |
| Users | One person: owner-operator (developer) who is also the reader |

DEVIATION FLAGGED (first use in BA tree): brief section 2.1 mandated a modular monolith and no UI;
the user ordered microservices and a mandatory React 19.3.1 stack on 2026-10-19. Rationale: user
requirement. Budget: +2 images, +1 database, +1 event path, +1 frontend toolchain.

DEVIATION CARRIED (2026-10-19): manual-only operation on a local VPS; no scheduled crawls, no CI/CD
automation — every crawl starts from an operator action (first use: 04-crawl-orchestration file 01).

## 2. Goals

| ID | Goal | Success metric |
|---|---|---|
| G1 | Full backfill of each enabled source | >=95% of articles reachable via sitemap/listing archived |
| G2 | Incremental crawl of new posts | New post archived on the first operator-triggered incremental run after it appears in feed/sitemap |
| G3 | Clean offline reading | `content.md` + assets render with no network access |
| G4 | Local web UI | Browse, search, read, trigger, monitor — all functional on localhost |
| G5 | Restart safety | Resume mid-backfill with 0 duplicate articles, 0 partial final files |
| G6 | Containerized release | Same version runs via Docker OR Podman; parity gate passes |

## 3. In scope

| Area | Contents |
|---|---|
| Crawl pipeline | Discovery, fetch (polite), extraction to Markdown, asset download, atomic archive |
| Sources | 20 configured sources; 19 enabled, DoorDash disabled until re-probed |
| Storage | `data/uploads/crawl/<source>/<slug>/`, `data/postgres/`, `data/logs/` |
| crawler-service | Ingest, manual-trigger validation + enqueue, queues, per-host politeness, archive writes, events out |
| api-service | Public REST for UI, admin commands, read-model projections into `api_db` |
| web | React SPA: sources, article list/search, reader, job monitor, trigger actions |
| Ops | Health endpoints, metrics, structured logs, staleness detection |
| Delivery | Per-service Containerfiles, compose stack, Docker/Podman parity |

## 4. Out of scope

Public hosting; user accounts/auth; republishing or redistribution; mobile apps; object storage
(S3/MinIO), CDN; comments/social; email/push notifications; multi-tenant scaling; dedicated search
engine (search is served from Postgres read models); CMS-style editing of archived content.

## 5. Users and stakeholders

| Role | Person | Needs |
|---|---|---|
| Owner-operator | Single user | Backfill + operator-triggered incremental crawl with clear job status |
| Reader | Same single user | Reliable offline archive; fast browse/search; faithful rendering |
| Source owners (external) | Blog operators | Politely crawled: robots honored, low rate, identifiable UA |

## 6. Source portfolio summary

| Discovery type | Count | Examples |
|---|---|---|
| RSS/Atom feed (window) | 14 | Meta, Cloudflare, AWS, Slack, Spotify, GitHub, Medium-family |
| Sitemap-first | 3 | Uber, Datadog, Shopify |
| Listing-only (HTML pagination) | 2 | LinkedIn, Discord |
| Disabled | 1 | DoorDash (403 on `/feed/`, apex redirect on probe date) |

Probe date for the full catalog (see AGENTS.md): 2026-10-19. Feeds are windows, not archives:
Medium ~10 items, Slack 8, Spotify 5, Cloudflare/AWS 20, Google 100 — full backfill requires
sitemap or listing pagination.

## 7. Constraints and assumptions

| Type | Item |
|---|---|
| Constraint | Politeness: 1 concurrent request per host, fixed delay, robots honored, identified UA |
| Constraint | Personal use only; attribution preserved; no republishing |
| Constraint | Local disk storage only; no external storage services |
| Constraint | Closed tech stack (AGENTS.md pins); no dynamic dependency versions |
| Constraint | One developer maintains the whole system |
| Assumption | Source markup remains parseable by generic extraction + per-source overrides |
| Assumption | Source owners keep robots.txt permissive to polite crawlers |
| Assumption | Single machine runs the whole compose stack; no HA requirements |
