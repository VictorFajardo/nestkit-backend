# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Install bash temporarily for scripts if needed
RUN apk add --no-cache bash

COPY package*.json ./
COPY tsconfig.json ./
RUN npm ci

COPY . .
RUN npx prisma generate
RUN npm run build

# Stage 2: Production
FROM node:20-alpine

WORKDIR /app

# Install bash for wait-for-it.sh compatibility
RUN apk add --no-cache bash

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma

# Scripts
COPY scripts/wait-for-it.sh /app/wait-for-it.sh
COPY scripts/docker-entrypoint.sh /app/docker-entrypoint.sh
RUN chmod +x /app/wait-for-it.sh /app/docker-entrypoint.sh

EXPOSE 3000

ENTRYPOINT ["/app/docker-entrypoint.sh"]
