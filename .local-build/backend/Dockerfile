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
COPY apps/backend/package.json ./apps/backend/package.json
COPY packages/prisma/package.json ./packages/prisma/package.json
COPY packages/typescript/package.json ./packages/typescript/package.json

# パッケージインストール
RUN pnpm install --frozen-lockfile

# ソースコード
COPY apps/backend ./apps/backend
COPY packages/prisma ./packages/prisma
COPY packages/typescript ./packages/typescript

# ソースコードをビルド
RUN pnpm --filter backend build

# ビルド成果物の存在確認
RUN test -n "$(find ./apps/backend/dist -type f -name main.js | head -n 1)"

# ============================================================================
# Stage 2: Runtime
# ============================================================================
FROM node:${NODE_VERSION}-alpine3.22

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
COPY --from=builder /app/apps/backend/dist ./apps/backend/dist
COPY --from=builder /app/apps/backend/package.json ./apps/backend/package.json
COPY --from=builder /app/apps/backend/node_modules ./apps/backend/node_modules

# ビルド済アプリの依存パッケージ
COPY --from=builder /app/packages/prisma/dist ./packages/prisma/dist
COPY --from=builder /app/packages/prisma/package.json ./packages/prisma/package.json
COPY --from=builder /app/packages/prisma/node_modules ./packages/prisma/node_modules

EXPOSE 3000

CMD ["pnpm", "--filter", "backend", "start:prod"]