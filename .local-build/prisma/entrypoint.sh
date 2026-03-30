#!/bin/sh
set -eu

ESC=$(printf '\033')
BIGREEN="${ESC}[1;92m"

echo "${BIGREEN}Migrationを実行中 : ${DATABASE_URL}${ESC}[m"
pnpm --filter @repo/prisma db:migrate:prod

if [ "${ENABLE_DB_SEED:-false}" = "true" ]; then
  echo "${BIGREEN}初期データの投入を実行中 : ${DATABASE_URL}${ESC}[m"
  pnpm --filter @repo/prisma db:seed
fi

if [ "${ENABLE_PRISMA_STUDIO:-false}" = "true" ]; then
  echo "${BIGREEN}Prisma Studioを起動中${ESC}[m"
  exec pnpm --filter @repo/prisma db:studio --browser none --port ${PRISMA_STUDIO_PORT:-5555}
else
  echo "${BIGREEN}Prisma Studioを起動する場合は、環境変数 ENABLE_PRISMA_STUDIO をtrueに設定してください。${ESC}[m"
  echo "${BIGREEN}コンテナを終了します。${ESC}[m"
fi