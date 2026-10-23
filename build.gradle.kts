// Root build — shared coordinates only. Feature modules apply their own plugins.
plugins {
    alias(libs.plugins.kotlin.jvm) apply false
    alias(libs.plugins.kotlin.spring) apply false
    alias(libs.plugins.spring.boot) apply false
    alias(libs.plugins.spring.dependency.management) apply false
}

subprojects {
    group = "com.techblog"
    version = "0.1.0"
}
