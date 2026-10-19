import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { ArrowLeft, ExternalLink, Play, RefreshCw, RotateCw, Search, TriangleAlert } from 'lucide-react'

import { api, describe as describeCode, formatDate, UiError, useAsync, useDebouncedValue } from '@techblog/shared'
import type { ArticleSummary, JobSummary, SourceSummary } from '@techblog/shared'
import type { MfeProps } from '@techblog/shared/mfe'
import { Alert, AlertDescription, AlertTitle } from '@techblog/ui/components/alert'
import { Badge } from '@techblog/ui/components/badge'
import { Button } from '@techblog/ui/components/button'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@techblog/ui/components/card'
import { Input } from '@techblog/ui/components/input'
import { Skeleton } from '@techblog/ui/components/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@techblog/ui/components/table'

type Navigate = MfeProps['navigate']

// Views are selected by the shell through attributes (spec 07 file 02):
// view=dashboard (/), view=source (/sources/:key), view=articles (/articles).
// List state (q/source/page/size) arrives as attributes — the remote never reads the router.
export function CatalogApp({ attrs, navigate }: MfeProps) {
  const view = attrs.view ?? 'dashboard'
  if (view === 'source') {
    return <SourceView sourceKey={attrs['source-key'] ?? ''} navigate={navigate} />
  }
  if (view === 'articles') {
    return (
      <ArticlesView
        q={attrs.q ?? ''}
        source={attrs.source ?? ''}
        page={toInt(attrs.page, 0, 0)}
        size={toInt(attrs.size, 50, 1, 200)}
        navigate={navigate}
      />
    )
  }
  return <DashboardView navigate={navigate} />
}

function PageHeader({
  title,
  description,
  actions,
}: {
  title: string
  description?: string
  actions?: ReactNode
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div className="space-y-1">
        <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
        {description ? <p className="text-muted-foreground text-sm">{description}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
    </div>
  )
}

// Error surface for every catalog screen: ProblemDetail code + BA 05 action + the recovery
// link for that specific code (BA 05 §3, spec 07 file 03 §5).
function ErrorBlock({ error, onRetry }: { error: Error; onRetry?: () => void }) {
  const ui = error instanceof UiError ? error : null
  const code = ui?.code ?? 'UI-UNKNOWN'
  return (
    <Alert variant="destructive" data-testid="catalog-error">
      <TriangleAlert />
      <AlertTitle>{ui?.message ?? 'Request failed.'}</AlertTitle>
      <AlertDescription className="space-y-2">
        <p>{ui?.action ?? describeCode(code).action}</p>
        <code className="text-xs">{code}</code>
        {code === 'CFG-SOURCE-NOT-FOUND' ? <a href="/">sources list</a> : null}
        {code === 'JOB-DUPLICATE-ACTIVE' ? (
          <a href={ui?.activeJobId ? `/jobs/${ui.activeJobId}` : '/jobs'}>Open the active job</a>
        ) : null}
        {onRetry ? (
          <Button size="sm" variant="outline" onClick={onRetry}>
            Retry
          </Button>
        ) : null}
      </AlertDescription>
    </Alert>
  )
}

interface NoticeState {
  text: string
  job?: JobSummary
}

function Notice({ notice }: { notice: NoticeState | null }) {
  if (!notice) return null
  return (
    <Alert data-testid="catalog-notice">
      <AlertDescription>
        {notice.text}
        {notice.job ? (
          <>
            {' '}
            <a href={`/jobs/${notice.job.id}`}>View job</a>
          </>
        ) : null}
      </AlertDescription>
    </Alert>
  )
}

function StatusBadge({ status }: { status: string }) {
  const variant =
    status === 'archived' || status === 'completed'
      ? 'default'
      : status === 'failed'
        ? 'destructive'
        : 'secondary'
  return <Badge variant={variant}>{status}</Badge>
}

function DashboardView({ navigate }: { navigate: Navigate }) {
  const sources = useAsync((signal) => api.sources({ signal }), [])
  const [notice, setNotice] = useState<NoticeState | null>(null)
  const [actionError, setActionError] = useState<Error | null>(null)
  const [busy, setBusy] = useState(false)

  const runJob = async (
    body: Parameters<typeof api.createCrawlJob>[0],
    label: 'backfill' | 'incremental',
  ) => {
    setBusy(true)
    setNotice(null)
    setActionError(null)
    try {
      const created = await api.createCrawlJob(body)
      setNotice({
        text: `Started ${created.items.length} ${label} job.`,
        job: created.items[0],
      })
      sources.reload()
    } catch (error) {
      setActionError(error instanceof Error ? error : new Error(String(error)))
    } finally {
      setBusy(false)
    }
  }

  const toggle = async (source: SourceSummary) => {
    setBusy(true)
    setNotice(null)
    setActionError(null)
    try {
      const updated = await api.setSourceEnabled(source.key, !source.enabled)
      setNotice({ text: `${updated.name} ${updated.enabled ? 'enabled' : 'disabled'}.` })
      sources.reload()
    } catch (error) {
      setActionError(error instanceof Error ? error : new Error(String(error)))
    } finally {
      setBusy(false)
    }
  }

  const items = sources.data?.items ?? []
  const enabledCount = items.filter((source) => source.enabled).length
  // "Refresh stale" collects health=stale (72 h) from GET /sources; disabled sources are
  // never crawled (spec 06 file 03 §2, BA 06 US-12).
  const staleKeys = items
    .filter((source) => source.enabled && source.health === 'stale')
    .map((source) => source.key)

  return (
    <section data-testid="sources-page" className="space-y-4">
      <PageHeader
        title="Sources"
        description="Personal archive — crawls run only when you trigger them here (no schedule)."
        actions={
          <>
            <Button
              data-testid="refresh-stale"
              variant="outline"
              size="sm"
              disabled={busy || staleKeys.length === 0}
              onClick={() => runJob({ sourceKeys: staleKeys, jobType: 'incremental' }, 'incremental')}
            >
              <RefreshCw /> Refresh stale ({staleKeys.length})
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={busy}
              onClick={() => sources.reload()}
            >
              <RotateCw /> Reload
            </Button>
          </>
        }
      />
      {items.length > 0 ? (
        <p data-testid="sources-summary" className="text-muted-foreground text-sm">
          {items.length} sources · {enabledCount} enabled · {items.length - enabledCount} disabled
        </p>
      ) : null}
      <Notice notice={notice} />
      {actionError ? <ErrorBlock error={actionError} /> : null}
      {!actionError && sources.error ? (
        <ErrorBlock error={sources.error} onRetry={() => sources.reload()} />
      ) : null}
      {sources.loading && !sources.data ? <SourcesSkeleton /> : null}
      {sources.data ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {sources.data.items.map((source) => (
            <SourceCard
              key={source.key}
              source={source}
              busy={busy}
              navigate={navigate}
              onBackfill={() => runJob({ sourceKeys: [source.key], jobType: 'backfill' }, 'backfill')}
              onIncremental={() =>
                runJob({ sourceKeys: [source.key], jobType: 'incremental' }, 'incremental')
              }
              onToggle={() => toggle(source)}
            />
          ))}
        </div>
      ) : null}
    </section>
  )
}

