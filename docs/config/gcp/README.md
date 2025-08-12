# Deploying to GCP
## Prerequisites
1. Install the gcloud CLI
2. Authenticate with gcloud

## Compute Engine (or VPS)
1. Create a Compute Engine instance
2. SSH into the instance
3. Install global dependencies

```bash
# Install Node.js:
# Download and install nvm:
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
# in lieu of restarting the shell
\. "$HOME/.nvm/nvm.sh"
# Download and install Node.js:
nvm install 22
# Verify the Node.js version:
node -v # Should print "v22.15.0".

corepack enable

# Install pm2
npm install pm2 -g
pm2 --version # Should print "5.1.0".

# nano
sudo apt install nano -y

# git
sudo apt update
sudo apt install git -y
git --version
git config --global user.name "Your Name"
git config --global user.email "youremail@example.com"

# nginx
sudo apt install nginx -y
```

4. Configure SSL for nginx (optional)

```bash
# Install certbot
sudo apt install certbot python3-certbot-nginx -y
# Continue on https://certbot.eff.org/instructions?ws=nginx&os=pip
```

5. Create a new SSH key and add it to your GitHub account's SSH keys.
```bash
# Generate a new SSH key:
ssh-keygen -t ed25519 -C "github@email.com"
# Open the public key file:
# /path/to/.ssh should be displayed after running the above command.
# Default path: /home/<yourusername>/.ssh/id_ed25519.pub
nano /path/to/.ssh/id_ed25519.pub
# Copy the contents of the file to your GitHub account's SSH keys.
```

6. Clone the source code

```bash
# Make a new directory for your projects:
mkdir ~/app
git clone git@github.com:yourusername/yourrepo.git ~/app
```

7. Install dependencies

```bash
cd ~/app
pnpm i --frozen-lockfile

pnpm db:generate
pnpm build --filter=@hsp/app-api
pnpm deploy:start --filter=@hsp/app-api
```

### Deploying changes

```bash
# ssh to server
cd ~/app && ~/app/apps/hsp/api/.ci/deploy.sh
```

### Configurations

#### Nginx Reverse Proxy
```bash
# cd /etc/nginx/sites-available
# sudo nano <server_name>.config

server {
  server_name api.hspln.com;

  # HTTP configuration
  listen 80;
  listen [::]:80;

  # HTTP to HTTPS
  if ($scheme != "https") {
    return 301 https://$host$request_uri;
  } # managed by Certbot

  # HTTPS configuration
  listen [::]:443 ssl ipv6only=on; # managed by Certbot
  listen 443 ssl; # managed by Certbot
  ssl_certificate /etc/letsencrypt/live/api.hspln.com/fullchain.pem; # managed by Certbot
  ssl_certificate_key /etc/letsencrypt/live/api.hspln.com/privkey.pem; # managed by Certbot
  include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
  ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

  location / {
    proxy_pass http://127.0.0.1:8000;

    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;

    proxy_redirect                      off;
    proxy_set_header  Host              $http_host;
    proxy_set_header  X-Real-IP         $remote_addr;
    proxy_set_header  X-Forwarded-For   $proxy_add_x_forwarded_for;
    proxy_set_header  X-Forwarded-Proto $scheme;
    proxy_read_timeout                  900;
  }
}

# sudo ln -s /etc/nginx/sites-available/<server_name>.config /etc/nginx/sites-enabled/
# sudo nginx -t
# If "conflicting" is displayed, run "sudo unlink /etc/nginx/sites-enabled/default"
# sudo systemctl restart nginx
```
#### PM2
```bash
pm2 startup
pm2 start --name hsp-api pnpm -- deploy:start --filter=@hsp/app-api # Start the process named "hsp-api"
pm2 delete hsp-api # Close the process "hsp-api" if it's running
```

Restart process on reboot
```bash
pm2 startup
pm2 save
```
