package com.techblog.crawler.fetch

import com.techblog.crawler.config.CrawlerProperties
import com.techblog.crawler.domain.FetchClaim
import com.techblog.crawler.domain.FetchMessage
import com.techblog.crawler.domain.FetchQueue
import com.techblog.crawler.domain.RetryEntry
import com.techblog.crawler.domain.RetryQueue
import org.slf4j.LoggerFactory
import org.springframework.data.redis.core.StringRedisTemplate
import org.springframework.data.redis.core.script.DefaultRedisScript
import org.springframework.stereotype.Component
import tools.jackson.databind.json.JsonMapper
import java.time.Duration
import java.time.Instant

/**
 * Redis transport for the fetch stage (spec 02 file 03 §4, file 05 §1).
 *
 * - `tb:q:{host}` holds ready work, `tb:q:{host}:processing` holds claimed work until the
 *   `fetch_log` transaction acknowledges it, so a crash leaves the message unacknowledged for
 *   the boot reclaim (the DB `processing` row is the durable source of truth).
 * - `tb:retry` is a zset: member = articleId, score = ready epoch ms. The message body lives in
 *   `tb:retry:msg` so a due member can be pushed back to `tb:q:{host}` without a DB read.
 *
 * Every failure degrades to "no queue": the DB article row is the durable record and the
 * single-node fallback keeps processing it (see [FetchQueue.available]).
 */
