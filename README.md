# porto-rangga

Portfolio / ruang kerja digital Rangga (**rangga.dev**) — bukan portfolio klasik, tapi "living workspace": tempat belajar, membangun, dan menulis tentang proses jadi developer. Satu halaman, bahasa Indonesia, tema gelap.

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack) + React 19 + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com) — design token via `@theme inline` di `app/globals.css`
- [framer-motion](https://www.framer.com/motion/) — animasi enter/scroll di sisi client
- Font: Inter (sans), Space Grotesk (display), JetBrains Mono (mono) via `next/font/google`

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

## Struktur project

```
app/
  layout.tsx          # font, SEO/metadata, lang="id"
  page.tsx            # komposisi semua section
  globals.css         # semua design token (warna, font) — satu-satunya tempat definisi
  robots.ts / sitemap.ts
components/
  navbar.tsx          # nav sticky + highlight section aktif + menu mobile
  footer.tsx
  reveal.tsx          # wrapper scroll-reveal (fadeUp / fadeIn)
  section-heading.tsx # header section bernomor (index + judul + deskripsi)
  sections/           # satu file per section, semua "use client"
    hari-ini.tsx            # hero / status hari ini
    yang-sedang-dibangun.tsx
    perjalanan.tsx
    cara-bekerja.tsx
    project-favorit.tsx     # tab case study
    catatan.tsx
    rencana.tsx
    mari-berbincang.tsx     # kontak + form
  icons.tsx           # kumpulan SVG icon
lib/
  content.ts          # SEMUA konten/data site — sumber tunggal kebenaran
  motion.ts           # variants framer-motion bersama (fadeUp, fadeIn, stagger)
```

## Kustomisasi

- **Konten** — ubah `lib/content.ts` (profil, project, catatan, rencana, status hari ini, dll). Jangan hardcode string di JSX.
- **Warna & font** — ubah token di `app/globals.css` (kelas `bg-*`, `fg-*`, `border-*`, `accent`).
- **Section** — buat komponen di `components/sections/`, daftarkan di `app/page.tsx`, lalu tambahkan ke `navItems` di `lib/content.ts`.

Semua UI berbahasa Indonesia. Tema hanya gelap.

## Status & backlog

Backlog lengkap ada di `AGENTS.md` → **Known UI gaps / backlog**. Yang sudah diperbaiki (audit Aug 2026):

- Kontras teks ditingkatkan (token `fg-muted`/`fg-faint`); `focus-visible` global ditambahkan.
- Navbar: `aria-expanded`, `aria-current`, tutup dengan Escape, scroll lock saat menu mobile terbuka.
- Form kontak sekarang fungsional (membuka aplikasi email via `mailto:` dengan pesan terisi) + label/`name`/validasi.
- Semua project punya link GitHub; link `sitemap.ts` diperbaiki.
- Halaman 404 dan error ditambahkan; `og.png` dibuat dan dipasang di metadata.
- Dead code `whyILoveSoftware` dibuang; footer + kanal kontak sekarang memakai ikon dari `components/icons.tsx`.

Yang masih terbuka: halaman detail untuk catatan (blog), `loading.tsx` (tidak krusial — halaman statis), foto/avatar di hero, backend asli untuk form, dan penyegaran konten bertahun 2025.

## Deploy

Sudah disiapkan untuk Vercel (`next.config.ts` memakai Turbopack). Site URL: `https://rangga.dev` (dipakai di metadata, `robots.ts`, dan `sitemap.ts`).
