ARG NODE_VERSION
ARG PNPM_VERSION

# ============================================================================
# Stage 1: Builder
# ============================================================================
FROM node:${NODE_VERSION}-alpine3.22 AS builder

ARG PNPM_HOME=/pnpm
ARG PATH=${PNPM_HOME}:${PATH}
ARG CI=true

WORKDIR /app

RUN npm i -g pnpm@${PNPM_VERSION}

# モノレポ定義
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./

# アプリと依存パッケージの定義
COPY apps/frontend/package.json ./apps/frontend/package.json
COPY packages/typescript/package.json ./packages/typescript/package.json

# パッケージインストール
RUN pnpm install --frozen-lockfile

# ソースコード
COPY apps/frontend ./apps/frontend
COPY packages/typescript ./packages/typescript

# envファイルを削除 (環境変数を直接渡すため)
RUN rm -f apps/frontend/.env*

# フロントエンドのため、ビルド時に環境変数を埋め込む
ARG NEXT_PUBLIC_API_URL
ARG NODE_ENV

# ソースコードをビルド
RUN pnpm --filter frontend build

# ============================================================================
# Stage 2: Runtime
# ============================================================================
FROM node:${NODE_VERSION}-alpine3.22 as runtime

ENV PNPM_HOME=/pnpm
ENV PATH=${PNPM_HOME}:${PATH}
ENV PORT=3000

WORKDIR /app

RUN npm i -g pnpm@${PNPM_VERSION}

# ワークスペースルートの依存関係
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml

# ワークスペースの定義
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-workspace.yaml ./pnpm-workspace.yaml
COPY --from=builder /app/turbo.json ./turbo.json

# ビルド済アプリ本体
COPY --from=builder /app/apps/frontend/.next ./apps/frontend/.next
COPY --from=builder /app/apps/frontend/package.json ./apps/frontend/package.json
COPY --from=builder /app/apps/frontend/node_modules ./apps/frontend/node_modules

EXPOSE 3000

CMD ["pnpm", "--filter", "frontend", "start"]
