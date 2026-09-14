# Design Direction (rangga.dev)

Identity, dials, and the reasons behind every design decision on this site. The site is a "living workspace", not a classic portfolio. This document makes the design direction explicit so future changes stay consistent (R-31: every decision must have a reason, written down).

## Identity

**Warm working desk, not a product landing page.**

The site is the personal workspace of Rangga: a place to learn, build, and fail in the open. The look is warm clay on light paper, with quiet structure and honest, unpolished-feeling details. It should feel like a personal journal that happens to be a website, not a polished agency portfolio.

Written in one sentence: warm clay desk, loose grid, calm motion.

## Coat of Arms

Three elements mark this identity (analogy only, no illustration is shipped):

- **Warm clay paper** — the page background (`--color-bg: #fdfbf7`) is off-white paper with warmth, never pure white.
- **Clay orange thread** — the accent (`--color-accent: #b55220`) is a single warm thread that runs through buttons, links, and active states; it never floods the page.
- **Hand-drawn corners** — soft 12px–20px radii (`--radius-clay-*`) and subtle layered shadows (`--shadow-card`, `--shadow-card-hover`) suggest paper/cardboard cut-outs instead of glass or chrome.

## Design Dials

| Dial | Value | Why |
|---|---|---|
| ENERGY | **2** | Warm and inviting, never loud. Full saturation is reserved for the accent; every other tone sits low-key. |
| RHYTHM | **2** | Spacious sections (`px-6 py-20 sm:py-28` in `ClaySection`), one card, one thought. No information density games. |
| MOTION | **2** | Gentle fade/slide reveals. No sparkle, bounce, or parallax (R-19 animations: subtle, `prefers-reduced-motion` respected). |

Any new UI must stay at or under these dials. If a proposed element pushes a dial above its value, it is off-direction and needs a written reason to stay.

## Design Tokens

All values live in `app/globals.css` inside `@theme inline`. Tokens are the only source of color/font, and components use token classes (`bg-bg-card`, `text-fg-secondary`, `border-border`) rather than arbitrary values.

### Color

| Token | Value | Use |
|---|---|---|
| `--color-bg` | `#fdfbf7` | Page background: warm paper |
| `--color-bg-warm` | `#f6f0e8` | Warm hover/inset surfaces |
| `--color-bg-card` | `#ffffff` | Card surfaces (still reads warm next to paper) |
| `--color-bg-inset` | `#f6f0e8` | Tag/inset fills |
| `--color-fg` | `#1a1a1a` | Primary text |
| `--color-fg-secondary` | `#4a4642` | Body text |
| `--color-fg-muted` | `#5e5a56` | Captions, meta |
| `--color-fg-faint` | `#6b6560` | Least important labels |
| `--color-accent` | `#b55220` | The single clay thread |
| `--color-accent-strong` | `#8e3e1a` | Hover/active accent |
| `--color-accent-soft` | `#fdf0e8` | Selection, soft accent fills |
| `--color-border` | `#e2d9cf` | Card/divider borders |
| `--color-border-subtle` | `#ede5da` | Fainter borders |
| `--color-online` | `#2e9d7a` | Online/live status |

Rules:
- Dark mode is not shipped. `color-scheme: light` is fixed (R-21: one theme, whole because it's the entire identity).
- Never introduce new color families. If a hue is missing, extend the clay range rather than adding a new hue.

### Type

| Font | Token | Role |
|---|---|---|
| Original Salmon (local, `app/fonts/original-salmon.otf`) | `--font-display` / `--font-sans` | Display headings and base text: warm, hand-drawn feel |
| JetBrains Mono | `--font-mono` | Meta, labels, numbers, section numbering: mechanical contrast to the hand-drawn |

Patterns in use: uppercase `font-mono` micro-labels (`text-xs uppercase tracking-wider`), `font-display` for headings, tabular mono numbers for years/metrics.

### Shape & Depth

- Radii: 12px (`--radius-clay-sm`), 16px (`--radius-clay`), 20px (`--radius-clay-lg`), pill for buttons/tags.
- Shadows are soft and layered (`--shadow-card`: 1px 6% + 4px 4%; hover doubles gently). No hard dark drops, no glow (R-12, R-13).
- Buttons are pills with flat clay fills, hover deepens the accent (`hover:bg-accent-strong`), arrow/icon only where it aids action (R-08).

## Layout

- Single column, centered measure: sections cap at `max-w-3xl` (see `ClaySection`). This is a journal, not a dashboard.
- Page breathing room: `px-6 py-20 sm:py-28` on sections; generous vertical rhythm over grids.
- The homepage is one page of sections ordered as a day's flow: greeting, what I'm learning, projects, path, stack, current work, contact.
- `max-w-3xl` measure exists so text lines stay readable on any width.

## Motion

Shared variants in `lib/motion.ts` only; components never re-declare animation config.

- `fadeUp` / `fadeIn` / `slideLeft` / `slideRight`: 0.5–0.6s on a single cubic ease `[0.16, 1, 0.3, 1]`.
- `stagger`: 0.08s between children, small enough to feel like a group, big enough to notice.
- Scroll reveals run once and never repeat; `prefers-reduced-motion: reduce` zeroes all animation globally.
- Nothing moves continuously unless it carries live data (e.g. the "online" indicator). No looping decorations.

## Content

- All copy and data live in `content.json` (loaded via `lib/content.ts`), rendered on the page. UI strings that are structural (section descriptions, empty states) may live in components but must match the same voice: Indonesian, plain, first-person, no hype.
- Copy rules: no em dash (`—`) anywhere in rendered text (R-02); no fabricated metrics or claims (R-36); every number on the page traces to real work.
- The site is personal and honest: failures and "still learning" are part of the story, not glossed over.

## Anti-slop Checklist

When designing or adding UI, check against these before shipping:

- [ ] Does it stay at dials 2/2/2?
- [ ] Does it use existing tokens, `Clay*` components, `Reveal`, `SectionHeading`, and `lib/motion` variants?
- [ ] Is the copy Indonesian, plain, and free of em dashes and buzzwords?
- [ ] Does every number/claim on screen trace to real work or real data?
- [ ] Is it verified on a phone-width viewport (R-03) and with `prefers-reduced-motion` (R-19)?
- [ ] If it needed new tokens/fonts/components, is the reason written here?