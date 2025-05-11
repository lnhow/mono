pm2 delete hsp-api

git restore .
git pull

echo "$PWD"

sh "$PWD/apps/hsp/api/.ci/build.sh"
sh "$PWD/apps/hsp/api/.ci/start.sh"
