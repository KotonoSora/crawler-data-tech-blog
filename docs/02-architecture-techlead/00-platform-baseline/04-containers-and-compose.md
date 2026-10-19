# 04 — Containers and Compose

## 1. Image contract (one image per deployable)

| Image | Build stages | Runtime | User |
|---|---|---|---|
| crawler-service | gradle:9.8.1-jdk21 -> bootJar (module build) | eclipse-temurin:21-jre | non-root `app` (uid 10001) |
| api-service | gradle:9.8.1-jdk21 -> bootJar (module build) | eclipse-temurin:21-jre | non-root `app` (uid 10001) |
| web | node:24 (npm ci + vite build) | nginx:1.29 pinned | nginx default, read-only static |
| (infra) | — | postgres:18.6, redis:7.4, nginx:1.29 | upstream defaults + data volume ownership note |

Rules: no secrets baked (env only); `HEALTHCHECK` per Spring image hits `/health/readiness`;
tags `:<semver>-<gitsha>`; promotion by digest; `Containerfile.crawler`, `Containerfile.api`,
`Containerfile.web` live in `deploy/`; the repo-root `.dockerignore` keeps `.git`, `.gradle`,
`.verify`, `data/`, `docs/`, `web/node_modules`, `web/dist` and `**/build` out of build contexts.

## 2. Compose topology (deploy/compose.yaml)

| Service | Image/build | Host binding (loopback only) | Volumes | Depends on |
|---|---|---|---|---|
| postgres | postgres:18.6 | 127.0.0.1:5432:5432 | ../data/postgres:/var/lib/postgresql (PG18 layout: data at 18/docker) | — |
| redis | redis:7.4 | 127.0.0.1:6379:6379 | ../data/redis:/data | — |
| crawler-service | build deploy/Containerfile.crawler | 127.0.0.1:8082:8080 | ../data:/app/data | postgres healthy, redis healthy |
| api-service | build deploy/Containerfile.api | 127.0.0.1:8081:8080 | ../data/logs:/app/data/logs (logs only; spec 05 deviation) | postgres healthy, redis healthy, crawler-service started |
| web (nginx) | build deploy/Containerfile.web | 127.0.0.1:8090:80 | (none; assets baked into image) | api-service started |
| nginx-archive (profile `serving`) | nginx:1.29 | 127.0.0.1:8091:80 | ../data/uploads:/srv/archive:ro | — |

Healthchecks: `pg_isready -U $$POSTGRES_USER`, `redis-cli ping`, Spring `/health/readiness`,
`wget -q -O- localhost/` for nginx. `restart: unless-stopped` everywhere.

## 3. Environment variables (names only; values in .env, never committed)

| Variable | Consumer | Example |
|---|---|---|
| POSTGRES_USER / POSTGRES_PASSWORD / POSTGRES_DB | postgres + migrator | `techblog_migrator` |
| CRAWLER_DB_URL / API_DB_URL | services | `jdbc:postgresql://postgres:5432/crawler_db` |
| SPRING_DATASOURCE_USERNAME / PASSWORD | services (app roles) | per-service app roles |
| REDIS_URL | both services | `redis://redis:6379` |
| CRAWLER_CONTACT | crawler-service | `you@example.com` (used in UA) |
| CRAWLER_GLOBAL_HOSTS | crawler-service | `4` |
| CRAWLER_ARCHIVE_ROOT | crawler-service | `/app/data/uploads/crawl` |
| CRAWLER_ROLE | crawler-service | `api` / `worker` / `all` (single node default `all`) |
| TZ | all | `UTC` |

## 4. nginx contracts (web image + archive profile)

| Concern | Rule |
|---|---|
| SPA | `try_files $uri /index.html`; assets immutable cache 30 d; index.html no-cache |
| `/api/` | `proxy_pass http://api-service:8080/api/`; no caching |
| Archive profile | only `/archive/` path, read-only volume, `autoindex off`, GET/HEAD only |
| Security headers | `X-Content-Type-Options: nosniff`, `Referrer-Policy: no-referrer`, CSP for SPA |
| Body size | client_max_body_size 1m (no uploads) |

## 5. Docker / Podman parity (release gate G-G)

| Aspect | Docker | Podman |
|---|---|---|
| Compose | `docker compose up -d` | `podman compose up -d` (or podman-compose) |
| Bind mounts | plain paths | add `:U` or run `--userns=keep-id`; SELinux hosts may need `:z` |
| Loopback binds | as in table | identical |
| Smoke | AC-11 + AC-06 against 127.0.0.1:8090 | same |
| Images | built locally, same tags | same tags; digest promotion unchanged |

Known parity note: rootless Podman maps container uid 10001 to a host subuid; `data/` must be
writable by that mapping (documented in deploy/README.md by E5).
