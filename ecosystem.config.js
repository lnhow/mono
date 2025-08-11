require('dotenv').config({ path: './apps/hsp/api/.env' })
module.exports = {
  apps: [
    { 
      name: "hsp-api",
      script: "pnpm",
      args: ["deploy:start", "--filter", "@hsp/app-api"],
      exec_mode: "fork",
      instances: 1,
      autorestart: true,
      error_file: '~/logs/hsp-api/err.log',
      out_file: '~/logs/hsp-api/out.log',
      log_file: '~/logs/hsp-api/combined.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss:SSS',
      env: {
        ...process.env
      }
    }
  ],
}