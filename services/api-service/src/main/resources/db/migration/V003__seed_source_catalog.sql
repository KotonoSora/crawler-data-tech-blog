-- V003__seed_source_catalog.sql
-- Bootstrap the read model with the documented catalog (AGENTS.md source table, probe 2026-10-19).
-- Rationale: api-service must answer GET /sources within its readiness window even if the
-- crawler is still starting; the reconciliation pass (spec 06 file 01 §4) overwrites every
-- count/health field from the crawler snapshot as soon as it is reachable.
-- Idempotent: ON CONFLICT keeps a rebuilt/reconciled row untouched.

INSERT INTO source_summary
    (source_id, source_key, name, enabled, discovery_type, article_count, archived_count,
     failed_count, last_success_at, health, updated_at)
VALUES
    ('01930000-0000-7000-8000-000000000001', 'netflix-techblog',     'Netflix TechBlog',     TRUE,  'feed',    0, 0, 0, NULL, 'fresh',  now()),
    ('01930000-0000-7000-8000-000000000002', 'uber-engineering',     'Uber Engineering',     TRUE,  'sitemap', 0, 0, 0, NULL, 'fresh',  now()),
    ('01930000-0000-7000-8000-000000000003', 'meta-engineering',     'Meta Engineering',     TRUE,  'feed',    0, 0, 0, NULL, 'fresh',  now()),
    ('01930000-0000-7000-8000-000000000004', 'google-research',      'Google Research',      TRUE,  'feed',    0, 0, 0, NULL, 'fresh',  now()),
    ('01930000-0000-7000-8000-000000000005', 'linkedin-engineering', 'LinkedIn Engineering', TRUE,  'listing', 0, 0, 0, NULL, 'fresh',  now()),
    ('01930000-0000-7000-8000-000000000006', 'cloudflare',           'Cloudflare',           TRUE,  'feed',    0, 0, 0, NULL, 'fresh',  now()),
    ('01930000-0000-7000-8000-000000000007', 'aws-architecture',     'AWS Architecture',     TRUE,  'feed',    0, 0, 0, NULL, 'fresh',  now()),
    ('01930000-0000-7000-8000-000000000008', 'datadog',              'Datadog',              TRUE,  'sitemap', 0, 0, 0, NULL, 'fresh',  now()),
    ('01930000-0000-7000-8000-000000000009', 'stripe',               'Stripe',               TRUE,  'feed',    0, 0, 0, NULL, 'fresh',  now()),
    ('01930000-0000-7000-8000-000000000010', 'discord',              'Discord',              TRUE,  'listing', 0, 0, 0, NULL, 'fresh',  now()),
    ('01930000-0000-7000-8000-000000000011', 'slack',                'Slack Engineering',    TRUE,  'feed',    0, 0, 0, NULL, 'fresh',  now()),
    ('01930000-0000-7000-8000-000000000012', 'airbnb',               'Airbnb',               TRUE,  'feed',    0, 0, 0, NULL, 'fresh',  now()),
    ('01930000-0000-7000-8000-000000000013', 'spotify',              'Spotify',              TRUE,  'feed',    0, 0, 0, NULL, 'fresh',  now()),
    ('01930000-0000-7000-8000-000000000014', 'shopify',              'Shopify',              TRUE,  'sitemap', 0, 0, 0, NULL, 'fresh',  now()),
    ('01930000-0000-7000-8000-000000000015', 'doordash',             'DoorDash',             FALSE, 'feed',    0, 0, 0, NULL, 'broken', now()),
    ('01930000-0000-7000-8000-000000000016', 'grab',                 'Grab',                 TRUE,  'feed',    0, 0, 0, NULL, 'fresh',  now()),
    ('01930000-0000-7000-8000-000000000017', 'lyft',                 'Lyft',                 TRUE,  'feed',    0, 0, 0, NULL, 'fresh',  now()),
    ('01930000-0000-7000-8000-000000000018', 'github',               'GitHub',               TRUE,  'feed',    0, 0, 0, NULL, 'fresh',  now()),
    ('01930000-0000-7000-8000-000000000019', 'dropbox',              'Dropbox',              TRUE,  'feed',    0, 0, 0, NULL, 'fresh',  now()),
    ('01930000-0000-7000-8000-000000000020', 'pinterest',            'Pinterest',            TRUE,  'feed',    0, 0, 0, NULL, 'fresh',  now())
ON CONFLICT (source_key) DO NOTHING;
