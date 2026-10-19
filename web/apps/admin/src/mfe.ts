import { createMfeElement } from '@techblog/shared/mfe'

import { AdminApp } from './app'

// Remote MFE entry (spec 07 file 02): registers <tb-admin-app>. The shell only sets
// `job-id`; its presence selects the detail view (no `view` attribute in the contract).
createMfeElement('tb-admin-app', AdminApp, ['job-id'])
