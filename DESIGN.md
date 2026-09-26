---
version: "alpha"
name: Copper Cathedral
description: Cinematic dark, copper-accented identity for Pobuda Estates — technical consulting for business and residence.
colors:
  primary: "#b87333"
  ember: "#e0a15e"
  patina: "#4e6e5a"
  void: "#0b0907"
  surface: "#141110"
  surface-raised: "#1c1815"
  bone: "#f2eae0"
  muted: "#9a8f84"
  hairline: "rgba(184, 115, 51, 0.18)"
typography:
  display-xl:
    fontFamily: Fraunces Variable
    fontSize: 4.5rem
    fontWeight: 400
    lineHeight: 1.02
    letterSpacing: -0.02em
    fontVariation: "'opsz' 144, 'SOFT' 0, 'WONK' 1"
  display-lg:
    fontFamily: Fraunces Variable
    fontSize: 3rem
    fontWeight: 400
    lineHeight: 1.06
    letterSpacing: -0.015em
    fontVariation: "'opsz' 96, 'SOFT' 0, 'WONK' 1"
  display-md:
    fontFamily: Fraunces Variable
    fontSize: 2rem
    fontWeight: 400
    lineHeight: 1.12
    letterSpacing: -0.01em
    fontVariation: "'opsz' 72, 'SOFT' 0, 'WONK' 1"
  body-lg:
    fontFamily: Hanken Grotesk Variable
    fontSize: 1.125rem
    fontWeight: 400
    lineHeight: 1.65
  body-md:
    fontFamily: Hanken Grotesk Variable
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.7
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 0.72rem
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0.22em
rounded:
  none: 0px
  sm: 2px
  md: 4px
spacing:
  2xs: 4px
  xs: 8px
  sm: 16px
  md: 24px
  lg: 48px
  xl: 96px
  2xl: 160px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.void}"
    typography: "{typography.label-caps}"
    rounded: "{rounded.sm}"
    padding: 14px 28px
  button-primary-hover:
    backgroundColor: "{colors.ember}"
    textColor: "{colors.void}"
  capability-row:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.bone}"
    rounded: "{rounded.none}"
    padding: 32px 0
  panel-raised:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.bone}"
    rounded: "{rounded.sm}"
  eyebrow:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.muted}"
  ambient-field:
    backgroundColor: "{colors.patina}"
    textColor: "{colors.bone}"
  rule-hairline:
    backgroundColor: "{colors.void}"
    textColor: "{colors.hairline}"
---

## Overview

**Copper Cathedral** is Architectural Minimalism with the warmth of worked metal. The
page reads as a dark, quiet space lit by a single material: copper. It is the visual
language of infrastructure — wiring, conduit, drafting, brought into a domestic calm.

The identity belongs to Pobuda Estates, a technical consultancy that serves two
audiences with one standard: businesses and private residences. The design must hold
that duality without splitting in two. It is masculine in the way a well-engineered
system is masculine: unhurried, structural, precise, and free of ornament.

Aesthetic register: cinematic restraint. Motion is low, slow, and sustained rather
than lively. Nothing blinks or bounces. The page behaves like a system at rest.

## Colors

The palette is a warm near-black field with copper as the sole active accent. Every
value is grounded in copper as a physical material rather than a brand abstraction.

- **Primary (#b87333) — Copper.** The material of the trade: wire, pipe, contact. The
  only driver of interaction and emphasis.
- **Ember (#e0a15e).** Copper near its melting point. Used only on the hover of the
  primary action and the signal pulse that travels the conduit.
- **Patina (#4e6e5a).** Oxidized copper. A whisper, never a UI accent; it appears only
  inside the ambient field to keep the dark from reading as flat black.
- **Void (#0b0907).** The page. Warm near-black, never pure `#000`.
- **Surface (#141110) / Surface-raised (#1c1815).** Planes that separate one idea from
  the next without adding borders everywhere.
- **Bone (#f2eae0).** Primary type. A warm off-white; the only large area of light.
- **Muted (#9a8f84).** Secondary type, metadata, captions.
- **Hairline (rgba(184,115,51,0.18)).** Copper at low alpha for rules and dividers.

## Typography

Three voices, each with one job, deliberately cross-paired rather than drawn from a
single superfamily.

- **Display — Fraunces Variable.** A high-contrast serif set with `WONK` on and a high
  optical size. At display scale it reads as an engraved copperplate, not a book face —
  sharp, worked, permanent. Used with restraint: headlines only.
- **Body — Hanken Grotesk Variable.** A warm, humanist grotesque. Carries all running
  prose and interface text; quiet and legible against the dark.
- **Utility — JetBrains Mono.** Uppercase, tracked wide. Encodes section labels,
  audience tags, coordinates, and data. This is the "technical" tell and the connective
  tissue between the serif and the body.

Scale: display-xl 4.5rem → label-caps 0.72rem. Headlines run tight and negative-
tracked; labels run wide. The contrast between the two is the typographic signature.

## Layout

A single editorial column with a narrow left rail. The rail holds mono metadata —
section label, audience tags, index — while the main column holds one idea at a time.
Spacing is generous; density is deliberately low.

A continuous copper **conduit** (see Elevation & Depth) runs the full height of the
page just inside the rail, branching at the top into two nodes: Business and
Residence. Content never intersects it; the conduit passes behind the noise floor and
in front of the backdrop.

```
┌──────────────────────────────────────────────┐
│  wordmark              capabilities  [contact]│
├──────────────────────────────────────────────┤
│                                               │
│  ┌ BUSINESS ─┐                                │
│  ├───────────┼──●  one firm                  │
│  └ RESIDENCE ┘                                │
│                                               │
│  The systems behind working                   │
│  businesses and quiet homes.                  │
│                                               │
│  [ Request a consultation ]   See method →    │
│                                               │
│  ─────────────────────────────────────────    │
│  PHOENIX, AZ · INFO@POBUDA.ESTATE             │
└──────────────────────────────────────────────┘
```

## Elevation & Depth

Depth comes from light and layering, not shadows.

1. **Ambient field** — blurred copper and patina radial glows drifting slowly behind
   everything.
2. **Dust** — sparse copper motes at low opacity, parallaxed to scroll and pointer.
3. **Grain + vignette** — a fine film grain and corner falloff hold the composition.
4. **The Conduit** — a 1.5px copper schematic trace, pinned to the rail, drawn in step
   with scroll, carrying an ember pulse. It is both the page's progress and its thesis:
   two audiences joined by one line.

Surfaces are flat. Division is by tone and hairline, never by drop shadow.

## Shapes

Right angles and hairlines. Radius is `none` or `sm` (2px) at most — copper is cut and
bent, not rounded. The only curves in the interface are the conduit's, and those are
wide, deliberate arcs. Icons are 1.5px monoline schematics, never filled, never emoji.

## Components

- **button-primary** — copper fill, void text, mono-caps label, 2px radius. The single
  loud element on any screen.
- **button-primary-hover** — ember fill. The only hover that changes a fill.
- **capability-row** — flat surface, bone text, hairline bottom rule; the row a
  capability lives in. Interaction is a faint ember wash from the left, not a lift.

## Do's and Don'ts

Do keep copper singular; if a second color is needed, use tone, not hue. Do let the
conduit carry the drama. Do write plainly and specifically.

Don't add drop shadows, don't round corners beyond 4px, don't use emoji, don't stack
gradients on gradients, and don't number anything that isn't genuinely a sequence.
