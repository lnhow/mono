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

# Generate a new SSH key:
ssh-keygen -t ed25519 -C "github@email.com"
cd /path/to/.ssh
nano id_ed25519.pub
# Copy the contents of the file to your GitHub account's SSH keys.

# Make a new directory for your projects:
mkdir ~/app
```

5. Clone the repo `git clone git@github.com:yourusername/yourrepo.git ~/app`
6. Install dependencies

```bash
cd ~/app
pnpm install

pnpm db:generate
pnpm build --filter=@hsp/app-api
pnpm deploy:start --filter=@hsp/app-api
```