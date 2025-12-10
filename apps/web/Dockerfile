FROM node:20-alpine AS builder
RUN npm install -g pnpm@9.0.0

FROM builder AS dependencies
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/web/package.json ./apps/web/
RUN pnpm install

FROM builder AS build
WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=dependencies /app/apps/web/node_modules ./apps/web/node_modules
COPY . .
WORKDIR /app/apps/web
RUN pnpm build

FROM builder AS production
WORKDIR /app
COPY --from=dependencies /app/apps/web/package.json ./package.json
COPY --from=dependencies /app/apps/web/node_modules ./node_modules
COPY --from=build /app/apps/web/.next ./.next
COPY --from=build /app/apps/web/public ./public
COPY apps/web/next.config.ts ./
RUN npm install -g pnpm@9.0.0

EXPOSE 8081

CMD ["pnpm", "start", "-p", "8081"]
