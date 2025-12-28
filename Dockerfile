FROM node:20-alpine AS base
RUN corepack enable && corepack prepare pnpm@latest --activate

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy workspace config and all package.json files
COPY pnpm-workspace.yaml ./
COPY package.json pnpm-lock.yaml* ./
COPY packages/typescript-config ./packages/typescript-config/
COPY packages/tailwind-config ./packages/tailwind-config/
COPY packages/shared-auth/package.json ./packages/shared-auth/
COPY packages/shared-ui/package.json ./packages/shared-ui/

# Install all workspace dependencies
RUN pnpm install --frozen-lockfile || pnpm install

FROM base AS builder
WORKDIR /app

# Copy everything from deps including node_modules
COPY --from=deps /app ./

# Copy source files
COPY packages/shared-auth ./packages/shared-auth/
COPY packages/shared-ui ./packages/shared-ui/
COPY app ./app/
COPY public ./public/
COPY next.config.ts tailwind.config.ts postcss.config.mjs tsconfig.json ./

# Build shared packages first
WORKDIR /app/packages/shared-auth
RUN pnpm run build

WORKDIR /app/packages/shared-ui
RUN pnpm run build

# Build the main app
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
RUN pnpm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
