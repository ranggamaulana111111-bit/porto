<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# porto-rangga

Personal portfolio / digital workspace of Rangga (rangga.dev). Single-page site in Indonesian, dark-only aesthetic, built to feel like a "living workspace" rather than a classic portfolio.

## Stack

- Next.js 16 (App Router, Turbopack) + React 19 + TypeScript
- Tailwind CSS v4 — design tokens via `@theme inline` in `app/globals.css`
- framer-motion for client-side scroll/enter animations
- Fonts: Inter (sans), Space Grotesk (display), JetBrains Mono (mono) via `next/font/google`

## Commands

- `npm install` — install dependencies (required first; `next` binary won't resolve otherwise)
- `npm run dev` — dev server at http://localhost:3000
- `npm run build` — production build
- `npm run start` — serve production build
- `npm run lint` — ESLint (config: `eslint.config.mjs`)

## Project structure

- `app/layout.tsx` — root layout: fonts, SEO/metadata, `lang="id"`. Site URL is `https://rangga.dev`.
- `app/page.tsx` — composes all sections in order.
- `app/globals.css` — ALL design tokens live here (colors `bg-*`, `fg-*`, `border-*`, `accent`; fonts). Only dark theme exists.
- `components/navbar.tsx` — sticky nav + active-section highlight + mobile menu (hamburger, animated via framer-motion).
- `components/footer.tsx` — site footer.
- `components/reveal.tsx` — scroll-reveal wrapper (fadeUp / fadeIn, once).
- `components/section-heading.tsx` — numbered section header (index + title + optional description).
- `components/sections/*.tsx` — one file per page section (all `"use client"`):
  `hari-ini`, `yang-sedang-dibangun`, `perjalanan`, `cara-bekerja`, `project-favorit`, `catatan`, `rencana`, `mari-berbincang`.
- `lib/content.ts` — ALL site content/data (profile, navItems, journey, projects, posts, plans, todayStatus, currentWork, ...). Single source of truth.
- `lib/motion.ts` — shared framer-motion variants (`fadeUp`, `fadeIn`, `stagger`).
- `app/robots.ts`, `app/sitemap.ts` — SEO.
- `components/icons.tsx` — inline SVG icon set (mostly unused; prefer these over new SVGs when adding icons).

## Conventions

- Every section component is `"use client"` (animation + scroll observers).
- Content is data-driven: sections render from `lib/content.ts`. Edit copy/data there, never hardcode strings in JSX.
- All UI copy is Indonesian (site `lang="id"`).
- Design tokens are defined ONLY in `app/globals.css`. Use token classes (`text-fg-secondary`, `bg-bg-card`, `border-border`) instead of arbitrary values.
- Reuse `Reveal`, `SectionHeading`, and `lib/motion` variants instead of re-declaring animation config.
- Do not add code comments unless asked.
- Run `npm run lint` and `npm run build` after changes.

## Known UI gaps / backlog

Last audited Aug 2026. Fixed items are removed — the list below is what's left.

### Accessibility
- Nav links have no visible focus state issue is fixed (global `:focus-visible` in `globals.css`).
- Remaining: icon-only links rely on `aria-label` (present in footer/channels) — verify screen-reader name when adding new ones.

### Missing features
- Blog posts (`catatan`) are rendered as non-link rows because there's no detail page yet — the rows have no affordance. Add real post pages or link out when posts exist.
- No `loading.tsx` (fine — homepage has no async data fetch).
- Hero (`hari-ini`) has no avatar/photo. Requires a real photo from the owner; a generated one would break the aesthetic.
- Contact form works via `mailto:` (opens the visitor's email client). A real backend/endpoint would be a better upgrade than the current mailto handoff.

### Dead code
- `components/icons.tsx` still holds unused icons (Twitter, Compass, Gauge, Sparkle, Handshake, Search, Quote, Pin, Clock, Menu, Close, Check, Send). Footer/contact now use GitHub, LinkedIn, WhatsApp, Mail, ArrowUpRight. Trim the rest or use them before adding new SVGs.

### Content (needs owner input)
- `lib/content.ts` `todayStatus`, `posts`, `plans`, and project years reference 2025 — now stale (site is live in 2026). Refresh copy/dates when the owner updates their status.
