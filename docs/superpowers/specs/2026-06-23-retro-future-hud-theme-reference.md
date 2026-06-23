# Retro Future HUD Theme Reference

Date: 2026-06-23

## Source Preview

Approved visual direction: V3 retro-future ruler / halftone / fighter-HUD theme.

- Mockup source: `.superpowers/brainstorm/36073-1782032832/content/retro-future-ruler-halftone-v3.html`
- Local preview URL: `http://127.0.0.1:4178/retro-future-ruler-halftone-v3.html?top=14`

Keep the mockup in place so the local preview continues to work. This document is the durable reference under `docs/`.

## Visual Direction

The theme combines off-white instrument panels, rounded/chamfered sci-fi surfaces, circular ruler motifs, small halftone accents, and monotone fighter-jet HUD linework.

Core characteristics:

- Light mode uses a pale instrument-paper background with white panel surfaces.
- Dark mode inverts the instrument relationship: dark background, light instrument controls.
- HUD decoration is monotone, using foreground-derived line tokens instead of signal colors.
- Signal colors are reserved for semantic state and accents: red, green, amber, and blue.
- Lime was removed from the direction.
- Rulers should appear smaller, partial, and set a short distance from perpendicular guide lines.
- Buttons and panels use asymmetric chamfered corners, closer to hexagonal cockpit panels than rounded pills.
- Half-tone texture should be small and restrained, used as accents rather than full-page texture.

## Font Direction

Use a plain technical sans stack:

```css
--font-sans: "Inter", "Arial", "Helvetica", sans-serif;
--font-display: "Inter", "Arial", "Helvetica", sans-serif;
```

The site should not import `next/font/google` for Geist for this direction. The app layout should rely on the shared `font-sans` class.

## Light Tokens

```css
--background: #f0f1ec;
--foreground: #111416;
--card: #fafaf5;
--card-foreground: #111416;
--popover: #fafaf5;
--popover-foreground: #111416;

--primary: var(--signal-blue);
--primary-foreground: var(--signal-blue-foreground);
--secondary: #fafaf5;
--secondary-foreground: #111416;
--muted: #d1d5ce;
--muted-foreground: #5f6662;
--accent: var(--signal-amber);
--accent-foreground: var(--signal-amber-foreground);
--destructive: var(--signal-red);
--destructive-foreground: var(--signal-red-foreground);
--cta: var(--instrument);
--cta-foreground: var(--instrument-foreground);

--instrument: #15191b;
--instrument-foreground: #f8f8f2;
--instrument-muted: #23282b;

--signal-red: #ff4d3d;
--signal-red-foreground: #260300;
--signal-red-muted: #ffe1dc;
--signal-green: #1fa66a;
--signal-green-foreground: #06190f;
--signal-green-muted: #d8f3e6;
--signal-amber: #f4b63f;
--signal-amber-foreground: #241600;
--signal-amber-muted: #fff0cb;
--signal-blue: #42aee8;
--signal-blue-foreground: #001826;
--signal-blue-muted: #d9f1ff;

--hud-line: rgba(17, 20, 22, 0.34);
--hud-line-soft: rgba(17, 20, 22, 0.14);
--hud-line-faint: rgba(17, 20, 22, 0.08);

--border: #d1d5ce;
--input: #d1d5ce;
--ring: #858d87;

--radius: 0;
--chamfer-sm: 10px;
--chamfer-md: 18px;
--chamfer-lg: 34px;
```

## Dark Tokens

