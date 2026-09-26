# Pobuda Estates

Marketing site for Pobuda Estates LLC — technical consulting for business and residence.
An Astro static site served as Cloudflare Workers static assets.

## Stack

- **Astro** (static output) → `wrangler deploy` to Cloudflare Workers assets
- **Tailwind CSS v4** with a bespoke token layer
- **GSAP + Lenis** for scroll orchestration and inertial scrolling
- Self-hosted fonts: Fraunces (display), Hanken Grotesk (body), JetBrains Mono (labels)
- Design tokens are generated from `DESIGN.md` via the Google Labs DESIGN.md CLI

## Commands

```bash
npm run dev        # local dev server
npm run build      # static build to dist/
npm run preview    # preview the build
npm run check      # astro check + design lint
npm run deploy     # build and deploy to Cloudflare
```

## Design system

`DESIGN.md` is the source of truth (tokens + rationale). The Tailwind theme is
generated from it — never hand-edit hex values in components.

```bash
npm run design:lint     # validate tokens, refs, contrast, section order
npm run design:theme    # regenerate src/styles/theme.css from DESIGN.md
npm run design:diff     # compare two DESIGN.md versions
```

Reference: <https://github.com/google-labs-code/design.md>

## Notes

- Pure static output; no server runtime. Add `@astrojs/cloudflare` if a contact
  endpoint is ever needed.
- Placeholder content that must be replaced before launch is marked `TODO` in the
  components (testimonial, service area).
