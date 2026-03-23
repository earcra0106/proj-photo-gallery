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

# Copy workspace files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./

# Copy package.json files for dependency resolution
COPY packages/prisma/package.json ./packages/prisma/package.json

# Install all dependencies (including devDependencies for build)
RUN pnpm install --frozen-lockfile

# Copy source code
COPY packages/prisma ./packages/prisma

# Build packages (prisma first due to dependency in turbo.json)
RUN pnpm --filter @repo/prisma build

# Copy entrypoint script
COPY .local-build/prisma/entrypoint.sh ./entrypoint.sh
RUN chmod +x ./entrypoint.sh

EXPOSE 3000

CMD ["./entrypoint.sh"]