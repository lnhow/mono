pm2 delete hsp-api

git restore .
git pull

./build-hsp-api.sh

./start-hsp-api.sh