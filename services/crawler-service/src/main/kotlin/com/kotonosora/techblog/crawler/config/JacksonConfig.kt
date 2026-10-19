package com.kotonosora.techblog.crawler.config

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import tools.jackson.databind.json.JsonMapper
import tools.jackson.module.kotlin.KotlinModule

/**
 * Jackson 3 Kotlin module (AGENTS.md working rules). Same reasoning as api-service: a data
 * class default must fill when the field is omitted from the JSON body.
 */
@Configuration
class JacksonConfig {

    @Bean
    fun jsonMapper(): JsonMapper =
        JsonMapper.builder()
            .addModule(KotlinModule.Builder().build())
            .build()
}
