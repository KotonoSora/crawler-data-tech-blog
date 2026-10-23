package com.techblog.crawler.pipeline

import com.techblog.crawler.config.CrawlerProperties
import com.techblog.crawler.domain.Article
import com.techblog.crawler.domain.ArchiveStore
import com.techblog.crawler.domain.ArticleRepository
import com.techblog.crawler.domain.EventPublisher
import com.techblog.crawler.domain.Extraction
import com.techblog.crawler.domain.FetchLogEntry
import com.techblog.crawler.domain.FetchLogRepository
import com.techblog.crawler.domain.FetchOutcome
import com.techblog.crawler.domain.FetchPort
import com.techblog.crawler.domain.FetchResult
import com.techblog.crawler.domain.HostGate
import com.techblog.crawler.domain.OutcomeMapper
import com.techblog.crawler.domain.RevisionRepository
import com.techblog.crawler.domain.Source
import com.techblog.crawler.domain.Urls
import com.techblog.crawler.domain.UserAgent
import com.techblog.crawler.fetch.ArticleLease
import com.techblog.crawler.fetch.FetchTask
import com.techblog.crawler.observability.CrawlerMetrics
import org.slf4j.LoggerFactory
import org.slf4j.MDC
import org.springframework.stereotype.Service
import java.net.URI
import java.time.Instant
import java.time.temporal.ChronoUnit

