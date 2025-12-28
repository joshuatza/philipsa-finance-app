FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package files for all packages
COPY package.json ./
COPY packages/typescript-config/package.json ./packages/typescript-config/
COPY packages/tailwind-config/package.json ./packages/tailwind-config/
COPY packages/shared-auth/package.json ./packages/shared-auth/
COPY packages/shared-ui/package.json ./packages/shared-ui/

# Install dependencies with npm - use registry explicitly and increase timeout
RUN npm config set registry https://registry.npmjs.org/ && \
    npm config set fetch-timeout 300000 && \
    npm install --legacy-peer-deps --loglevel verbose 2>&1 | tail -100

# Build shared packages
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build shared-auth first (it's a dependency of shared-ui)
WORKDIR /app/packages/shared-auth
RUN npm run build

# Build shared-ui
WORKDIR /app/packages/shared-ui
RUN npm run build

# Build the app
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set correct permissions for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Copy standalone build
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
