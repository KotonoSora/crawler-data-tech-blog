package com.kotonosora.techblog.crawler.domain

import java.security.MessageDigest

/**
 * Content extraction (spec 04 file 02): main content → Markdown, images collected for local
 * download. Pure functions only; the pipeline owns IO so extraction is unit-testable.
 */
object Extraction {

    data class Result(
        val title: String,
        val author: String?,
        val publishedAt: java.time.Instant?,
        val markdown: String,
        val wordCount: Int,
        val images: List<String>,
        val canonicalUrl: String?,
    )

    fun extract(html: String, pageUrl: String): Result {
        val document = org.jsoup.Jsoup.parse(html, pageUrl)
        document.select("script, style, noscript, iframe, form, nav, footer, header").remove()

        val title = firstNonBlank(
            document.selectFirst("meta[property=og:title]")?.attr("content"),
            document.selectFirst("h1")?.text(),
            document.title(),
        ).orEmpty()

        val author = firstNonBlank(
            document.selectFirst("meta[name=author]")?.attr("content"),
            document.selectFirst("[rel=author]")?.text(),
            document.selectFirst("[class*=author]")?.text(),
        )

        val publishedAt = firstNonBlank(
            document.selectFirst("meta[property=article:published_time]")?.attr("content"),
            document.selectFirst("time[datetime]")?.attr("datetime"),
            document.selectFirst("[class*=date]")?.text(),
        )?.let { runCatching { java.time.Instant.parse(it) }.getOrNull() }

        val canonicalUrl = document.selectFirst("link[rel=canonical]")?.attr("href")
            ?.takeIf { it.isNotBlank() }
            ?.let { Discovery.resolve(pageUrl, it) }

        val root = document.selectFirst("article")
            ?: document.selectFirst("main")
            ?: document.body()

        val images = root.select("img[src]")
            .mapNotNull { it.absUrl("src").takeIf(String::isNotBlank) }
            .distinct()

        val markdown = toMarkdown(root, pageUrl)
        return Result(
            title = title.trim(),
            author = author?.trim()?.takeIf { it.isNotBlank() },
            publishedAt = publishedAt,
            markdown = markdown,
            wordCount = markdown.split(Regex("\\s+")).count { it.isNotBlank() },
            images = images,
            canonicalUrl = canonicalUrl,
        )
    }

    /**
     * Deliberately small Markdown writer: headings, paragraphs, lists, quotes, code, links and
     * images. CopyDown is the production extractor; this fallback keeps the pipeline working
     * when the readability pass rejects a page, and both outputs are sanitized by the reader.
     */
    private fun toMarkdown(root: org.jsoup.nodes.Element, baseUrl: String): String {
        val out = StringBuilder()
        fun emit(text: String) {
            val trimmed = text.trim()
            if (trimmed.isNotEmpty()) {
                out.append(trimmed).append("\n\n")
            }
        }

        fun walk(node: org.jsoup.nodes.Element) {
            for (child in node.children()) {
                when (child.tagName().lowercase()) {
                    "h1" -> emit("# ${child.text()}")
                    "h2" -> emit("## ${child.text()}")
                    "h3" -> emit("### ${child.text()}")
                    "h4", "h5", "h6" -> emit("#### ${child.text()}")
                    "p" -> emit(inline(child, baseUrl))
                    "pre" -> emit("```\n${child.text()}\n```")
                    "blockquote" -> emit(
                        child.text().lines().joinToString("\n") { "> $it" },
                    )
                    "ul", "ol" -> {
                        val ordered = child.tagName().equals("ol", true)
                        child.children().forEachIndexed { index, item ->
                            val marker = if (ordered) "${index + 1}." else "-"
                            emit("$marker ${inline(item, baseUrl)}")
                        }
                    }
                    "table" -> emit(tableToMarkdown(child))
                    "figure" -> {
                        val image = child.selectFirst("img[src]")
                        if (image != null) {
                            emit(imageMarkdown(image, baseUrl))
                        }
                        val caption = child.selectFirst("figcaption")?.text()
                        if (!caption.isNullOrBlank()) emit("*$caption*")
                    }
                    "img" -> emit(imageMarkdown(child, baseUrl))
                    "br" -> out.append("\n")
                    else -> if (child.children().isEmpty()) emit(inline(child, baseUrl)) else walk(child)
                }
            }
        }

        walk(root)
        return out.toString().trim()
    }

    private fun inline(element: org.jsoup.nodes.Element, baseUrl: String): String {
        val text = StringBuilder()
        fun visit(node: org.jsoup.nodes.Node) {
            when (node) {
                is org.jsoup.nodes.TextNode -> text.append(node.text())
                is org.jsoup.nodes.Element -> when (node.tagName().lowercase()) {
                    "strong", "b" -> text.append("**").append(node.text()).append("**")
                    "em", "i" -> text.append("*").append(node.text()).append("*")
                    "code" -> text.append('`').append(node.text()).append('`')
                    "a" -> {
                        val href = node.absUrl("href").ifBlank { node.attr("href") }
                        val label = node.text()
                        if (href.isNotBlank() && label.isNotBlank()) {
                            text.append('[').append(label).append("](").append(href).append(')')
                        } else {
                            text.append(label)
                        }
                    }
                    "img" -> text.append(imageMarkdown(node, baseUrl))
                    "br" -> text.append('\n')
                    else -> node.childNodes().forEach(::visit)
                }
                else -> Unit
            }
        }
        element.childNodes().forEach(::visit)
        return text.toString().trim()
    }

    private fun imageMarkdown(image: org.jsoup.nodes.Element, baseUrl: String): String {
        val src = image.absUrl("src").ifBlank { image.attr("src") }
        if (src.isBlank()) return ""
        val alt = image.attr("alt").ifBlank { "image" }
        return "![${alt.replace("]", "")}]($src)"
    }

    private fun tableToMarkdown(table: org.jsoup.nodes.Element): String {
        val rows = table.select("tr").map { row ->
            row.select("th, td").map { it.text().replace("|", "\\|") }
        }.filter { it.isNotEmpty() }
        if (rows.isEmpty()) return ""
        val columns = rows.maxOf { it.size }
        fun row(values: List<String>): String =
            "| " + (0 until columns).joinToString(" | ") { values.getOrElse(it) { "" } } + " |"
        val header = row(rows.first())
        val separator = "| " + (0 until columns).joinToString(" | ") { "---" } + " |"
        return (listOf(header, separator) + rows.drop(1).map(::row)).joinToString("\n")
    }

    private fun firstNonBlank(vararg values: String?): String? =
        values.firstOrNull { !it.isNullOrBlank() }

    fun sha256(bytes: ByteArray): String =
        MessageDigest.getInstance("SHA-256").digest(bytes).joinToString("") { "%02x".format(it) }
}
