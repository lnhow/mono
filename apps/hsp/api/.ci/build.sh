pnpm i --frozen-lockfile
pnpm db:generate
pnpm run build --filter @hsp/app-api
