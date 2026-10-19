// Typed API client for the public contract: spec 06 file 03 (`/api/v1`).
// Error codes and UI messages mirror BA 05 section 3 + spec 07 file 03 section 5;
// ProblemDetail `type` is `urn:tech-blog:error:<CODE>` — the code is extracted
// from that value. Client-side codes: UI-TIMEOUT, UI-UNREACHABLE, UI-BAD-PAYLOAD,
// UI-ABORTED, UI-UNKNOWN.

import type {
  ArticleDetail,
  ArticleSummary,
  JobFailure,
  JobSummary,
  ListResponse,
  OpsSummary,
  SourceListResponse,
  SourceSummary,
} from './types'

export class UiError extends Error {
  constructor(
    readonly code: string,
    readonly action: string,
    readonly status?: number,
    readonly detail?: string,
    /** Present on JOB-DUPLICATE-ACTIVE: the job that blocks the request. */
    readonly activeJobId?: string,
  ) {
    super(code)
    this.name = 'UiError'
  }
}

const MESSAGES: Record<string, { summary: string; action: string }> = {
  'CFG-SOURCE-NOT-FOUND': { summary: 'Unknown source.', action: 'Go back to the sources list.' },
  'CFG-INVALID-REQUEST': { summary: 'Invalid request.', action: 'Check the input and retry.' },
  'JOB-DUPLICATE-ACTIVE': {
    summary: 'A job for this source is already running.',
    action: 'Open the active job.',
  },
  'JOB-NOT-FOUND': { summary: 'Job not found.', action: 'Refresh the jobs list.' },
  'JOB-INVALID-STATE': {
    summary: 'Action not allowed in the current state.',
    action: 'Refresh the page.',
  },
  'JOB-CANCEL-REFUSED': {
    summary: 'Too late to cancel — the job is finishing.',
    action: 'Wait for completion.',
  },
  'ART-NOT-FOUND': {
    summary: 'Article is not archived (yet).',
    action: 'Check its status in the article list.',
  },
  'OPS-DEPENDENCY-DOWN': {
    summary: 'A service dependency is down.',
    action: 'Check service health and retry.',
  },
  'OPS-PROJECTION-LAG': {
    summary: 'Read model is lagging.',
    action: 'Wait for the projection to catch up.',
  },
  'UI-TIMEOUT': {
    summary: 'Request timed out (10 s).',
    action: 'Retry; check that the stack is running.',
  },
  'UI-UNREACHABLE': {
    summary: 'api-service is unreachable.',
    action: 'Check that the stack is running, then retry.',
  },
  'UI-BAD-PAYLOAD': {
    summary: 'Unexpected response payload.',
    action: 'Retry; if it persists, check api-service logs.',
  },
  'UI-ABORTED': { summary: 'Request cancelled.', action: 'No action needed.' },
  'UI-UNKNOWN': { summary: 'Request failed.', action: 'Inspect service logs, then retry.' },
}

export function describe(code: string): { summary: string; action: string } {
  return MESSAGES[code] ?? { summary: code, action: 'Inspect service logs.' }
}

function uiError(code: string, status?: number, detail?: string, activeJobId?: string): UiError {
  const { summary, action } = describe(code)
  const error = new UiError(code, action, status, detail, activeJobId)
  error.message = summary
  return error
}

const TIMEOUT_MS = 10_000

function codeFromProblem(problem: { type?: unknown; code?: unknown }): string | undefined {
  if (typeof problem.type === 'string') {
    const prefix = 'urn:tech-blog:error:'
    if (problem.type.startsWith(prefix)) return problem.type.slice(prefix.length)
  }
  if (typeof problem.code === 'string') return problem.code
  return undefined
}

function transportError(error: unknown, external?: AbortSignal): UiError {
  if (external?.aborted) return uiError('UI-ABORTED')
  const name =
    typeof error === 'object' && error !== null && 'name' in error
      ? String((error as { name: unknown }).name)
      : ''
  return uiError(name === 'AbortError' ? 'UI-TIMEOUT' : 'UI-UNREACHABLE')
}

export interface RequestOptions {
  signal?: AbortSignal
}

