pm2 delete hsp-api

git restore .
git pull

sh "$PWD/apps/hsp/api/.ci/post-deploy.sh"
