# REMODEL — "Copper Cathedral"

Revamp plan for `www-pobuda-estate` (pobuda.estate). A single cinematic one-pager,
rebuilt on Astro and served as static assets from a Cloudflare Worker.

---

## Concept

**Cinematic restraint.** A warm-obsidian void that breathes slowly, copper light that
behaves like a living material, and type that *arrives* rather than appears. The
"Hans Zimmer" quality comes from **timing and layering**, not decoration: long easing,
low-frequency ambient motion, and one controlled crescendo at the call to action.
Masculine = dark, structural, unhurried, zero ornament.

Award-winning, beautiful, minimal, and unmistakably copper.

---

## Decisions Locked

| Area | Choice |
|---|---|
| Build | **Astro (latest) → static output → Cloudflare Workers static assets.** No adapter, no server runtime. |
| Backdrop | **Layered hybrid**: drifting copper mesh-gradient + depth particle field + film grain/vignette. |
| Palette | **Dark cinematic**, copper as the only accent. |
| Content | **Full one-pager**; copy drafted from the existing `src/data.ts`. |
| Design source of truth | **`DESIGN.md`** (Google Labs format) → exported to Tailwind v4 `@theme`. |

---

## 1. Architecture & Repo Changes

Replaces the current single-string worker (`src/index.ts`) with an Astro project. The old
file is retired; content moves to a typed data module.

```
docs/REMODEL.md            # this plan
DESIGN.md                  # NEW — canonical design tokens + rationale
astro.config.mjs
tsconfig.json
wrangler.jsonc             # replaces wrangler.toml
package.json
public/                    # favicons, optimized logo, og-image, robots.txt
src/
  data/site.ts             # ported + expanded from src/data.ts (typed)
  styles/
    theme.css              # GENERATED from DESIGN.md (@theme tokens)
    global.css             # base, fonts, motion primitives
  layouts/BaseLayout.astro
  scripts/
    motion.ts              # Lenis + GSAP orchestration
    backdrop.ts            # canvas gradient + particles
  components/
    Backdrop.astro  Nav.astro  Hero.astro  Manifesto.astro
    Services.astro  Process.astro  Trust.astro  Contact.astro  Footer.astro
    ui/  Reveal.astro  SectionLabel.astro  Marquee.astro  Magnetic.astro
  pages/index.astro
```

### Wrangler config (new shape)

No `main` — the Worker becomes a static asset host.

```jsonc
{
  "name": "www-pobuda-estate",
  "compatibility_date": "2026-09-25",
  "assets": { "directory": "./dist", "not_found_handling": "404-page" },
  "routes": [
    { "pattern": "pobuda.estate", "zone_name": "pobuda.estate" },
    { "pattern": "www.pobuda.estate", "zone_name": "pobuda.estate" }
  ]
}
```

> If a contact-form endpoint is wanted later, add `@astrojs/cloudflare` + `main` then.
> Not built now.

### Dependencies

**Added:** `astro`, `@astrojs/sitemap`, `@astrojs/check`, `tailwindcss@4` +
`@tailwindcss/vite`, `gsap`, `lenis`, `@fontsource-variable/fraunces`,
`@fontsource-variable/inter`, `@fontsource/jetbrains-mono`, and (dev)
`@google/design.md`.

**Removed:** the `cdn.tailwindcss.com` script — the single biggest current perf liability.

### Scripts

```jsonc
{
  "dev":       "astro dev",
  "build":     "astro build",
  "preview":   "astro preview",
  "check":     "astro check && npm run design:lint",
  "design:lint":   "designmd lint DESIGN.md",
  "design:theme":  "designmd export --format css-tailwind DESIGN.md > src/styles/theme.css",
  "design:diff":   "designmd diff DESIGN.md DESIGN-v2.md",
  "deploy":    "astro build && wrangler deploy"
}
```

> Note: use the dot-free `designmd` alias, not `design.md`, to avoid the Windows
> Markdown file-association collision documented by the spec.

> We keep Tailwind (per stack) with a bespoke token layer — **not** shadcn, which is
> app-UI and would fight a one-off cinematic design.

---

## 2. Design Phase A — `DESIGN.md` (canonical design system)

Adopt the **Google Labs DESIGN.md format** as the single source of truth for the visual
identity. Reference: <https://github.com/google-labs-code/design.md>

A `DESIGN.md` file combines:

1. **YAML front matter** — machine-readable design tokens (exact values).
2. **Markdown body** — human-readable rationale (why the values exist, how to apply them).

Tokens are normative; prose gives agents the intent. This lets both the human designer and
the coding agent share one persistent, structured understanding of the system.