```css
--background: #15191b;
--foreground: #f8f8f2;
--card: #1f2528;
--card-foreground: #f8f8f2;
--popover: #1f2528;
--popover-foreground: #f8f8f2;

--secondary: #1f2528;
--secondary-foreground: #f8f8f2;
--muted: #2d3637;
--muted-foreground: #a7aea8;

--instrument: #f8f8f2;
--instrument-foreground: #111416;
--instrument-muted: #d6ddd8;

--signal-red-muted: #3a1816;
--signal-green-muted: #123326;
--signal-amber-muted: #3a2a12;
--signal-blue-muted: #102d3d;

--hud-line: rgba(248, 248, 242, 0.42);
--hud-line-soft: rgba(248, 248, 242, 0.18);
--hud-line-faint: rgba(248, 248, 242, 0.08);

--border: #2d3637;
--input: #2d3637;
--ring: #8b9693;
```

## Token Usage

Use semantic tokens first:

```text
bg-background text-foreground
bg-card text-card-foreground
bg-primary text-primary-foreground
bg-cta text-cta-foreground
bg-instrument text-instrument-foreground
bg-muted text-muted-foreground
border-border ring-ring
font-sans
```

Use signal tokens for semantic status, accent states, and focused visual moments:

```text
bg-signal-red text-signal-red-foreground
bg-signal-red-muted text-foreground
bg-signal-green text-signal-green-foreground
bg-signal-green-muted text-foreground
bg-signal-amber text-signal-amber-foreground
bg-signal-amber-muted text-foreground
bg-signal-blue text-signal-blue-foreground
bg-signal-blue-muted text-foreground
```

Use HUD line tokens for decorative circuit/ruler lines:

```text
border-[color:var(--hud-line)]
text-[color:var(--hud-line)]
```

## Button Mapping

Default button:

- Uses `instrument` background.
- Uses `instrument-foreground` text.
- Chamfered asymmetric shape.

Accent button:

- Uses `signal-blue`.
- Suitable for selected modules and primary accent actions.

Semantic buttons:

- Red for destructive/error.
- Green for success/active system.
- Amber for caution/warning.

Outlined button:

- Uses a CSS-only chamfered outline, not stretched SVG.
- No square hover outline.

Ghost button:

- Same chamfered silhouette as outlined/default buttons.
- No border.
- Used for low-emphasis actions.

Icon buttons:

- Fixed dimensions.
- May use a fixed SVG outline if the shape must stay stable at icon-button size.
- Hover should avoid square browser outlines.

## Utility Classes

Reusable shape utilities:

```text
chamfer-surface
chamfer-surface-lg
chamfer-button
chamfer-outline
```

Reusable halftone utilities:

```text
bg-halftone
bg-halftone-accent
```

`chamfer-surface` is the simpler card/panel cut used for repeated surfaces. `chamfer-surface-lg` is the fuller octagonal shell treatment. `chamfer-button` is the asymmetric button silhouette. `chamfer-outline` draws a CSS-only chamfered border with `::before` and `::after`, avoiding stretched SVG outlines for text buttons.

The halftone utilities use `currentColor` by default and are intentionally small. Tune them with:

```css
--halftone-color
--halftone-dot-size
--halftone-dot-gap
--halftone-opacity
--halftone-accent-size
--halftone-accent-offset
```

## Implementation Files

Theme implementation targets:

- `packages/ui/src/styles/globals.css`
- `apps/site/src/app/globals.css`
- `apps/site/src/app/layout.tsx`
- `packages/ui/test/theme.test.ts`

Configuration files checked:

- `packages/ui/components.json`
- `apps/site/components.json`

Both `components.json` files should stay on `radix-maia`, `lucide`, neutral base color, CSS variables, and their existing CSS paths unless the shadcn generator contract changes.

## Verification

Commands used for the implementation pass:

```sh
pnpm --filter @folio/ui test -- theme.test.ts
pnpm --filter @folio/ui typecheck
pnpm --filter @folio/ui lint
pnpm --filter @folio/site test
pnpm --filter @folio/site lint
pnpm --filter @folio/site typecheck
pnpm --filter @folio/ui test
pnpm --filter @folio/site build
git diff --check
```

The UI lint command passed with pre-existing warnings in calendar, carousel, and use-mobile code.
