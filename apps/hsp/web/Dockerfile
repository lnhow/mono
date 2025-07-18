FROM node:22-alpine AS base

ARG MAIN_API
ENV MAIN_API=$MAIN_API

ARG PRIVATE_MAIN_API
ENV PRIVATE_MAIN_API=$PRIVATE_MAIN_API

ARG NEXT_PUBLIC_HOST
ENV NEXT_PUBLIC_HOST=$NEXT_PUBLIC_HOST

ENV PHASE=build

# This Dockerfile is copy-pasted into our main docs at /docs/handbook/deploying-with-docker.
# Make sure you update both files!

FROM base AS builder
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
RUN apk update
# Set working directory
WORKDIR /app
RUN yarn global add turbo
COPY . .
RUN turbo prune --scope=@hsp/app-web --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apk add --update python3 make g++ && rm -rf /var/cache/apk/*
RUN yarn global add node-gyp
RUN apk update
WORKDIR /app

# First install the dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock
RUN yarn install

# Build the project
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json

# Uncomment and use build args to enable remote caching
# ARG TURBO_TEAM
# ENV TURBO_TEAM=$TURBO_TEAM

# ARG TURBO_TOKEN
# ENV TURBO_TOKEN=$TURBO_TOKEN

RUN yarn turbo run build --filter=@hsp/app-web...

## RUN STEP #########################################################
FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=installer /app .
RUN chown -R nextjs:nodejs .

# Don't run production as root
USER nextjs

EXPOSE 3000

CMD yarn workspace @hsp/app-web deploy:start
