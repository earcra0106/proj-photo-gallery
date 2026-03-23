#!/bin/sh
set -eu

echo "[prisma] Run Migrations : ${DATABASE_URL}"
pnpm --filter @repo/prisma migrate:prod

if [ "${ENABLE_DB_SEED:-false}" = "true" ]; then
  echo "[prisma] Run Seeding"
  pnpm --filter @repo/prisma seed
fi

echo "[prisma] Start Prisma Studio"
exec pnpm --filter @repo/prisma studio --browser none --port 5555