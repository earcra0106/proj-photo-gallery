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
FROM base AS installer
WORKDIR /app
RUN pnpm install -g turbo

COPY . .

RUN find . -name "*.env*" -delete

# ビルド済アプリと依存パッケージを抽出
RUN turbo prune backend --docker

# ============================================================================
# Stage 2: Builder
# ============================================================================
FROM base AS builder
WORKDIR /app
COPY --from=installer /app/out/json/ .
COPY --from=installer /app/out/pnpm-lock.yaml ./pnpm-lock.yaml

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
COPY --from=installer /app/out/full/ .

RUN pnpm build

# ============================================================================
# Stage 3: Runtime
# ============================================================================
FROM base AS runtime

WORKDIR /app

COPY --from=builder /app/ ./

WORKDIR /app/apps/backend

EXPOSE 3000

ARG CI=true

CMD ["pnpm", "start:prod"]
