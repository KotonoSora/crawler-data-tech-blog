import { createElement, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import '@techblog/ui/globals.css'
import './mfe'

// Standalone dev harness: `npm run dev:reader` (port 5182), proxy /api -> 8090.
createRoot(document.getElementById('root')!).render(
  createElement(StrictMode, null, createElement('tb-reader-app', { 'article-id': '1' })),
)
