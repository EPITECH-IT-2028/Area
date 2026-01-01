FROM node:20-alpine AS builder
RUN npm install -g pnpm@9.0.0

FROM builder AS dependencies
WORKDIR /app
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install

FROM builder AS build
WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
RUN pnpm build

FROM node:20-alpine AS production
WORKDIR /app
RUN npm install -g pnpm@9.0.0
COPY package.json ./
RUN pnpm install --prod

COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/next.config.mjs ./
COPY .env* ./

EXPOSE 8081

CMD ["pnpm", "start", "-p", "8081"]
