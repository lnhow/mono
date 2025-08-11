module.exports = {
  apps: [
    { 
      name: "hsp-api",
      script: "pnpm",
      args: ["deploy:start", "--filter", "@hsp/app-api"],
      instances: 1,
      autorestart: true,
    }
  ],
  deploy: {
    hsp_api_production: {
      user: process.env.MN_PM2_USER,
      host: process.env.MN_PM2_HOST,
      ref: "origin/deploy",
      repo: "git@github.com:lnhow/mono.git",
      path: `${process.env.MN_PM2_PATH}/hsp-api`,
      "pre-setup": "pwd",
      "post-setup": "ls -la && $HOME/npm install --global corepack@latest && corepack enable pnpm",
      "post-deploy": "apps/hsp/api/.ci/build.sh",
      ssh_options: "ForwardAgent=yes"
    }
  }
}