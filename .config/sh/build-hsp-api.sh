rm -rf apps/hsp/api/generated/prisma
git pull
pnpm i
pnpm run build --filter @hsp/app-api
