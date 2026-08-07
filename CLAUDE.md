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

`app/page.tsx` composes `Brand` and `SiteNav` (both fixed to the viewport corners), then `Hero` / `Briefs` / `Capabilities` / `Figures` / `Contact` inside `<main>`, then `Footer`. `Briefs` is the only client component (it holds tab state); everything else is a server component. No data layer, no API routes.

`SiteHeader` is a fixed horizontal bar. Brand and links sit at constant pixel offsets rather than inside the page container, so neither drifts inward as the window widens. It is fixed, not sticky, so the hero's large `padding-top` is what clears it, and sections carry `scroll-margin-top` so anchor jumps do not land underneath it.

It holds two pieces of state, both from `IntersectionObserver` rather than a scroll handler — observers fire only on threshold crossings, so this costs nothing per frame:

- **which section is in view**, which bolds that nav link (`aria-current="true"` → weight 500). The observer uses `rootMargin: "-45% 0px -50% 0px"`, so a section becomes active as it crosses the middle band of the viewport.
- **whether the hero has scrolled away.** Over the hero render the bar is transparent; past it, `[data-stuck]` gives it a near-opaque surface. A light tint was tried and content read straight through it — the bar stopped looking like the front layer.

Section ids are `#about` (the brief viewer), `#products` (capabilities) and `#contact`. A placeholder measured-figures section sat between Products and Contact and was **removed at the user's request**.

**All copy lives in `components/copy.ts`** — every user-facing string is exported from that one file and components hold no literals of their own.

Copy status, which is not uniform:

| Section | Copy |
|---|---|
| Hero, Briefs (About), Contact | **Real**, moved across from the `main` branch |
| Products (capabilities) | **Placeholder** — main has no equivalent text, and none was invented |

`{braces}` in a copy string mark an emphasised run; `components/emphasise.tsx` renders them as `<em>`. Keeping the markers inline means a sentence stays readable in `copy.ts` instead of being split across three props.

## The design system

Typography came from `context/` (gitignored) — four internal PDF memos whose font stack was extracted with `pdffonts` and reproduced exactly:

| Role | Face | Where |
|---|---|---|
| Display | **Instrument Serif**, 400 only, italic for accents | `.display-1/2/3`, `.doc-intro`, `.brand-word` |
| Body | Source Serif 4, 17.5px/1.6 | `body`, `.lede`, `.prose` |
| Labels, figures | IBM Plex Mono, uppercase, wide tracking | `.eyebrow`, `.log-*`, `.capability-num` |

**Instrument Serif ships a single 400 weight.** Every display selector is pinned to 400 for that reason — asking for 500 gets a synthesised faux-bold, which wrecks a face with hairlines this fine. It is the tall, narrow, high-contrast cut from `main`; a heavier display face and this one are mutually exclusive. Body and label weight can still be tuned independently.

Reference them only through `--font-display` / `--font-body` / `--font-mono`, never the raw `--font-newsreader`-style variables `layout.tsx` defines.

**Palette** is the previous build's, with two documented exceptions: `--color-ink-3` (`#7480a6` → `#5c6890`) and `--color-clay` (`#c2674a` → `#aa5138`) were darkened to clear 4.5:1 on `--color-bg`. They carry nav links, table headers, and the footer — all real text that failed AA at the original values. The old `--color-sage` name is gone; it was never green, it is `--color-blue` (`#2840b9`).

**Tailwind v4, CSS-first.** Tokens live in the `@theme` block of `app/globals.css`; there is no `tailwind.config.*`. The build uses almost no utility classes — layout is hand-written CSS with semantic names. Don't reintroduce `text-[color:var(--color-ink)]` arbitrary-value syntax; add a named class.

**Elevation is hairline borders, plus the glass sheen.** No drop shadows for emphasis.

**Two decorative gradients exist, both restored from `main` at the user's request** — they are the deliberate exceptions, not a licence to add more:

- `body::before`, a fixed ambient wash with brand-coloured corner glows. `.wrap` carries `z-index: 2` to sit above it, and `.hero` needs the same or the artwork falls under the wash.
- the contact card's own radial wash, with corner brackets on `::before`/`::after`.

Every other gradient in the build is a `mask-image` for edge falloff, never a fill.

## The hero

Full viewport, and **sticky rather than scrolling away.** The next section rides up over it while the hero blurs back and fades in place.

