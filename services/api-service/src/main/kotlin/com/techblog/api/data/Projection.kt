package com.techblog.api.data

import com.techblog.api.config.ApiProperties
import com.techblog.api.domain.ArticleView
import com.techblog.api.domain.CrawlerGateway
import com.techblog.api.domain.CrawlerProbe
import com.techblog.api.domain.JobView
import com.techblog.api.domain.ProjectionLagTracker
import com.techblog.api.domain.SelfProbe
import com.techblog.api.domain.ServiceHealth
import com.techblog.api.domain.SourceView
import com.techblog.api.observability.ApiMetrics
import org.slf4j.LoggerFactory
import org.slf4j.MDC
import org.springframework.beans.factory.annotation.Qualifier
import org.springframework.boot.context.event.ApplicationReadyEvent
import org.springframework.context.event.EventListener
import org.springframework.data.domain.Range
import org.springframework.data.redis.connection.stream.Consumer
import org.springframework.data.redis.connection.stream.MapRecord
import org.springframework.data.redis.connection.stream.ReadOffset
import org.springframework.data.redis.connection.stream.StreamOffset
import org.springframework.data.redis.connection.stream.StreamReadOptions
import org.springframework.data.redis.core.StringRedisTemplate
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Component
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import org.springframework.web.client.RestClient
import tools.jackson.databind.JsonNode
import tools.jackson.databind.json.JsonMapper
import java.time.Duration
import java.time.Instant

/**
 * Scopes an MDC `code` to one log statement so the frozen JSON field carries the BA 05 code
 * rather than the thread default, then restores the previous value (spec 05 file 01 §2).
 */
internal inline fun <T> withLogCode(code: String, block: () -> T): T {
    val previous = MDC.get("code")
    MDC.put("code", code)
    try {
        return block()
    } finally {
        if (previous == null) MDC.remove("code") else MDC.put("code", previous)
    }
}

/**
 * Applies one `tb:events` record to api_db (spec 06 file 02 §4).
 *
 * The dedupe insert, target upsert, and offset update share one transaction. A duplicate
 * `event_id` returns false and the consumer ACKs without touching the projection.
 */
