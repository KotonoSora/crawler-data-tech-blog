#!/usr/bin/env sh
# One-command stack + Playwright contract/e2e run (spec 07 file 04 runbook).
#
# Prerequisites: Docker (or Podman with a compose shim), Node 24, curl.
# Usage:  sh e2e/run-stack.sh
#         KEEP_STACK=1 sh e2e/run-stack.sh   # leave compose running afterwards
# The script never generates deploy/.env: copy deploy/.env.example first and fill it in.

set -eu

repo=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
cd "$repo"

if [ ! -f deploy/.env ]; then
  echo "deploy/.env is missing. Run: cp deploy/.env.example deploy/.env (then fill it in)." >&2
  exit 1
fi

if ! docker compose version >/dev/null 2>&1; then
  echo "docker compose is not available; install Docker or a Compose shim." >&2
  exit 1
fi

echo "==> preparing runtime directories"
sh deploy/prepare-dirs.sh

echo "==> stopping any previous stack"
docker compose -f deploy/compose.yaml down --remove-orphans

# A hard-killed Postgres can leave a pid file that makes the next container think
# another postmaster owns the data directory. Compose has stopped the server above.
find data/postgres -name postmaster.pid -delete 2>/dev/null || true

echo "==> starting postgres and redis"
docker compose -f deploy/compose.yaml up -d postgres redis

echo "==> ensuring databases and application roles"
attempt=0
until docker compose -f deploy/compose.yaml exec -T postgres \
    sh -c 'pg_isready -U "$POSTGRES_USER" -d postgres' >/dev/null 2>&1; do
  attempt=$((attempt + 1))
  if [ "$attempt" -ge 60 ]; then
    echo "postgres did not become ready within 60 s; recent logs:" >&2
    docker compose -f deploy/compose.yaml logs --tail=80 postgres >&2 || true
    exit 1
  fi
  sleep 1
done
docker compose -f deploy/compose.yaml exec -T postgres \
  sh /docker-entrypoint-initdb.d/01-init-databases.sh

# A failed Flyway migration leaves a success=false row on PostgreSQL. V007 was fixed
# after its failed CREATE OR REPLACE VIEW; clear only that local marker so the stack
# can retry. The replacement migration drops/recreates the view, so retrying is safe.
echo "==> clearing failed local V007 migration marker"
docker compose -f deploy/compose.yaml exec -T postgres \
  sh -c 'psql -v ON_ERROR_STOP=1 -U "$POSTGRES_USER" -d crawler_db' \
  >/dev/null 2>&1 <<'SQL' || true
DELETE FROM flyway_schema_history WHERE version = '7' AND success = false;
SQL

echo "==> verifying application role authentication"
docker compose -f deploy/compose.yaml exec -T postgres sh -ec '
  pg_host=$(hostname)
  PGPASSWORD="$API_DB_PASSWORD" psql -h "$pg_host" -U techblog_api_app -d api_db -Atc "SELECT 1" >/dev/null
  PGPASSWORD="$CRAWLER_DB_PASSWORD" psql -h "$pg_host" -U techblog_crawler_app -d crawler_db -Atc "SELECT 1" >/dev/null
'

echo "==> building and starting the application services"
docker compose -f deploy/compose.yaml up -d --build --force-recreate \
  api-service crawler-service web

echo "==> waiting for both Spring services"
attempt=0
until curl -fsS --max-time 2 -o /dev/null http://127.0.0.1:8081/health/readiness 2>/dev/null \
    && curl -fsS --max-time 2 -o /dev/null http://127.0.0.1:8082/health/readiness 2>/dev/null; do
  attempt=$((attempt + 1))
  if [ "$attempt" -ge 90 ]; then
    echo "Spring services did not become ready within 180 s; recent logs:" >&2
    docker compose -f deploy/compose.yaml logs --tail=80 api-service crawler-service >&2 || true
    exit 1
  fi
  sleep 2
done

echo "==> waiting for the nginx edge (http://127.0.0.1:8090)"
attempt=0
until curl -fsS -o /dev/null http://127.0.0.1:8090/api/v1/sources 2>/dev/null; do
  attempt=$((attempt + 1))
  if [ "$attempt" -ge 90 ]; then
    echo "edge did not become ready within 180 s; recent logs:" >&2
    docker compose -f deploy/compose.yaml logs --tail=80 >&2 || true
    exit 1
  fi
  if [ $((attempt % 5)) -eq 0 ] \
      && ! docker compose -f deploy/compose.yaml ps --status running --services | grep -qx web; then
    echo "web container is not running; recent logs:" >&2
    docker compose -f deploy/compose.yaml logs --tail=80 web >&2 || true
    exit 1
  fi
  if [ "$attempt" -eq 15 ]; then
    echo "edge is up but api-service has not answered yet; recent api logs:" >&2
    docker compose -f deploy/compose.yaml logs --tail=80 api-service >&2 || true
  fi
  sleep 2
done

echo "==> installing e2e dependencies (Chromium included)"
cd e2e
if [ ! -d node_modules ]; then
  npm install
fi
npx playwright install chromium

echo "==> running Playwright stack project"
E2E_STACK=1 npm run test:stack

cd "$repo"
if [ "${KEEP_STACK:-0}" = "1" ]; then
  echo "==> stack left running; stop with: docker compose -f deploy/compose.yaml down"
else
  echo "==> stopping the compose stack"
  docker compose -f deploy/compose.yaml down
fi