`Hero.tsx` is a client component only for this: a rAF-throttled scroll handler writes one value, `--p` (progress across the first ~85% of a viewport), onto the hero element. CSS consumes it for `filter: blur()` on the artwork and `opacity`/`translateY` on the type. **Measured at 60fps with zero dropped frames** — a scroll-driven blur on one element is fine, unlike the six stacked `backdrop-filter` layers that ran at 9fps. Don't let that count grow.

Layering, bottom to top, and it is load-bearing:

| z | what |
|---|---|
| 0 | `.hero` (sticky) |
| 1 | `.section` / `.footer` backgrounds — **opaque, so they occlude the pinned hero** |
| 2 | `body::before`, the ambient wash (fixed) — sits *above* the section grounds so it stays visible |
| 3 | `.wrap` content |

The wash has to be above the section backgrounds rather than behind them; a fixed full-viewport wash can only show where what is above it is transparent, and the sections stopped being transparent when they needed to hide the hero.

`prefers-reduced-motion` drops the blur, fade and translate entirely.

`public/hero-bg.png` is the mark rendered as physical slabs, and **it occupies roughly the right 45–90% of the frame.** That is the constraint the whole layout hangs off: the text column is capped at `min(46vw, 620px)` so it stays in the open left half, and `.hero-title` carries its own smaller clamp than `.display-1` so the headline holds about three lines inside that column. Widen either and the type runs under the render.

Layout is a top block and a bottom rail (`justify-content: space-between`):

- top-left: headline, then an underlined CTA (no eyebrow — the hero opens on the headline)
- bottom rail: a glass scroll cue, and nothing else

`HERO.lede` is intentionally unused by the component — the line is kept in `copy.ts` so it has somewhere to live if it is wanted again.

The headline runs at weight 400 rather than the display scale's 300, because 300 washes out against the render. 500 was tried and read too heavy.

The hero's content does **not** use `.wrap`. Its `padding-inline` tracks the container exactly up to a ~1696px viewport and then caps at 200px, so on a stretched window the headline holds near the left edge instead of drifting inward while the full-bleed artwork keeps spreading. Below that width hero and body align exactly.

Two things that bite:

- **Constrain the headline, not `.hero-head`.** Putting the max-width on the wrapper wraps the eyebrow and the CTA label too, and the overflow pushes the bottom rail out of a hero that has `overflow: hidden`.
- `.hero-cta` needs `white-space: nowrap`, or the label breaks across lines on narrow screens and strands the arrow.

Under 860px the rail stacks and the copy left-aligns.

## The brief viewer (`components/Briefs.tsx`)

Browser chrome over a paper document, with three tabs and dotted-leader log lines. Moved across from `main`; the layout, chrome and log treatment are main's, the colours and faces are this branch's.

Three things changed in the move:

- **No global hash-link interception.** Main attached a document-level listener that hijacked every `a[href^="#"]`, so its nav's `#problem` / `#platform` links pointed at IDs that existed nowhere and drove these tabs instead. The tabs here are self-contained and the section has one honest anchor, `#briefs`. Don't reintroduce that mechanism.
- **Nothing is pure white.** Main used `#ffffff` for the active tab and the page; both use `--color-paper`.
- **Status pills use three hues.** Clay for UNRESOLVED, blue for ENABLED and ON EXIT, green for BENCHMARKED and LIVE. The green is `--color-green: #3a7449`, not main's `#3f7b51` — that value measures 4.22:1 as text on its own 12% tint, under AA; this is the nearest shade that clears 4.5:1.

**The page is paper, not glass, deliberately.** Glass is the chrome material in this design (nav, contact card, pill); a brief is a document. The contrast between the two materials is doing work — don't unify them.

## The tier diagram (`components/Tiers.tsx`)

The Products section. Ported from a DC prototype (`Tier Stack.dc.html` in the repo root) into React; the geometry is the prototype's, unchanged:

- ring `i` diameter = `(160 + i * 108) / 760` of the square
- labels sit on one anchor circle just outside the largest ring, at fixed `ANGLES = [200, 272, 340, 40, 112]`
- a leader runs from each ring's edge out to its dot
- label alignment flips off the horizontal component of its angle, so text on the left of the circle is right-aligned into it

**The lighting is cumulative, not a selection.** Each tier contains the one before it, so pointing at tier N lights every ring up to and including N (`.is-on`). Only the pointed-at tier is `.is-lead` — heavier stroke, halo, and its description fades in.

