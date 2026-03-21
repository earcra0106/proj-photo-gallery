#!/bin/sh
set -eu

echo "[backend] Run Prisma migrate deploy"
pnpm --filter ./packages/prisma... exec prisma migrate deploy

if [ "${ENABLE_DB_SEED:-false}" = "true" ]; then
  echo "[backend] Run Prisma seed"
  pnpm --filter ./packages/prisma... seed
fi

echo "[backend] Start NestJS"
exec pnpm --filter ./apps/backend... start:prod