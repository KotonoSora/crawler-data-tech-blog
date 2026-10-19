package com.kotonosora.techblog.api.config

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import tools.jackson.databind.ObjectMapper
import tools.jackson.databind.json.JsonMapper
import tools.jackson.module.kotlin.KotlinModule

/**
 * Jackson 3 Kotlin module (AGENTS.md working rules, spec 06 file 01 §1).
 *
 * Spring Boot 4 uses Jackson 3 (`tools.jackson`) for MVC request bodies. Without the Kotlin
 * module, a data class with a default value does not fill that default when the JSON field is
 * omitted — the request DTO would deserialize to `null` and every `?: default` branch would
 * silently misfire. `JsonMapper` is an `ObjectMapper`, so this single bean also satisfies the
 * projection consumer's `ObjectMapper` injection and backs off Boot's auto-configuration.
 */
@Configuration
class JacksonConfig {

    @Bean
    fun jsonMapper(): JsonMapper =
        JsonMapper.builder()
            .addModule(KotlinModule.Builder().build())
            .build()
}