async function request<T>(path: string, init?: RequestInit & RequestOptions): Promise<T> {
  const external = init?.signal ?? undefined
  const controller = new AbortController()
  const abortFromCaller = () => controller.abort()
  if (external) {
    if (external.aborted) throw uiError('UI-ABORTED')
    external.addEventListener('abort', abortFromCaller, { once: true })
  }
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)
  try {
    let response: Response
    try {
      response = await fetch(path, {
        ...init,
        signal: controller.signal,
        headers: { 'Content-Type': 'application/json', ...(init?.headers ?? {}) },
      })
    } catch (error) {
      throw transportError(error, external)
    }
    if (!response.ok) {
      let code = 'UI-UNKNOWN'
      let detail: string | undefined
      let activeJobId: string | undefined
      try {
        const problem = (await response.json()) as {
          type?: unknown
          code?: unknown
          detail?: unknown
          activeJobId?: unknown
        }
        code = codeFromProblem(problem) ?? 'UI-UNKNOWN'
        if (typeof problem.detail === 'string') detail = problem.detail
        if (typeof problem.activeJobId === 'string') activeJobId = problem.activeJobId
      } catch {
        // keep UI-UNKNOWN
      }
      throw uiError(code, response.status, detail, activeJobId)
    }
    if (response.status === 204) return undefined as T
    try {
      return (await response.json()) as T
    } catch {
      throw uiError('UI-BAD-PAYLOAD')
    }
  } finally {
    clearTimeout(timer)
    external?.removeEventListener('abort', abortFromCaller)
  }
}

function query(params: Record<string, string | number | undefined>): string {
  const search = new URLSearchParams()
  for (const [name, value] of Object.entries(params)) {
    if (value !== undefined && value !== '') search.set(name, String(value))
  }
  const encoded = search.toString()
  return encoded === '' ? '' : `?${encoded}`
}

const get = <T>(path: string, options?: RequestOptions): Promise<T> =>
  request<T>(path, { signal: options?.signal })

const post = <T>(path: string, body?: unknown, options?: RequestOptions): Promise<T> =>
  request<T>(path, {
    method: 'POST',
    body: body === undefined ? undefined : JSON.stringify(body),
    signal: options?.signal,
  })

const patch = <T>(path: string, body: unknown, options?: RequestOptions): Promise<T> =>
  request<T>(path, { method: 'PATCH', body: JSON.stringify(body), signal: options?.signal })

export const api = {
  sources: (options?: RequestOptions): Promise<SourceListResponse> =>
    get('/api/v1/sources', options),
  source: (key: string, options?: RequestOptions): Promise<SourceSummary> =>
    get(`/api/v1/sources/${encodeURIComponent(key)}`, options),
  setSourceEnabled: (
    key: string,
    enabled: boolean,
    options?: RequestOptions,
  ): Promise<SourceSummary> =>
    patch(`/api/v1/sources/${encodeURIComponent(key)}`, { enabled }, options),
  articles: (
    params: {
      q?: string
      source?: string
      page?: number
      size?: number
    },
    options?: RequestOptions,
  ): Promise<ListResponse<ArticleSummary>> => get(`/api/v1/articles${query(params)}`, options),
  article: (id: string, options?: RequestOptions): Promise<ArticleDetail> =>
    get(`/api/v1/articles/${encodeURIComponent(id)}`, options),
  articleContentUrl: (id: string): string => `/api/v1/articles/${encodeURIComponent(id)}/content`,
  articleAssetUrl: (id: string, file: string): string =>
    `/api/v1/articles/${encodeURIComponent(id)}/assets/${encodeURIComponent(file)}`,
  jobs: (
    params: { page?: number; size?: number },
    options?: RequestOptions,
  ): Promise<ListResponse<JobSummary>> => get(`/api/v1/jobs${query(params)}`, options),
  job: (id: string, options?: RequestOptions): Promise<JobSummary> =>
    get(`/api/v1/jobs/${encodeURIComponent(id)}`, options),
  jobFailures: (
    id: string,
    params: { page?: number; size?: number },
    options?: RequestOptions,
  ): Promise<ListResponse<JobFailure>> =>
    get(`/api/v1/jobs/${encodeURIComponent(id)}/failures${query(params)}`, options),
  createCrawlJob: (
    body: {
      sourceKeys?: string[]
      all?: boolean
      jobType: 'backfill' | 'incremental'
    },
    options?: RequestOptions,
  ): Promise<{ items: JobSummary[] }> => post('/api/v1/crawl-jobs', body, options),
  cancelJob: (id: string, options?: RequestOptions): Promise<JobSummary> =>
    post(`/api/v1/crawl-jobs/${encodeURIComponent(id)}/cancel`, undefined, options),
  retryArticle: (id: string, options?: RequestOptions): Promise<ArticleSummary> =>
    post(`/api/v1/articles/${encodeURIComponent(id)}/retry`, undefined, options),
  opsSummary: (options?: RequestOptions): Promise<OpsSummary> =>
    get('/api/v1/ops/summary', options),
}

export type Api = typeof api
