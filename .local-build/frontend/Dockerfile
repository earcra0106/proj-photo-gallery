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
RUN turbo prune frontend --docker

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

# フロントエンドのため、ビルド時に環境変数を埋め込む
ARG NEXT_PUBLIC_API_URL
ARG NODE_ENV

RUN pnpm build

# ============================================================================
# Stage 3: Runtime
# ============================================================================
FROM base AS runtime

WORKDIR /app

# スタンドアロンモードでビルドされたNext.jsアプリをコピー
COPY --from=builder /app/apps/frontend/.next/standalone/ ./

EXPOSE 3000

CMD ["node", "./apps/frontend/server.js"]
