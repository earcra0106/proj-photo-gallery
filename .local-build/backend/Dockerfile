ARG NODE_VERSION=24.13.1
ARG PNPM_VERSION=10.29.3

FROM node:${NODE_VERSION}-alpine3.22

ENV PNPM_HOME=/pnpm
ENV PATH=${PNPM_HOME}:${PATH}

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY apps/backend/package.json ./apps/backend/package.json
COPY packages/prisma/package.json ./packages/prisma/package.json
COPY packages/typescript/package.json ./packages/typescript/package.json

RUN pnpm install --frozen-lockfile

COPY apps/backend ./apps/backend
COPY packages/prisma ./packages/prisma
COPY packages/typescript ./packages/typescript
COPY .local-build/backend/entrypoint.sh ./entrypoint.sh

RUN pnpm --filter ./packages/prisma... build
RUN pnpm --filter ./apps/backend... build
RUN test -n "$(find ./apps/backend/dist -type f -name main.js | head -n 1)"
RUN chmod +x ./entrypoint.sh

EXPOSE 3000

CMD ["./entrypoint.sh"]