pm2 delete hsp-api

git restore .
git pull

echo "$PWD"

sh ./build.sh

sh ./start.sh
