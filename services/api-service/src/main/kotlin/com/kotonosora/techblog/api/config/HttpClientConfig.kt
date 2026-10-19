package com.kotonosora.techblog.api.config

import org.springframework.beans.factory.annotation.Qualifier
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.client.JdkClientHttpRequestFactory
import org.springframework.web.client.RestClient
import java.net.http.HttpClient
import java.time.Duration

// Command and content calls use different read budgets (spec 06, file 01 + file 03 §5/§7):
// a command must fail fast (5 s), a 2 MB Markdown body may legitimately take longer (30 s).
@Configuration
class HttpClientConfig {

    @Bean
    @Qualifier("crawlerCommandClient")
    fun crawlerCommandClient(properties: ApiProperties): RestClient =
        crawlerClient(properties, properties.commandReadTimeoutMs)

    @Bean
    @Qualifier("crawlerContentClient")
    fun crawlerContentClient(properties: ApiProperties): RestClient =
        crawlerClient(properties, properties.contentReadTimeoutMs)

    private fun crawlerClient(properties: ApiProperties, readTimeoutMs: Long): RestClient {
        val httpClient = HttpClient.newBuilder()
            .connectTimeout(Duration.ofMillis(properties.commandConnectTimeoutMs))
            .followRedirects(HttpClient.Redirect.NORMAL)
            .build()
        val factory = JdkClientHttpRequestFactory(httpClient)
        factory.setReadTimeout(Duration.ofMillis(readTimeoutMs))
        return RestClient.builder()
            .baseUrl(properties.crawlerBaseUrl.trimEnd('/'))
            .requestFactory(factory)
            .build()
    }
}
