# 05 — Local Storage and Nginx Spec

## 1. Runtime layout (gitignored)

```
data/
├── uploads/crawl/<source-key>/<slug>/
│   ├── content.md          # extracted Markdown (<=2 MB)
│   ├── meta.json           # dictionary: BA 04, section 3
│   └── assets/img-<nnn>-<8hex>.<ext>
├── tmp/                    # staging for atomic writes; purged on boot
├── postgres/               # PG 18.6 data directory
├── redis/                  # Redis AOF/RDB
└── logs/
    ├── crawler-service.jsonl
    ├── api-service.jsonl
    └── nginx/access.log, error.log
```

Ownership: containers write as their non-root users (uid 10001); `data/` prepared by
`deploy/prepare-dirs.sh` with group-writable permissions; Podman rootless mapping documented in
deploy/README.md (baseline 04, section 5).

## 2. Atomic write protocol (archive)

| Step | Action |
|---|---|
| 1 | Write all files under `data/tmp/<article-id>/` (content.md, meta.json, assets/) |
| 2 | fsync each file; compute `content_sha256` over final content.md bytes |
| 3 | `Files.move(tmpDir, finalDir, ATOMIC_MOVE)`; if final exists (re-archive) move to tmp again, merge, then swap |
| 4 | DB commit (`status=archived`, sha, fetched_at) — DB is the coordination point, disk first |
| 5 | On boot: purge `data/tmp/*` older than 1 h |

Crash windows: before step 3 -> tmp purged; between 3 and 4 -> boot reconciliation compares DB
`archived_at`/sha with disk and fixes state without rewriting files (idempotent).

## 3. Slug rules

| Rule | Detail |
|---|---|
| Format | `^[a-z0-9][a-z0-9-]{0,79}$` |
| Source | title -> ASCII kebab-case; fallback: last URL path segment; final fallback: 8-hex id |
| Dedup | collision within source appends `-2`, `-3`, ... (stable once assigned) |
| Stability | slug never changes after first archive (BR-07); title changes do not move files |

## 4. Retention and guards

| Item | Policy |
|---|---|
| Archive content | never auto-deleted (personal archive); manual deletion only |
| Temp files | purged on boot (>1 h old) and after each job end |
| App logs | 14 days / rotate at 100 MB (NFR-12) |
| Disk guard | <5 GB free -> pause jobs, readiness detail `disk`, log `STORE-DISK-FULL` |
| Fetch log rows | 90 days (DB, baseline 03) |

## 5. Nginx roles

| Role | Where | Spec |
|---|---|---|
| SPA edge (always on) | web image (`Containerfile.web`) | serve Vite build; `try_files $uri /index.html`; `/api/` -> `api-service:8080`; immutable caching for hashed assets; `client_max_body_size 1m` |
| Archive static (optional, profile `serving`) | `nginx-archive` service | read-only mount of `data/uploads` -> `/srv/archive` |

Archive profile rules: `autoindex off` (no directory listing — hard requirement); only GET/HEAD;
`location /archive/` maps to the read-only volume; paths with `..` rejected (default); no
`.tmp` exposure (tmp lives outside `uploads/`); cache headers `no-store` (personal archive);
access log to `data/logs/nginx/`.

## 6. Backup and restore

| Item | Method |
|---|---|
| Files | copy `data/uploads/` (rsync) — checksums verifiable via meta.json |
| Databases | `pg_dump crawler_db`, `pg_dump api_db` (release gate G-I) |
| Restore | restore dumps, keep `data/uploads/` in place; boot reconciliation re-syncs state |
| Risk acceptance | single machine, no offsite backup mandated (personal archive) |
