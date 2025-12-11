FROM node:20-alpine AS builder
RUN npm install -g pnpm@9.0.0

FROM builder AS dependencies
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/api/package.json ./apps/api/
RUN pnpm install

FROM builder AS build
WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=dependencies /app/apps/api/node_modules ./apps/api/node_modules
COPY . .
WORKDIR /app/apps/api
RUN pnpm build

FROM node:20-alpine AS prod
WORKDIR /app
COPY --from=build /app/apps/api/package.json ./package.json
RUN npm install -g pnpm@9.0.0
RUN pnpm install --prod
COPY --from=build /app/apps/api/dist ./dist
COPY apps/api/.env* ./

EXPOSE 8080

CMD ["node", "dist/main"]
