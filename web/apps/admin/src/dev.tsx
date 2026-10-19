import { createElement, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import '@techblog/ui/globals.css'
import './mfe'

// Standalone dev harness: `npm run dev:admin` (port 5183), proxy /api -> 8090.
createRoot(document.getElementById('root')!).render(
  createElement(StrictMode, null, createElement('tb-admin-app', { view: 'jobs' })),
)
