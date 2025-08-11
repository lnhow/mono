pnpm i --frozen-lockfile --ignore-scripts
pnpm db:generate --filter @hsp/app-api
pnpm run build --filter @hsp/app-api
