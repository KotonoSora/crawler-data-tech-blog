#!/bin/sh
# Idempotent database/role bootstrap. Runs on a fresh Postgres data directory and is also
# re-run by e2e/run-stack.sh so a volume initialized before these roles existed is repaired.
set -eu

psql -v ON_ERROR_STOP=1 \
  --username "$POSTGRES_USER" \
  --dbname postgres \
  -v pg_user="$POSTGRES_USER" \
  -v pg_pw="$POSTGRES_PASSWORD" \
  -v crawler_pw="$CRAWLER_DB_PASSWORD" \
  -v api_pw="$API_DB_PASSWORD" <<'EOSQL'
SELECT 'CREATE DATABASE crawler_db'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'crawler_db')
\gexec

SELECT 'CREATE DATABASE api_db'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'api_db')
\gexec

DO $$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'techblog_crawler_app') THEN
    CREATE ROLE techblog_crawler_app LOGIN;
  END IF;
  IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'techblog_api_app') THEN
    CREATE ROLE techblog_api_app LOGIN;
  END IF;
END
$$;

ALTER ROLE :"pg_user" LOGIN PASSWORD :'pg_pw';
ALTER ROLE techblog_crawler_app LOGIN PASSWORD :'crawler_pw';
ALTER ROLE techblog_api_app LOGIN PASSWORD :'api_pw';

GRANT CONNECT ON DATABASE crawler_db TO techblog_crawler_app;
GRANT CONNECT ON DATABASE api_db     TO techblog_api_app;
EOSQL

for db in crawler_db api_db; do
  case "$db" in
    crawler_db) app_role=techblog_crawler_app ;;
    api_db)     app_role=techblog_api_app ;;
  esac
  psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$db" <<EOSQL
ALTER DEFAULT PRIVILEGES FOR ROLE ${POSTGRES_USER} IN SCHEMA public
  GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO ${app_role};
ALTER DEFAULT PRIVILEGES FOR ROLE ${POSTGRES_USER} IN SCHEMA public
  GRANT USAGE, SELECT ON SEQUENCES TO ${app_role};
GRANT USAGE ON SCHEMA public TO ${app_role};
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO ${app_role};
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO ${app_role};
EOSQL
done
