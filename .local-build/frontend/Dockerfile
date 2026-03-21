ARG NODE_VERSION=24.13.1

FROM node:${NODE_VERSION}-alpine3.22

WORKDIR /app/apps/frontend

COPY apps/frontend/package.json apps/frontend/package-lock.json ./
RUN npm ci

COPY apps/frontend ./

ARG NEXT_PUBLIC_API_URL=/api
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
ENV NODE_ENV=production
ENV PORT=3000

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
