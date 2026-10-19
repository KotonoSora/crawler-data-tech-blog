# AGENTS.md — tech-blog

## Purpose
Local archive crawler for 20 engineering blogs: downloads articles to local disk as Markdown +
assets + meta.json for personal reading/reference, with a local web UI to browse, search, read,
and trigger crawls. No republishing, no public hosting, no multi-user accounts. Microservices
topology, fully containerized; MUST run under Docker OR Podman (parity is a release gate).

## Architecture — microservices (user mandate, 2026-10-19)
DEVIATION FLAGGED (first use): brief section 2.1 chose a modular monolith. User ordered
microservices on 2026-10-19. Rationale: explicit user requirement. Budget: +2 images, +1 database,
+1 event path. The brief's extraction triggers no longer gate this decision.
| Deployable | Owns | Talks to |
|---|---|---|
| services/crawler-service | crawler_db; Redis queues/locks/caches; discovery, fetch, extraction, archive, scheduler | Redis Streams events out; admin REST in |
| services/api-service | api_db read models; public REST for the UI + admin commands | crawler-service REST; consumes Redis Streams |
| web | nothing server-side; React 19.3.1 SPA | api-service REST via nginx `/api` proxy |
| deploy/ infra | nginx edge, postgres 18.6, redis 7.4 | — |
Each service: one Spring Boot deployable, one image, one database. No shared schema, no shared
code module; contracts are documented REST/JSON + Redis Streams event payloads. nginx is the edge
(serves SPA, proxies `/api`); no separate API gateway.

## Stack pins (closed set — no dynamic versions)
| Element | Pin |
|---|---|
| Spring Boot | 4.1.1 (Gradle plugin same version) |
| Kotlin | 2.4.21 — backend services only; no Java sources |
| Gradle | 9.8.1, Kotlin DSL, wrapper-only (./gradlew; system gradle never used) |
| JVM | toolchain 21; runtime image Eclipse Temurin JRE 21 |
| PostgreSQL | 18.6 — single instance; databases crawler_db + api_db; version asserted at boot |
| Redis | 7.4 — queues, locks, caches, event stream |
| React | 19.3.1 (web), TypeScript + Vite pins recorded in docs baseline 02 |
| Node.js | 24 — build stage for web only |
| Nginx | pinned upstream image; SPA + reverse proxy + optional archive static |
| Testcontainers | pinned in the Gradle catalog — PG 18.6 + Redis 7.4 in tests |
Infra images may take patch bumps inside the pinned minor line; Boot/Kotlin/Gradle/React/Node bumps
require an explicit amendment recorded in docs/02-architecture-techlead/00-platform-baseline/
02-stack-and-build-pins.md. Third-party patch bumps are allowed and recorded there.

## Container contract
Per-service multi-stage Containerfile: Gradle 9.8.1 build stage -> Temurin JRE 21 runtime stage
(crawler-service, api-service); Node 24 build stage -> nginx pinned runtime (web). Non-root users;
no baked secrets. Tags :<semver>-<gitsha>; promotion by digest. Health: /health/liveness +
/health/readiness on both Spring services. SIGTERM (crawler-service): stop leasing jobs, finish
in-flight batch (<=60 s), exit. Config from environment only; .env never committed.

## Source catalog (probe dated 2026-10-19 — re-probe and re-date before trusting)
Discovery order per source: RSS/Atom feed -> sitemap -> listing pagination.
| Source | Discovery path |
|---|---|
| Netflix TechBlog | https://netflixtechblog.com/feed |
| Uber Engineering | sitemap https://www.uber.com/sitemap.xml + listing /en-US/blog/engineering/ |
| Meta Engineering | https://engineering.fb.com/feed/ |
| Google Research | https://research.google/blog/rss/ |
| LinkedIn Engineering | listing https://www.linkedin.com/blog/engineering |
| Cloudflare | https://blog.cloudflare.com/rss/ |
| AWS Architecture | https://aws.amazon.com/blogs/architecture/feed/ |
| Datadog | sitemap https://www.datadoghq.com/sitemap.xml + listing /blog/engineering/ |
| Stripe | https://stripe.com/blog/feed.rss (whole blog; filter to engineering) |
| Discord | listing https://discord.com/blog |
| Slack | https://slack.engineering/feed |
| Airbnb | https://medium.com/feed/airbnb-engineering |
| Spotify | https://engineering.atspotify.com/feed/ |
| Shopify | sitemap https://shopify.engineering/sitemap.xml |
| DoorDash | DISABLED until re-probed (/feed/ 403; apex -> careersatdoordash.com on probe date) |
| Grab | https://engineering.grab.com/feed |
| Lyft | https://eng.lyft.com/feed |
| GitHub | https://github.blog/category/engineering/feed/ |
| Dropbox | https://dropbox.tech/feed |
| Pinterest | https://medium.com/@Pinterest_Engineering/feed |

