#!/bin/sh
# Creates the runtime data tree before `docker compose up`.
# Note (Podman rootless): container uid 10001 maps to a subuid on the host;
# if writes fail, adjust ownership or run with --userns=keep-id (baseline 04 §5).
set -eu
cd "$(dirname "$0")/.."
mkdir -p data/postgres data/redis data/logs data/logs/nginx data/tmp data/uploads/crawl
chmod -R u+rwX,g+rwX data
echo "data/ directories ready: postgres, redis, logs, tmp, uploads/crawl"
