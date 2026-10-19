pluginManagement {
    repositories {
        gradlePluginPortal()
        mavenCentral()
    }
}

plugins {
    // CANDIDATE (V-1): pinned toolchain resolver so JDK 21 is provisioned when
    // the machine has no local 21 install (baseline 02 — JVM toolchain 21).
    id("org.gradle.toolchains.foojay-resolver-convention") version "1.0.0"
}

rootProject.name = "tech-blog"

dependencyResolutionManagement {
    repositories {
        mavenCentral()
    }
}

include("services:crawler-service", "services:api-service")
