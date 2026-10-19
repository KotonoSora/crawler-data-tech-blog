import { createElement, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import '@techblog/ui/globals.css'
import './mfe'

// Standalone dev harness: `npm run dev:catalog` (port 5181), proxy /api -> 8090.
createRoot(document.getElementById('root')!).render(
  createElement(StrictMode, null, createElement('tb-catalog-app', { view: 'dashboard' })),
)
