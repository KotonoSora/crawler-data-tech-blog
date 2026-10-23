package com.techblog.crawler.config

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import java.time.Clock

/**
 * Domain services take a [Clock] so time-dependent transitions (request/cancel) stay
 * deterministic in tests. Production uses UTC; no wall-clock locale is involved.
 */
@Configuration
class ClockConfig {

    @Bean
    fun clock(): Clock = Clock.systemUTC()
}
