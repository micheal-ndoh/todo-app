############## Dependencies ##############
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

############## Build ##############
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

############## Runtime (Lambda container) ##############
FROM node:20-alpine AS runner
WORKDIR /app

# Add AWS Lambda Web Adapter (as an extension)
COPY --from=public.ecr.aws/awsguru/aws-lambda-adapter:0.8.4 /lambda-adapter /opt/extensions/lambda-adapter

ENV NODE_ENV=production
ENV PORT=3000
ENV RUST_LOG=info
ENV AWS_LWA_INVOKE_MODE=response_stream

# Use non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy Next.js standalone output
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone .
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

USER nextjs

# Lambda will route traffic via the adapter to this port
EXPOSE 3000

CMD ["node", "server.js"]