### Workflow

```bash
# Validate structure, catch broken token refs + WCAG contrast failures
npx @google/design.md lint DESIGN.md

# Generate the Tailwind v4 theme from the tokens
npx @google/design.md export --format css-tailwind DESIGN.md > src/styles/theme.css

# When the system changes, detect token/prose regressions
npx @google/design.md diff DESIGN.md DESIGN-v2.md
```

`src/styles/theme.css` is **generated** and consumed by `global.css`. No hand-edited hex
values in components — everything reads from the exported `@theme` variables.

### `DESIGN.md` token schema (what we author)

```yaml
---
version: "alpha"
name: Copper Cathedral
description: Cinematic dark, copper-accented identity for Pobuda Estates.
colors:
  primary: "#b87333"        # copper
  ember: "#d98a4f"
  patina: "#8b5a2b"
  void: "#0a0908"
  surface: "#14110e"
  surface-raised: "#1a1613"
  on-surface: "#f5efe6"     # bone
  muted: "#8a8078"
  hairline: "rgba(184,115,51,0.15)"
typography:
  display-xl: { fontFamily: Fraunces, fontSize: 4.5rem, lineHeight: 1.02, letterSpacing: -0.02em, fontVariation: "opsz 144" }
  display-md: { fontFamily: Fraunces, fontSize: 2.75rem, lineHeight: 1.08 }
  body-md:    { fontFamily: Inter, fontSize: 1rem, lineHeight: 1.65 }
  label-caps: { fontFamily: "JetBrains Mono", fontSize: 0.75rem, letterSpacing: 0.2em }
rounded:
  none: 0px
  sm: 2px
  md: 4px
spacing:
  sm: 8px
  md: 16px
  lg: 48px
  xl: 128px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.void}"
    rounded: "{rounded.sm}"
    padding: 14px 28px
  button-primary-hover:
    backgroundColor: "{colors.ember}"
seo:                          # custom extension key — accepted, stays silent in lint
  theme-color: "#0a0908"
---
```

Markdown body sections follow the **canonical order** (present sections only):

1. Overview (Brand & Style)
2. Colors
3. Typography
4. Layout
5. Elevation & Depth
6. Shapes
7. Components
8. Do's and Don'ts

Lint gates on: broken token refs (`error`), WCAG AA contrast for component color pairs,
missing `primary`, missing typography, section order, unknown/typo'd keys. See Appendix A.

---

## 3. Design Phase B — Visual System

### Palette (warm near-black, never pure `#000`)

| Token | Value | Use |
|---|---|---|
| Void | `#0a0908` | Page base |
| Surface | `#14110e` / `#1a1613` | Raised planes |
| Copper | `#b87333` | The only accent (kept) |
| Ember | `#d98a4f` | Copper's highlight |
| Patina | `#8b5a2b` | Copper's shadow |
| Bone | `#f5efe6` | Primary type |
| Muted | `#8a8078` | Secondary type |
| Hairline | `rgba(184,115,51,.15)` | Dividers |

### Type — three-voice system (self-hosted, no CDN)

- **Display:** Fraunces Variable — high-contrast serif, optical sizing, gravitas.
  *Alternative: a grotesk-only direction (Space Grotesk) if the serif reads too editorial.*
- **Body:** Inter Variable — clean, neutral, legible.
- **Micro-labels / section numbers:** JetBrains Mono, uppercase, tracked +0.2em — the
  "technical consulting" tell.

### Texture

Hairline rules over cards, generous negative space, no rounded "cartoon" corners, and **no
emoji** — the current emoji service icons are replaced with custom 1.5px line SVGs.

---

## 4. Backdrop — Layered Hybrid

One fixed, full-viewport stack behind all content:

1. **Mesh gradient** — 3–4 blurred copper radial fields drifting on independent slow
   sine paths (canvas or GPU transforms).
2. **Depth field** — ~70–120 rising dust motes (2D canvas); size/opacity/blur = depth,
   with slight scroll + cursor parallax. Mobile drops to ~35.
3. **Vignette + animated film grain** — SVG `feTurbulence` at ~5% opacity, stepped.
4. *(optional)* a faint architectural line grid that shifts slowly.

**Guardrails:** `prefers-reduced-motion` → static gradient, no canvas. Pause on
tab-hidden / offscreen. DPR capped 1.5–2. CSS-gradient fallback if canvas unsupported.
60fps budget is a hard requirement.

---

## 5. Motion Language — "The Build"

Core stack: **Lenis** (inertial smooth scroll) + **GSAP + ScrollTrigger + SplitText**
(free license).

