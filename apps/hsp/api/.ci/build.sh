pnpm i --frozen-lockfile --prod
pnpm db:generate
pnpm run build --filter @hsp/app-api
