#!/bin/bash
set -e

TUNNEL_NAME="porto"

echo "=== Buat config directory ==="
sudo mkdir -p /etc/cloudflared
sudo mkdir -p /opt/porto-rangga

echo "=== Buat cloudflared config ==="
echo ""
echo "Masukkan domain untuk masing-masing layanan."
echo "(Tekan Enter untuk skip jika belum punya domainnya)"
echo ""

read -p "Domain untuk PORTFOLIO (default: ranggamrw.my.id): " DOMAIN_PORTO
DOMAIN_PORTO=${DOMAIN_PORTO:-ranggamrw.my.id}

read -p "PORT aplikasi portfolio (default: 3000): " PORT_PORTO
PORT_PORTO=${PORT_PORTO:-3000}

read -p "Domain untuk APP 2 (opsional, Enter untuk skip): " DOMAIN_APP2
read -p "PORT untuk APP 2 (opsional): " PORT_APP2

read -p "Domain untuk APP 3 (opsional, Enter untuk skip): " DOMAIN_APP3
read -p "PORT untuk APP 3 (opsional): " PORT_APP3

# Build config file
sudo tee /etc/cloudflared/config.yml > /dev/null <<EOF
tunnel: ${TUNNEL_NAME}
credentials-file: /root/.cloudflared/${TUNNEL_NAME}.json

ingress:
EOF

if [ -n "$DOMAIN_PORTO" ]; then
  sudo tee -a /etc/cloudflared/config.yml > /dev/null <<EOF
  - hostname: ${DOMAIN_PORTO}
    service: http://localhost:${PORT_PORTO}
  - hostname: www.${DOMAIN_PORTO}
    service: http://localhost:${PORT_PORTO}
EOF
fi

if [ -n "$DOMAIN_APP2" ] && [ -n "$PORT_APP2" ]; then
  sudo tee -a /etc/cloudflared/config.yml > /dev/null <<EOF
  - hostname: ${DOMAIN_APP2}
    service: http://localhost:${PORT_APP2}
  - hostname: www.${DOMAIN_APP2}
    service: http://localhost:${PORT_APP2}
EOF
fi

if [ -n "$DOMAIN_APP3" ] && [ -n "$PORT_APP3" ]; then
  sudo tee -a /etc/cloudflared/config.yml > /dev/null <<EOF
  - hostname: ${DOMAIN_APP3}
    service: http://localhost:${PORT_APP3}
  - hostname: www.${DOMAIN_APP3}
    service: http://localhost:${PORT_APP3}
EOF
fi

# Catch-all rule (wajib ada di akhir)
sudo tee -a /etc/cloudflared/config.yml > /dev/null <<EOF
  - service: http_status:404
EOF

echo ""
echo "=== Config yang dibuat: ==="
cat /etc/cloudflared/config.yml
echo ""

echo "=== Install & jalankan cloudflared sebagai service ==="
sudo cloudflared service install
sudo systemctl enable cloudflared
sudo systemctl restart cloudflared

echo ""
echo "=== DONE! ==="
echo ""
echo "Config sudah jalan. Langkah terakhir:"
echo "1. Buka Cloudflare Dashboard → Domain kamu → DNS"
echo "2. Untuk setiap domain, tambahkan CNAME record:"
echo "   Name: @ atau www"
echo "   Target: <TUNNEL_UUID>.cfargotunnel.com"
echo "   Proxy status: DNS only OFF (harus Proxied/Orange cloud)"
echo ""
echo "Atau lebih mudah: Cloudflare Zero Trust → Networks → Tunnels"
echo "→ pilih tunnel '${TUNNEL_NAME}' → Public Hostnames → Add"
echo "(Cloudflare akan otomatis buat DNS record untuk kamu)"
echo ""
echo "Cek status: sudo systemctl status cloudflared"
echo "Cek logs:   sudo journalctl -u cloudflared -f"