- **Ambient drone:** the backdrop never stops moving — the low sustained note.
- **Entrances:** masked line/word reveals, `power4.out`, 1.2–1.8s, layered stagger.
- **Scroll choreography:** scroll-linked parallax, a pinned Process section, a progress
  hairline at the top.
- **Crescendo:** the Contact CTA — copper glow intensifies, type scales up, backdrop peaks.
- **Micro-interactions:** magnetic buttons, cursor-follow glow, card tilt, count-up stats.
- **Intro:** brief cinematic lift (≤600ms, skippable, reduced-motion-safe).

---

## 6. Sections & Copy Direction

1. **Nav** — wordmark + anchor links; transparent → blurred on scroll.
2. **Hero** — H1: *"Technical clarity for the spaces where life and business happen."*
   Sub: *"Business infrastructure and residential systems, designed and cared for by one
   firm."* CTAs: **Request a consultation** / **Explore services**.
3. **Manifesto** — 2–3 editorial lines on rigor + care; stat row (count-up).
4. **Services** — the 4 offerings, rewritten, numbered 01–04, custom SVG icons,
   asymmetric grid.
5. **Process** — Assess → Architecture → Implement → Steward (pinned, scroll-built).
6. **Trust** — "Enterprise rigor. Residential care." + service-area/Arizona note +
   testimonial slot (placeholder).
7. **Contact CTA** — closing line, email + phone as `mailto:`/`tel:`, copper peak.
8. **Footer** — minimal, thin.

The strings `info@pobuda.estate` and `Technical Consulting` are preserved so
`test_site.py` keeps passing.

---

## 7. Delivery Phases

1. **Scaffold** — Astro + Tailwind v4 + Vite plugin + wrangler assets config;
   verify a blank build deploys to a preview URL.
2. **Design system**
   a. Author `DESIGN.md` (tokens + rationale, canonical section order).
   b. `designmd lint` clean → `designmd export --format css-tailwind` → `theme.css`.
   c. `global.css`: fonts, base, motion primitives consuming `@theme`.
3. **Data layer** — port `data.ts` → `site.ts`; write all copy.
4. **Backdrop** — canvas layers + reduced-motion/fallback paths.
5. **Motion system** — Lenis + GSAP orchestration (`motion.ts`).
6. **Sections** — build in order, responsive.
7. **SEO / perf / a11y pass** — meta, OG, JSON-LD `LocalBusiness`, sitemap, robots,
   Lighthouse ≥95, real focus states, alt text.
8. **Verify & deploy** — `astro check`, `wrangler dev`, update `test_site.py` keywords;
   cut over the live worker only after the preview passes.

---

## 8. Open Items / Assumptions (flag any to change)

- **Pure static** (no contact-form backend). Default: yes.
- **Logo**: currently an 835KB remote PNG → optimize to AVIF/WebP in `public/`. Okay?
- **Real claims**: no invented years-in-business, licensing, or testimonials —
  placeholders marked `<!-- TODO -->` for you to supply.
- **Type direction**: serif-display (Fraunces) vs grotesk-only. Build serif first;
  flip on request.
- **DESIGN.md location**: at repo root (`DESIGN.md`), matching the spec's convention.
- **Test keywords** preserved so the existing test passes.

---

## Appendix A — DESIGN.md lint rules (reference)

| Rule | Severity | Checks |
|---|---|---|
| `broken-ref` | error | `{colors.primary}`-style refs that don't resolve |
| `missing-primary` | warning | Colors defined but no `primary` |
| `contrast-ratio` | warning | Component `textColor`/`backgroundColor` below WCAG AA 4.5:1 |
| `orphaned-tokens` | warning | Color tokens never referenced by a component |
| `token-summary` | info | Count of tokens per section |
| `missing-sections` | info | Optional sections absent when others exist |
| `missing-typography` | warning | Colors defined but no typography tokens |
| `section-order` | warning | Sections out of canonical order |
| `unknown-key` | warning | Top-level key that looks like a typo of a schema key |
| `token-like-ignored` | warning | Unknown key holding token-like values |
| `omitted-rules` | info | Validates the `omitted` configuration |

## Appendix B — References

- DESIGN.md format: <https://github.com/google-labs-code/design.md>
- Spec: <https://stitch.withgoogle.com/docs/design-md/specification>
- Astro → Cloudflare deployment:
  <https://docs.astro.build/en/guides/deploy/cloudflare/>
- Cloudflare Workers static assets:
  <https://developers.cloudflare.com/workers/static-assets/>
