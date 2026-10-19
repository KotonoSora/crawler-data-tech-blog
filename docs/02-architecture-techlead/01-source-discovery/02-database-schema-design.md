# 02 — Source Discovery: Database Schema Design

Owner: `crawler-service` (`crawler_db`). Conventions: baseline 03 (TEXT UUIDv7 ids app-generated,
snake_case names, `timestamptz` UTC, TEXT + CHECK enums, Flyway `V<NNN>__<snake>.sql` forward-only).
This file specifies `source` in full and the discovery-relevant slice of `article` + `crawl_job`;
fetch/extract columns are owned by specs 02 and 03.

DEVIATION CARRIED (resolved 2026-10-19): baseline 03 section 3 originally said "plural tables";
it was amended to singular table nouns to match the frozen constraint/index names
(`uq_article_canonical_url`, `ix_fetch_log_host_time`) and the V001 inventory (source, article,
crawl_job, fetch_log). Singular table names adopted. Budget: 0 schema delta, 1 doc edit.

## 1. `source` (V001__core_tables.sql)

```sql
create table source (
  id                 text        primary key,              -- UUIDv7, app-generated
  source_key         text        not null,
  name               text        not null,
  home_url           text        not null,
  discovery_type     text        not null,                 -- configured primary path
  feed_url           text,
  sitemap_url        text,
  listing_url        text,
  discovery_config   jsonb       not null default '{}'::jsonb,
  politeness_profile text        not null default 'default',
  enabled            boolean     not null default true,
  last_success_at    timestamptz,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now(),
  constraint uq_source_key unique (source_key),
  constraint ck_source_key_format check (source_key ~ '^[a-z0-9][a-z0-9-]{1,49}$'),
  constraint ck_source_discovery_type check (discovery_type in ('feed','sitemap','listing')),
  constraint ck_source_politeness_profile check (politeness_profile in ('default','medium')),
  constraint ck_source_urls_https check (
    home_url like 'https://%'
    and (feed_url    is null or feed_url    like 'https://%')
    and (sitemap_url is null or sitemap_url like 'https://%')
    and (listing_url is null or listing_url like 'https://%')),
  constraint ck_source_config_object check (jsonb_typeof(discovery_config) = 'object'),
  constraint ck_source_primary_path check
    (feed_url is not null or sitemap_url is not null or listing_url is not null)
);
```

Key-level `discovery_config` rules are app-validated (Jackson 3 data class); the DB enforces object
type and https URLs only (file 01, section 5).

## 2. `article` (V001, discovery slice)

```sql
create table article (
  id             text        primary key,
  source_id      text        not null,
  canonical_url  text        not null,
  original_url   text        not null,
  title          text,
  slug           text,
  status         text        not null default 'discovered',
  published_at   timestamptz,
  discovered_at  timestamptz not null default now(),
  constraint fk_article_source foreign key (source_id) references source (id),
  constraint uq_article_canonical_url unique (canonical_url),
  constraint ck_article_status check (status in
    ('discovered','queued','processing','archived','failed','needs_review','skipped')),
  constraint ck_article_canonical_https check (canonical_url like 'https://%'),
  constraint ck_article_slug_format check (slug is null or slug ~ '^[a-z0-9][a-z0-9-]{0,79}$')
);
create index ix_article_source_status on article (source_id, status);
```

`uq_article_canonical_url` is global, not per source: one canonical URL = one row ever (BR-06),
so a cross-posted article maps to a single row.

## 3. `crawl_job` (V001, discovery slice)

```sql
create table crawl_job (
  id               text        primary key,
  source_id        text        not null,
  job_type         text        not null,
  status           text        not null default 'pending',
  requested_by     text        not null default 'operator',
  requested_at     timestamptz not null default now(),
  started_at       timestamptz,
  finished_at      timestamptz,
  lease_expires_at timestamptz,
  discovered_count integer     not null default 0,
  archived_count   integer     not null default 0,
  skipped_count    integer     not null default 0,
  failed_count     integer     not null default 0,
  error_code       text,
  constraint fk_crawl_job_source foreign key (source_id) references source (id),
  constraint ck_crawl_job_type check (job_type in ('backfill','incremental')),
  constraint ck_crawl_job_status check
    (status in ('pending','running','succeeded','failed','cancelled')),
  constraint ck_crawl_job_counters_nonneg check
    (discovered_count >= 0 and archived_count >= 0 and skipped_count >= 0 and failed_count >= 0),
  constraint ck_crawl_job_error_code check
    (error_code is null or error_code ~ '^[A-Z]{2,8}(-[A-Z0-9]+)+$')
);
create index ix_crawl_job_source_status on crawl_job (source_id, status);
create unique index uq_crawl_job_active_source on crawl_job (source_id)
  where status in ('pending','running');
```

