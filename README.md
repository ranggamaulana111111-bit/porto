# porto-rangga

Portfolio / situs personal Rangga (**rangga.mrw**) — bukan portfolio klasik, tapi jurnal digital yang di dalamnya ada jejak rekam pengembangan yang kuat: tempat belajar, membangun, dan menulis tentang proses jadi developer. Bahasa Indonesia, tema terang (warm clay). Live di **https://ranggamrw.my.id**.

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack) + React 19 + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com) — design token via `@theme inline` di `app/globals.css`
- [framer-motion](https://www.framer.com/motion/) — animasi enter/scroll di sisi client
- Font: **Original Salmon** (sans + display, file OTF lokal di `app/fonts/original-salmon.otf`) + **JetBrains Mono** (mono)
- Live data: **Lanyard** (Discord presence) untuk widget "Mendengarkan" Spotify via `/api/now-playing`
- Deploy: self-hosted via **Cloudflare Tunnel** (`next.config.ts` memakai Turbopack)

## Cara menjalankan

```bash
npm install   # wajib pertama kali
npm run dev   # http://localhost:3000
```

Build production:

```bash
npm run build
npm run start
```

Lint:

```bash
npm run lint
```

### Environment variables

Buat file `.env.local` (gitignored) untuk fitur live "Mendengarkan":

```bash
DISCORD_USER_ID=1427490719509254255
```

ID Discord di atas harus: akun **Online**, Spotify terhubung ke Discord, dan bergabung ke server [Lanyard](https://discord.gg/lanyard) agar `listening_to_spotify` terbaca.

## Struktur project

```
content.json            # SEMUA konten site (profil, navItems, project, catatan, rencana, ...) — sumber kebenaran konten
app/
  layout.tsx            # font (Original Salmon + JetBrains Mono), SEO/metadata, lang="id", CommandPalette
  page.tsx              # komposisi semua section homepage
  globals.css           # semua design token (warna, font) + @media print — satu-satunya tempat definisi
  fonts/
    original-salmon.otf # font display + body
  cv/page.tsx           # halaman CV yang bisa dicetak ke PDF (print styles di globals.css)
  workspace/page.tsx    # "Di Balik Layar": fokus hari ini + yang sedang dibangun + cara bekerja + catatan + rencana
  stack/page.tsx        # daftar stack per project + diagram arsitektur
  messages/page.tsx     # papan pesan anonim
  project/[slug]/page.tsx  # detail project + case study
  catatan/[slug]/page.tsx  # halaman detail catatan/blog
  api/
    now-playing/route.ts   # proxy Lanyard -> JSON untuk fragmen "Dengar" (section Currently)
    messages/route.ts      # API kirim pesan anonim
    youtube-search/route.ts# pencarian lagu untuk pesan anonim
    admin/login|totp|messages/route.ts # admin pesan (OTP)
  robots.ts / sitemap.ts
components/
  navbar.tsx            # nav sticky + highlight section aktif + menu mobile (hamburger)
  footer.tsx            # profil ringkas + kanal + informasi situs
  command-palette.tsx   # cari section/catatan (⌘K) + navigasi
  section-heading.tsx   # header section (index opsional + judul + deskripsi)
  reveal.tsx            # wrapper scroll-reveal (fadeUp / fadeIn)
  clay.tsx              # primitif UI: ClayCard, ClayButton, ClayBadge, ClayTag, ClaySection, ClayPillLink
  project-detail.tsx    # komponen detail project (meta, case study, metrik, pelajaran)
  project-status.tsx    # label status project (Produksi / Dibangun / Rencana / Selesai)
  project-tech-map.tsx  # peta teknologi per project
  copy-email.tsx        # tombol salin email (hindari obfuscation Cloudflare)
  cv-print-button.tsx   # tombol window.print()
  sections/             # satu file per section, semua "use client"
    hero.tsx            # hero: nama, peran, lokasi, CTA
    currently.tsx       # status "Yang sedang terjadi" (fragmen Kuliah/Bangun/Jelajah/Dengar/Hidup)
    tentang-saya.tsx
    selected-projects.tsx
    experience.tsx      # perjalanan (journey)
    education.tsx
    technical-stack.tsx
    what-im-learning.tsx
    outside-work.tsx    # "Di Luar Layar", auto-hide bila kosong
    journal-teaser.tsx  # 3 catatan terbaru + CTA
    workspace-teaser.tsx# CTA menuju /workspace ("Di Balik Layar")
    yang-sedang-dibangun.tsx
    cara-bekerja.tsx
    catatan.tsx
    rencana.tsx
    anonymous-messages.tsx
    contact.tsx
  icons.tsx             # kumpulan SVG icon
lib/
  content.ts            # tipe + fallback + export data dari content.json (sumber kebenaran kode)
  motion.ts             # variants framer-motion bersama (fadeUp, fadeIn, stagger)
public/
  shots/                # screenshot project
  og.png                # OpenGraph image (1200x630)
```

## Kustomisasi

- **Konten** — ubah `content.json` (profil, project, catatan, rencana, status hari ini, dll). Tipe/fallback ada di `lib/content.ts`. Jangan hardcode string di JSX.
- **Warna & font** — ubah token di `app/globals.css` (kelas `bg-*`, `fg-*`, `border-*`, `accent`) dan font di `app/layout.tsx`.
- **Section** — buat komponen di `components/sections/`, daftarkan di `app/page.tsx` atau `app/workspace/page.tsx`, lalu tambahkan ke `navItems` di `content.json`.

Semua UI berbahasa Indonesia. Tema terang (warm clay), lihat `DESIGN.md`.

## Status & backlog

Yang sudah dikerjakan (audit + batch A/B/C + visual proof + audit kedua):

- SEO: canonical & metadata mengarah ke `https://ranggamrw.my.id`; OG/Twitter card lengkap (`og:image` `og.png` 1200x630); sitemap mencakup semua halaman (`/workspace`, `/stack`, `/project/*`, `/catatan/*`).
- Email: `CopyEmail` (salin ke clipboard) menggantikan anchor `mailto:` polos agar tidak ter-obfuscate Cloudflare.
- Font **Original Salmon** untuk display + body (ukuran basis `115%`); JetBrains Mono tetap untuk mono.
- Live data disederhanakan: tech stack statis + widget **Mendengarkan** (Lanyard/Spotify) + Suasana; kolom "commit terakhir" dihapus.
- Halaman **Workspace** (`/workspace`), **Stack** (`/stack`), **Catatan detail** (`/catatan/[slug]`) dengan feed dari `content.json`.
- Papan **Pesan Anonim** (`/messages`) dengan API + pencarian lagu + panel admin (OTP).
- A11y: `:focus-visible`, target sentuh minimal 44px, kontras token `online`/`accent` lolos WCAG AA.

Yang masih terbuka:

- Foto/avatar asli di hero — butuh foto nyata dari pemilik.
- Backend asli untuk form kontak (saat ini `mailto:` + salin email).
- Penyegaran konten bertahun 2025 (beberapa `year`/`posts`/`plans` masih 2025).
- Ikhtisar diedit oleh pemilik (proyek `todayStatus`/`currentWork` brand content overlap).

## Deploy

Self-hosted via **Cloudflare Tunnel** dari server pribadi (lihat `AGENTS.md` / script setup di repo). Site URL: `https://ranggamrw.my.id` (dipakai di metadata, `robots.ts`, dan `sitemap.ts`). Build production dengan perintah di atas, lalu `npm run start` dan arahkan tunnel ke port aplikasi.