git restore .
git pull
pnpm i
pnpm db:generate
pnpm run build --filter @hsp/app-api
