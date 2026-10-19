package com.kotonosora.techblog.crawler.fetch

import com.kotonosora.techblog.crawler.config.CrawlerProperties
import com.kotonosora.techblog.crawler.domain.FetchPort
import com.kotonosora.techblog.crawler.domain.HostGate
import com.kotonosora.techblog.crawler.domain.RobotsDecision
import com.kotonosora.techblog.crawler.domain.RobotsGate
import com.kotonosora.techblog.crawler.domain.Urls
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Component
import java.util.concurrent.ConcurrentHashMap

/**
 * robots.txt gate (spec 02 file 01 §2, BE-02-01). RFC 9309 semantics:
 * 4xx → allow all, 5xx/timeout → disallow all. Decisions are cached per host for
 * [CrawlerProperties.robotsTtlSeconds] so a 500-article backfill fetches robots.txt once,
 * and the robots request itself goes through the HostGate so it can never overlap another
 * request to the same host (AC-15).
 */
@Component
class HttpRobotsGate(
    private val fetcher: FetchPort,
    private val hostGate: HostGate,
    private val properties: CrawlerProperties,
) : RobotsGate {

    private val log = LoggerFactory.getLogger(javaClass)

    private data class Cached(val decision: RobotsDecision, val expiresAt: Long)

    private val cache = ConcurrentHashMap<String, Cached>()

    override fun check(url: String, userAgent: String): RobotsDecision {
        val parsed = runCatching { java.net.URI(url) }.getOrNull()
            ?: return RobotsDecision(false, "Invalid URL.")
        val scheme = parsed.scheme
            ?: return RobotsDecision(false, "URL has no scheme.")
        val host = parsed.host
            ?: return RobotsDecision(false, "URL has no host.")
        val port = if (parsed.port == -1) "" else ":${parsed.port}"
        val robotsUrl = "$scheme://$host$port/robots.txt"

        cache[host]?.takeIf { it.expiresAt > System.currentTimeMillis() }?.let { return it.decision }

        val decision = load(robotsUrl, host, userAgent)
        cache[host] = Cached(decision, System.currentTimeMillis() + properties.robotsTtlSeconds * 1000)
        return decision
    }

    private fun load(robotsUrl: String, host: String, userAgent: String): RobotsDecision {
        val result = runCatching {
            hostGate.withPermit(host, delayFor(host)) {
                fetcher.get(
                    url = robotsUrl,
                    userAgent = userAgent,
                    accept = "text/plain",
                    validators = null,
                    maxBytes = ROBOTS_MAX_BYTES,
                    timeoutMs = properties.readTimeoutMs,
                )
            }
        }.getOrElse { error ->
            log.warn("robots_unavailable host={} reason={}", host, error.message)
            return RobotsDecision(false, "robots.txt could not be read; fail closed.")
        }

        return when {
            result.statusCode in 400..499 -> RobotsDecision(true)
            result.statusCode == null || (result.statusCode ?: 0) >= 500 -> {
                log.warn("robots_unavailable host={} status={}", host, result.statusCode)
                RobotsDecision(false, "robots.txt unavailable (status ${result.statusCode ?: "none"}); fail closed.")
            }
            !result.ok -> RobotsDecision(false, result.failureReason ?: "robots.txt could not be read.")
            else -> decide(String(result.body ?: ByteArray(0), Charsets.UTF_8), userAgent, robotsUrl)
        }
    }

    /**
     * Minimal RFC 9309 evaluator: the most specific matching user-agent group wins; an empty
     * `Disallow:` allows everything; `Allow` beats `Disallow` at equal prefix length.
     */
    fun decide(robots: String, userAgent: String, url: String): RobotsDecision {
        val groups = parse(robots)
        if (groups.isEmpty()) return RobotsDecision(true)

        val agentToken = userAgent.substringBefore('/').lowercase()
        val specific = groups.filter { group ->
            group.agents.any { agent -> agent != "*" && agentToken.startsWith(agent) }
        }
        val selected = specific.ifEmpty { groups.filter { group -> group.agents.contains("*") } }
        if (selected.isEmpty()) return RobotsDecision(true)

        val path = runCatching { java.net.URI(url).path.ifEmpty { "/" } }.getOrDefault("/")
        var best: Rule? = null
        for (group in selected) {
            for (rule in group.rules) {
                if (!path.startsWith(rule.path)) continue
                if (best == null ||
                    rule.path.length > best.path.length ||
                    (rule.path.length == best.path.length && rule.allow && !best.allow)
                ) {
                    best = rule
                }
            }
        }
        return if (best?.allow == false) {
            RobotsDecision(false, "robots.txt disallows ${Urls.canonical(url)}")
        } else {
            RobotsDecision(true)
        }
    }

    private fun parse(robots: String): List<Group> {
        val groups = mutableListOf<Group>()
        var current: Group? = null
        var lastWasAgent = false
        for (raw in robots.lineSequence()) {
            val line = raw.substringBefore('#').trim()
            if (line.isEmpty()) continue
            val name = line.substringBefore(':').trim().lowercase()
            val value = line.substringAfter(':', "").trim()
            when (name) {
                "user-agent" -> {
                    if (!lastWasAgent || current == null) {
                        current = Group(mutableListOf(), mutableListOf())
                        groups += current!!
                    }
                    current!!.agents += value.lowercase()
                    lastWasAgent = true
                }
                "allow", "disallow" -> {
                    val group = current ?: continue
                    lastWasAgent = false
                    if (value.isEmpty()) continue
                    group.rules += Rule(value, allow = name == "allow")
                }
                else -> lastWasAgent = false
            }
        }
        return groups
    }

    private fun delayFor(host: String): Long =
        if (com.kotonosora.techblog.crawler.domain.OutcomeMapper.isMediumFamily(host)) {
            properties.mediumDelayMs
        } else {
            properties.defaultDelayMs
        }

    private data class Group(val agents: MutableList<String>, val rules: MutableList<Rule>)
    private data class Rule(val path: String, val allow: Boolean)

    private companion object {
        const val ROBOTS_MAX_BYTES = 512L * 1024
    }
}
