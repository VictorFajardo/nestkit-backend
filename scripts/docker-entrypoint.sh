#!/bin/bash
set -e

echo "ENTRYPOINT DEBUG - PORT: $PORT"

# Wait for DB (Postgres) to be ready
/app/wait-for-it.sh db:5432 --timeout=30 --strict -- echo "Database is up"

# Start the app
exec node dist/main