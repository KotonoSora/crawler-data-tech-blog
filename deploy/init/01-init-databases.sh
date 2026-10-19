#!/bin/sh
# Runs once on a fresh postgres data directory (docker-entrypoint-initdb.d).
# Creates crawler_db + api_db and the least-privilege app roles (baseline 03 §2).
set -eu

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<EOSQL
CREATE DATABASE crawler_db;
CREATE DATABASE api_db;
CREATE ROLE techblog_crawler_app LOGIN PASSWORD '${CRAWLER_DB_PASSWORD}';
CREATE ROLE techblog_api_app     LOGIN PASSWORD '${API_DB_PASSWORD}';
GRANT CONNECT ON DATABASE crawler_db TO techblog_crawler_app;
GRANT CONNECT ON DATABASE api_db     TO techblog_api_app;
EOSQL

for db in crawler_db api_db; do
  app_role="techblog_${db%%_db}_app"
  psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$db" <<EOSQL
ALTER DEFAULT PRIVILEGES FOR ROLE ${POSTGRES_USER} IN SCHEMA public
  GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO ${app_role};
ALTER DEFAULT PRIVILEGES FOR ROLE ${POSTGRES_USER} IN SCHEMA public
  GRANT USAGE, SELECT ON SEQUENCES TO ${app_role};
EOSQL
done
