pm2 delete hsp-api

git restore .
git pull

./build.sh

./start.sh
