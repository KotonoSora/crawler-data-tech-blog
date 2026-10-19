package com.kotonosora.techblog.crawler.domain

import java.time.Instant
import java.security.SecureRandom

/** RFC 9562 UUIDv7: time-ordered ids for stream-friendly keys (baseline 03 §3). */
object Ids {
    private val random = SecureRandom()

    fun uuid7(): String {
        val now = Instant.now().toEpochMilli()
        val bytes = ByteArray(16)
        random.nextBytes(bytes)
        bytes[0] = (now shr 40).toByte()
        bytes[1] = (now shr 32).toByte()
        bytes[2] = (now shr 24).toByte()
        bytes[3] = (now shr 16).toByte()
        bytes[4] = (now shr 8).toByte()
        bytes[5] = now.toByte()
        bytes[6] = ((bytes[6].toInt() and 0x0F) or 0x70).toByte()
        bytes[8] = ((bytes[8].toInt() and 0x3F) or 0x80).toByte()
        val hex = bytes.joinToString("") { "%02x".format(it) }
        return "${hex.substring(0, 8)}-${hex.substring(8, 12)}-${hex.substring(12, 16)}-" +
            "${hex.substring(16, 20)}-${hex.substring(20)}"
    }
}
