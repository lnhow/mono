pm2 delete ecosystem.config.js --only "hsp-api"

git restore .
git pull

echo "$PWD"

sh "$PWD/apps/hsp/api/.ci/build.sh"
sh "$PWD/apps/hsp/api/.ci/start.sh"
