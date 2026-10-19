package com.kotonosora.techblog.crawler.pipeline

import com.kotonosora.techblog.crawler.config.CrawlerProperties
import com.kotonosora.techblog.crawler.domain.Article
import com.kotonosora.techblog.crawler.domain.ArchiveStore
import com.kotonosora.techblog.crawler.domain.ArticleRepository
import com.kotonosora.techblog.crawler.domain.ConditionalGetStore
import com.kotonosora.techblog.crawler.domain.EventPublisher
import com.kotonosora.techblog.crawler.domain.Extraction
import com.kotonosora.techblog.crawler.domain.FetchLogEntry
import com.kotonosora.techblog.crawler.domain.FetchLogRepository
import com.kotonosora.techblog.crawler.domain.FetchOutcome
import com.kotonosora.techblog.crawler.domain.FetchPort
import com.kotonosora.techblog.crawler.domain.FetchResult
import com.kotonosora.techblog.crawler.domain.HostGate
import com.kotonosora.techblog.crawler.domain.OutcomeMapper
import com.kotonosora.techblog.crawler.domain.RetryPolicy
import com.kotonosora.techblog.crawler.domain.RevisionRepository
import com.kotonosora.techblog.crawler.domain.RobotsGate
import com.kotonosora.techblog.crawler.domain.Source
import com.kotonosora.techblog.crawler.domain.Urls
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Service
import java.net.URI
import java.time.Instant
import java.time.temporal.ChronoUnit

/**
 * One article through the pipeline (spec 02 file 03 §5, spec 03):
 * robots → conditional GET → outcome mapping → extraction → asset localisation → atomic
 * archive write → DB update → `article.archived` / `article.failed`.
 *
 * The DB row is updated only after the archive write succeeds; a crash before the write leaves
 * the article `processing` and the boot reclaim re-drives it (baseline 05 §2).
 */
