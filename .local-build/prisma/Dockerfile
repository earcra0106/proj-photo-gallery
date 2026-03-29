ARG NODE_VERSION
ARG PNPM_VERSION

# ============================================================================
# Base
# ============================================================================
FROM node:${NODE_VERSION}-alpine3.22 AS base

ENV PNPM_HOME=/pnpm
ENV PATH=${PNPM_HOME}:${PATH}
RUN npm i -g pnpm@${PNPM_VERSION}

# ============================================================================
# Stage 1: Pruner
# ============================================================================
FROM base AS pruner
WORKDIR /app
RUN pnpm install -g turbo

COPY . .

# ビルド済アプリと依存パッケージを抽出
RUN turbo prune @repo/prisma --docker

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

# エントリポイントをコピー
COPY .local-build/prisma/entrypoint.sh ./entrypoint.sh
RUN chmod +x ./entrypoint.sh

EXPOSE 5555

CMD ["./entrypoint.sh"]