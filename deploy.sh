#!/bin/bash
set -e

echo "=== 1. Update system & install dependencies ==="
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl git build-essential nginx

echo "=== 2. Install Node.js 20 LTS ==="
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

echo "=== 3. Install PM2 ==="
sudo npm install -g pm2

echo "=== 4. Clone repo ==="
cd /opt
sudo git clone https://github.com/ranggamaulana111111-bit/porto.git porto-rangga
cd porto-rangga
sudo chown -R $USER:$USER /opt/porto-rangga

echo "=== 5. Install & Build ==="
npm install
npm run build

echo "=== 6. Start with PM2 ==="
pm2 start npm --name "porto" -- run start
pm2 save
pm2 startup

echo "=== 7. Setup Nginx ==="
sudo tee /etc/nginx/sites-available/porto > /dev/null <<'EOF'
server {
    listen 80;
    server_name ranggamrw.my.id www.ranggamrw.my.id;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF

sudo ln -sf /etc/nginx/sites-available/porto /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx
sudo systemctl enable nginx

echo "=== 8. Setup Firewall ==="
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw --force enable

echo ""
echo "=== DONE! ==="
echo "Server sudah jalan. Selanjutnya:"
echo "1. Pastikan IP server kamu sudah diarahkan ke Cloudflare"
echo "2. A records di Cloudflare: ranggamrw.my.id -> IP server kamu"
echo "3. SSL/TLS di Cloudflare: set ke 'Full'"
echo "4. Cek https://ranggamrw.my.id di browser"