function SourceCard({
  source,
  busy,
  navigate,
  onBackfill,
  onIncremental,
  onToggle,
}: {
  source: SourceSummary
  busy: boolean
  navigate: Navigate
  onBackfill: () => void
  onIncremental: () => void
  onToggle: () => void
}) {
  // Health vocabulary is the projection's: fresh | stale | broken (spec 04 file 03 §3).
  const healthVariant =
    source.health === 'fresh' ? 'default' : source.health === 'broken' ? 'destructive' : 'secondary'
  return (
    <Card data-testid="source-card">
      <CardHeader>
        <CardTitle className="truncate">{source.name}</CardTitle>
        <CardDescription className="font-mono">
          {source.key} · {source.discoveryType}
        </CardDescription>
        <CardAction>
          <div className="flex gap-1">
            <Badge data-testid="source-health" variant={healthVariant}>
              {source.health}
            </Badge>
            {source.enabled ? null : (
              <Badge data-testid="source-disabled" variant="outline">
                disabled
              </Badge>
            )}
          </div>
        </CardAction>
      </CardHeader>
      <CardContent className="text-muted-foreground space-y-1 text-sm">
        <p data-testid="source-counters">
          {source.archivedCount} archived · {source.failedCount} failed · {source.articleCount} total
        </p>
        <p data-testid="source-last-success">Last success: {formatDate(source.lastSuccessAt)}</p>
      </CardContent>
      <CardFooter className="flex-wrap gap-2">
        <Button
          data-testid="source-crawl"
          size="sm"
          disabled={busy || !source.enabled}
          onClick={onBackfill}
        >
          <Play /> Backfill
        </Button>
        <Button
          data-testid="source-incremental"
          size="sm"
          variant="outline"
          disabled={busy || !source.enabled}
          onClick={onIncremental}
        >
          <RefreshCw /> Incremental
        </Button>
        <Button
          data-testid="source-toggle"
          size="sm"
          variant="ghost"
          disabled={busy}
          onClick={onToggle}
        >
          {source.enabled ? 'Disable' : 'Enable'}
        </Button>
        <Button
          data-testid="source-open"
          size="sm"
          variant="ghost"
          onClick={() => navigate(`/sources/${source.key}`)}
        >
          Open <ExternalLink />
        </Button>
      </CardFooter>
    </Card>
  )
}

