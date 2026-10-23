package com.techblog.crawler.domain

import org.springframework.stereotype.Component
import java.util.concurrent.ConcurrentHashMap

/**
 * Finishing window of a running job (spec 04 file 01 §2): after the cursor is exhausted and the
 * last article is past its atomic rename, a cancel is refused with `JOB-CANCEL-REFUSED`.
 *
 * The runner marks the job just before it freezes the counters and writes `completed`; the
 * cancel request checks this marker. The window is intentionally tiny (one transaction) so a
 * real operator cancel almost never lands inside it.
 */
@Component
class FinishingWindow {
    private val finishing = ConcurrentHashMap.newKeySet<String>()

    fun mark(jobId: String) {
        finishing.add(jobId)
    }

    fun clear(jobId: String) {
        finishing.remove(jobId)
    }

    fun contains(jobId: String): Boolean = finishing.contains(jobId)
}
