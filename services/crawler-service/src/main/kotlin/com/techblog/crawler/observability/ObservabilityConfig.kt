package com.techblog.crawler.observability

import org.slf4j.MDC
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.core.task.TaskDecorator
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler

/**
 * Observability plumbing for crawler-service (spec 05 file 01 §2).
 *
 * The scheduler pool is the unit of work for discovery/fetch jobs and queue sampling. A task
 * decorator copies the submitting thread's MDC onto the worker, defaults `code` to `-`, and
 * restores the previous map in a `finally` block so a pooled thread never leaks `host`,
 * `articleId`, or `jobId` into the next task.
 */
@Configuration
class ObservabilityConfig {

    @Bean
    fun taskScheduler(): ThreadPoolTaskScheduler = ThreadPoolTaskScheduler().apply {
        poolSize = 4
        setThreadNamePrefix("scheduling-")
        setTaskDecorator(MdcTaskDecorator())
        setWaitForTasksToCompleteOnShutdown(true)
        setAwaitTerminationSeconds(30)
    }

    @Bean
    fun mdcTaskDecorator(): TaskDecorator = MdcTaskDecorator()
}

/** Copies MDC per task and clears it afterwards; also guarantees a `code` field. */
class MdcTaskDecorator : TaskDecorator {
    override fun decorate(runnable: Runnable): Runnable {
        val submitted = MDC.getCopyOfContextMap()
        return Runnable {
            val previous = MDC.getCopyOfContextMap()
            if (submitted == null) MDC.clear() else MDC.setContextMap(submitted)
            if (MDC.get("code") == null) MDC.put("code", "-")
            try {
                runnable.run()
            } finally {
                if (previous == null) MDC.clear() else MDC.setContextMap(previous)
            }
        }
    }
}
