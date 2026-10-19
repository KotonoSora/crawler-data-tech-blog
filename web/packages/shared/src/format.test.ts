import { describe, expect, it } from 'vitest'

import { formatDate, formatDateTime, shortId, shortSha, stripTracking } from './format'

describe('format helpers', () => {
  it('renders dates and timestamps in UTC', () => {
    expect(formatDate('2026-10-19T03:12:44Z')).toBe('2026-10-19')
    expect(formatDate(null)).toBe('—')
    expect(formatDateTime('2026-10-19T03:12:44Z')).toBe('2026-10-19 03:12:44 UTC')
  })

  it('keeps the 12-char display SHA and the short job id', () => {
    expect(shortSha('9f2c1d4e8a7b')).toBe('9f2c1d4e8a7b')
    expect(shortSha('9f2c1d4e8a7b0000')).toBe('9f2c1d4e8a7b')
    expect(shortId('0192f0c9-1b77-7a2e-8c10-4d9e5b2a0012')).toBe('0192f0c9')
  })

  it('strips tracking parameters and fragments from canonical URLs (BR-06)', () => {
    expect(
      stripTracking('https://blog.cloudflare.com/how-we-moved-40-pb-of-logs/?utm_source=rss#top'),
    ).toBe('https://blog.cloudflare.com/how-we-moved-40-pb-of-logs/')
    expect(stripTracking('https://example.com/post?source=rss-123')).toBe('https://example.com/post')
  })
})
