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
    production: {
      user: process.env.MN_PM2_USER,
      host: process.env.MN_PM2_HOST,
      ref: "origin/main",
      repo: "git@github.com:lnhow/mono.git",
      path: process.env.MN_PM2_PATH,
      "pre-setup": "pwd && && ls -la",
      "post-deploy": "pnpm i && pm2 reload ecosystem.config.js --env production",
      ssh_options: "ForwardAgent=yes"
    }
  }
}