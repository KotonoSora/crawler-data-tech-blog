import { afterEach, describe, expect, it, vi } from 'vitest'

import { api, describe as describeCode, UiError } from './api'

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('describe', () => {
  it('maps known codes to summary + action', () => {
    const mapped = describeCode('JOB-DUPLICATE-ACTIVE')
    expect(mapped.summary).toContain('already running')
    expect(mapped.action).toBe('Open the active job.')
  })

  it('falls back for unknown codes', () => {
    const mapped = describeCode('SOMETHING-NEW')
    expect(mapped.summary).toBe('SOMETHING-NEW')
  })
})

describe('api error mapping', () => {
  it('extracts the code from the ProblemDetail urn type', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () =>
        new Response(
          JSON.stringify({
            type: 'urn:tech-blog:error:JOB-DUPLICATE-ACTIVE',
            title: 'Job already active',
            status: 409,
            detail: "Source 'slack' has an active job.",
          }),
          { status: 409, headers: { 'Content-Type': 'application/problem+json' } },
        ),
      ),
    )

    const failure = await api.source('slack').catch((error: unknown) => error)
    expect(failure).toBeInstanceOf(UiError)
    const uiError = failure as UiError
    expect(uiError.code).toBe('JOB-DUPLICATE-ACTIVE')
    expect(uiError.status).toBe(409)
    expect(uiError.message).toContain('already running')
  })

  it('returns parsed payloads on success', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () =>
        new Response(
          JSON.stringify({
            items: [
              {
                key: 'slack',
                name: 'Slack Engineering',
                enabled: true,
                discoveryType: 'feed',
                articleCount: 312,
                archivedCount: 308,
                failedCount: 4,
                lastSuccessAt: '2026-10-19T03:12:44Z',
                health: 'fresh',
                updatedAt: '2026-10-19T03:12:46Z',
              },
            ],
          }),
          { status: 200, headers: { 'Content-Type': 'application/json' } },
        ),
      ),
    )

    const sources = await api.sources()
    expect(sources.items).toHaveLength(1)
    expect(sources.items[0].key).toBe('slack')
  })

  it('maps a network failure to UI-UNREACHABLE', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => {
        throw new TypeError('fetch failed')
      }),
    )

    const failure = await api.sources().catch((error: unknown) => error)
    expect(failure).toBeInstanceOf(UiError)
    const uiError = failure as UiError
    expect(uiError.code).toBe('UI-UNREACHABLE')
    expect(uiError.action).toContain('stack')
  })
})
