-- V008__source_discovery_config.sql
-- Materialize the per-source discovery model (spec 01 file 01 §5) for the V005 catalog.
-- The crawler still falls back to discovery_url/listing_url for custom or older rows; this
-- migration makes the effective configuration visible and editable without a deploy.

UPDATE source
SET discovery_config = jsonb_strip_nulls(
    jsonb_build_object(
        'feedUrl', CASE WHEN discovery_type = 'feed' THEN discovery_url END,
        'sitemapUrl', CASE WHEN discovery_type = 'sitemap' THEN discovery_url END,
        'listingUrl', COALESCE(
            listing_url,
            CASE WHEN discovery_type = 'listing' THEN discovery_url END
        ),
        'listingSelectors', CASE
            WHEN listing_url IS NOT NULL OR discovery_type = 'listing'
                THEN jsonb_build_object('itemLink', 'a[href]', 'nextPage', NULL::text)
        END,
        'includePathPatterns', '[]'::jsonb,
        'trackingParams', '["source","utm_source","utm_medium","utm_campaign","fbclid"]'::jsonb,
        'maxPagesPerRun', 500,
        'sitemapChildCap', 100
    )
)
WHERE discovery_config = '{}'::jsonb;
