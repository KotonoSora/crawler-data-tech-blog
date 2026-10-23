package com.techblog.api.observability

import org.slf4j.MDC
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.core.task.TaskDecorator
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler

/**
 * Scheduler/MDC plumbing for api-service (spec 05 file 01 §2): the projection consumer,
 * reconciliation and lag checks run on pooled scheduler threads. Each task gets the submitting
 * thread's MDC plus a default `code`, and the previous map is restored in a `finally` block.
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