@Service
class ProjectionService(
    private val jdbc: JdbcTemplate,
    private val sources: JdbcSourceReadModel,
    private val articles: JdbcArticleReadModel,
    private val jobs: JdbcJobReadModel,
    private val jsonMapper: JsonMapper,
    private val tracker: ProjectionLagTracker,
    private val properties: ApiProperties,
    private val metrics: ApiMetrics,
) {
    private val log = LoggerFactory.getLogger(javaClass)

    @Transactional
    fun apply(eventId: String, type: String, occurredAt: Instant, payloadJson: String): Boolean {
        val inserted = jdbc.update(
            """
            INSERT INTO projection_event (event_id, consumer, occurred_at, processed_at)
            VALUES (?, ?, ?, now())
            ON CONFLICT (event_id) DO NOTHING
            """.trimIndent(),
            eventId,
            properties.consumerGroup,
            java.sql.Timestamp.from(occurredAt),
        )
        if (inserted == 0) return false
        metrics.eventConsumed(type)

        val payload = runCatching { jsonMapper.readTree(payloadJson) }.getOrElse { error ->
            metrics.eventFailed(type, "payload")
            log.warn("projection_payload_invalid eventId={} type={} reason={}", eventId, type, error.message)
            return true
        } ?: return true
        when (type) {
            "article.archived" -> archive(payload, occurredAt)
            "article.failed" -> failed(payload, occurredAt)
            "job.updated" -> job(payload, occurredAt)
            "source.stats" -> sourceStats(payload, occurredAt)
            else -> log.debug("projection_event_ignored eventId={} type={}", eventId, type)
        }

        val now = Instant.now()
        val lag = Duration.between(occurredAt, now).seconds.coerceAtLeast(0).toInt()
        jdbc.update(
            """
            UPDATE projection_offset
            SET last_event_id = ?, last_occurred_at = ?, lag_seconds = ?, updated_at = now()
            WHERE consumer = ?
            """.trimIndent(),
            eventId,
            java.sql.Timestamp.from(occurredAt),
            lag,
            properties.consumerGroup,
        )
        tracker.record(occurredAt)
        metrics.projectionLag(lag)
        return true
    }

    private fun archive(payload: JsonNode, occurredAt: Instant) {
        val id = payload.text("articleId") ?: return
        articles.upsert(
            ArticleView(
                id = id,
                sourceKey = payload.text("sourceKey").orEmpty(),
                title = payload.text("title").orEmpty(),
                slug = payload.text("slug").orEmpty(),
                author = payload.text("author"),
                publishedAt = payload.instant("publishedAt"),
                archivedAt = payload.instant("archivedAt") ?: occurredAt,
                status = "archived",
                contentSha256 = payload.text("contentSha256"),
                originalUrl = payload.text("originalUrl"),
                sourceUrl = payload.text("sourceUrl"),
                fetchedAt = payload.instant("fetchedAt"),
                updatedAt = occurredAt,
            ),
        )
    }

    private fun failed(payload: JsonNode, occurredAt: Instant) {
        val id = payload.text("articleId") ?: return
        val existing = articles.findById(id)
        val code = payload.text("code").orEmpty()
        articles.upsert(
            ArticleView(
                id = id,
                sourceKey = payload.text("sourceKey") ?: existing?.sourceKey.orEmpty(),
                title = payload.text("title") ?: existing?.title.orEmpty(),
                slug = existing?.slug.orEmpty(),
                author = existing?.author,
                publishedAt = existing?.publishedAt,
                archivedAt = existing?.archivedAt,
                status = payload.text("status")
                    ?: if (code.startsWith("EXTRACT-") || code == "FETCH-BLOCKED") "needs_review" else "failed",
                contentSha256 = existing?.contentSha256,
                originalUrl = payload.text("originalUrl") ?: existing?.originalUrl,
                sourceUrl = existing?.sourceUrl,
                fetchedAt = existing?.fetchedAt,
                updatedAt = occurredAt,
            ),
        )
    }

    private fun job(payload: JsonNode, occurredAt: Instant) {
        val id = payload.text("jobId") ?: return
        val counters = payload.get("counters")
        jobs.upsert(
            JobView(
                id = id,
                sourceKey = payload.text("sourceKey").orEmpty(),
                jobType = payload.text("jobType") ?: "incremental",
                status = (payload.text("status") ?: "pending").let {
                    // api_db and the frozen UI know the five public statuses; the crawler's
                    // internal `paused` state is an implementation detail (disk guard).
                    if (it == "paused") "running" else it
                },
                requestedAt = payload.instant("requestedAt") ?: occurredAt,
                startedAt = payload.instant("startedAt"),
                finishedAt = payload.instant("finishedAt"),
                discoveredCount = counters?.int("discovered") ?: 0,
                archivedCount = counters?.int("archived") ?: 0,
                skippedCount = counters?.int("skipped") ?: 0,
                failedCount = counters?.int("failed") ?: 0,
                updatedAt = occurredAt,
            ),
        )
    }

    private fun sourceStats(payload: JsonNode, occurredAt: Instant) {
        val key = payload.text("sourceKey") ?: return
        val archived = payload.int("archivedCount") ?: 0
        val failed = payload.int("failedCount") ?: 0
        sources.applyStats(
            sourceKey = key,
            articleCount = payload.int("articleCount") ?: (archived + failed),
            archivedCount = archived,
            failedCount = failed,
            lastSuccessAt = payload.instant("lastSuccessAt"),
            health = payload.text("health") ?: "fresh",
            occurredAt = occurredAt,
        )
    }

    private fun JsonNode.text(field: String): String? =
        get(field)?.takeUnless { it.isNull }?.asText()?.takeIf { it.isNotBlank() }

    private fun JsonNode.int(field: String): Int? =
        get(field)?.takeUnless { it.isNull }?.asInt()

    private fun JsonNode.instant(field: String): Instant? =
        text(field)?.let { runCatching { Instant.parse(it) }.getOrNull() }
}

