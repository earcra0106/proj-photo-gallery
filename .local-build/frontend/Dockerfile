ARG NODE_VERSION=24.13.1
ARG PNPM_VERSION=10.29.3

# ============================================================================
# Stage 1: Builder
# ============================================================================
FROM node:${NODE_VERSION}-alpine3.22 AS builder

ENV PNPM_HOME=/pnpm
ENV PATH=${PNPM_HOME}:${PATH}
ENV CI=true

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

# ソースコードをビルド
RUN pnpm --filter frontend build

# ============================================================================
# Stage 2: Runtime
# ============================================================================
ARG NEXT_PUBLIC_API_URL=/api

FROM node:${NODE_VERSION}-alpine3.22

ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
ENV PNPM_HOME=/pnpm
ENV PATH=${PNPM_HOME}:${PATH}
ENV NODE_ENV=production

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
