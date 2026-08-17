#!/bin/bash
set -e

echo "=== 1. Install cloudflared ==="
curl -fsSL https://pkg.cloudflare.com/cloudflare-main.gpg | sudo tee /usr/share/keyrings/cloudflare-main.gpg >/dev/null
echo "deb [signed-by=/usr/share/keyrings/cloudflare-main.gpg] https://pkg.cloudflare.com/cloudflared $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/cloudflared.list
sudo apt update && sudo apt install -y cloudflared

echo "=== 2. Install Node.js 20 LTS ==="
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

echo "=== 3. Install PM2 & Nginx ==="
sudo npm install -g pm2
sudo apt install -y nginx

echo "=== 4. Setup Firewall ==="
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw --force enable

echo ""
echo "=== DONE! Instalasi selesai ==="
echo ""
echo "Langkah selanjutnya:"
echo "1. Login Cloudflare:  cloudflared tunnel login"
echo "2. Buat tunnel:       cloudflared tunnel create porto"
echo "3. Copy token dari:   https://dash.cloudflare.com → Zero Trust → Networks → Tunnels"
echo "4. Jalankan setup-tunnel.sh"
