package com.techblog.crawler.discovery

import org.slf4j.LoggerFactory
import org.springframework.data.redis.core.StringRedisTemplate
import org.springframework.stereotype.Component
import java.time.Duration
import java.util.UUID

/**
 * Redis `SET NX` run lock (spec 01 file 01 §4 step 2). A Redis outage is treated as
 * "lock unavailable" and the single-node worker proceeds; the durable job lease remains the
 * source of truth for crash recovery.
 */
@Component
class DiscoveryRunLock(
    private val redis: StringRedisTemplate,
) {
    private val log = LoggerFactory.getLogger(javaClass)

    fun tryAcquire(sourceKey: String, ttl: Duration): String? {
        val token = UUID.randomUUID().toString()
        val acquired = redis.opsForValue().setIfAbsent(key(sourceKey), token, ttl) ?: false
        return if (acquired) token else null
    }

    fun release(sourceKey: String, token: String) {
        runCatching {
            if (redis.opsForValue().get(key(sourceKey)) == token) {
                redis.delete(key(sourceKey))
            }
        }.onFailure { log.warn("discovery_lock_release_failed source={} reason={}", sourceKey, it.message) }
    }

    /**
     * Returns `true` when the lock is held by another run, `false` when Redis is unreachable.
     * The caller keeps the returned token when it acquired the lock.
     */
    fun acquireOrNull(sourceKey: String, ttl: Duration): LockResult = try {
        val token = tryAcquire(sourceKey, ttl)
        if (token == null) LockResult.Busy else LockResult.Acquired(token)
    } catch (error: Exception) {
        log.warn("discovery_lock_unavailable source={} reason={}", sourceKey, error.message)
        LockResult.Unavailable
    }

    sealed interface LockResult {
        data class Acquired(val token: String) : LockResult
        data object Busy : LockResult
        data object Unavailable : LockResult
    }

    private fun key(sourceKey: String): String = "tb:lock:discovery:$sourceKey"
}
