# deploy — local stack

Everything runs containerized: Postgres 18.6, Redis 7.4, crawler-service, api-service,
web (nginx SPA edge). Host tools needed: a container runtime and nothing else.

## Quickstart

```sh
cp .env.example .env        # fill in passwords + CRAWLER_CONTACT; never commit .env
./prepare-dirs.sh           # creates ../data runtime tree
docker compose up -d --build
open http://127.0.0.1:8090  # SPA (proxies /api to api-service)
```

## Ports (all loopback-only binds)

| Port | Service | Notes |
|---|---|---|
| 8090 | web (nginx) | SPA + `/api` reverse proxy — the only URL you normally open |
| 8081 | api-service | direct debug access |
| 8082 | crawler-service | internal admin API (`/internal/v1`) for debugging |
| 5432 | postgres | `techblog` admin db + `crawler_db` + `api_db` |
| 6379 | redis | queues, locks, events |
| 8091 | nginx-archive | optional profile `serving`: read-only `/archive/` of `data/uploads` |

## Roles

| Role | Used by |
|---|---|
| `POSTGRES_USER` (superuser) | Postgres admin + Flyway migrations |
| `techblog_crawler_app` | crawler-service runtime |
| `techblog_api_app` | api-service runtime |

Created by `init/01-init-databases.sh` on first boot of an empty `data/postgres`.

## Smoke checks

```sh
curl http://127.0.0.1:8082/health/readiness   # crawler-service
curl http://127.0.0.1:8081/health/readiness   # api-service
```

## Podman notes

- `podman compose up -d` (or `podman-compose`) — parity is release gate G-G.
- Rootless: container uid 10001 maps to a host subuid; if `data/` writes fail, add `:U`
  to the bind mounts or run with `--userns=keep-id` (baseline 04 §5).
- SELinux hosts may need the `:z` suffix on `../data` mounts.

## Logs

- Services: JSON to stdout; `docker compose logs -f <service>`
- Shared files: `../data/logs/` (api-service + nginx mounts)