**Nexus is lit on load and the selection is sticky.** `active` is a plain `number` starting at `0`, never null, and there are no `onMouseLeave`/`onBlur` handlers — moving away holds the last tier rather than going dark. The diagram should never read as inert.

Label placement has two axes, both derived from the tier's angle:

- **horizontal**: alignment flips off `cos`, so text on the left of the circle is right-aligned into it
- **vertical**: the block is anchored by its *header*, and `data-dir` (`up` / `down` / `side`, from `sin`) decides which way the description grows. **The description is `position: absolute`, deliberately** — in flow, a long one pushes the name away from its own leader line, and an upper-half label ends up floating well above the circle.

Two consequences worth knowing: the stage needs real top padding or an upward-growing description runs into the section heading, and real bottom padding or Prism's hangs past the section. Both are set on `.tier-stage`.

`.tier-chip` is `white-space: nowrap` at `0.08em` tracking. The longest chip is 32 characters; at the 0.14em used elsewhere it needs 249px, which no label is that wide below a ~1310px viewport. The label minimum is 232px to hold it.

Two more things that matter if you touch it:

- **Rings render reversed, labels do not.** Rings paint largest-first so the smallest ends up on top. Labels are absolutely positioned overlays whose DOM order does not affect the stack, so they stay in natural order — reversing them put tab order at 05 → 01, backwards from the numbering a keyboard user is reading.
- The prototype was hover-only. Each label is a real `<button>` here, and `focus` lights the same path `hover` does, so the diagram is usable from the keyboard.

Under 1024px the labels cannot orbit without colliding — a circle plus a full-width label either side no longer fits — so the whole thing becomes a plain stacked list with every description open.

## Load-in

A staggered entrance on the header and hero, pure CSS — no JS, no hydration dependency. The animations use `both` fill so each element is already in its start state before first paint.

`site-header` and `hero-bg` fade; `hero-title` (120ms), `hero-cta` (260ms) and `hero-cue` (420ms) fade and rise.

Body sections get the same entrance via `RevealSections` — a render-nothing client component that observes `main > section` and the footer and marks each as it first enters view. **Triggered on entering view, not on load**: an animation on a section three screens down finishes long before anyone scrolls to it. Anything already on screen fades immediately, so the load case still reads as one continuous entrance.

The hidden state is gated behind `data-reveal="on"`, set in a layout effect before paint. **Without JS the attribute never lands and every section stays at opacity 1** — verified. The page never depends on this to be readable.

**The reduced-motion override is unlayered on purpose.** The entrance rules are unlayered, and an override inside `@layer base` loses to them regardless of specificity — reduced-motion users were still getting the full entrance until this was moved out. Verified at **0 running animations** under `prefers-reduced-motion: reduce`.

## Glass

`--glass-bg` / `--glass-blur` / `--glass-edge` / `--glass-sheen` / `--glass-depth`, plus a `.glass` class, applied to the nav, the hero property panel, the contact card and the mailto pill. Translucent tint, blurred and slightly saturated backdrop, one specular hairline on the lit edge.

The sheen is material description, not ornament — it is what tells you the surface has thickness. There is a `@supports not (backdrop-filter: ...)` fallback to a solid tint.

**Keep glass on small, static surfaces.** A removed build put `backdrop-filter` on six full-screen animated layers and measured **9fps**; the same scene without it ran at 60. Each blurred layer costs a framebuffer readback per frame. If you ever put glass on something large that moves, measure before shipping.

## Gotchas

- `context/` is gitignored — internal business memos. Do not commit them.
- `components/copy.ts` carries a `TODO` on the contact address. The previous build shipped a `mailto` for `research@` behind a label reading `victor@`; it is now a single placeholder value used for both.
- Section anchors (`#capabilities`, `#figures`, `#contact`) are real element IDs, and the placeholder section numbers in `copy.ts` are kept in sync with them by hand. A much older build intercepted all hash links in JS to drive a tab component; that is long gone.
- A scroll-driven full-screen camera-iris transition sat between the hero and the body for several iterations. It was **removed at the user's request** — component, CSS, copy and its nav entry are all gone, and the sections were renumbered from 02/03/04 to 01/02/03. If it comes back it needs a new slot and a renumber.
- A CSS "liquid glass" pass over the hero artwork (specular sweep, tone shaping, blend modes) was built and then **rolled back at the user's request** — the hero shows the plain image. The material quality lives in the render; CSS can sharpen it but cannot make a matte slab refractive.
- `PLAN.md` is stale — it predates three rewrites.
