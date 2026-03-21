ARG NODE_VERSION=24.13.1
ARG PNPM_VERSION=10.29.3

FROM node:${NODE_VERSION}-alpine3.22

ENV PNPM_HOME=/pnpm
ENV PATH=${PNPM_HOME}:${PATH}

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY apps/frontend/package.json ./apps/frontend/package.json
COPY packages/eslint-config/package.json ./packages/eslint-config/package.json
COPY packages/prettier-config/package.json ./packages/prettier-config/package.json

RUN pnpm install --frozen-lockfile --filter ./apps/frontend...

COPY apps/frontend ./apps/frontend
COPY packages/eslint-config ./packages/eslint-config
COPY packages/prettier-config ./packages/prettier-config

ARG NEXT_PUBLIC_API_URL=/api
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
ENV NODE_ENV=production
ENV PORT=3000

RUN pnpm --filter ./apps/frontend... build

EXPOSE 3000

CMD ["pnpm", "--filter", "./apps/frontend...", "start"]