/**
 * One article through the pipeline (spec 02 file 01 §4, file 03 §5, spec 03):
 * FetchTask (robots → host gate → conditional GET → fetch → outcome → fetch_log + state) →
 * extraction → asset localisation → atomic archive write → DB update → `article.archived`.
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
    private val hostGate: HostGate,
    private val fetchTask: FetchTask,
    private val fetchLog: FetchLogRepository,
    private val events: EventPublisher,
    private val metrics: CrawlerMetrics,
    private val articleLease: ArticleLease,
) {
    private val log = LoggerFactory.getLogger(javaClass)

    sealed interface Result {
        data class Archived(val article: Article) : Result
        data class Skipped(val article: Article, val reason: String) : Result
        data class Failed(val article: Article, val code: String, val reason: String, val retryScheduled: Boolean) : Result
        data class NeedsReview(val article: Article, val code: String, val reason: String) : Result
        /** Host paused / gate busy: rescheduled with no attempt consumed, not a job outcome. */
        data class Deferred(val article: Article, val reason: String) : Result
    }

    fun process(articleId: String, source: Source, jobId: String?): Result? {
        // `tb:lock:article:{id}` (spec 04 §4): a 300 s lease with a 60 s heartbeat. The DB
        // claim remains the primary mutex; when another worker owns the lease this is a no-op.
        val lease = articleLease.acquire(articleId) ?: return null
        try {
            val claimed = articles.claim(articleId, jobId) ?: return null
            return try {
                processClaimed(claimed, source, jobId)
            } catch (error: DiskFull) {
                // Free-space exhaustion pauses the whole job; JobRunner owns that transition.
                throw error
            } catch (error: Exception) {
                // A claimed row must never be left in `processing` just because an adapter threw.
                // Surface a terminal failure so the row is inspectable, retryable, and counted.
                log.error(
                    "article_unhandled_failure articleId={} jobId={} reason={}",
                    claimed.id,
                    jobId,
                    error.message,
                    error,
                )
                val failed = articles.updateRow(
                    claimed,
                    "failed",
                    "STORE-RENAME-FAILED",
                    "Unhandled pipeline failure: ${error.message ?: error.javaClass.simpleName}",
                )
                emitFailed(failed, source, "STORE-RENAME-FAILED", failed.failureReason.orEmpty())
                Result.Failed(failed, "STORE-RENAME-FAILED", failed.failureReason.orEmpty(), retryScheduled = false)
            }
        } finally {
            lease.close()
        }
    }

    fun processClaimed(article: Article, source: Source, jobId: String?): Result {
        val host = Urls.host(article.canonicalUrl)
        MDC.put("articleId", article.id)
        MDC.put("host", host)
        try {
            return processClaimedInternal(article, source, jobId, host)
        } finally {
            MDC.remove("articleId")
            MDC.remove("host")
        }
    }

    private fun processClaimedInternal(
        article: Article,
        source: Source,
        jobId: String?,
        host: String,
    ): Result {
        // BA 05 STORE-DISK-FULL: below 5 GB free the job pauses before doing more work.
        if (archive.freeBytes() < properties.minFreeBytes) {
            throw DiskFull("Archive volume has less than ${properties.minFreeBytes} bytes free.")
        }

        // Steps 1-7 of spec 02 file 01 §4 (robots, host gate, conditional GET, fetch, outcome,
        // fetch_log + article state in one transaction, retry schedule) live in FetchTask.
        val fetched = when (val outcome = fetchTask.execute(article, source.key, jobId)) {
            is FetchTask.Result.Deferred -> {
                val current = articles.findById(article.id) ?: article
                return Result.Deferred(current, outcome.reason)
            }
            is FetchTask.Result.Denied -> return Result.Skipped(outcome.article, outcome.reason)
            is FetchTask.Result.Fetched -> outcome
        }
        val result = fetched.fetch
        val current = fetched.article

        if (result.outcome == FetchOutcome.NOT_MODIFIED) {
            // FetchTask restored `archived` when the copy existed; otherwise the single guard
            // re-GET already ran and a second 304 leaves the article `failed` (not a skip).
            return if (current.status == "archived") {
                Result.Skipped(current, "304 Not Modified; archived copy kept.")
            } else {
                failureResult(current, source, result)
            }
        }

        if (!result.ok) {
            return failureResult(current, source, result)
        }

        // 3. Extraction. BA 05 allows two attempts; a blank result means the parser found no
        // main content, while a very short non-blank result is EXTRACT-EMPTY-CONTENT.
        val html = result.body?.toString(Charsets.UTF_8).orEmpty()
        val extractStarted = System.nanoTime()
        val extraction = runCatching { extractWithRetry(html, article.canonicalUrl) }
        metrics.extractDuration(source.key, (System.nanoTime() - extractStarted) / 1_000_000)
        val extracted = extraction.getOrElse { error ->
            metrics.extractFailure(source.key, "EXTRACT-PARSE-FAILED")
            log.warn("extract_failed articleId={} attempts={} reason={}", article.id, EXTRACT_ATTEMPTS, error.message)
            val reason = "Extraction failed after $EXTRACT_ATTEMPTS attempts: " +
                (error.message ?: error.javaClass.simpleName)
            val failed = articles.updateRow(article, "needs_review", "EXTRACT-PARSE-FAILED", reason)
            emitFailed(failed, source, "EXTRACT-PARSE-FAILED", reason)
            return Result.NeedsReview(failed, "EXTRACT-PARSE-FAILED", reason)
        }

        val body = extracted.markdown.trim()
        if (body.isEmpty()) {
            metrics.extractFailure(source.key, "EXTRACT-PARSE-FAILED")
            val reason = "No main content found after $EXTRACT_ATTEMPTS attempts; no file written."
            val review = articles.updateRow(article, "needs_review", "EXTRACT-PARSE-FAILED", reason)
            emitFailed(review, source, "EXTRACT-PARSE-FAILED", reason)
            return Result.NeedsReview(review, "EXTRACT-PARSE-FAILED", reason)
        }
        if (body.length < properties.minContentChars) {
            metrics.extractFailure(source.key, "EXTRACT-EMPTY-CONTENT")
            val reason = "Extracted ${body.length} characters (<${properties.minContentChars}); no file written."
            val review = articles.updateRow(article, "needs_review", "EXTRACT-EMPTY-CONTENT", reason)
            emitFailed(review, source, "EXTRACT-EMPTY-CONTENT", reason)
            return Result.NeedsReview(review, "EXTRACT-EMPTY-CONTENT", reason)
        }

        // 4. Slug: identity never moves; a slug collision gets a stable suffix.
        val slug = resolveSlug(article, source, extracted.title)
        if (!SLUG.matches(slug)) {
            metrics.extractFailure(source.key, "STORE-INVALID-SLUG")
            val reason = "Slug '$slug' does not match ${SLUG.pattern}; no file written."
            val review = articles.updateRow(article, "needs_review", "STORE-INVALID-SLUG", reason)
            emitFailed(review, source, "STORE-INVALID-SLUG", reason)
            return Result.NeedsReview(review, "STORE-INVALID-SLUG", reason)
        }

        // 5. Assets: download, dedupe, rewrite to assets/<file>.
        val localised = localiseAssets(
            body,
            extracted.images,
            source,
            slug,
            article.id,
            jobId,
            article.attemptCount,
        )
        val now = Instant.now()
        // content.md carries the fetched date as attribution. For the unchanged check, compose
        // with the previous fetched date so a re-crawl on a later day hashes identically; only a
        // real body change is allowed to move content_sha256 (BR-07).
        val comparisonAt = article.fetchedAt ?: now
        val rawComparison = composeMarkdown(
            extracted,
            localised.markdown,
            source,
            article.canonicalUrl,
            comparisonAt,
        )
        val comparisonMarkdown = truncateToBytes(rawComparison, MAX_CONTENT_BYTES)
        if (rawComparison != comparisonMarkdown) {
            log.warn("extract_content_truncated articleId={} cap={}", article.id, MAX_CONTENT_BYTES)
            metrics.contentTruncated(source.key)
        }
        val comparisonBytes = comparisonMarkdown.toByteArray(Charsets.UTF_8)
        val comparisonSha = Extraction.sha256(comparisonBytes)

        // 6. Disk guard before writing (STORE-DISK-FULL pauses the job).
        if (archive.freeBytes() < properties.minFreeBytes) {
            throw DiskFull("Archive volume has less than ${properties.minFreeBytes} bytes free.")
        }

        // 7. content_sha256 decides "changed" (BR-07): a 200 response with identical content is
        // a no-op, counted as skipped, and never rewrites the archive or moves the slug.
        val previous = article.contentSha256
        if (previous != null && previous == comparisonSha && article.archivedAt != null) {
            val kept = articles.updateRow(article, "archived", null, null)
            pruneStaleAssets(source, slug, localised)
            return Result.Skipped(kept, "Content sha256 unchanged; archived copy kept.")
        }
        val composed = if (comparisonAt == now) {
            comparisonMarkdown
        } else {
            composeMarkdown(extracted, localised.markdown, source, article.canonicalUrl, now)
        }
        val markdown = truncateToBytes(composed, MAX_CONTENT_BYTES)
        val bytes = markdown.toByteArray(Charsets.UTF_8)
        val sha = Extraction.sha256(bytes)
        // Revision append on sha change, then the atomic write.
        if (previous != null && previous != sha && article.archivedAt != null) {
            revisions.append(article.id, previous)
        }
        writeArticleWithRetry(
            source = source,
            slug = slug,
            markdown = markdown,
            meta = meta(
                article,
                source,
                slug,
                sha,
                extracted,
                now,
                localised.assets,
                localised.warnings,
            ),
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
        // NFR-08: a re-crawl may drop images. Prune only after the row/event point at the new
        // content; a cleanup failure is a warning, never a reason to lose the finished archive.
        pruneStaleAssets(source, slug, localised)
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

    /**
     * FetchTask already committed the `fetch_log` row and the article state (queued / failed /
     * needs_review); this only maps that state to the pipeline result and emits the failure
     * event for terminal outcomes. Retries do not emit `article.failed`.
     */
    private fun failureResult(article: Article, source: Source, result: FetchResult): Result {
        val code = article.failureCode ?: result.failureCode ?: "FETCH-HTTP-TERMINAL"
        val reason = article.failureReason ?: result.failureReason ?: "Fetch failed."
        return when (article.status) {
            "queued" -> Result.Failed(article, code, reason, retryScheduled = true)
            "skipped" -> Result.Skipped(article, reason)
            "needs_review" -> {
                emitFailed(article, source, code, reason)
                Result.NeedsReview(article, code, reason)
            }
            else -> {
                emitFailed(article, source, code, reason)
                Result.Failed(article, code, reason, retryScheduled = false)
            }
        }
    }

    /**
     * BA 05: extraction gets two attempts. A parser returning a blank document is retried the
     * same way as a thrown parser error; the caller turns a persistent blank result into
     * EXTRACT-PARSE-FAILED.
     */
    private fun extractWithRetry(html: String, url: String): Extraction.Result {
        var last: Extraction.Result? = null
        var lastError: Throwable? = null
        repeat(EXTRACT_ATTEMPTS) {
            val attempt = runCatching { Extraction.extract(html, url) }
            last = attempt.getOrNull()
            if (last?.markdown?.isNotBlank() == true) return last!!
            lastError = attempt.exceptionOrNull() ?: lastError
        }
        last?.let { return it }
        throw lastError ?: IllegalStateException("Extraction returned no result.")
    }

    /**
     * BA 05: STORE-RENAME-FAILED gets exactly one retry; a disk-full condition is different
     * and must pause the job instead of being downgraded to a per-article failure.
     */
    private fun writeArticleWithRetry(
        source: Source,
        slug: String,
        markdown: String,
        meta: Map<String, Any?>,
    ) {
        if (archive.freeBytes() < properties.minFreeBytes) {
            throw DiskFull("Archive volume has less than ${properties.minFreeBytes} bytes free.")
        }
        fun write() = archive.writeArticle(
            sourceKey = source.key,
            slug = slug,
            markdown = markdown,
            meta = meta,
        )
        try {
            write()
        } catch (first: Exception) {
            if (isDiskFull(first)) {
                throw DiskFull("Archive volume is full while writing ${source.key}/$slug.")
            }
            log.warn("store_rename_failed_retry source={} slug={} reason={}", source.key, slug, first.message)
            try {
                write()
            } catch (second: Exception) {
                if (isDiskFull(second)) {
                    throw DiskFull("Archive volume is full while writing ${source.key}/$slug.")
                }
                throw second
            }
        }
    }

    private fun isDiskFull(error: Throwable): Boolean {
        var current: Throwable? = error
        while (current != null) {
            val message = current.message.orEmpty()
            if (message.contains("No space left", ignoreCase = true) ||
                message.contains("ENOSPC", ignoreCase = true) ||
                message.contains("not enough space", ignoreCase = true)
            ) {
                return true
            }
            current = current.cause
        }
        return false
    }

    // -----------------------------------------------------------------------
    // Assets
    // -----------------------------------------------------------------------

    private data class Localised(
        val markdown: String,
        val assets: List<Map<String, Any?>>,
        val warnings: List<Map<String, String>> = emptyList(),
    )

    private fun pruneStaleAssets(source: Source, slug: String, localised: Localised) {
        runCatching {
            archive.pruneAssets(
                source.key,
                slug,
                localised.assets.mapNotNull { it["file"] as? String }.toSet(),
            )
        }.onFailure {
            log.warn("archive_prune_failed source={} slug={} reason={}", source.key, slug, it.message)
        }
    }

    private fun recordAssetFetch(
        articleId: String,
        jobId: String?,
        host: String,
        url: String,
        attempt: Int,
        result: FetchResult,
    ) {
        runCatching {
            fetchLog.record(
                FetchLogEntry(
                    articleId = articleId,
                    jobId = jobId,
                    host = host,
                    url = url,
                    method = "GET",
                    statusCode = result.statusCode,
                    outcome = result.outcome.wire,
                    durationMs = result.durationMs,
                    bytes = result.bytes,
                    attempt = attempt,
                ),
            )
        }.onFailure { log.warn("asset_fetch_log_failed url={} reason={}", url, it.message) }
    }

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
        articleId: String,
        jobId: String?,
        attempt: Int,
    ): Localised {
        if (images.isEmpty()) return Localised(markdown, emptyList())

        // NFR-08: content is capped at 2 MB; reserve that worst case before spending disk on assets.
        val assetBudget = minOf(
            properties.maxAssetBytes,
            (properties.maxArticleBytes - MAX_CONTENT_BYTES).coerceAtLeast(0L),
        )
        val byHash = LinkedHashMap<String, Map<String, Any?>>()
        val byUrl = LinkedHashMap<String, String>()
        var totalBytes = 0L
        var index = 0
        var limitHit = false

        for (url in images) {
            if (byUrl.containsKey(url)) continue
            if (byHash.size >= properties.maxAssets || totalBytes >= assetBudget) {
                limitHit = true
                break
            }
            val host = Urls.host(url)
            if (host.isBlank() || url.startsWith("data:") || url.lowercase().endsWith(".svg")) {
                metrics.asset("skipped")
                log.info("extract_asset_skipped url={} reason=unsupported", url)
                continue
            }
            val fetchStarted = System.nanoTime()
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
            recordAssetFetch(
                articleId,
                jobId,
                host,
                url,
                attempt,
                fetched ?: FetchResult.failed(
                    FetchOutcome.NETWORK_ERROR,
                    null,
                    "FETCH-TIMEOUT",
                    "Image request failed.",
                    ((System.nanoTime() - fetchStarted) / 1_000_000).toInt(),
                ),
            )

            if (fetched?.ok != true || fetched.body == null) {
                metrics.asset("skipped")
                log.info("extract_asset_skipped url={} reason={}", url, fetched?.failureCode ?: "fetch failed")
                continue
            }
            val bytes = fetched.body
            if (totalBytes + bytes.size > assetBudget) {
                limitHit = true
                break
            }
            val sha = Extraction.sha256(bytes)
            val existing = byHash[sha]
            if (existing != null) {
                metrics.asset("duplicate")
                byUrl[url] = existing["file"] as String
                continue
            }
            val extension = extensionFor(fetched.contentType, url)
            index += 1
            val file = "img-%03d-%s.%s".format(index, sha.take(8), extension)
            if (archive.freeBytes() < properties.minFreeBytes) {
                throw DiskFull("Archive volume has less than ${properties.minFreeBytes} bytes free.")
            }
            try {
                archive.writeAsset(source.key, slug, file, bytes)
            } catch (error: Exception) {
                if (isDiskFull(error)) {
                    throw DiskFull("Archive volume is full while writing $file.")
                }
                metrics.asset("skipped")
                log.warn("extract_asset_write_failed file={} reason={}", file, error.message)
                continue
            }
            metrics.asset("downloaded")
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
            metrics.asset("limit")
            log.warn("extract_asset_limit source={} slug={} capFiles={}", source.key, slug, properties.maxAssets)
        }

        var rewritten = markdown
        for ((remote, file) in byUrl) {
            rewritten = rewritten.replace(remote, "assets/$file")
        }
        // AC-14: only local `assets/...` image references may remain. Anything the downloader
        // could not localise is removed, including relative URLs.
        rewritten = rewritten.replace(IMAGE_REFERENCE) { match ->
            val target = match.groupValues[1]
            if (target.startsWith("assets/")) {
                match.value
            } else {
                log.info("extract_asset_skipped url={} reason=unlocalised", target)
                ""
            }
        }
        val warnings = if (limitHit) {
            listOf(
                mapOf(
                    "code" to "EXTRACT-ASSET-LIMIT",
                    "detail" to "Asset cap reached; remaining images were skipped " +
                        "(files=${properties.maxAssets}, bytes=$assetBudget).",
                ),
            )
        } else {
            emptyList()
        }
        return Localised(rewritten, byHash.values.toList(), warnings)
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
        fetchedAt: Instant,
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
        out.append("Fetched: ").append(fetchedAt.truncatedTo(ChronoUnit.DAYS).toString().substringBefore('T'))
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
        warnings: List<Map<String, String>>,
    ): Map<String, Any?> {
        val meta = linkedMapOf<String, Any?>(
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
        if (warnings.isNotEmpty()) meta["warnings"] = warnings
        return meta
    }

    /**
     * UTF-8 safe truncation for the 2 MB content.md cap (BA 04 §4). Attribution is never
     * stripped: the footer after `---` is reserved before the body budget is applied.
     */
    private fun truncateToBytes(text: String, maxBytes: Int): String {
        val encoded = text.toByteArray(Charsets.UTF_8)
        if (encoded.size <= maxBytes) return text

        val marker = "\n\n_(content truncated)_\n"
        val footerAt = text.lastIndexOf("\n---\n\nOriginal: ")
        val footer = if (footerAt >= 0) text.substring(footerAt) else ""
        val head = if (footerAt >= 0) text.substring(0, footerAt) else text
        val budget = maxBytes - marker.toByteArray(Charsets.UTF_8).size -
            footer.toByteArray(Charsets.UTF_8).size
        if (budget <= 0) return String(encoded, 0, maxBytes, Charsets.UTF_8)

        val headBytes = head.toByteArray(Charsets.UTF_8)
        if (headBytes.size <= budget) return head + marker + footer
        var cut = budget
        while (cut > 0 && (headBytes[cut].toInt() and 0xC0) == 0x80) cut -= 1
        return String(headBytes, 0, cut, Charsets.UTF_8) + marker + footer
    }

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
                "status" to article.status,
                "attemptCount" to article.attemptCount,
                "title" to article.title,
                "originalUrl" to article.originalUrl,
            ),
        )
    }

    private fun delayFor(host: String): Long =
        if (OutcomeMapper.isMediumFamily(host)) properties.mediumDelayMs else properties.defaultDelayMs

    private fun userAgent(): String = UserAgent.header(properties.contact)

    private companion object {
        val SLUG = Regex("^[a-z0-9][a-z0-9-]{0,79}$")
        val IMAGE_REFERENCE = Regex("!\\[[^\\]]*\\]\\(([^)]+)\\)")
        const val EXTRACT_ATTEMPTS = 2
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
