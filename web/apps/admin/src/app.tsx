import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { ArrowLeft, Ban, Play, RotateCw, TriangleAlert } from 'lucide-react'

import {
  api,
  durationSeconds,
  formatDateTime,
  isActiveJob,
  shortId,
  UiError,
  useAsync,
} from '@techblog/shared'
import type { JobFailure, JobSummary, OpsSummary } from '@techblog/shared'
import type { MfeProps } from '@techblog/shared/mfe'
import { Alert, AlertDescription, AlertTitle } from '@techblog/ui/components/alert'
import { Badge } from '@techblog/ui/components/badge'
import { Button } from '@techblog/ui/components/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@techblog/ui/components/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@techblog/ui/components/dialog'
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

const POLL_MS = 30_000

// The shell routes /jobs and /jobs/:id here (spec 07 file 02). Jobs are the only way
// crawls start — this module monitors, triggers and cancels; it never schedules.
// The detail view is selected by the presence of `job-id` (no `view` attribute).
export function AdminApp({ attrs, navigate }: MfeProps) {
  const jobId = attrs['job-id'] ?? ''
  if (jobId !== '') return <JobView jobId={jobId} navigate={navigate} />
  return <JobsView navigate={navigate} />
}

function JobsView({ navigate }: { navigate: Navigate }) {
  const [page, setPage] = useState(0)
  const [notice, setNotice] = useState<string | null>(null)
  const [starting, setStarting] = useState(false)
  const [busyId, setBusyId] = useState<string | null>(null)
  const [cancelTarget, setCancelTarget] = useState<JobSummary | null>(null)
  const [hasActive, setHasActive] = useState(false)

  const pollMs = usePollMs(hasActive)
  const jobs = useAsync((signal) => api.jobs({ page, size: 25 }, { signal }), [page], { pollMs })
  const ops = useAsync((signal) => api.opsSummary({ signal }), [], { pollMs: 60_000 })

  useEffect(() => {
    setHasActive(jobs.data?.items.some(isActiveJob) ?? false)
  }, [jobs.data])

  const startAll = async () => {
    setStarting(true)
    setNotice(null)
    try {
      const created = await api.createCrawlJob({ all: true, jobType: 'incremental' })
      setNotice(`Requested ${created.items.length} incremental job(s) for enabled sources.`)
      jobs.reload()
    } catch (error) {
      setNotice(error instanceof UiError ? `${error.message} ${error.action}` : 'Request failed.')
    } finally {
      setStarting(false)
    }
  }

  const confirmCancel = async () => {
    if (!cancelTarget) return
    setBusyId(cancelTarget.id)
    setNotice(null)
    try {
      await api.cancelJob(cancelTarget.id)
      setNotice(`Cancellation requested for job ${shortId(cancelTarget.id)}.`)
      setCancelTarget(null)
      jobs.reload()
    } catch (error) {
      setNotice(error instanceof UiError ? `${error.message} ${error.action}` : 'Request failed.')
    } finally {
      setBusyId(null)
    }
  }

  const pages = jobs.data ? Math.max(1, Math.ceil(jobs.data.total / Math.max(1, jobs.data.size))) : 1

  return (
    <section data-testid="jobs-page" data-poll-ms={String(pollMs)} className="space-y-4">
      <PageHeader
        title="Jobs"
        description="Crawl runs, newest first — polls every 30 s while a job is active."
        actions={
          <>
            <Button
              data-testid="crawl-all"
              variant="outline"
              size="sm"
              disabled={starting}
              onClick={startAll}
            >
              <Play /> Crawl all enabled
            </Button>
            <Button variant="outline" size="sm" onClick={() => jobs.reload()}>
              <RotateCw /> Reload
            </Button>
          </>
        }
      />
      <Notice text={notice} />
      {jobs.error ? <AdminError error={jobs.error} /> : null}
      {jobs.loading && !jobs.data ? <TableSkeleton /> : null}
      {jobs.data ? (
        <>
          <JobsTable
            items={jobs.data.items}
            busyId={busyId}
            navigate={navigate}
            onCancel={setCancelTarget}
          />
          <div className="text-muted-foreground flex items-center justify-between gap-2 text-sm">
            <span>
              Page {jobs.data.page + 1} of {pages} — {jobs.data.total} jobs
            </span>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={page <= 0}
                onClick={() => setPage((value) => value - 1)}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={page + 1 >= pages}
                onClick={() => setPage((value) => value + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        </>
      ) : null}
      <OpsCard ops={ops.data} error={ops.error} />
      <Dialog
        open={cancelTarget !== null}
        onOpenChange={(open) => (open ? null : setCancelTarget(null))}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel this job?</DialogTitle>
            <DialogDescription>
              Job {cancelTarget ? shortId(cancelTarget.id) : ''} on {cancelTarget?.sourceKey} stops
              after the current fetch. Archiving already done is kept.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCancelTarget(null)}>
              Keep running
            </Button>
            <Button variant="destructive" disabled={busyId !== null} onClick={confirmCancel}>
              <Ban /> Cancel job
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  )
}

function JobView({ jobId, navigate }: { jobId: string; navigate: Navigate }) {
  const [notice, setNotice] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [hasActive, setHasActive] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)

  const pollMs = usePollMs(hasActive)
  const job = useAsync((signal) => api.job(jobId, { signal }), [jobId], { pollMs })
  const failures = useAsync(
    (signal) => api.jobFailures(jobId, { page: 0, size: 50 }, { signal }),
    [jobId],
  )

  useEffect(() => {
    setHasActive(job.data ? isActiveJob(job.data) : false)
  }, [job.data])

  if (jobId === '') {
    return (
      <Alert variant="destructive" data-testid="admin-error">
        <TriangleAlert />
        <AlertTitle>Missing job id</AlertTitle>
        <AlertDescription>The shell routed here without a job-id attribute.</AlertDescription>
      </Alert>
    )
  }

  const cancellable = job.data !== null && isActiveJob(job.data)

  const confirmCancel = async () => {
    setBusy(true)
    setNotice(null)
    try {
      await api.cancelJob(jobId)
      setNotice('Cancellation requested.')
      setDialogOpen(false)
      job.reload()
    } catch (error) {
      setNotice(error instanceof UiError ? `${error.message} ${error.action}` : 'Request failed.')
    } finally {
      setBusy(false)
    }
  }

  const retryFailure = async (failure: JobFailure) => {
    setNotice(null)
    try {
      await api.retryArticle(failure.articleId)
      setNotice(`Retry queued for ${failure.title}.`)
    } catch (error) {
      setNotice(error instanceof UiError ? `${error.message} ${error.action}` : 'Request failed.')
    }
  }

  return (
    <section data-testid="job-detail" data-poll-ms={String(pollMs)} className="space-y-4">
      <PageHeader
        title={job.data ? `Job ${shortId(job.data.id)}` : 'Job'}
        description="Polls every 30 s while the job is active — counters update as batches finish."
        actions={
          <>
            <Button variant="ghost" size="sm" onClick={() => navigate('/jobs')}>
              <ArrowLeft /> Jobs
            </Button>
            <Button variant="outline" size="sm" onClick={() => job.reload()}>
              <RotateCw /> Reload
            </Button>
            <Button
              data-testid="job-cancel"
              variant="destructive"
              size="sm"
              disabled={busy || !cancellable}
              onClick={() => setDialogOpen(true)}
            >
              <Ban /> Cancel job
            </Button>
          </>
        }
      />
      <Notice text={notice} />
      {job.error ? <AdminError error={job.error} /> : null}
      {job.loading && !job.data ? <TableSkeleton /> : null}
      {job.data ? (
        <>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {job.data.sourceKey} · {job.data.jobType}
                <Badge data-testid="job-status" variant={statusVariant(job.data.status)}>
                  {job.data.status}
                </Badge>
              </CardTitle>
              <CardDescription>
                Requested {formatDateTime(job.data.requestedAt)} · took{' '}
                {durationSeconds(job.data.startedAt, job.data.finishedAt)}
              </CardDescription>
            </CardHeader>
            <CardContent
              data-testid="job-counters"
              className="grid gap-x-6 gap-y-3 text-sm sm:grid-cols-4"
            >
              <Meta label="Discovered" value={String(job.data.discoveredCount)} />
              <Meta label="Archived" value={String(job.data.archivedCount)} />
              <Meta label="Skipped" value={String(job.data.skippedCount)} />
              <Meta label="Failed" value={String(job.data.failedCount)} />
              <Meta label="Started" value={formatDateTime(job.data.startedAt)} />
              <Meta label="Finished" value={formatDateTime(job.data.finishedAt)} />
              <Meta label="Job id" value={job.data.id} mono />
            </CardContent>
          </Card>
          <Card data-testid="job-failures">
            <CardHeader>
              <CardTitle className="text-base">Failures</CardTitle>
              <CardDescription>
                Terminal failures for this run; retry re-queues the article exactly once.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {failures.error ? (
                <p className="text-muted-foreground text-sm">
                  Failure list unavailable: {failures.error.message}
                </p>
              ) : null}
              {failures.data && failures.data.items.length === 0 ? (
                <p className="text-muted-foreground text-sm">No failures recorded for this job.</p>
              ) : null}
              {failures.data && failures.data.items.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Article</TableHead>
                      <TableHead>Code</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead>Attempts</TableHead>
                      <TableHead>Last attempt</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {failures.data.items.map((failure) => (
                      <TableRow key={failure.articleId} data-testid="job-failure-row">
                        <TableCell className="max-w-xs truncate font-medium">
                          {failure.title}
                        </TableCell>
                        <TableCell className="font-mono text-xs">{failure.failureCode}</TableCell>
                        <TableCell className="max-w-xs truncate">{failure.failureReason}</TableCell>
                        <TableCell>{failure.attemptCount}</TableCell>
                        <TableCell>{formatDateTime(failure.lastAttemptAt)}</TableCell>
                        <TableCell>
                          <Button
                            data-testid="job-failure-retry"
                            size="sm"
                            variant="outline"
                            onClick={() => retryFailure(failure)}
                          >
                            <RotateCw /> Retry
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : null}
            </CardContent>
          </Card>
        </>
      ) : null}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel this job?</DialogTitle>
            <DialogDescription>
              The job stops after the current fetch. Articles already archived are kept.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Keep running
            </Button>
            <Button
              variant="destructive"
              disabled={busy}
              onClick={confirmCancel}
            >
              <Ban /> Cancel job
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  )
}

function JobsTable({
  items,
  busyId,
  navigate,
  onCancel,
}: {
  items: JobSummary[]
  busyId: string | null
  navigate: Navigate
  onCancel: (job: JobSummary) => void
}) {
  if (items.length === 0) {
    return <p className="text-muted-foreground py-6 text-center text-sm">No jobs yet.</p>
  }
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Job</TableHead>
          <TableHead>Source</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Requested</TableHead>
          <TableHead>D / A / S / F</TableHead>
          <TableHead>Duration</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((job) => (
          <TableRow
            key={job.id}
            data-testid="job-row"
            className="cursor-pointer"
            onClick={() => navigate(`/jobs/${job.id}`)}
          >
            <TableCell className="font-mono text-xs">{shortId(job.id)}</TableCell>
            <TableCell>
              <Badge variant="outline">{job.sourceKey}</Badge>
            </TableCell>
            <TableCell>{job.jobType}</TableCell>
            <TableCell>
              <Badge variant={statusVariant(job.status)}>{job.status}</Badge>
            </TableCell>
            <TableCell>{formatDateTime(job.requestedAt)}</TableCell>
            <TableCell className="font-mono text-xs">
              {job.discoveredCount} / {job.archivedCount} / {job.skippedCount} / {job.failedCount}
            </TableCell>
            <TableCell>{durationSeconds(job.startedAt, job.finishedAt)}</TableCell>
            <TableCell>
              {isActiveJob(job) ? (
                <Button
                  variant="outline"
                  size="sm"
                  disabled={busyId === job.id}
                  onClick={(event) => {
                    event.stopPropagation()
                    onCancel(job)
                  }}
                >
                  <Ban /> Cancel
                </Button>
              ) : (
                <span className="text-muted-foreground text-xs">—</span>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

function OpsCard({ ops, error }: { ops: OpsSummary | null; error: Error | null }) {
  return (
    <Card data-testid="ops-card">
      <CardHeader>
        <CardTitle className="text-base">Service health</CardTitle>
        <CardDescription>
          {ops
            ? `Projection lag ${ops.projectionLagSeconds}s · checked ${formatDateTime(ops.checkedAt)}`
            : 'Health of crawler-service, api-service, PostgreSQL, Redis.'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        {error ? (
          <p className="text-muted-foreground">
            Health probe failed: {error instanceof UiError ? error.message : error.message}
          </p>
        ) : null}
        {ops?.services.map((service) => (
          <div key={service.service} className="flex items-start justify-between gap-3">
            <span className="font-medium">{service.service}</span>
            <span className="text-muted-foreground flex-1 truncate text-right text-xs">
              {service.details.join(' · ')}
            </span>
            <Badge variant={service.status === 'UP' ? 'default' : 'destructive'}>
              {service.status}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

function AdminError({ error }: { error: Error }) {
  const ui = error instanceof UiError ? error : null
  return (
    <Alert variant="destructive" data-testid="admin-error">
      <TriangleAlert />
      <AlertTitle>{ui?.message ?? 'Request failed.'}</AlertTitle>
      <AlertDescription className="space-y-2">
        <p>{ui?.action ?? 'Check that the stack is running, then retry.'}</p>
        <code className="text-xs">{ui?.code ?? 'UI-UNKNOWN'}</code>
        {ui?.code === 'JOB-NOT-FOUND' ? <a href="/jobs">jobs list</a> : null}
      </AlertDescription>
    </Alert>
  )
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

function Notice({ text }: { text: string | null }) {
  if (!text) return null
  return (
    <Alert data-testid="admin-notice">
      <AlertDescription>{text}</AlertDescription>
    </Alert>
  )
}

function Meta({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="space-y-0.5">
      <p className="text-muted-foreground text-xs tracking-wide uppercase">{label}</p>
      <p className={mono ? 'font-mono text-xs break-all' : ''}>{value}</p>
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

function statusVariant(status: string): 'default' | 'secondary' | 'destructive' | 'outline' {
  if (status === 'completed') return 'default'
  if (status === 'failed') return 'destructive'
  if (status === 'cancelled') return 'outline'
  return 'secondary'
}

/** 30 s cadence only while a job is pending/running; 0 otherwise (spec 07 file 05 §5). */
function usePollMs(active: boolean): number {
  const [pollMs, setPollMs] = useState(0)
  useEffect(() => {
    setPollMs(active ? POLL_MS : 0)
  }, [active])
  return pollMs
}
