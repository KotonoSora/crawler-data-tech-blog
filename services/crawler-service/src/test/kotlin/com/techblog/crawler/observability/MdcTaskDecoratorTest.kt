package com.techblog.crawler.observability

import org.junit.jupiter.api.AfterEach
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertNull
import org.junit.jupiter.api.Test
import org.slf4j.MDC

/**
 * MDC isolation (spec 05 file 01 §2): a pooled scheduler thread must never inherit stale
 * `host`, `articleId`, or `jobId`, and the decorator must restore what was there before.
 */
class MdcTaskDecoratorTest {

    @AfterEach
    fun clear() = MDC.clear()

    @Test
    fun `task sees submitted context and the previous map is restored`() {
        val decorator = MdcTaskDecorator()
        MDC.put("jobId", "job-1")
        var seen: Map<String, String>? = null
        val task = decorator.decorate { seen = MDC.getCopyOfContextMap() }

        MDC.clear()
        MDC.put("articleId", "stale-article")

        task.run()

        assertEquals("job-1", seen?.get("jobId"))
        assertNull(seen?.get("articleId"))
        assertEquals("-", seen?.get("code"))
        assertEquals("stale-article", MDC.get("articleId"))
    }
}
