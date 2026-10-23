plugins {
    alias(libs.plugins.kotlin.jvm)
    alias(libs.plugins.kotlin.spring)
    alias(libs.plugins.spring.boot)
    alias(libs.plugins.spring.dependency.management)
}

kotlin {
    jvmToolchain(21)
}

dependencies {
    // Spring Boot BOM manages all versions below unless pinned in the catalog.
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("org.springframework.boot:spring-boot-starter-data-jpa")
    implementation("org.springframework.boot:spring-boot-starter-data-redis")
    implementation("org.springframework.boot:spring-boot-starter-actuator")
    implementation("io.micrometer:micrometer-registry-prometheus")
    implementation("org.springframework.boot:spring-boot-starter-validation")
    implementation("org.springframework.boot:spring-boot-starter-jdbc")
    implementation("org.flywaydb:flyway-core")
    implementation("org.flywaydb:flyway-database-postgresql")
    runtimeOnly("org.postgresql:postgresql")

    // Spring Boot 4 uses Jackson 3 for MVC: Kotlin module required so data-class
    // defaults fill when JSON fields are omitted (AGENTS.md working rules).
    implementation("tools.jackson.module:jackson-module-kotlin")
    implementation(libs.logstash.logback.encoder)

    // Crawler-only pipeline libraries (baseline doc 02).
    implementation(libs.rome)
    implementation(libs.crawler.commons)
    implementation(libs.jsoup)
    implementation(libs.readability4j)
    implementation(libs.copy.down)

    implementation(libs.springdoc.openapi)

    testImplementation("org.springframework.boot:spring-boot-starter-test")
    testImplementation("org.junit.jupiter:junit-jupiter")
    testImplementation(kotlin("test"))
    testImplementation(libs.testcontainers.core)
    testImplementation(libs.testcontainers.postgresql)
    testImplementation(libs.testcontainers.junit.jupiter)
    testRuntimeOnly("org.junit.platform:junit-platform-launcher")
}

tasks.withType<Test> {
    useJUnitPlatform()
}
