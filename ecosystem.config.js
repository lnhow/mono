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
      "post-setup": "ls -la && npm install --global corepack@latest turbo@2.5.5 && corepack enable pnpm",
      "post-deploy": "apps/hsp/api/.ci/post-deploy.sh",
      ssh_options: "ForwardAgent=yes"
    }
  }
}