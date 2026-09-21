<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# porto-rangga

Personal portfolio / digital workspace of Rangga (rangga.mrw). Built to feel like a "living workspace" rather than a classic portfolio. Indonesian copy, light warm-clay aesthetic (see `DESIGN.md`).

## Stack

- Next.js 16 (App Router, Turbopack) + React 19 + TypeScript
- Tailwind CSS v4 — design tokens via `@theme inline` in `app/globals.css`
- framer-motion for client-side scroll/enter animations
- Fonts: Original Salmon (sans + display, local OTF in `app/fonts/`), JetBrains Mono (mono) via `next/font/google`

## Commands

- `npm install` — install dependencies (required first; `next` binary won't resolve otherwise)
- `npm run dev` — dev server at http://localhost:3000
- `npm run build` — production build
- `npm run start` — serve production build
- `npm run lint` — ESLint (config: `eslint.config.mjs`)

## Project structure

- `app/layout.tsx` — root layout: fonts, SEO/metadata, `lang="id"`, global `CommandPalette`. Site URL is `https://ranggamrw.my.id`.
- `app/page.tsx` — homepage: composes all sections in order.
- `app/globals.css` — ALL design tokens live here (colors `bg-*`, `fg-*`, `border-*`, `accent`; fonts). Only the light warm-clay theme exists (`color-scheme: light`).
- `content.json` — ALL site content/data (profile, navItems, journey, projects, posts, plans, todayStatus, currentWork, ...). Single source of truth; `lib/content.ts` provides types + fallbacks.
- `components/navbar.tsx` — sticky nav + active-section highlight + mobile menu (hamburger, animated via framer-motion).
- `components/footer.tsx` — site footer.
- `components/clay.tsx` — UI primitives (`ClayCard`, `ClayButton`, `ClayBadge`, `ClayTag`, `ClaySection`, `ClayPillLink`).
- `components/command-palette.tsx` — ⌘K command palette that navigates sections and project detail pages.
- `components/reveal.tsx` — scroll-reveal wrapper (fadeUp / fadeIn, once).
- `components/section-heading.tsx` — section header (optional index + title + optional description).
- `components/sections/*.tsx` — one file per homepage/workspace section (all `"use client"`):
  `hero`, `profile-snapshot`, `tentang-saya`, `selected-projects`, `experience`, `education`, `technical-stack`, `what-im-learning`, `currently-learning`, `workspace-teaser`, `yang-sedang-dibangun`, `cara-bekerja`, `catatan`, `rencana`, `anonymous-messages`, `contact`.
- Other routes: `app/workspace/`, `app/stack/`, `app/messages/`, `app/cv/`, `app/project/[slug]/`, `app/catatan/[slug]/`, plus `app/api/` (`now-playing`, `messages`, `admin/*`, `youtube-search`).
- `lib/motion.ts` — shared framer-motion variants (`fadeUp`, `fadeIn`, `stagger`).
- `app/robots.ts`, `app/sitemap.ts` — SEO (sitemap covers all routes incl. `/[slug]` pages).
- `components/icons.tsx` — inline SVG icon set (mostly unused; prefer these over new SVGs when adding icons).

## Conventions

- Every section component is `"use client"` (animation + scroll observers).
- Content is data-driven: sections render from `content.json` via `lib/content.ts`. Edit copy/data there, never hardcode strings in JSX.
- All UI copy is Indonesian (site `lang="id"`).
- Design tokens are defined ONLY in `app/globals.css`. Use token classes (`text-fg-secondary`, `bg-bg-card`, `border-border`) instead of arbitrary values.
- Reuse `Reveal`, `SectionHeading`, and `lib/motion` variants instead of re-declaring animation config.
- Do not add code comments unless asked.
- Run `npm run lint` and `npm run build` after changes.

## Known UI gaps / backlog

Last audited Sep 2026 (audit-002). Fixed items are removed — the list below is what's left.

### Accessibility
- Icon-only links rely on `aria-label` (present in footer/channels) — verify screen-reader name when adding new ones.

### Missing features
- Hero has no avatar/photo. Requires a real photo from the owner; a generated one would break the aesthetic.
- Contact form works via `mailto:` (opens the visitor's email client) plus a copy-email button. A real backend/endpoint for the contact form would be a better upgrade than the mailto handoff.

### Dead code
- `components/icons.tsx` still holds unused icons (Twitter, Compass, Gauge, Sparkle, Handshake, Search, Quote, Pin, Clock, Menu, Close, Check, Send). Footer/contact now use GitHub, LinkedIn, WhatsApp, Mail, ArrowUpRight. Trim the rest or use them before adding new SVGs.

### Content (needs owner input)
- `content.json` `todayStatus`, `posts`, `plans`, and project years still reference 2025 — now stale (site is live in 2026). Refresh copy/dates when the owner updates their status.
- Audit-002 findings #8 (content overlap between sections) and #10 (claim metrics without public proof) need owner's decision, not code.

<!-- antislop:start -->
## antislop
For UI, copy, people, mobile layout, or code comments work, load the antislop skill for the task:
- Core filter, always on: `antislop`
- UI / visual: `antislop-ui`
- Copy & text: `antislop-copywriting`
- People: `antislop-human`
- Mobile / responsive: `antislop-layoutmobile`
- Code comments: `antislop-code`
Before starting, ask the user when antislop applies: during the work, or after it is done.
<!-- antislop:end -->
