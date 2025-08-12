pm2 delete ecosystem.config.js --only hsp-api || true
rm -rf ./out
pnpm turbo prune @hsp/app-api

pnpm -C out i --frozen-lockfile --ignore-scripts --filter @hsp/app-api...
pnpm -C out db:generate --filter @hsp/app-api
pnpm -C out run build --filter @hsp/app-api

cp apps/hsp/api/.env out/apps/hsp/api/.env