/**
 * Polling consumer for `tb:events` (spec 06 file 01 §4).
 *
 * - XREADGROUP with `>` and a 2 s block, at most 100 records per poll.
 * - XACK only after the projection transaction commits.
 * - XAUTOCLAIM semantics every 30 s for messages idle >60 s (Spring Data Redis exposes
 *   `pending` + `claim`, not the XAUTOCLAIM command directly).
 * - A failed apply stops the batch without ACK, preserving order; the message is redelivered.
 * - Unknown `type` or `version != 1` is logged at WARN with the event id, ACKed, and skipped.
 */
@Component
class ProjectionConsumer(
    private val redis: StringRedisTemplate,
    private val properties: ApiProperties,
    private val projection: ProjectionService,
    private val metrics: ApiMetrics,
) {
    private val log = LoggerFactory.getLogger(javaClass)

    @Scheduled(fixedDelayString = "500")
    fun poll() {
        val records = try {
            redis.opsForStream<String, String>().read(
                Consumer.from(properties.consumerGroup, properties.consumerName),
                StreamReadOptions.empty().count(BATCH).block(Duration.ofSeconds(2)),
                StreamOffset.create(properties.eventStream, ReadOffset.lastConsumed()),
            )
        } catch (error: Exception) {
            val message = error.message.orEmpty()
            if (message.contains("NOGROUP", ignoreCase = true)) {
                ensureGroup()
            } else if (!message.contains("no such key", ignoreCase = true)) {
                log.warn("projection_read_failed reason={}", message)
            }
            return
        }

        applyInOrder(records.orEmpty())
    }

    /**
     * XAUTOCLAIM replacement: list pending ids idle ≥60 s and claim them for this consumer.
     * `pending` is a read-only scan; `claim` is XCLAIM under the hood.
     */
    @Scheduled(fixedDelayString = "30000")
    fun autoclaimPending() {
        val ops = redis.opsForStream<String, String>()
        val pending = try {
            ops.pending(
                properties.eventStream,
                properties.consumerGroup,
                Range.unbounded<String>(),
                AUTOCLAIM_BATCH,
                AUTOCLAIM_MIN_IDLE,
            )
        } catch (error: Exception) {
            val message = error.message.orEmpty()
            if (message.contains("NOGROUP", ignoreCase = true)) {
                ensureGroup()
            }
            return
        }
        val ids = pending.mapNotNull { it.id }.toTypedArray()
        if (ids.isEmpty()) return
        val claimed = try {
            ops.claim(
                properties.eventStream,
                properties.consumerGroup,
                properties.consumerName,
                AUTOCLAIM_MIN_IDLE,
                *ids,
            )
        } catch (error: Exception) {
            log.warn("projection_autoclaim_failed count={} reason={}", ids.size, error.message)
            return
        }
        applyInOrder(claimed.orEmpty())
    }

    private fun applyInOrder(records: List<MapRecord<String, String, String>>) {
        for (record in records) {
            // Stop, do not ACK: the next loop retries the same record first, preserving order.
            if (!apply(record)) return
        }
    }

    /** @return true when the record may be followed by the next one (ACKed or skipped). */
    private fun apply(record: MapRecord<String, String, String>): Boolean {
        val value = record.value
        val eventId = value["eventId"] ?: run {
            metrics.eventFailed(value["type"].orEmpty(), "missing_event_id")
            log.warn("projection_missing_event_id recordId={}", record.id)
            ack(record)
            return true
        }
        val type = value["type"].orEmpty()
        val version = value["version"] ?: "1"

        if (version != EVENT_VERSION || type !in KNOWN_TYPES) {
            metrics.eventFailed(type, "unsupported")
            log.warn(
                "projection_event_skipped eventId={} type={} version={}",
                eventId,
                type,
                version,
            )
            ack(record)
            return true
        }

        val occurredAt = value["occurredAt"]?.let { runCatching { Instant.parse(it) }.getOrNull() }
            ?: Instant.now()
        val payload = value["payload"].orEmpty()

        return try {
            projection.apply(eventId, type, occurredAt, payload)
            ack(record)
            true
        } catch (error: Exception) {
            metrics.eventFailed(type, "apply")
            log.warn("projection_apply_failed eventId={} type={} reason={}", eventId, type, error.message)
            false
        }
    }

    private fun ack(record: MapRecord<String, String, String>) {
        runCatching {
            redis.opsForStream<String, String>()
                .acknowledge(properties.eventStream, properties.consumerGroup, record.id)
        }.onFailure { log.warn("projection_ack_failed recordId={} reason={}", record.id, it.message) }
    }

    private fun ensureGroup() {
        runCatching {
            redis.opsForStream<String, String>().createGroup(
                properties.eventStream,
                ReadOffset.from("0"),
                properties.consumerGroup,
            )
        }.onFailure { error ->
            val message = error.message.orEmpty()
            if (!message.contains("BUSYGROUP", ignoreCase = true) &&
                !message.contains("no such key", ignoreCase = true)
            ) {
                log.warn("projection_group_failed reason={}", message)
            }
        }
    }

    private companion object {
        const val BATCH = 100L
        const val AUTOCLAIM_BATCH = 100L
        const val EVENT_VERSION = "1"
        val AUTOCLAIM_MIN_IDLE: Duration = Duration.ofSeconds(60)
        val KNOWN_TYPES = setOf("article.archived", "article.failed", "job.updated", "source.stats")
    }
}

