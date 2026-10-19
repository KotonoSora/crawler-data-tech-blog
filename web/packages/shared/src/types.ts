// DTOs mirror the frozen contract: spec 06 file 03 (public API), BA 04 file 02 (data dictionary).
// Status unions are the UI contract: the crawler's internal `paused` state is never projected
// into api_db, so the browser only ever sees the five job statuses below.

export type SourceHealth = 'fresh' | 'stale' | 'broken'

export type ArticleStatus =
  | 'discovered'
  | 'queued'
  | 'processing'
  | 'archived'
  | 'failed'
  | 'needs_review'
  | 'skipped'

export type JobStatus = 'pending' | 'running' | 'completed' | 'failed' | 'cancelled'

export type JobType = 'backfill' | 'incremental'

export type ServiceStatus = 'UP' | 'DOWN'

export interface SourceSummary {
  key: string
  name: string
  enabled: boolean
  discoveryType: string
  articleCount: number
  archivedCount: number
  failedCount: number
  lastSuccessAt: string | null
  health: SourceHealth
  updatedAt: string
}

export interface ArticleSummary {
  id: string
  sourceKey: string
  title: string
  slug: string
  author: string | null
  publishedAt: string | null
  archivedAt: string | null
  status: ArticleStatus
  contentSha256: string
}

export interface ArticleDetail extends ArticleSummary {
  contentMarkdown: string
  assetBasePath: string
  originalUrl: string
  sourceUrl: string
  fetchedAt: string
}

export interface JobSummary {
  id: string
  sourceKey: string
  jobType: JobType
  status: JobStatus
  requestedAt: string
  startedAt: string | null
  finishedAt: string | null
  discoveredCount: number
  archivedCount: number
  skippedCount: number
  failedCount: number
}

/** BA 04 §2 JobFailure; served from the crawler through the api-service proxy. */
export interface JobFailure {
  articleId: string
  title: string
  failureCode: string
  failureReason: string
  attemptCount: number
  lastAttemptAt: string
}

export interface ServiceHealth {
  service: string
  status: ServiceStatus
  checkedAt: string
  details: string[]
}

export interface OpsSummary {
  checkedAt: string
  projectionLagSeconds: number
  services: ServiceHealth[]
}

export interface ListResponse<T> {
  items: T[]
  page: number
  size: number
  total: number
}

export interface SourceListResponse {
  items: SourceSummary[]
}

export function isActiveJob(job: Pick<JobSummary, 'status'>): boolean {
  return job.status === 'pending' || job.status === 'running'
}

export function isRetryable(status: ArticleStatus): boolean {
  return status === 'failed' || status === 'needs_review'
}
