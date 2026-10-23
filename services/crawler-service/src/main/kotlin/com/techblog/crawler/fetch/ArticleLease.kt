package com.techblog.crawler.fetch

import com.techblog.crawler.config.CrawlerProperties
import org.slf4j.LoggerFactory
import org.springframework.data.redis.core.StringRedisTemplate
import org.springframework.data.redis.core.script.DefaultRedisScript
import org.springframework.stereotype.Component
import java.time.Duration
import java.util.UUID
import java.util.concurrent.Executors
import java.util.concurrent.ScheduledFuture
import java.util.concurrent.TimeUnit

/**
 * `tb:lock:article:{id}` (spec 04 file 01 §4): a 300 s lease with a 60 s heartbeat keeps two
 * workers from processing the same article even if the durable claim query is bypassed. The DB
 * `UPDATE ... WHERE status='queued'` stays the primary mutex; this lease is defense in depth.
 *
 * A Redis outage must not stop a single-node crawl (DEVIATION CARRIED 2026-10-23): when the
 * lease store is unreachable the processor continues under the DB claim alone. Budget: 0 new
 * dependencies, 1 key from the frozen set.
 */
@Component
class ArticleLease(
    private val redis: StringRedisTemplate,
    private val properties: CrawlerProperties,
) {
    private val log = LoggerFactory.getLogger(javaClass)

    fun acquire(articleId: String): Lease? {
        val key = key(articleId)
        val token = UUID.randomUUID().toString()
        val acquired = runCatching {
            redis.opsForValue().setIfAbsent(
                key,
                token,
                Duration.ofSeconds(properties.articleLockTtlSeconds),
            )
        }
        if (acquired.isFailure) {
            log.debug("article_lease_unavailable articleId={} reason={}", articleId, acquired.exceptionOrNull()?.message)
            return Lease(articleId, key, token, renew = null)
        }
        if (acquired.getOrNull() != true) {
            log.debug("article_lease_busy articleId={}", articleId)
            return null
        }
        val heartbeat = properties.articleLockHeartbeatSeconds.coerceAtLeast(1)
        val ttlMs = (properties.articleLockTtlSeconds * 1000).toString()
        val renew = RENEWER.scheduleAtFixedRate(
            {
                runCatching { redis.execute(renewScript, listOf(key), token, ttlMs) }
                    .onFailure { log.debug("article_lease_renew_failed articleId={}", articleId) }
            },
            heartbeat,
            heartbeat,
            TimeUnit.SECONDS,
        )
        return Lease(articleId, key, token, renew)
    }

    inner class Lease internal constructor(
        private val articleId: String,
        private val key: String,
        private val token: String,
        private val renew: ScheduledFuture<*>?,
    ) : AutoCloseable {
        override fun close() {
            renew?.cancel(false)
            runCatching { redis.execute(releaseScript, listOf(key), token) }
                .onFailure { log.debug("article_lease_release_failed articleId={}", articleId) }
        }
    }

    private fun key(articleId: String): String = "${properties.articleLockPrefix}$articleId"

    private companion object {
        val RENEWER = Executors.newScheduledThreadPool(1) { runnable ->
            Thread(runnable, "article-lease-heartbeat").apply { isDaemon = true }
        }

        /** KEYS: lock. ARGV: token, ttl ms. Only the owner extends the lease. */
        val renewScript: DefaultRedisScript<Long> = DefaultRedisScript(
            """
            if redis.call('GET', KEYS[1]) == ARGV[1] then
              return redis.call('PEXPIRE', KEYS[1], ARGV[2])
            end
            return 0
            """.trimIndent(),
            Long::class.java,
        )

        /** KEYS: lock. ARGV: token. Compare-and-delete so a stale lease cannot free a new one. */
        val releaseScript: DefaultRedisScript<Long> = DefaultRedisScript(
            """
            if redis.call('GET', KEYS[1]) == ARGV[1] then
              return redis.call('DEL', KEYS[1])
            end
            return 0
            """.trimIndent(),
            Long::class.java,
        )
    }
}
