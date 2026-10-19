import { createMfeElement } from '@techblog/shared/mfe'

import { ReaderApp } from './app'

// Remote MFE entry (spec 07 file 02): registers <tb-reader-app> when the bundle runs.
createMfeElement('tb-reader-app', ReaderApp, ['article-id'])