@Component
class RedisFetchQueue(
    private val redis: StringRedisTemplate,
    private val jsonMapper: JsonMapper,
    private val properties: CrawlerProperties,
) : FetchQueue, RetryQueue {

    private val log = LoggerFactory.getLogger(javaClass)

    // -----------------------------------------------------------------------
    // tb:q:{host}
    // -----------------------------------------------------------------------

    override fun enqueue(message: FetchMessage): Boolean {
        val payload = encode(message) ?: return false
        if (payload.toByteArray(Charsets.UTF_8).size > properties.maxQueueMessageBytes) {
            log.warn(
                "fetch_queue_message_too_large articleId={} bytes={} cap={}",
                message.articleId,
                payload.toByteArray(Charsets.UTF_8).size,
                properties.maxQueueMessageBytes,
            )
            return false
        }
        return runCatching {
            // `tb:hosts` (spec 04 §4): register the host before publishing work so a consumer
            // iterating the set can never miss a queue that was just filled.
            redis.opsForSet().add(properties.hostsKey, message.host.lowercase())
            redis.opsForList().rightPush(queueKey(message.host), payload)
            true
        }.getOrElse { error ->
            log.warn("fetch_queue_enqueue_failed host={} reason={}", message.host, error.message)
            false
        }
    }

    override fun claim(host: String, timeout: Duration): FetchClaim? {
        val source = queueKey(host)
        val processing = processingKey(host)
        return runCatching {
            // DEVIATION FLAGGED (2026-10-22): spec 03 §4 says BLMOVE. Spring Data's
            // `ListOperations.move` returns Boolean, not the moved payload, so a follow-up read
            // can return another claimant's message. LPOP + RPUSH returns the exact payload and
            // leaves it in `:processing` until `acknowledge`; the DB article row is the durable
            // record, so the tiny non-atomic window can only lose an ordering hint, never work.
            // Budget: 0 new services, 0 new dependencies. The port keeps `timeout` so a future
            // connection-level BLMOVE can restore blocking semantics without changing callers.
            val payload = redis.opsForList().leftPop(source) ?: return null
            // BLMOVE LEFT RIGHT pushes to the tail of `:processing`; LREM acks by value, so the
            // position only affects observability of the in-flight list.
            redis.opsForList().rightPush(processing, payload)
            val message = decode(payload) ?: run {
                // Malformed message: drop it instead of blocking the host queue (file 03 §4).
                redis.opsForList().remove(processing, 1, payload)
                log.warn("fetch_queue_message_invalid host={}", host)
                return null
            }
            FetchClaim(message = message, payload = payload)
        }.getOrElse { error ->
            log.warn("fetch_queue_claim_failed host={} reason={}", host, error.message)
            null
        }
    }

    override fun acknowledge(host: String, claim: FetchClaim) {
        runCatching {
            redis.opsForList().remove(processingKey(host), 1, claim.payload)
            // Spec 04 §4: SREM in the same Lua script when both host lists are empty.
            pruneHost(host)
        }.onFailure { error ->
            log.warn("fetch_queue_ack_failed host={} articleId={} reason={}", host, claim.message.articleId, error.message)
        }
    }

    override fun hosts(): Set<String> =
        runCatching { redis.opsForSet().members(properties.hostsKey)?.map { it.lowercase() }?.toSet() }
            .getOrNull() ?: emptySet()

    override fun requeueProcessing(host: String): Int = runCatching {
        val moved = redis.execute(
            requeueScript,
            listOf(processingKey(host), queueKey(host), properties.hostsKey),
            host.lowercase(),
        ) ?: 0L
        if (moved > 0) {
            log.warn("fetch_queue_processing_requeued host={} messages={}", host, moved)
        }
        moved.toInt()
    }.getOrElse { error ->
        log.warn("fetch_queue_processing_requeue_failed host={} reason={}", host, error.message)
        0
    }

    override fun pending(host: String): Long =
        runCatching { redis.opsForList().size(queueKey(host)) ?: 0L }.getOrDefault(0L)

    override fun peek(host: String): FetchMessage? = runCatching {
        val key = queueKey(host)
        val payload = redis.opsForList().index(key, 0) ?: return null
        val message = decode(payload)
        if (message == null) {
            // Drop an undecodable head so it cannot block the host queue forever.
            redis.opsForList().remove(key, 1, payload)
            log.warn("fetch_queue_message_dropped host={}", host)
        }
        message
    }.getOrNull()

    override fun available(): Boolean =
        runCatching { redis.opsForValue().get(QUEUE_PING_KEY) }.isSuccess

    // -----------------------------------------------------------------------
    // tb:retry zset
    // -----------------------------------------------------------------------

    override fun schedule(message: FetchMessage, readyAt: Instant) {
        val payload = encode(message) ?: return
        runCatching {
            // Payload first: if the zadd fails the orphaned hash entry is harmless (overwritten
            // on the next schedule); the reverse order could leave a zset member with no payload.
            redis.opsForHash<String, String>().put(retryMessageKey(), message.articleId, payload)
            redis.opsForZSet().add(
                properties.retryQueueKey,
                message.articleId,
                readyAt.toEpochMilli().toDouble(),
            )
        }.onFailure { error ->
            log.warn("retry_schedule_failed articleId={} reason={}", message.articleId, error.message)
        }
    }

    override fun due(limit: Int, now: Instant): List<RetryEntry> = runCatching {
        val ids = redis.opsForZSet().rangeByScore(
            properties.retryQueueKey,
            0.0,
            now.toEpochMilli().toDouble(),
            0,
            limit.toLong(),
        ) ?: emptySet()
        ids.mapNotNull { articleId ->
            val payload = redis.opsForHash<String, String>().get(retryMessageKey(), articleId)
                ?: return@mapNotNull null
            val message = decode(payload) ?: return@mapNotNull null
            val score = redis.opsForZSet().score(properties.retryQueueKey, articleId) ?: 0.0
            RetryEntry(articleId, Instant.ofEpochMilli(score.toLong()), message)
        }
    }.getOrElse { error ->
        log.warn("retry_due_scan_failed reason={}", error.message)
        emptyList()
    }

    override fun remove(articleId: String) {
        runCatching {
            redis.opsForZSet().remove(properties.retryQueueKey, articleId)
            redis.opsForHash<String, String>().delete(retryMessageKey(), articleId)
        }
    }

    override fun size(): Long =
        runCatching { redis.opsForZSet().size(properties.retryQueueKey) ?: 0L }.getOrDefault(0L)

    // -----------------------------------------------------------------------
    // JSON envelope (file 03 §4: exactly seven fields)
    // -----------------------------------------------------------------------

    private data class Envelope(
        val articleId: String,
        val sourceKey: String,
        val host: String,
        val url: String,
        val jobId: String?,
        val attempt: Int,
        val enqueuedAt: String,
    )

    private fun encode(message: FetchMessage): String? =
        runCatching {
            jsonMapper.writeValueAsString(
                Envelope(
                    articleId = message.articleId,
                    sourceKey = message.sourceKey,
                    host = message.host,
                    url = message.url,
                    jobId = message.jobId,
                    attempt = message.attempt,
                    enqueuedAt = message.enqueuedAt.toString(),
                ),
            )
        }.getOrElse { error ->
            log.warn("fetch_queue_encode_failed articleId={} reason={}", message.articleId, error.message)
            null
        }

    private fun decode(payload: String): FetchMessage? =
        runCatching {
            val envelope = jsonMapper.readValue(payload, Envelope::class.java)
            val enqueuedAt = runCatching { Instant.parse(envelope.enqueuedAt) }.getOrNull()
                ?: return null
            FetchMessage(
                articleId = envelope.articleId,
                sourceKey = envelope.sourceKey,
                host = envelope.host,
                url = envelope.url,
                jobId = envelope.jobId,
                attempt = envelope.attempt,
                enqueuedAt = enqueuedAt,
            )
        }.getOrNull()

    private fun queueKey(host: String): String = "${properties.fetchQueuePrefix}${host.lowercase()}"

    private fun processingKey(host: String): String = "${queueKey(host)}:processing"

    private fun retryMessageKey(): String = "${properties.retryQueueKey}:msg"

    /**
     * Remove the host from `tb:hosts` only when it owns no ready and no in-flight work. The
     * check and the SREM run atomically so a concurrent RPUSH cannot be forgotten (spec 04 §4).
     */
    private fun pruneHost(host: String) {
        runCatching {
            redis.execute(
                pruneHostScript,
                listOf(properties.hostsKey, queueKey(host), processingKey(host)),
                host.lowercase(),
            )
        }.onFailure { error ->
            log.debug("fetch_queue_host_prune_failed host={} reason={}", host, error.message)
        }
    }

    private companion object {
        const val QUEUE_PING_KEY = "tb:queue:ping"

        /** KEYS: tb:hosts, ready list, processing list. ARGV: normalized host. */
        val pruneHostScript: DefaultRedisScript<Long> = DefaultRedisScript(
            """
            if redis.call('LLEN', KEYS[2]) == 0 and redis.call('LLEN', KEYS[3]) == 0 then
              return redis.call('SREM', KEYS[1], ARGV[1])
            end
            return 0
            """.trimIndent(),
            Long::class.java,
        )

        /**
         * KEYS: processing list, ready list, tb:hosts. ARGV: normalized host.
         * RPOPLPUSH moves each unacknowledged claim to the head of the ready list, preserving
         * the order in which it was claimed; the host is re-registered when anything moved.
         */
        val requeueScript: DefaultRedisScript<Long> = DefaultRedisScript(
            """
            local moved = 0
            while true do
              local value = redis.call('RPOPLPUSH', KEYS[1], KEYS[2])
              if not value then break end
              moved = moved + 1
            end
            if moved > 0 then
              redis.call('SADD', KEYS[3], ARGV[1])
            elseif redis.call('LLEN', KEYS[2]) == 0 then
              redis.call('SREM', KEYS[3], ARGV[1])
            end
            return moved
            """.trimIndent(),
            Long::class.java,
        )
    }
}
