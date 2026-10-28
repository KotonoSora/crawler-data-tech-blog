#!/bin/sh
# Creates the runtime data tree before `docker compose up`.
# Note (Podman rootless): container uid 10001 maps to a subuid on the host;
# if writes fail, adjust ownership or run with --userns=keep-id (baseline 04 §5).
set -eu
cd "$(dirname "$0")/.."
mkdir -p data/postgres data/redis data/logs data/logs/nginx data/tmp data/uploads/crawl

# The Java images run as uid 10001 (`app`) and write logs/archive/tmp through these host
# bind mounts. This is a single-operator local stack, so grant every local user write access;
# Spring Boot aborts startup when the Logback file appender cannot open its log file.
chmod -R a+rwX data/logs data/tmp data/uploads

echo "data/ directories ready: postgres, redis, logs, tmp, uploads/crawl"
