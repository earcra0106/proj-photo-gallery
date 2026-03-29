ARG NODE_VERSION=24.13.1
ARG PNPM_VERSION=10.29.3

# ============================================================================
# Base
# ============================================================================
FROM node:${NODE_VERSION}-alpine3.22 AS base

ENV PNPM_HOME=/pnpm
ENV PATH=${PNPM_HOME}:${PATH}
RUN npm i -g pnpm@${PNPM_VERSION}

# ============================================================================
# Stage 1: Installer
# ============================================================================
FROM base AS pruner
WORKDIR /app
RUN pnpm install -g turbo

COPY . .

# ビルド済アプリと依存パッケージを抽出
RUN turbo prune backend --docker

# ============================================================================
# Stage 2: Builder
# ============================================================================
FROM base AS builder
WORKDIR /app
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml

# 依存関係のインストール (docker buildのキャッシュを保存)
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

COPY --from=pruner /app/out/full/ .

RUN pnpm build

# ============================================================================
# Stage 3: Runtime
# ============================================================================
FROM base AS runtime

WORKDIR /app

COPY --from=pruner /app/out/json/ .
RUN pnpm install --prod --frozen-lockfile

COPY --from=builder /app/apps/backend/dist/ ./apps/backend/dist
COPY --from=builder /app/packages/prisma/dist/ ./packages/prisma/dist

WORKDIR /app/apps/backend/dist

EXPOSE 3000

CMD ["node", "./src/main.js"]