@Service
class ArticleProcessor(
    private val properties: CrawlerProperties,
    private val articles: ArticleRepository,
    private val revisions: RevisionRepository,
    private val archive: ArchiveStore,
    private val fetcher: FetchPort,
    private val robots: RobotsGate,
    private val hostGate: HostGate,
    private val conditionalGet: ConditionalGetStore,
    private val fetchLog: FetchLogRepository,
    private val events: EventPublisher,
) {
    private val log = LoggerFactory.getLogger(javaClass)

    sealed interface Result {
        data class Archived(val article: Article) : Result
        data class Skipped(val article: Article, val reason: String) : Result
        data class Failed(val article: Article, val code: String, val reason: String, val retryScheduled: Boolean) : Result
        data class NeedsReview(val article: Article, val code: String, val reason: String) : Result
    }

    fun process(articleId: String, source: Source, jobId: String?): Result? {
        val claimed = articles.claim(articleId, jobId) ?: return null
        return processClaimed(claimed, source, jobId)
    }

    fun processClaimed(article: Article, source: Source, jobId: String?): Result {
        val host = Urls.host(article.canonicalUrl)
        val userAgent = userAgent()

        // 1. robots.txt: a denial is a recorded skip, never a request.
        val decision = robots.check(article.canonicalUrl, userAgent)
        if (!decision.allowed) {
            fetchLog.record(
                FetchLogEntry(
                    articleId = article.id,
                    jobId = jobId,
                    host = host,
                    url = article.canonicalUrl,
                    method = "GET",
                    statusCode = null,
                    outcome = FetchOutcome.ROBOTS_DENIED.wire,
                    durationMs = 0,
                    bytes = null,
                    attempt = article.attemptCount,
                ),
            )
            val skipped = articles.updateRow(article, "skipped", "DISC-ROBOTS-DENIED", decision.reason)
            return Result.Skipped(skipped, decision.reason ?: "robots.txt disallows the URL.")
        }

        // 2. Conditional GET with validators; a 304 on an archived copy is a no-op skip.
        val validators = conditionalGet.find(article.canonicalUrl)
        var result = fetchArticle(article.canonicalUrl, host, userAgent, validators)
        if (result.outcome == FetchOutcome.NOT_MODIFIED) {
            if (article.status == "archived" && article.contentSha256 != null) {
                val skipped = articles.updateRow(article, "skipped", null, null)
                return Result.Skipped(skipped, "304 Not Modified; archived copy kept.")
            }
            // Guard re-GET: no archived copy yet, so a 304 cannot be trusted (spec 02 §5).
            result = fetchArticle(article.canonicalUrl, host, userAgent, null)
        }

        fetchLog.record(
            FetchLogEntry(
                articleId = article.id,
                jobId = jobId,
                host = host,
                url = article.canonicalUrl,
                method = "GET",
                statusCode = result.statusCode,
                outcome = result.outcome.wire,
                durationMs = result.durationMs,
                bytes = result.bytes,
                attempt = article.attemptCount,
            ),
        )
        if (result.ok) {
            conditionalGet.save(article.canonicalUrl, result.etag, result.lastModified, result.statusCode ?: 200)
        }

        if (!result.ok) {
            return handleFailure(article, source, jobId, result)
        }

        // 3. Extraction.
        val html = result.body?.toString(Charsets.UTF_8).orEmpty()
        val extracted = runCatching { Extraction.extract(html, article.canonicalUrl) }.getOrElse { error ->
            log.warn("extract_failed articleId={} reason={}", article.id, error.message)
            val failed = articles.updateRow(
                article,
                "needs_review",
                "EXTRACT-PARSE-FAILED",
                "Extraction failed: ${error.message}",
            )
            emitFailed(failed, source, "EXTRACT-PARSE-FAILED", "Extraction failed.")
            return Result.NeedsReview(failed, "EXTRACT-PARSE-FAILED", "Extraction failed.")
        }

        val body = extracted.markdown.trim()
        if (body.length < properties.minContentChars) {
            val reason = "Extracted ${body.length} characters (<${properties.minContentChars}); no file written."
            val review = articles.updateRow(article, "needs_review", "EXTRACT-EMPTY-CONTENT", reason)
            emitFailed(review, source, "EXTRACT-EMPTY-CONTENT", reason)
            return Result.NeedsReview(review, "EXTRACT-EMPTY-CONTENT", reason)
        }

        // 4. Slug: identity never moves; a slug collision gets a stable suffix.
        val slug = resolveSlug(article, source, extracted.title)
        if (!SLUG.matches(slug)) {
            val reason = "Slug '$slug' does not match ${SLUG.pattern}; no file written."
            val review = articles.updateRow(article, "needs_review", "STORE-INVALID-SLUG", reason)
            emitFailed(review, source, "STORE-INVALID-SLUG", reason)
            return Result.NeedsReview(review, "STORE-INVALID-SLUG", reason)
        }

        // 5. Assets: download, dedupe, rewrite to assets/<file>.
        val localised = localiseAssets(body, extracted.images, source, slug)
        val markdown = composeMarkdown(extracted, localised.markdown, source, article.canonicalUrl)
        val bytes = markdown.toByteArray(Charsets.UTF_8)
        if (bytes.size > MAX_CONTENT_BYTES) {
            val reason = "Markdown is ${bytes.size} bytes (>${MAX_CONTENT_BYTES}); no file written."
            val review = articles.updateRow(article, "needs_review", "EXTRACT-EMPTY-CONTENT", reason)
            emitFailed(review, source, "EXTRACT-EMPTY-CONTENT", reason)
            return Result.NeedsReview(review, "EXTRACT-EMPTY-CONTENT", reason)
        }
        val sha = Extraction.sha256(bytes)
        val now = Instant.now()

        // 6. Disk guard before writing (STORE-DISK-FULL pauses the job).
        if (archive.freeBytes() < properties.minFreeBytes) {
            throw DiskFull("Archive volume has less than ${properties.minFreeBytes} bytes free.")
        }

        // 7. Revision append on sha change, then the atomic write.
        val previous = article.contentSha256
        if (previous != null && previous != sha && article.archivedAt != null) {
            revisions.append(article.id, previous)
        }
        archive.writeArticle(
            sourceKey = source.key,
            slug = slug,
            markdown = markdown,
            meta = meta(article, source, slug, sha, extracted, now, localised.assets),
        )

        val archived = article.copy(
            title = extracted.title.ifBlank { article.title ?: slug },
            author = extracted.author ?: article.author,
            slug = slug,
            publishedAt = extracted.publishedAt ?: article.publishedAt,
            fetchedAt = now,
            archivedAt = now,
            contentSha256 = sha,
            wordCount = extracted.wordCount,
            status = "archived",
            failureCode = null,
            failureReason = null,
            nextAttemptAt = null,
        )
        articles.update(archived)
        events.publish(
            "article.archived",
            mapOf(
                "articleId" to archived.id,
                "sourceKey" to source.key,
                "slug" to slug,
                "contentSha256" to sha,
                "wordCount" to extracted.wordCount,
                "archivedAt" to now.toString(),
                "title" to archived.title,
                "author" to archived.author,
                "publishedAt" to archived.publishedAt?.toString(),
                "originalUrl" to (archived.originalUrl ?: archived.canonicalUrl),
                "sourceUrl" to source.discoveryUrl,
                "fetchedAt" to now.toString(),
            ),
        )
        log.info(
            "article_archived articleId={} source={} slug={} words={} assets={}",
            archived.id,
            source.key,
            slug,
            extracted.wordCount,
            localised.assets.size,
        )
        return Result.Archived(archived)
    }

    // -----------------------------------------------------------------------
    // Failure handling and retry scheduling
    // -----------------------------------------------------------------------

    private fun handleFailure(article: Article, source: Source, jobId: String?, result: FetchResult): Result {
        val code = result.failureCode ?: "FETCH-HTTP-TERMINAL"
        val reason = result.failureReason ?: "Fetch failed."

        // Spec 02 file 05 §3: 410 Gone is terminal but the article is recorded as skipped, not
        // failed — the URL is legitimately gone, not a crawl error.
        if (result.statusCode == 410) {
            val skipped = articles.updateRow(article, "skipped", code, reason)
            return Result.Skipped(skipped, reason)
        }

        val terminalStatuses = setOf(FetchOutcome.TOO_LARGE, FetchOutcome.BLOCKED)
        val neverRetry = terminalStatuses.contains(result.outcome) ||
            code == "FETCH-HTTP-TERMINAL" ||
            code == "DISC-ROBOTS-DENIED"

        val attemptsExhausted = article.attemptCount >= properties.retryBackoffSeconds.size
        if (neverRetry || attemptsExhausted) {
            val finalCode = when {
                attemptsExhausted && !neverRetry -> "FETCH-BACKOFF-EXHAUSTED"
                else -> code
            }
            val finalStatus = if (result.outcome == FetchOutcome.BLOCKED) "needs_review" else "failed"
            val failed = articles.updateRow(article, finalStatus, finalCode, reason)
            emitFailed(failed, source, finalCode, reason)
            return Result.Failed(failed, finalCode, reason, retryScheduled = false)
        }

        val next = RetryPolicy.nextAttempt(
            attemptCount = article.attemptCount - 1,
            backoffSeconds = properties.retryBackoffSeconds,
            retryAfterSeconds = result.retryAfterSeconds,
        )
        val queued = article.copy(
            status = "queued",
            failureCode = code,
            failureReason = reason,
            nextAttemptAt = next,
        )
        articles.update(queued)
        log.info(
            "article_retry_scheduled articleId={} attempt={} nextAttemptAt={} code={}",
            article.id,
            article.attemptCount,
            next,
            code,
        )
        return Result.Failed(queued, code, reason, retryScheduled = next != null)
    }

    private fun fetchArticle(
        url: String,
        host: String,
        userAgent: String,
        validators: com.kotonosora.techblog.crawler.domain.ConditionalValidators?,
    ): FetchResult = hostGate.withPermit(host, delayFor(host)) {
        fetcher.get(
            url = url,
            userAgent = userAgent,
            accept = "text/html,application/xhtml+xml;q=0.9,*/*;q=0.8",
            validators = validators,
            maxBytes = properties.maxHtmlBytes,
            timeoutMs = properties.readTimeoutMs,
        )
    }

    // -----------------------------------------------------------------------
    // Assets
    // -----------------------------------------------------------------------

    private data class Localised(val markdown: String, val assets: List<Map<String, Any?>>)

    /**
     * Downloads each image once (sha256 dedupe), names it `img-<nnn>-<8hex>.<ext>`, and rewrites
     * every reference to `assets/<file>` (BR-10, AC-14). Images that cannot be fetched are
     * dropped from the Markdown and logged as EXTRACT-ASSET-SKIPPED — 0 remote references remain.
     */
    private fun localiseAssets(
        markdown: String,
        images: List<String>,
        source: Source,
        slug: String,
    ): Localised {
        if (images.isEmpty()) return Localised(markdown, emptyList())

        val byHash = LinkedHashMap<String, Map<String, Any?>>()
        val byUrl = LinkedHashMap<String, String>()
        var totalBytes = 0L
        var index = 0
        var limitHit = false

        for (url in images) {
            if (byUrl.containsKey(url)) continue
            if (byHash.size >= properties.maxAssets || totalBytes >= properties.maxAssetBytes) {
                limitHit = true
                break
            }
            val host = Urls.host(url)
            if (host.isBlank() || url.startsWith("data:") || url.lowercase().endsWith(".svg")) {
                log.info("extract_asset_skipped url={} reason=unsupported", url)
                continue
            }
            val fetched = runCatching {
                hostGate.withPermit(host, delayFor(host)) {
                    fetcher.get(
                        url = url,
                        userAgent = userAgent(),
                        accept = "image/*",
                        validators = null,
                        maxBytes = MAX_IMAGE_BYTES,
                        timeoutMs = properties.readTimeoutMs,
                    )
                }
            }.getOrNull()

            if (fetched?.ok != true || fetched.body == null) {
                log.info("extract_asset_skipped url={} reason={}", url, fetched?.failureCode ?: "fetch failed")
                continue
            }
            val bytes = fetched.body
            if (totalBytes + bytes.size > properties.maxAssetBytes) {
                limitHit = true
                break
            }
            val sha = Extraction.sha256(bytes)
            val existing = byHash[sha]
            if (existing != null) {
                byUrl[url] = existing["file"] as String
                continue
            }
            val extension = extensionFor(fetched.contentType, url)
            index += 1
            val file = "img-%03d-%s.%s".format(index, sha.take(8), extension)
            try {
                archive.writeAsset(source.key, slug, file, bytes)
            } catch (error: Exception) {
                log.warn("extract_asset_write_failed file={} reason={}", file, error.message)
                continue
            }
            totalBytes += bytes.size
            byUrl[url] = file
            byHash[sha] = linkedMapOf(
                "file" to file,
                "sha256" to sha,
                "source_url" to url,
                "bytes" to bytes.size,
            )
        }

        if (limitHit) {
            log.warn("extract_asset_limit source={} slug={} capFiles={}", source.key, slug, properties.maxAssets)
        }

        var rewritten = markdown
        for ((remote, file) in byUrl) {
            rewritten = rewritten.replace(remote, "assets/$file")
        }
        // Any image still pointing at a remote host is removed (no hotlinking).
        rewritten = rewritten.replace(REMOTE_IMAGE) { match ->
            log.info("extract_asset_skipped url={} reason=unlocalised", match.groupValues[2])
            ""
        }
        return Localised(rewritten, byHash.values.toList())
    }

    private fun extensionFor(contentType: String?, url: String): String {
        val type = contentType?.substringBefore(';')?.trim()?.lowercase()
        return when (type) {
            "image/jpeg", "image/jpg" -> "jpg"
            "image/png" -> "png"
            "image/gif" -> "gif"
            "image/webp" -> "webp"
            "image/avif" -> "avif"
            else -> {
                val fromPath = runCatching { URI(url).path.substringAfterLast('.', "") }.getOrDefault("")
                    .lowercase()
                if (fromPath in setOf("jpg", "jpeg", "png", "gif", "webp", "avif")) {
                    if (fromPath == "jpeg") "jpg" else fromPath
                } else {
                    "jpg"
                }
            }
        }
    }

    // -----------------------------------------------------------------------
    // Markdown + meta
    // -----------------------------------------------------------------------

    private fun composeMarkdown(
        extracted: Extraction.Result,
        body: String,
        source: Source,
        canonicalUrl: String,
    ): String {
        val out = StringBuilder()
        val title = extracted.title.ifBlank { "Untitled" }
        out.append("# ").append(title.trim()).append("\n\n")
        val byline = listOfNotNull(
            extracted.author?.takeIf { it.isNotBlank() }?.let { "by $it" },
            extracted.publishedAt?.let { it.truncatedTo(ChronoUnit.DAYS).toString().substringBefore('T') },
        )
        if (byline.isNotEmpty()) {
            out.append("*").append(byline.joinToString(" · ")).append("*\n\n")
        }
        out.append(body.trim()).append("\n\n")
        out.append("---\n\n")
        // Footer keeps the identity URL, never the page's own canonical tag: a hostile or
        // accidental canonical must not change what we attribute (BR-06/BR-12).
        out.append("Original: ").append(canonicalUrl).append("\n")
        out.append("Source: ").append(source.name).append("\n")
        out.append("Fetched: ").append(Instant.now().truncatedTo(ChronoUnit.DAYS).toString().substringBefore('T'))
            .append("\n")
        return out.toString()
    }

    private fun meta(
        article: Article,
        source: Source,
        slug: String,
        sha: String,
        extracted: Extraction.Result,
        fetchedAt: Instant,
        assets: List<Map<String, Any?>>,
    ): Map<String, Any?> = linkedMapOf(
        "source_key" to source.key,
        "source_url" to source.discoveryUrl,
        "canonical_url" to article.canonicalUrl,
        "original_url" to (article.originalUrl ?: article.canonicalUrl),
        "title" to extracted.title.ifBlank { article.title ?: slug },
        "author" to extracted.author,
        "published_at" to extracted.publishedAt?.toString(),
        "fetched_at" to fetchedAt.toString(),
        "content_sha256" to sha,
        "word_count" to extracted.wordCount,
        "assets" to assets,
    )

    private fun resolveSlug(article: Article, source: Source, title: String): String {
        val candidate = article.slug?.takeIf { SLUG.matches(it) } ?: Urls.slug(article.canonicalUrl, title)
        if (articles.slugAvailable(source.id, candidate, article.id)) return candidate
        // Collision with another article of the same source: suffix with the id prefix,
        // which is stable across re-crawls (never a new slug for the same URL).
        val suffix = article.id.replace("-", "").take(8)
        val trimmed = candidate.take(80 - suffix.length - 1).trimEnd('-')
        return "$trimmed-$suffix"
    }

    private fun emitFailed(article: Article, source: Source, code: String, reason: String) {
        events.publish(
            "article.failed",
            mapOf(
                "articleId" to article.id,
                "sourceKey" to source.key,
                "code" to code,
                "reason" to reason,
                "attemptCount" to article.attemptCount,
            ),
        )
    }

    private fun delayFor(host: String): Long =
        if (OutcomeMapper.isMediumFamily(host)) properties.mediumDelayMs else properties.defaultDelayMs

    private fun userAgent(): String =
        "tech-blog-archiver/1.0 (+${properties.contact.ifBlank { "local operator" }})"

    private companion object {
        val SLUG = Regex("^[a-z0-9][a-z0-9-]{0,79}$")
        val REMOTE_IMAGE = Regex("!\\[[^\\]]*\\]\\((https?://[^)\\s]+)\\)")
        const val MAX_CONTENT_BYTES = 2_097_152
        const val MAX_IMAGE_BYTES = 26_214_400L
    }
}

class DiskFull(message: String) : RuntimeException(message)

/** Small helper so status/failure columns are written in one place. */
private fun ArticleRepository.updateRow(
    article: Article,
    status: String,
    failureCode: String?,
    failureReason: String?,
): Article {
    val updated = article.copy(
        status = status,
        failureCode = failureCode,
        failureReason = failureReason,
        nextAttemptAt = null,
    )
    update(updated)
    return updated
}
