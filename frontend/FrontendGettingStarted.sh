#!/bin/bash
# Install nodejs and npm
sudo apt install nodejs npm -y
# Download and install nvm:
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
# in lieu of restarting the shell
\. "$HOME/.nvm/nvm.sh"
# Download and install Node.js Version 24 to run Vite:
nvm install 24
# Verify the Node.js version:
node -v # Should print "v24.10.0".
# Verify npm version:
npm -v # Should print "11.6.1".
# Check React Version (should be 18.3)
npm list react
# Change to frontend folder
# Install modules
npm install
# Run Website
npm run dev
