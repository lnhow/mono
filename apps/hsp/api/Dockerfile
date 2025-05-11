## BUILD STEP #######################################################
FROM node:22.15.0-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS prebuild
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app

FROM prebuild AS prune
ENV TURBO_VERSION=2.5.0
RUN pnpm add -g turbo@${TURBO_VERSION}

COPY . .
RUN pnpm turbo prune @hsp/app-api --docker

# Add lockfile and package.json's of isolated subworkspace
FROM prebuild AS build
# First install the dependencies (as they change less often)
COPY --from=prune /app/out/json/ .
COPY --from=prune /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# Build the project
COPY --from=prune /app/out/full/ .
RUN pnpm turbo run build --filter=@hsp/app-api...

## RUN STEP #########################################################
FROM base AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 api
USER api

COPY --from=build /app .

EXPOSE 8000

CMD ["sh", "-c", "pnpm deploy:start --filter=@hsp/app-api"]
