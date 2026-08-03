# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install          # node_modules is not checked in; run this first
npm run dev          # dev server (next dev)
npm run build        # production build
npm start            # serve the production build
npx tsc --noEmit     # typecheck (tsconfig is noEmit + strict)
```

There is no test suite and no linter configured (no ESLint dependency, no `lint` script). `npm run build` plus `npx tsc --noEmit` are the only checks available.

## What this is

A single-page marketing site for SharpEleven, a long-context AI infrastructure company. Next.js 16 App Router, React 19, TypeScript (strict), Tailwind v4.

`app/page.tsx` composes `Nav`, then `Hero` / `Capabilities` / `Figures` / `Contact` inside `<main>`, then `Footer`. **Every component is a server component** — there is no `"use client"` anywhere in the tree. No data layer, no API routes, no JS beyond what Next ships for hydration.

**All copy is placeholder and lives in `components/copy.ts`.** Every user-facing string on the page is exported from that one file; components read from it and hold no literals of their own. Lengths are set to roughly what the real copy should run so the layout is honest, but nothing is approved. Replace in place.

## The design system

Typography came from `context/` (gitignored) — four internal PDF memos whose font stack was extracted with `pdffonts` and reproduced exactly:

| Role | Face | Where |
|---|---|---|
| Display | Newsreader, weight 300, italic for accents | `.display-1/2/3` |
| Body | Source Serif 4 | `body`, `.lede`, `.prose` |
| Labels, figures | IBM Plex Mono, uppercase, wide tracking | `.eyebrow`, `.figures`, `.capability-num` |

Reference them only through `--font-display` / `--font-body` / `--font-mono`, never the raw `--font-newsreader`-style variables `layout.tsx` defines.

**Palette** is the previous build's, with two documented exceptions: `--color-ink-3` (`#7480a6` → `#5c6890`) and `--color-clay` (`#c2674a` → `#aa5138`) were darkened to clear 4.5:1 on `--color-bg`. They carry nav links, table headers, and the footer — all real text that failed AA at the original values. The old `--color-sage` name is gone; it was never green, it is `--color-blue` (`#2840b9`).

**Tailwind v4, CSS-first.** Tokens live in the `@theme` block of `app/globals.css`; there is no `tailwind.config.*`. The build uses almost no utility classes — layout is hand-written CSS with semantic names. Don't reintroduce `text-[color:var(--color-ink)]` arbitrary-value syntax; add a named class.

**Elevation is hairline borders, plus the glass sheen.** No drop shadows for emphasis; the only `box-shadow`s are the glass inset sheen and its 1px depth line. **No decorative gradients** — every gradient in the codebase is a `mask-image` used for edge falloff or text legibility, never a fill.

## The hero artwork

`public/hero-bg.webp` — a line-art landscape with faint flowing curves, supplied by the user at 6688x3764 (a 4x upscale). It is a full-bleed background on the hero, anchored to the bottom (`objectPosition: 50% 100%`) so the crop always takes from its empty sky rather than the horizon.

The source is 2.3MB but never ships raw: `next/image` with `fill` + `sizes="100vw"` serves a resized WebP — measured at **134KB for a 1920px desktop and 18KB at 640px mobile**. If you replace the artwork, keep it a single high-resolution source and let the optimizer do the rest; don't hand-generate variants.

`.hero-backdrop` carries a `mask-image` that fades the artwork out toward the top. **That mask is a legibility device, not decoration** — it lifts the image off the headline while leaving the horizon and curves untouched. If you swap the artwork, re-check the mask stops against the new composition; a busier upper field needs the fade pushed further down. There is a separate, more aggressive set of stops under 760px, where the type nearly fills the screen.

An earlier build drew this as an inline SVG (`Backdrop.tsx`, a data-centre campus) with a hand-rolled stroke vocabulary. That is all removed — do not reintroduce `.ink` classes or `--stroke` tokens.

## Glass

`--glass-bg` / `--glass-blur` / `--glass-edge` / `--glass-sheen` / `--glass-depth`, plus a `.glass` class, applied to the nav, the hero property panel, the contact card and the mailto pill. Translucent tint, blurred and slightly saturated backdrop, one specular hairline on the lit edge.

The sheen is material description, not ornament — it is what tells you the surface has thickness. There is a `@supports not (backdrop-filter: ...)` fallback to a solid tint.

**Keep glass on small, static surfaces.** A removed build put `backdrop-filter` on six full-screen animated layers and measured **9fps**; the same scene without it ran at 60. Each blurred layer costs a framebuffer readback per frame. If you ever put glass on something large that moves, measure before shipping.

## Gotchas

- `context/` is gitignored — internal business memos. Do not commit them.
- `components/copy.ts` carries a `TODO` on the contact address. The previous build shipped a `mailto` for `research@` behind a label reading `victor@`; it is now a single placeholder value used for both.
- Section anchors (`#capabilities`, `#figures`, `#contact`) are real element IDs, and the placeholder section numbers in `copy.ts` are kept in sync with them by hand. A much older build intercepted all hash links in JS to drive a tab component; that is long gone.
- A scroll-driven full-screen camera-iris transition sat between the hero and the body for several iterations. It was **removed at the user's request** — component, CSS, copy and its nav entry are all gone, and the sections were renumbered from 02/03/04 to 01/02/03. If it comes back it needs a new slot and a renumber.
- `PLAN.md` is stale — it predates three rewrites.