/** Own-service readiness probe (api_db + Redis only; crawler reachability is an ops field). */
@Component
class SelfProbeImpl(
    private val jdbc: JdbcTemplate,
    private val redis: StringRedisTemplate,
    private val tracker: ProjectionLagTracker,
    private val properties: ApiProperties,
) : SelfProbe {
    override fun probe(): ServiceHealth {
        val now = Instant.now()
        val dbUp = runCatching { jdbc.queryForObject("SELECT 1", Int::class.java) == 1 }.getOrDefault(false)
        val redisUp = runCatching { redis.execute { it.ping() } == "PONG" }.getOrDefault(false)
        val details = listOf(
            "api_db: ${if (dbUp) "UP" else "DOWN"}",
            "redis: ${if (redisUp) "UP" else "DOWN"}",
            "consumer: ${properties.consumerGroup}, lag ${tracker.lagSeconds()} s",
        )
        return ServiceHealth(
            service = "api-service",
            status = if (dbUp && redisUp) "UP" else "DOWN",
            checkedAt = now,
            details = details,
        )
    }
}

/** Crawler liveness probe for the ops summary; never part of readiness. */
@Component
class CrawlerProbeImpl(
    @Qualifier("crawlerCommandClient") private val command: RestClient,
) : CrawlerProbe {
    private val log = LoggerFactory.getLogger(javaClass)

    override fun probe(): ServiceHealth {
        val started = System.nanoTime()
        val now = Instant.now()
        return try {
            command.get()
                .uri("/health/liveness")
                .retrieve()
                .toBodilessEntity()
            val elapsed = (System.nanoTime() - started) / 1_000_000
            ServiceHealth(
                service = "crawler-service",
                status = "UP",
                checkedAt = now,
                details = listOf("internal-api: UP ${elapsed} ms"),
            )
        } catch (error: Exception) {
            log.debug("crawler_probe_down reason={}", error.message)
            ServiceHealth(
                service = "crawler-service",
                status = "DOWN",
                checkedAt = now,
                details = listOf("internal-api: DOWN"),
            )
        }
    }
}