function SourceView({ sourceKey, navigate }: { sourceKey: string; navigate: Navigate }) {
  const [page, setPage] = useState(0)
  const [notice, setNotice] = useState<NoticeState | null>(null)
  const [actionError, setActionError] = useState<Error | null>(null)
  const [busy, setBusy] = useState(false)
  const source = useAsync((signal) => api.source(sourceKey, { signal }), [sourceKey])
  const articles = useAsync(
    (signal) => api.articles({ source: sourceKey, page, size: 25 }, { signal }),
    [sourceKey, page],
  )

  useEffect(() => {
    setPage(0)
    setNotice(null)
    setActionError(null)
  }, [sourceKey])

  if (sourceKey === '') {
    return (
      <Alert variant="destructive" data-testid="catalog-error">
        <TriangleAlert />
        <AlertTitle>Missing source key</AlertTitle>
        <AlertDescription>The shell routed here without a source-key attribute.</AlertDescription>
      </Alert>
    )
  }

  const run = async (jobType: 'backfill' | 'incremental') => {
    setBusy(true)
    setNotice(null)
    setActionError(null)
    try {
      const created = await api.createCrawlJob({ sourceKeys: [sourceKey], jobType })
      setNotice({
        text: `Started ${created.items.length} ${jobType} job.`,
        job: created.items[0],
      })
    } catch (error) {
      setActionError(error instanceof Error ? error : new Error(String(error)))
    } finally {
      setBusy(false)
    }
  }

  return (
    <section data-testid="source-detail" className="space-y-4">
      <PageHeader
        title={source.data?.name ?? sourceKey}
        description={
          source.data
            ? `${source.data.discoveryType} · last success ${formatDate(source.data.lastSuccessAt)}`
            : 'Source detail'
        }
        actions={
          <>
            <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
              <ArrowLeft /> Sources
            </Button>
            <Button
              size="sm"
              disabled={busy || !source.data?.enabled}
              onClick={() => run('incremental')}
            >
              <RefreshCw /> Incremental
            </Button>
            <Button
              size="sm"
              variant="outline"
              disabled={busy || !source.data?.enabled}
              onClick={() => run('backfill')}
            >
              <Play /> Backfill
            </Button>
          </>
        }
      />
      {source.data ? (
        <p data-testid="source-detail-counters" className="text-muted-foreground text-sm">
          {source.data.archivedCount} archived · {source.data.failedCount} failed ·{' '}
          {source.data.articleCount} total · health {source.data.health}
        </p>
      ) : null}
      <Notice notice={notice} />
      {actionError ? <ErrorBlock error={actionError} /> : null}
      {!actionError && source.error ? <ErrorBlock error={source.error} /> : null}
      <Card>
        <CardHeader>
          <CardTitle>Articles</CardTitle>
          <CardDescription>Newest first; the reader opens the archived Markdown.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {!source.error && articles.loading && !articles.data ? <TableSkeleton /> : null}
          {!source.error && articles.error ? <ErrorBlock error={articles.error} /> : null}
          {!source.error && articles.data ? (
            <>
              <ArticleTable items={articles.data.items} navigate={navigate} />
              <Pager
                page={articles.data.page}
                size={articles.data.size}
                total={articles.data.total}
                onPage={setPage}
              />
            </>
          ) : null}
        </CardContent>
      </Card>
    </section>
  )
}

