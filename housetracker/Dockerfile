# Stage 1: Build stage
FROM node:20 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build:ssr

# Stage 2: Runtime stage
FROM node:20-alpine AS runner

WORKDIR /app

COPY --from=builder /app/dist /app/dist
COPY package*.json ./
RUN npm ci --omit=dev

EXPOSE 4000
CMD ["node", "dist/housetracker/server/server.mjs"]
