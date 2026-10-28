package com.techblog.crawler.data

import com.techblog.crawler.config.CrawlerProperties
import com.techblog.crawler.domain.ArchiveStore
import com.techblog.crawler.domain.EventPublisher
import com.techblog.crawler.domain.Ids
import com.techblog.crawler.observability.CrawlerMetrics
import org.slf4j.LoggerFactory
import org.springframework.data.redis.core.StringRedisTemplate
import org.springframework.stereotype.Component
import tools.jackson.databind.json.JsonMapper
import java.nio.charset.StandardCharsets
import java.nio.file.AtomicMoveNotSupportedException
import java.nio.file.Files
import java.nio.file.Path
import java.nio.file.StandardCopyOption
import java.nio.file.StandardOpenOption
import java.time.Instant

/**
 * Local-disk archive adapter (baseline 05 §2, BR-09): `uploads/crawl/<source>/<slug>/`.
 * Every file is written to a sibling temporary file and renamed in one atomic move; a crash
 * therefore leaves either the old complete file or no file, never a partial one.
 */
@Component
class FileArchiveStore(
    private val properties: CrawlerProperties,
    private val jsonMapper: JsonMapper,
) : ArchiveStore {

    private val log = LoggerFactory.getLogger(javaClass)
    private val root: Path = Path.of(properties.archiveRoot).toAbsolutePath().normalize()
    private val tmpRoot: Path = Path.of(properties.tmpDir).toAbsolutePath().normalize()

    override fun writeArticle(
        sourceKey: String,
        slug: String,
        markdown: String,
        meta: Map<String, Any?>,
    ) {
        val directory = articleDirectory(sourceKey, slug)
        Files.createDirectories(directory)
        // AC-01: every archived article has content.md, meta.json and an assets/ directory,
        // even when the article has no images.
        Files.createDirectories(directory.resolve("assets"))
        atomicWrite(directory.resolve("content.md"), markdown.toByteArray(StandardCharsets.UTF_8))
        atomicWrite(
            directory.resolve("meta.json"),
            jsonMapper.writeValueAsString(meta).toByteArray(StandardCharsets.UTF_8),
        )
        log.info("archive_written source={} slug={} bytes={}", sourceKey, slug, markdown.toByteArray().size)
    }

    override fun writeAsset(sourceKey: String, slug: String, fileName: String, bytes: ByteArray) {
        require(FILE.matches(fileName)) { "Invalid asset file name." }
        val directory = articleDirectory(sourceKey, slug).resolve("assets")
        Files.createDirectories(directory)
        atomicWrite(directory.resolve(fileName), bytes)
    }

    override fun pruneAssets(sourceKey: String, slug: String, keep: Set<String>) {
        val directory = articleDirectory(sourceKey, slug).resolve("assets")
        if (!Files.isDirectory(directory)) return
        val stale = Files.newDirectoryStream(directory).use { entries ->
            entries.filter { path ->
                Files.isRegularFile(path) && path.fileName.toString() !in keep
            }
        }
        stale.forEach { Files.deleteIfExists(it) }
    }

    override fun readContent(sourceKey: String, slug: String): ByteArray? =
        read(articleDirectory(sourceKey, slug).resolve("content.md"))

    override fun readAsset(sourceKey: String, slug: String, fileName: String): ByteArray? {
        if (!FILE.matches(fileName)) return null
        return read(articleDirectory(sourceKey, slug).resolve("assets").resolve(fileName))
    }

    override fun freeBytes(): Long {
        if (!Files.exists(root)) Files.createDirectories(root)
        return Files.getFileStore(root).usableSpace
    }

    private fun articleDirectory(sourceKey: String, slug: String): Path {
        require(SEGMENT.matches(sourceKey)) { "Invalid source key." }
        require(SEGMENT.matches(slug)) { "Invalid slug." }
        val directory = root.resolve(sourceKey).resolve(slug).normalize()
        if (!directory.startsWith(root)) throw IllegalArgumentException("Archive path escapes root.")
        return directory
    }

    private fun read(path: Path): ByteArray? =
        if (Files.isRegularFile(path)) Files.readAllBytes(path) else null

    private fun atomicWrite(target: Path, bytes: ByteArray) {
        Files.createDirectories(tmpRoot)
        val temporary = Files.createTempFile(tmpRoot, ".tb-", ".part")
        try {
            Files.write(
                temporary,
                bytes,
                StandardOpenOption.TRUNCATE_EXISTING,
                StandardOpenOption.WRITE,
            )
            try {
                Files.move(
                    temporary,
                    target,
                    StandardCopyOption.REPLACE_EXISTING,
                    StandardCopyOption.ATOMIC_MOVE,
                )
            } catch (_: AtomicMoveNotSupportedException) {
                Files.move(temporary, target, StandardCopyOption.REPLACE_EXISTING)
            }
        } finally {
            Files.deleteIfExists(temporary)
        }
    }

    private companion object {
        val SEGMENT = Regex("^[a-z0-9][a-z0-9-]{0,79}$")
        val FILE = Regex("^[A-Za-z0-9][A-Za-z0-9._-]{0,127}$")
    }
}

/**
 * Redis Streams producer for `tb:events` (spec 04 file 03 §3). Fields are flat so a consumer
 * can read the envelope without a nested JSON parser: eventId, type, occurredAt, version,
 * payload. `MAXLEN ~ 10000` keeps the stream bounded; delivery is at-least-once.
 */
@Component
class RedisEventPublisher(
    private val redis: StringRedisTemplate,
    private val jsonMapper: JsonMapper,
    private val properties: CrawlerProperties,
    private val metrics: CrawlerMetrics,
) : EventPublisher {

    private val log = LoggerFactory.getLogger(javaClass)

    override fun publish(type: String, payload: Map<String, Any?>) {
        val fields = linkedMapOf(
            "eventId" to Ids.uuid7(),
            "type" to type,
            "occurredAt" to Instant.now().toString(),
            "version" to "1",
            "payload" to jsonMapper.writeValueAsString(payload),
        )
        try {
            redis.opsForStream<String, String>().add(properties.eventStream, fields)
            metrics.eventPublished(type)
        } catch (error: Exception) {
            // Redis is best-effort here: the archive and crawler_db already moved, so a publish
            // failure must never fail the article or the job. Reconciliation repairs api_db.
            log.error("event_publish_failed type={} reason={}", type, error.message)
        }
    }
}