function ArticlesView({
  q,
  source,
  page,
  size,
  navigate,
}: {
  q: string
  source: string
  page: number
  size: number
  navigate: Navigate
}) {
  const sources = useAsync((signal) => api.sources({ signal }), [])
  const [text, setText] = useState(q)
  const debounced = useDebouncedValue(text, 300)
  const articles = useAsync(
    (signal) =>
      api.articles({ q: q.trim(), source, page, size }, { signal }),
    [q, source, page, size],
  )

  // Back/forward navigation replaces the URL; mirror it back into the input.
  useEffect(() => {
    setText(q)
  }, [q])

  // 300 ms debounce, then push the query into the URL (the URL is the only list state).
  useEffect(() => {
    if (debounced === q) return
    navigate(articlesUrl({ q: debounced, source, page: 0, size }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced])

  const sourceOptions = sources.data?.items ?? []

  return (
    <section data-testid="articles-page" className="space-y-4">
      <PageHeader
        title="Articles"
        description="Search the local archive; the reader module opens the full text."
      />
      <div className="flex max-w-2xl flex-wrap items-center gap-2">
        <div className="relative flex-1">
          <Search className="text-muted-foreground pointer-events-none absolute top-2.5 left-3 size-4" />
          <Input
            data-testid="article-search"
            className="pl-9"
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="Search titles…"
            aria-label="Search articles"
          />
        </div>
        <select
          data-testid="article-source-filter"
          aria-label="Filter by source"
          className="border-input bg-background h-9 rounded-md border px-3 text-sm"
          value={source}
          onChange={(event) =>
            navigate(
              articlesUrl({ q, source: event.target.value, page: 0, size }),
            )
          }
        >
          <option value="">All sources</option>
          {sourceOptions.map((option) => (
            <option key={option.key} value={option.key}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
      {articles.error ? <ErrorBlock error={articles.error} onRetry={() => articles.reload()} /> : null}
      {articles.loading && !articles.data ? <TableSkeleton /> : null}
      {articles.data && articles.data.items.length === 0 ? (
        <p data-testid="articles-empty" className="text-muted-foreground py-6 text-center text-sm">
          No articles found. Clear the search or pick another source.
        </p>
      ) : null}
      {articles.data && articles.data.items.length > 0 ? (
        <>
          <ArticleTable items={articles.data.items} navigate={navigate} showSource />
          <Pager
            page={articles.data.page}
            size={articles.data.size}
            total={articles.data.total}
            onPage={(next) => navigate(articlesUrl({ q, source, page: next, size }))}
          />
        </>
      ) : null}
    </section>
  )
}

function ArticleTable({
  items,
  navigate,
  showSource = false,
}: {
  items: ArticleSummary[]
  navigate: Navigate
  showSource?: boolean
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          {showSource ? <TableHead>Source</TableHead> : null}
          <TableHead>Status</TableHead>
          <TableHead>Published</TableHead>
          <TableHead>SHA</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((article) => (
          <TableRow
            key={article.id}
            data-testid="article-row"
            className="cursor-pointer"
            onClick={() => navigate(`/articles/${article.id}`)}
          >
            <TableCell className="max-w-md truncate font-medium">{article.title}</TableCell>
            {showSource ? (
              <TableCell>
                <Badge variant="outline">{article.sourceKey}</Badge>
              </TableCell>
            ) : null}
            <TableCell>
              <StatusBadge status={article.status} />
            </TableCell>
            <TableCell>{formatDate(article.publishedAt)}</TableCell>
            <TableCell className="font-mono text-xs">{article.contentSha256}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

function Pager({
  page,
  size,
  total,
  onPage,
}: {
  page: number
  size: number
  total: number
  onPage: (page: number) => void
}) {
  const pages = Math.max(1, Math.ceil(total / Math.max(1, size)))
  return (
    <div
      data-testid="articles-pager"
      className="text-muted-foreground flex items-center justify-between gap-2 pt-2 text-sm"
    >
      <span>
        Page {page + 1} of {pages} — {total} items
      </span>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" disabled={page <= 0} onClick={() => onPage(page - 1)}>
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          disabled={page + 1 >= pages}
          onClick={() => onPage(page + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

function SourcesSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <Skeleton key={index} className="h-44 rounded-xl" />
      ))}
    </div>
  )
}

function TableSkeleton() {
  return (
    <div className="space-y-2">
      {Array.from({ length: 6 }).map((_, index) => (
        <Skeleton key={index} className="h-9 w-full" />
      ))}
    </div>
  )
}

function articlesUrl({
  q,
  source,
  page,
  size,
}: {
  q: string
  source: string
  page: number
  size: number
}): string {
  const params = new URLSearchParams()
  if (q.trim() !== '') params.set('q', q.trim())
  if (source !== '') params.set('source', source)
  if (page > 0) params.set('page', String(page))
  if (size !== 50) params.set('size', String(size))
  const encoded = params.toString()
  return encoded === '' ? '/articles' : `/articles?${encoded}`
}

function toInt(value: string | undefined, fallback: number, min: number, max = Number.MAX_SAFE_INTEGER) {
  const parsed = Number.parseInt(value ?? '', 10)
  if (Number.isNaN(parsed)) return fallback
  return Math.min(max, Math.max(min, parsed))
}
