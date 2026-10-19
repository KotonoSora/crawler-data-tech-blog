// Presentation helpers shared by the three remotes. Every formatter pins en-US so a browser
// configured for another locale cannot change the rendered archive (English-only decision).

import { LOCALE_TAG } from './i18n'

const DATE = new Intl.DateTimeFormat(LOCALE_TAG, {
  year: 'numeric',
  month: 'short',
  day: '2-digit',
  timeZone: 'UTC',
})

const NUMBER = new Intl.NumberFormat(LOCALE_TAG)

/** ISO date only (`2026-10-19`) — the form used by tables and the reader metadata card. */
export function formatDate(value: string | null | undefined): string {
  if (!value) return '—'
  return value.slice(0, 10)
}

/** `2026-10-19 03:12:44 UTC` — timestamps are always rendered in UTC, never local time. */
export function formatDateTime(value: string | null | undefined): string {
  if (!value) return '—'
  const iso = value.length >= 19 ? value.slice(0, 19) : value
  return `${iso.replace('T', ' ')} UTC`
}

/** Human date for prose (`Oct 19, 2026`); tables use `formatDate` for a stable ISO sort key. */
export function formatHumanDate(value: string | null | undefined): string {
  if (!value) return '—'
  const parsed = new Date(value)
  return Number.isNaN(parsed.getTime()) ? formatDate(value) : DATE.format(parsed)
}

export function formatCount(value: number): string {
  return NUMBER.format(value)
}

/** Display form of `contentSha256`: the contract sends 12 hex chars; never truncate further. */
export function shortSha(value: string): string {
  return value.length > 12 ? value.slice(0, 12) : value
}

/** UUIDv7 prefix used in job tables; the full id stays available in the detail view. */
export function shortId(id: string): string {
  return id.slice(0, 8)
}

/** Whole seconds, used for job durations and projection lag. */
export function durationSeconds(start: string | null, end: string | null): string {
  if (!start) return '—'
  const from = Date.parse(start)
  const to = end ? Date.parse(end) : Date.now()
  if (Number.isNaN(from) || Number.isNaN(to) || to < from) return '—'
  return `${Math.round((to - from) / 1000)} s`
}

/** Strip tracking parameters from a canonical URL before showing or using it (BR-06). */
const TRACKING = new Set([
  'source',
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'ref',
  'fbclid',
  'gclid',
])

export function stripTracking(url: string): string {
  try {
    const parsed = new URL(url)
    for (const name of [...parsed.searchParams.keys()]) {
      if (TRACKING.has(name) || name.startsWith('utm_')) parsed.searchParams.delete(name)
    }
    parsed.hash = ''
    return parsed.toString()
  } catch {
    return url
  }
}
