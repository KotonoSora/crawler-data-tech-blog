import { useEffect, useState } from 'react'
import {
  Link,
  NavLink,
  Outlet,
  RouterProvider,
  createBrowserRouter,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router'

import { api, UiError } from '@techblog/shared'
import { MF_NAVIGATE } from '@techblog/shared/mfe'
import type { NavigateDetail } from '@techblog/shared/mfe'
import { Button } from '@techblog/ui/components/button'
import { cn } from '@techblog/ui/lib/utils'

import { RemoteHost } from './remote-host'

// Route ownership (frozen, spec 07 file 02): catalog -> /, /sources/:key, /articles;
// reader -> /articles/:id; admin -> /jobs, /jobs/:id; the shell owns the frame and the 404.
// The shell is the only place that reads the router: remotes receive plain attributes and
// ask for navigation with the `tb:navigate` event.
export const router = createBrowserRouter([
  {
    path: '/',
    element: <ShellLayout />,
    children: [
      { index: true, element: <RemoteHost name="catalog" attrs={{ view: 'dashboard' }} /> },
      { path: 'sources/:key', element: <SourceRoute /> },
      { path: 'articles', element: <ArticlesRoute /> },
      { path: 'articles/:id', element: <ArticleRoute /> },
      { path: 'jobs', element: <RemoteHost name="admin" attrs={{}} /> },
      { path: 'jobs/:id', element: <JobRoute /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])

export function App() {
  return <RouterProvider router={router} />
}

function SourceRoute() {
  const { key = '' } = useParams()
  return <RemoteHost name="catalog" attrs={{ view: 'source', 'source-key': key }} />
}

// List state lives in the URL only (spec 07 file 03 §2): q/source/page/size are parsed here
// and passed down as attributes, so deep links and reloads restore the exact list.
function ArticlesRoute() {
  const [params] = useSearchParams()
  return (
    <RemoteHost
      name="catalog"
      attrs={{
        view: 'articles',
        q: params.get('q') ?? '',
        source: params.get('source') ?? '',
        page: params.get('page') ?? '0',
        size: params.get('size') ?? '50',
      }}
    />
  )
}

function ArticleRoute() {
  const { id = '' } = useParams()
  return <RemoteHost name="reader" attrs={{ 'article-id': id }} />
}

function JobRoute() {
  const { id = '' } = useParams()
  // Admin derives list vs detail from `job-id`; `view` is not part of its contract.
  return <RemoteHost name="admin" attrs={{ 'job-id': id }} />
}

function ShellLayout() {
  const navigate = useNavigate()

  // Single place where remote navigation intents become real router transitions.
  useEffect(() => {
    const handler = (event: Event) => {
      const detail = (event as CustomEvent<NavigateDetail>).detail
      if (detail && typeof detail.to === 'string' && detail.to !== '') {
        navigate(detail.to, { replace: detail.replace ?? false })
      }
    }
    window.addEventListener(MF_NAVIGATE, handler)
    return () => window.removeEventListener(MF_NAVIGATE, handler)
  }, [navigate])

  return (
    <div data-testid="app-shell" className="flex min-h-screen flex-col">
      <header className="bg-background/95 sticky top-0 z-40 border-b backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <Link to="/" className="text-sm font-semibold tracking-tight">
            tech-blog archive
          </Link>
          <nav className="flex items-center gap-1 text-sm">
            <NavLink to="/" end className={navClass} data-testid="nav-sources">
              Sources
            </NavLink>
            <NavLink to="/articles" className={navClass} data-testid="nav-articles">
              Articles
            </NavLink>
            <NavLink to="/jobs" className={navClass} data-testid="nav-jobs">
              Jobs
            </NavLink>
          </nav>
        </div>
      </header>
      <ServiceBanner />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6">
        <Outlet />
      </main>
      <footer className="text-muted-foreground mx-auto w-full max-w-6xl px-4 pb-6 text-xs">
        shell · catalog · reader · admin — remotes load from /mfe/, navigation via tb:navigate
      </footer>
    </div>
  )
}

// Ops banner (spec 07 file 02 §5): the shell, not each remote, reports a dependency problem
// so every route says the same thing. Polls every 60 s; a 503 ProblemDetail is itself the
// signal that api-service or one of its dependencies is down.
function ServiceBanner() {
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    const check = async () => {
      try {
        const ops = await api.opsSummary()
        if (cancelled) return
        const down = ops.services.filter((service) => service.status !== 'UP')
        if (down.length > 0) {
          setMessage(
            `Service dependency degraded: ${down.map((service) => service.service).join(', ')}. Screens may show stale data.`,
          )
        } else if (ops.projectionLagSeconds > 30) {
          setMessage(
            `The read model is ${ops.projectionLagSeconds}s behind the crawler. Screens may show stale data.`,
          )
        } else {
          setMessage(null)
        }
      } catch (error) {
        if (cancelled) return
        setMessage(
          error instanceof UiError && error.code === 'OPS-DEPENDENCY-DOWN'
            ? 'A service dependency is unreachable. Screens may show stale data.'
            : 'Service health could not be checked. Screens may show stale data.',
        )
      }
    }
    void check()
    const timer = setInterval(() => void check(), 60_000)
    return () => {
      cancelled = true
      clearInterval(timer)
    }
  }, [])

  if (!message) return null
  return (
    <div
      data-testid="shell-banner"
      role="status"
      className="border-destructive/40 bg-destructive/10 text-destructive border-b px-4 py-2 text-center text-sm"
    >
      {message}
    </div>
  )
}

function NotFound() {
  return (
    <div data-testid="shell-404" className="flex flex-col items-center gap-4 py-16 text-center">
      <p className="text-muted-foreground text-sm">No shell route matches this URL.</p>
      <h1 className="text-2xl font-semibold tracking-tight">404 — not in the archive shell</h1>
      <Button asChild>
        <Link to="/">Back to sources</Link>
      </Button>
    </div>
  )
}

function navClass({ isActive }: { isActive: boolean }): string {
  return cn(
    'rounded-md px-3 py-1.5 transition-colors',
    isActive
      ? 'bg-secondary text-secondary-foreground font-medium'
      : 'text-muted-foreground hover:bg-secondary/50',
  )
}
