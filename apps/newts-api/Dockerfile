## BUILD STEP
FROM node:18-alpine AS base

FROM base AS builder
RUN apk add --no-cache libc6-compat
RUN apk update
# Set working directory
WORKDIR /app
RUN yarn global add turbo
COPY . .
RUN turbo prune --scope=newts-api --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app

# First install the dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock
RUN yarn install

# Build the project
COPY --from=builder /app/out/full/ .
RUN yarn turbo run build --filter=newts-api...

## RUN STEP
FROM base AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 strapi
USER strapi

COPY --from=installer /app/apps/newts-api/package.json .

# Automatically leverage output traces to reduce image size
# https://strapi.org/docs/advanced-features/output-file-tracing
COPY --from=installer --chown=strapi:nodejs /app/apps/newts-api/build ./build

EXPOSE 1337

CMD yarn deploy:start
