import { createMfeElement } from '@techblog/shared/mfe'

import { CatalogApp } from './app'

// Remote MFE entry (spec 07 file 02): registers <tb-catalog-app> when the bundle runs.
// Observed attributes: the shell selects the view and passes URL state (q/page/size).
createMfeElement('tb-catalog-app', CatalogApp, [
  'view',
  'source-key',
  'q',
  'source',
  'page',
  'size',
])
