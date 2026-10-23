package com.techblog.crawler.domain

/**
 * Architecture name for the discovery run coordinator. The implementation lives in the
 * discovery package because it also owns HTTP/robots orchestration.
 */
typealias DiscoveryOrchestrator = com.techblog.crawler.discovery.DiscoveryService
