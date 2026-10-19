import { useState } from 'react'
import { ArrowLeft, ExternalLink, RotateCcw, TriangleAlert } from 'lucide-react'
import Markdown from 'react-markdown'
import rehypeSanitize from 'rehype-sanitize'
import remarkGfm from 'remark-gfm'

import {
  api,
  formatDate,
  formatDateTime,
  isRetryable,
  shortSha,
  stripTracking,
  UiError,
  useAsync,
} from '@techblog/shared'
import type { ArticleDetail } from '@techblog/shared'
import type { MfeProps } from '@techblog/shared/mfe'
import { Alert, AlertDescription, AlertTitle } from '@techblog/ui/components/alert'
import { Badge } from '@techblog/ui/components/badge'
import { Button } from '@techblog/ui/components/button'
import { Card, CardContent, CardHeader, CardTitle } from '@techblog/ui/components/card'
import { Separator } from '@techblog/ui/components/separator'
import { Skeleton } from '@techblog/ui/components/skeleton'

// The shell routes /articles/:id here and passes the id as an attribute (spec 07 file 02).
// Markdown renders sanitized (rehype-sanitize, no raw HTML); images only resolve through the
// archive asset proxy — remote images are never hotlinked (crawl rules, AGENTS.md).
export function ReaderApp({ attrs, navigate }: MfeProps) {
  const articleId = attrs['article-id'] ?? ''
  const [version, setVersion] = useState(0)
  const [notice, setNotice] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const detail = useAsync((signal) => api.article(articleId, { signal }), [articleId, version])

  if (articleId === '') {
    return (
      <Alert variant="destructive" data-testid="reader-error">
        <TriangleAlert />
        <AlertTitle>Missing article id</AlertTitle>
        <AlertDescription>The shell routed here without an article-id attribute.</AlertDescription>
      </Alert>
    )
  }

  const canRetry = detail.data !== null && isRetryable(detail.data.status)

  const retry = async () => {
    setBusy(true)
    setNotice(null)
    try {
      await api.retryArticle(articleId)
      setNotice('Retry queued. The status updates when the job finishes.')
      setVersion((value) => value + 1)
    } catch (error) {
      setNotice(error instanceof UiError ? `${error.message} ${error.action}` : 'Request failed.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div data-testid="reader-page" className="mx-auto max-w-3xl space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Button data-testid="reader-back" variant="ghost" size="sm" onClick={() => navigate('/articles')}>
          <ArrowLeft /> Articles
        </Button>
        <div className="flex items-center gap-2">
          {detail.data ? (
            <Button variant="outline" size="sm" asChild>
              <a
                data-testid="reader-raw-link"
                href={api.articleContentUrl(detail.data.id)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink /> Raw Markdown
              </a>
            </Button>
          ) : null}
          <Button data-testid="reader-retry" size="sm" disabled={busy || !canRetry} onClick={retry}>
            <RotateCcw /> Retry archive
          </Button>
        </div>
      </div>
      {notice ? (
        <Alert data-testid="reader-notice">
          <AlertDescription>{notice}</AlertDescription>
        </Alert>
      ) : null}
      {detail.error ? <ErrorBlock error={detail.error} /> : null}
      {detail.loading && !detail.data ? <ArticleSkeleton /> : null}
      {detail.data ? <ArticleBody detail={detail.data} /> : null}
    </div>
  )
}

function ArticleBody({ detail }: { detail: ArticleDetail }) {
  const base = detail.assetBasePath.replace(/\/$/, '')
  const canonical = stripTracking(detail.originalUrl)

  return (
    <article className="space-y-4">
      <header className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline">{detail.sourceKey}</Badge>
          <Badge
            data-testid="reader-status"
            variant={
              detail.status === 'archived'
                ? 'default'
                : detail.status === 'failed'
                  ? 'destructive'
                  : 'secondary'
            }
          >
            {detail.status}
          </Badge>
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">{detail.title}</h1>
        <p data-testid="reader-byline" className="text-muted-foreground text-sm">
          By {detail.author ?? 'unknown author'} · published {formatDate(detail.publishedAt)} ·
          fetched {formatDate(detail.fetchedAt)}
        </p>
        <p data-testid="reader-attribution" className="text-muted-foreground text-sm">
          Originally published at{' '}
          <a className="underline underline-offset-2" href={canonical} target="_blank" rel="noopener noreferrer">
            {canonical}
          </a>{' '}
          · source feed{' '}
          <a className="underline underline-offset-2" href={detail.sourceUrl} target="_blank" rel="noopener noreferrer">
            {detail.sourceUrl}
          </a>
        </p>
      </header>
      <Separator />
      <div data-testid="reader-body" className="md-body">
        <Markdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeSanitize]}
          components={{
            img: ({ src, alt }) => {
              const resolved = resolveAsset(src, base)
              if (!resolved) {
                return (
                  <span className="text-muted-foreground text-sm italic">
                    [image omitted: {alt || 'remote asset'}]
                  </span>
                )
              }
              return <img src={resolved} alt={alt ?? ''} />
            },
            a: ({ href, children }) => {
              const external = typeof href === 'string' && /^https?:\/\//i.test(href)
              return (
                <a
                  href={href}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noopener noreferrer' : undefined}
                >
                  {children}
                </a>
              )
            },
          }}
        >
          {detail.contentMarkdown}
        </Markdown>
      </div>
      <Card data-testid="reader-metadata">
        <CardHeader>
          <CardTitle className="text-base">Archive metadata</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-x-6 gap-y-3 text-sm sm:grid-cols-2">
          <Meta label="Canonical URL" value={canonical} link />
          <Meta label="Original URL" value={detail.originalUrl} link />
          <Meta label="Source feed" value={detail.sourceUrl} link />
          <Meta label="SHA-256" value={shortSha(detail.contentSha256)} mono />
          <Meta label="Archived at" value={formatDateTime(detail.archivedAt)} />
          <Meta label="Fetched at" value={formatDateTime(detail.fetchedAt)} />
        </CardContent>
      </Card>
    </article>
  )
}

function Meta({
  label,
  value,
  mono = false,
  link = false,
}: {
  label: string
  value: string
  mono?: boolean
  link?: boolean
}) {
  return (
    <div className="space-y-0.5">
      <p className="text-muted-foreground text-xs tracking-wide uppercase">{label}</p>
      <p className={mono ? 'font-mono text-xs break-all' : 'break-all'}>
        {link ? (
          <a
            className="underline underline-offset-2"
            href={value}
            target="_blank"
            rel="noopener noreferrer"
          >
            {value}
          </a>
        ) : (
          value
        )}
      </p>
    </div>
  )
}

function ErrorBlock({ error }: { error: Error }) {
  const ui = error instanceof UiError ? error : null
  return (
    <Alert variant="destructive" data-testid="reader-error">
      <TriangleAlert />
      <AlertTitle>{ui?.message ?? 'The article could not be loaded.'}</AlertTitle>
      <AlertDescription className="space-y-2">
        <p>{ui?.action ?? 'Check that the stack is running, then retry.'}</p>
        <code className="text-xs">{ui?.code ?? 'UI-UNKNOWN'}</code>
        {ui?.detail ? <p className="text-xs">{ui.detail}</p> : null}
        {ui?.code === 'ART-NOT-FOUND' ? <a href="/articles">articles list</a> : null}
      </AlertDescription>
    </Alert>
  )
}

function ArticleSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="h-6 w-2/3" />
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="h-40 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
    </div>
  )
}

/**
 * Resolve a Markdown image source against the article's asset proxy.
 *
 * Only archive-relative paths are accepted: `assets/<file>` or `<file>`. Absolute URLs,
 * protocol-relative URLs and data/blob URIs return null so the reader can render an
 * explicit placeholder instead of silently hotlinking the origin site (BR-10, AC-14).
 */
export function resolveAsset(src: string | undefined, base: string): string | null {
  if (!src) return null
  if (/^(?:[a-z][a-z0-9+.-]*:)?\/\//i.test(src)) return null
  if (src.startsWith('/')) return null
  const relative = src.replace(/^\.\//, '').replace(/^assets\//, '')
  if (relative === '' || relative.includes('..') || relative.includes('/') || relative.includes('\\')) {
    return null
  }
  return `${base}/${encodeURIComponent(relative)}`
}