`uq_crawl_job_active_source` enforces BR-18 in the database: a second backfill or incremental job
for the same source cannot be inserted while one is `pending` or `running`.

## 4. Index and constraint summary

| Object | Type | Purpose |
|---|---|---|
| uq_source_key | unique (`source_key`) | registry lookup by key; a miss becomes CFG-SOURCE-NOT-FOUND |
| uq_article_canonical_url | unique (`canonical_url`) | BR-06 identity; global across sources |
| ix_article_source_status | index (`source_id`, `status`) | per-source counters, dedupe scans, backfill resume |
| ix_crawl_job_source_status | index (`source_id`, `status`) | job history per source and active-job checks |
| uq_crawl_job_active_source | partial unique | BR-18, single active job per source |
| fk_article_source, fk_crawl_job_source | FK | no orphan rows; no cascade into disk files (baseline 03) |

## 5. V005__seed_sources.sql — 20 sources

| source_key | name | discovery_type | primary URL | politeness | enabled | config notes |
|---|---|---|---|---|---|---|
| netflix-techblog | Netflix TechBlog | feed | https://netflixtechblog.com/feed | medium | true | — |
| uber-engineering | Uber Engineering | sitemap | https://www.uber.com/sitemap.xml | default | true | listingUrl=/en-US/blog/engineering/ |
| meta-engineering | Meta Engineering | feed | https://engineering.fb.com/feed/ | default | true | — |
| google-research | Google Research | feed | https://research.google/blog/rss/ | default | true | — |
| linkedin-engineering | LinkedIn Engineering | listing | https://www.linkedin.com/blog/engineering | default | true | selectors required before enable |
| cloudflare | Cloudflare | feed | https://blog.cloudflare.com/rss/ | default | true | — |
| aws-architecture | AWS Architecture | feed | https://aws.amazon.com/blogs/architecture/feed/ | default | true | — |
| datadog | Datadog | sitemap | https://www.datadoghq.com/sitemap.xml | default | true | listingUrl=/blog/engineering/ |
| stripe | Stripe | feed | https://stripe.com/blog/feed.rss | default | true | includePathPatterns=["/blog/"] |
| discord | Discord | listing | https://discord.com/blog | default | true | selectors required before enable |
| slack | Slack | feed | https://slack.engineering/feed | default | true | — |
| airbnb | Airbnb | feed | https://medium.com/feed/airbnb-engineering | medium | true | — |
| spotify | Spotify | feed | https://engineering.atspotify.com/feed/ | default | true | — |
| shopify | Shopify | sitemap | https://shopify.engineering/sitemap.xml | default | true | — |
| doordash | DoorDash | feed | https://careersatdoordash.com/feed/ | default | false | unverified; re-probe before enable (BR-13) |
| grab | Grab | feed | https://engineering.grab.com/feed | medium | true | — |
| lyft | Lyft | feed | https://eng.lyft.com/feed | medium | true | — |
| github | GitHub | feed | https://github.blog/category/engineering/feed/ | default | true | — |
| dropbox | Dropbox | feed | https://dropbox.tech/feed | default | true | — |
| pinterest | Pinterest | feed | https://medium.com/@Pinterest_Engineering/feed | medium | true | — |

Seed ids are fixed UUIDv7 literals embedded in V005 so re-created environments are identical;
runtime rows always use app-generated ids. Probe date for every URL above: 2026-10-19 (AGENTS.md
catalog). `linkedin-engineering` and `discord` seeds ship empty `listingSelectors`: the run fails
fast with DISC-LISTING-SELECTOR-BROKEN rather than returning 0 candidates silently.

## 6. Migration and test rules

| Rule | Detail |
|---|---|
| Forward-only | V001/V005 immutable after apply; any fix ships as V006+ (baseline 03) |
| G-H gate | fresh-DB boot and upgrade boot both apply all migrations; `pg_dump` taken first |
| Integration tests | Testcontainers PG 18.6; assert 20 source rows, DoorDash `enabled=false`, every enabled source has >=1 discovery URL |
| Constraint tests | duplicate `canonical_url` rejected; second active job for one source rejected |
| Retention | discovery adds no new retention rule; `fetch_log` stays at 90 days (NFR-12) |
