#!/bin/bash
set -e

echo "=== Setup SSL dengan Let's Encrypt (opsional, untuk Full Strict SSL) ==="
echo "Ini opsional. Cloudflare Full sudah aman tanpa ini."
echo "Kalau mau Full Strict SSL, jalankan script ini setelah domain aktif."
echo ""

sudo apt install -y certbot python3-certbot-nginx

sudo certbot --nginx -d ranggamrw.my.id -d www.ranggamrw.my.id --non-interactive --agree-tos --email ranggamrw.my.id@gmail.com

sudo systemctl renew --dry-run

echo "=== SSL Setup Selesai ==="
echo "Sekarang di Cloudflare, ganti SSL/TLS mode ke 'Full (Strict)'"