Rules:
- Feeds are windows, not archives (Medium ~10 items, Slack 8, Spotify 5, Cloudflare/AWS 20, Google
  100) — full backfill MUST page sitemaps/listings; RSS alone truncates history.
- Medium-family hosts intermittently return 000/403 to non-browser agents: retry with browser UA +
  Accept: application/rss+xml; treat as transient, never as "source removed".
- Strip ?source=rss-... tracking params from Medium links before using them as identity.
- Never claim a source is crawlable without fetching it; date every probe and update this table.

## Crawl rules (hard)
- robots.txt per host; User-Agent identifies the crawler + a contact.
- One concurrent request per host + fixed polite delay; per-host rate limits enforced centrally.
- 4xx terminal (no retry); 5xx/429 bounded backoff; no retry storms.
- Conditional GET (ETag / If-Modified-Since).
- Identity = canonical URL (fragments + tracking params stripped); content_sha256 decides
  "changed"; a re-crawl never rewrites a file under a new slug.
- Writes: temp file + atomic rename; restart-safe resume mid-backfill without duplicates.
- Images downloaded into the article's assets/ and rewritten to relative paths; no hotlinking.
- meta.json always keeps source_url, canonical_url, author, published_at, fetched_at,
  content_sha256; attribution never stripped from the Markdown.
- Every fetch logged (url, status, duration, bytes) and exposed as metrics; a source that silently
  stops producing is a bug, not a quiet success.

## Repo layout
Root Gradle build (wrapper 9.8.1) with modules `services/crawler-service` and `services/api-service`
· web/ (React 19.3.1 + TypeScript + Vite; exact pins; Node 24) · deploy/ (compose, Containerfiles,
nginx config, .env.example) · data/ (gitignored: uploads/crawl/<source>/<slug>/{content.md,
meta.json, assets/}, postgres/, redis/, logs/) · docs/ · AGENTS.md.

## Docs tree
- docs/01-business-analysis/00-archive-crawl/ — 7 BA files (01-document-context-and-scope.md ...
  07-non-functional-requirements.md).
- docs/02-architecture-techlead/00-platform-baseline/ — 7 files; minor specs with 5 TL files each
  (01-architecture-and-tech-stack.md ... 05-security-logging-and-rate-limiting.md):
  01-source-discovery, 02-fetch-and-politeness, 03-content-extraction, 04-crawl-orchestration,
  05-observability-and-ops, 06-api-service, 07-web-app.

## Doc conventions (binding)
- Path <NN-major>/<NN-minor>/<NN-doc>.md; dirs and files 2-digit prefix, kebab-case, lowercase.
- HARD CAP: <=1,000 words per .md; split by topic; -part-1/-part-2 if one topic overflows.
  DEVIATION FLAGGED (2026-10-19): brief section 6 mandated wc verification before every save; the
  step was dropped at user request. Rationale: lower overhead. Mitigation: topic-scoped files.
- Table-first, scannable; every threshold is a number with a unit.
- BA file set per minor spec: 01-document-context-and-scope, 02-user-stories-and-business-rules,
  03-workflow-and-user-journey, 04-ui-data-dictionary, 05-exception-handling-and-errors,
  06-acceptance-criteria (BDD Given-When-Then), 07-non-functional-requirements.
- TL file set per minor spec: 01-architecture-and-tech-stack, 02-database-schema-design,
  03-api-contracts-and-payloads, 04-step-by-step-implementation-plan,
  05-security-logging-and-rate-limiting.
- Implementation task table: Task ID | Subsystem (BE/DevOps) | Step Description | Dependency |
  Acceptance Goal. Task IDs: BE-<spec>-<nn> / DO-<spec>-<nn>.

## Working rules for agents
- Always use English: conversation, docs, code, comments, commit messages.
- STAY INSIDE this repo. Never read/list/glob/grep/modify anything outside it without explicit
  permission in that turn. Ask first.
- Never commit .env, secrets, or crawled content (data/ is gitignored).
- Backend: Kotlin only; data classes for DTOs; Bean Validation on requests; RFC 9457 ProblemDetail
  errors with stable code strings; packages api/domain/data/config. Web: TypeScript + React only.
- Spring Boot 4 uses Jackson 3 for MVC request bodies: register the tools.jackson Kotlin module or
  data-class defaults never fill omitted JSON fields.
- No dynamic dependency versions, no second JVM language, no object-store libraries.
- Verify before asserting: never state a source or capability works without checking it in this
  session; date every probe result.
- On contradicting a locked decision: write "DEVIATION FLAGGED" inline with budget/rationale on
  first use; "DEVIATION CARRIED" on later references.
