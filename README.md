# porto-rangga

Portfolio / ruang kerja digital Rangga (**rangga.mrw**) — bukan portfolio klasik, tapi "living workspace": tempat belajar, membangun, dan menulis tentang proses jadi developer. Satu halaman, bahasa Indonesia, tema gelap. Live di **https://ranggamrw.my.id**.

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
app/
  layout.tsx          # font (Original Salmon + JetBrains Mono), SEO/metadata, lang="id"
  page.tsx            # komposisi semua section
  globals.css         # semua design token (warna, font) + @media print — satu-satunya tempat definisi
  fonts/
    original-salmon.otf  # font display + body
  cv/page.tsx         # halaman CV yang bisa dicetak ke PDF (print styles di globals.css)
  api/now-playing/route.ts  # proxy Lanyard -> JSON untuk widget Spotify
  robots.ts / sitemap.ts
components/
  navbar.tsx          # nav sticky + highlight section aktif + menu mobile
  footer.tsx          # link sosial + tombol "Lihat CV"
  reveal.tsx          # wrapper scroll-reveal (fadeUp / fadeIn)
  section-heading.tsx # header section bernomor (index + judul + deskripsi)
  copy-email.tsx      # tombol salin email (hindari obfuscation Cloudflare)
  now-playing.tsx     # widget "Mendengarkan" (fetch /api/now-playing, polling 30s)
  flow-diagram.tsx    # diagram alur/arsitektur (box + arrow)
  framed-snippet.tsx  # frame app-window (rounded border) + img fallback ke mockup SVG
  project-visuals.tsx # mockup SVG on-brand: peta ODP (ALKONEK), grafik Recharts (AlkonekPlus)
  cv-print-button.tsx # tombol window.print()
  sections/           # satu file per section, semua "use client"
    hari-ini.tsx            # hero / status hari ini (tech stack + Mendengarkan + Suasana + CV)
    yang-sedang-dibangun.tsx
    perjalanan.tsx
    cara-bekerja.tsx
    project-favorit.tsx     # tab case study + framed snippet visual proof
    catatan.tsx
    rencana.tsx
    mari-berbincang.tsx     # kontak (CopyEmail + GitHub rapi) + form mailto
  icons.tsx           # kumpulan SVG icon
lib/
  content.ts          # SEMUA konten/data site — sumber tunggal kebenaran
  motion.ts           # variants framer-motion bersama (fadeUp, fadeIn, stagger)
public/
  shots/              # screenshot project (drop-in): alkonek-odp.png, alkonekplus-chart.png, rabeglab-topology.png
  og.png              # OpenGraph image (1200x630)
```

## Kustomisasi

- **Konten** — ubah `lib/content.ts` (profil, project, catatan, rencana, status hari ini, dll). Jangan hardcode string di JSX.
- **Visual project (framed snippet)** — tiap project punya field `visual: { caption, image? }` di `lib/content.ts`.
  - Bila `image` diisi (path di `public/`, misal `/shots/alkonek-odp.png`), foto tersebut yang tampil di frame.
  - Bila `image` kosong/tidak ada file, otomatis fallback ke **mockup SVG** (`components/project-visuals.tsx` / `FlowDiagram`).
  - Cara pakai screenshot asli: taruh file di `public/shots/` dengan nama persis `alkonek-odp.png`, `alkonekplus-chart.png`, atau `rabeglab-topology.png`, lalu isi kembali field `image`-nya.
- **Warna & font** — ubah token di `app/globals.css` (kelas `bg-*`, `fg-*`, `border-*`, `accent`) dan font di `app/layout.tsx`.
- **Section** — buat komponen di `components/sections/`, daftarkan di `app/page.tsx`, lalu tambahkan ke `navItems` di `lib/content.ts`.

Semua UI berbahasa Indonesia. Tema hanya gelap.

## Status & backlog

Yang sudah dikerjakan (audit + batch A/B/C + visual proof):

- SEO: canonical & metadata mengarah ke `https://ranggamrw.my.id`; OG/Twitter card lengkap (`og:image` `og.png` 1200x630).
- Email: `CopyEmail` (salin ke clipboard) menggantikan anchor `mailto:` polos agar tidak ter-obfuscate Cloudflare.
- Font **Original Salmon** untuk display + body (ukuran basis `115%`); JetBrains Mono tetap untuk mono.
- Live data disederhanakan: tech stack statis + widget **Mendengarkan** (Lanyard/Spotify) + Suasana; kolom "commit terakhir" dihapus.
- Diagram arsitektur/alur (`FlowDiagram`) untuk ALKONEK, RabegLab, Prodesa.
- **Framed snippet visual proof**: ALKONEK menampilkan screenshot asli (`public/shots/alkonek-odp.png`, dikompres), AlkonekPlus & RabegLab memakai mockup frame (grafik Recharts & topologi homelab).
- Halaman **CV** (`/cv`) yang bisa dicetak ke PDF + tombol di hero & footer.
- Display GitHub rapi (`github.com/ranggamaulana`) dengan link asli tetap utuh.

Yang masih terbuka:

- Halaman detail untuk catatan (blog) — baris masih non-link.
- `loading.tsx` (tidak krusial — halaman statis tanpa fetch async).
- Foto/avatar asli di hero (`hari-ini`).
- Backend asli untuk form kontak (saat ini `mailto:` + salin email).
- Penyegaran konten bertahun 2025 (beberapa `year`/`posts`/`plans` masih 2025).
- Rename akun GitHub ke `ranggamaulana` agar URL cocok dengan display (opsional, berisiko mengubah URL repo lama).

## Deploy

Self-hosted via **Cloudflare Tunnel** dari server pribadi (lihat `AGENTS.md` / script setup di repo). Site URL: `https://ranggamrw.my.id` (dipakai di metadata, `robots.ts`, dan `sitemap.ts`). Build production dengan perintah di atas, lalu `npm run start` dan arahkan tunnel ke port aplikasi.
