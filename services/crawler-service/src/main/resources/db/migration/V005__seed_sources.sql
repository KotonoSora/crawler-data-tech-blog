-- V005__seed_sources.sql
-- Source catalog seed. Probe date 2026-10-19 (AGENTS.md). Re-probe and re-date before trusting.
-- DoorDash stays disabled until a new probe confirms a crawlable discovery path (BR-13).

INSERT INTO source (id, source_key, name, discovery_type, discovery_url, listing_url, enabled, rate_limit_ms, notes) VALUES
('01930000-0000-7000-8000-000000000001', 'netflix-techblog',    'Netflix TechBlog',     'feed',    'https://netflixtechblog.com/feed', NULL, TRUE, 3000, 'Medium custom domain'),
('01930000-0000-7000-8000-000000000002', 'uber-engineering',    'Uber Engineering',     'sitemap', 'https://www.uber.com/sitemap.xml', 'https://www.uber.com/en-US/blog/engineering/', TRUE, 2000, 'No feed (/rss/, /feed/ 404)'),
('01930000-0000-7000-8000-000000000003', 'meta-engineering',    'Meta Engineering',     'feed',    'https://engineering.fb.com/feed/', NULL, TRUE, 2000, '9 items/feed'),
('01930000-0000-7000-8000-000000000004', 'google-research',     'Google Research',      'feed',    'https://research.google/blog/rss/', NULL, TRUE, 2000, '/feed/ is 404; 100 items'),
('01930000-0000-7000-8000-000000000005', 'linkedin-engineering','LinkedIn Engineering', 'listing', 'https://www.linkedin.com/blog/engineering', 'https://www.linkedin.com/blog/engineering', TRUE, 2000, '301 from engineering.linkedin.com/blog; no feed'),
('01930000-0000-7000-8000-000000000006', 'cloudflare',          'Cloudflare',           'feed',    'https://blog.cloudflare.com/rss/', NULL, TRUE, 2000, '20 items'),
('01930000-0000-7000-8000-000000000007', 'aws-architecture',    'AWS Architecture',     'feed',    'https://aws.amazon.com/blogs/architecture/feed/', NULL, TRUE, 2000, 'Architecture blog only'),
('01930000-0000-7000-8000-000000000008', 'datadog',             'Datadog',              'sitemap', 'https://www.datadoghq.com/sitemap.xml', 'https://www.datadoghq.com/blog/engineering/', TRUE, 2000, '/blog/feed/ is 404'),
('01930000-0000-7000-8000-000000000009', 'stripe',              'Stripe',               'feed',    'https://stripe.com/blog/feed.rss', NULL, TRUE, 2000, 'Whole blog; filter to engineering'),
('01930000-0000-7000-8000-000000000010', 'discord',             'Discord',              'listing', 'https://discord.com/blog', 'https://discord.com/blog', TRUE, 2000, 'No feed'),
('01930000-0000-7000-8000-000000000011', 'slack',               'Slack',                'feed',    'https://slack.engineering/feed', NULL, TRUE, 2000, '8 items'),
('01930000-0000-7000-8000-000000000012', 'airbnb',              'Airbnb',               'feed',    'https://medium.com/feed/airbnb-engineering', NULL, TRUE, 3000, 'Medium feed form'),
('01930000-0000-7000-8000-000000000013', 'spotify',             'Spotify',              'feed',    'https://engineering.atspotify.com/feed/', NULL, TRUE, 2000, '5 items'),
('01930000-0000-7000-8000-000000000014', 'shopify',             'Shopify',              'sitemap', 'https://shopify.engineering/sitemap.xml', NULL, TRUE, 2000, '/feed, /rss 404'),
('01930000-0000-7000-8000-000000000015', 'doordash',            'DoorDash',             'feed',    'https://www.doordash.com/', NULL, FALSE, 2000, 'DISABLED until re-probed: /feed/ 403; apex -> careersatdoordash.com on 2026-10-19'),
('01930000-0000-7000-8000-000000000016', 'grab',                'Grab',                 'feed',    'https://engineering.grab.com/feed', NULL, TRUE, 3000, 'Medium custom domain'),
('01930000-0000-7000-8000-000000000017', 'lyft',                'Lyft',                 'feed',    'https://eng.lyft.com/feed', NULL, TRUE, 3000, 'Medium custom domain'),
('01930000-0000-7000-8000-000000000018', 'github',              'GitHub',               'feed',    'https://github.blog/category/engineering/feed/', NULL, TRUE, 2000, '/feed/ = all posts'),
('01930000-0000-7000-8000-000000000019', 'dropbox',             'Dropbox',              'feed',    'https://dropbox.tech/feed', NULL, TRUE, 2000, '/rss is 404'),
('01930000-0000-7000-8000-000000000020', 'pinterest',           'Pinterest',            'feed',    'https://medium.com/@Pinterest_Engineering/feed', NULL, TRUE, 3000, 'Flaky (000 on first probe)');