/**
 * Boot-time and operator-triggered reconciliation (spec 06 file 01 §4). There is no timer:
 * the stream is best-effort, so a full pass runs once at boot and whenever an operator asks.
 *
 * Per source it compares the crawler registry counters and the archived article snapshot
 * (`id -> content_sha256`) with api_db, re-upserts drift, and logs ERROR with the source key and
 * counts. Every pass also prunes the seven-day projection dedupe table. The 30 s lag alert is a
 * separate read-only task.
 */
@Component
class ReconciliationService(
    private val gateway: CrawlerGateway,
    private val sources: JdbcSourceReadModel,
    private val articles: JdbcArticleReadModel,
    private val jdbc: JdbcTemplate,
    private val tracker: ProjectionLagTracker,
    private val metrics: ApiMetrics,
) {
    private val log = LoggerFactory.getLogger(javaClass)
    private var lagSince: Instant? = null
    private var lagLogged = false
    private var lastLagWarnAt: Instant? = null

    @EventListener(ApplicationReadyEvent::class)
    fun onReady() {
        reconcile()
    }

    /** Lag alerting stays frequent; this task never repairs anything. */
    @Scheduled(fixedDelayString = "\${api.projection-lag-check-ms:30000}")
    fun checkLag() {
        checkProjectionLag(Instant.now())
    }

    /** Full pass: boot + operator demand. Returns counters for the ops response. */
    fun reconcile(): ReconcileResult {
        val now = Instant.now()
        var sourcesChecked = 0
        var sourceDrift = 0
        var articlesChecked = 0
        var articleDrift = 0
        var repaired = 0

        // Dedupe retention runs even when the crawler is unreachable (spec 06 file 01 §4).
        runCatching {
            jdbc.update("DELETE FROM projection_event WHERE processed_at < now() - INTERVAL '7 days'")
        }.onFailure { log.warn("projection_prune_failed reason={}", it.message) }

        val registry = try {
            gateway.sourceRegistry()
        } catch (error: Exception) {
            log.warn("reconcile_skipped reason={}", error.message)
            return ReconcileResult(0, 0, 0, 0, 0, error.message)
        }

        for (source in registry) {
            sourcesChecked++
            val previous = sources.findByKey(source.sourceKey)
            val archived = if (source.articleCount > 0) {
                source.articleCount
            } else {
                source.archivedCount + source.failedCount
            }
            if (previous != null &&
                (previous.archivedCount != source.archivedCount ||
                    previous.failedCount != source.failedCount)
            ) {
                sourceDrift++
                withLogCode("OPS-RECONCILE-DRIFT") {
                    log.error(
                        "reconcile_source_drift source={} apiArchived={} crawlerArchived={} " +
                            "apiFailed={} crawlerFailed={}",
                        source.sourceKey,
                        previous.archivedCount,
                        source.archivedCount,
                        previous.failedCount,
                        source.failedCount,
                    )
                }
            }
            sources.upsert(
                SourceView(
                    key = source.sourceKey,
                    name = source.name,
                    enabled = source.enabled,
                    discoveryType = source.discoveryType,
                    articleCount = archived,
                    archivedCount = source.archivedCount,
                    failedCount = source.failedCount,
                    lastSuccessAt = source.lastSuccessAt,
                    health = sourceHealth(source.enabled, source.consecutiveDiscoveryFailures, source.lastSuccessAt),
                    updatedAt = now,
                ),
            )

            val remote = try {
                gateway.archivedArticleSnapshot(source.sourceKey)
            } catch (error: Exception) {
                log.warn(
                    "reconcile_snapshot_skipped source={} reason={}",
                    source.sourceKey,
                    error.message,
                )
                continue
            }
            val local = jdbc.queryForList(
                """
                SELECT id, content_sha256 FROM article_index
                WHERE source_key = ? AND status = 'archived'
                """.trimIndent(),
                source.sourceKey,
            ).associate { row ->
                (row["id"] as String) to (row["content_sha256"] as String?)
            }

            articlesChecked += remote.size
            val missing = remote.keys - local.keys
            val mismatched = remote.filter { (id, sha) -> local.containsKey(id) && local[id] != sha }.keys
            val extra = local.keys - remote.keys
            if (missing.isNotEmpty() || mismatched.isNotEmpty() || extra.isNotEmpty()) {
                articleDrift += missing.size + mismatched.size + extra.size
                withLogCode("OPS-RECONCILE-DRIFT") {
                    log.error(
                        "reconcile_article_drift source={} missing={} shaMismatch={} extra={}",
                        source.sourceKey,
                        missing.size,
                        mismatched.size,
                        extra.size,
                    )
                }
                for (articleId in missing + mismatched) {
                    val article = runCatching { gateway.article(articleId) }.getOrNull() ?: continue
                    articles.upsert(
                        ArticleView(
                            id = article.articleId,
                            sourceKey = source.sourceKey,
                            title = article.title.orEmpty(),
                            slug = article.slug.orEmpty(),
                            author = article.author,
                            publishedAt = article.publishedAt,
                            archivedAt = article.archivedAt,
                            status = article.status,
                            contentSha256 = article.contentSha256,
                            originalUrl = article.originalUrl,
                            sourceUrl = null,
                            fetchedAt = article.fetchedAt,
                            updatedAt = Instant.now(),
                        ),
                    )
                    repaired++
                }
            }
        }

        metrics.projectionLag(tracker.lagSeconds(Instant.now()))
        return ReconcileResult(
            sourcesChecked = sourcesChecked,
            sourceDrift = sourceDrift,
            articlesChecked = articlesChecked,
            articleDrift = articleDrift,
            repaired = repaired,
            error = null,
        )
    }

    private fun sourceHealth(
        enabled: Boolean,
        consecutiveDiscoveryFailures: Int,
        lastSuccessAt: Instant?,
    ): String = when {
        !enabled -> "broken"
        consecutiveDiscoveryFailures >= 5 -> "broken"
        // Only feed discovery is scheduled; the other sources stay fresh until crawled again.
        lastSuccessAt == null -> "stale"
        else -> "fresh"
    }

    private fun checkProjectionLag(now: Instant) {
        val lag = tracker.lagSeconds(now)
        metrics.projectionLag(lag)
        if (lag <= PROJECTION_LAG_WARN_SECONDS) {
            lagSince = null
            lagLogged = false
            lastLagWarnAt = null
            return
        }
        withLogCode("OPS-PROJECTION-LAG") {
            val lastWarn = lastLagWarnAt
            if (lastWarn == null || Duration.between(lastWarn, now).seconds >= 600) {
                lastLagWarnAt = now
                log.warn("projection_lag_high lagSeconds={}", lag)
            }
        }
        val since = lagSince ?: now.also { lagSince = it }
        if (!lagLogged && Duration.between(since, now) > PROJECTION_LAG_ALERT_AFTER) {
            withLogCode("OPS-PROJECTION-LAG") {
                log.error(
                    "projection_lag_critical lagSeconds={} lagSince={} thresholdSeconds={}",
                    lag,
                    since,
                    PROJECTION_LAG_ALERT_AFTER.seconds,
                )
            }
            lagLogged = true
        }
    }

    private companion object {
        const val PROJECTION_LAG_WARN_SECONDS = 30
        val PROJECTION_LAG_ALERT_AFTER: Duration = Duration.ofMinutes(10)
    }
}

/** Counters returned by `POST /internal/v1/reconcile` (operator action). */
data class ReconcileResult(
    val sourcesChecked: Int,
    val sourceDrift: Int,
    val articlesChecked: Int,
    val articleDrift: Int,
    val repaired: Int,
    val error: String?,
)
