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

Repeated shadcn semantic colors remain available as aliases so components preserve their expected token API without duplicating concrete palette values.

```css
--background: oklch(0.956 0.0067 115.71);
--foreground: oklch(0.1889 0.0062 236.93);
--card: var(--secondary);
--card-foreground: var(--secondary-foreground);
--popover: var(--secondary);
--popover-foreground: var(--secondary-foreground);

--primary: var(--signal-blue);
--primary-foreground: var(--signal-blue-foreground);
--secondary: oklch(0.9837 0.0066 106.52);
--secondary-foreground: var(--foreground);
--muted: oklch(0.8679 0.0104 131.37);
--muted-foreground: oklch(0.5029 0.0107 161.06);
--accent: var(--signal-amber);
--accent-foreground: var(--signal-amber-foreground);
--destructive: var(--signal-red);
--destructive-foreground: var(--signal-red-foreground);
--cta: var(--instrument);
--cta-foreground: var(--instrument-foreground);

--instrument: oklch(0.2101 0.0073 229.25);
--instrument-foreground: oklch(0.9775 0.0079 106.55);
--instrument-muted: oklch(0.2731 0.0091 234.05);

--signal-red: oklch(0.671 0.2168 29.19);
--signal-red-foreground: oklch(0.1756 0.063 34.07);
--signal-red-muted: oklch(0.933 0.034 29);
--signal-green: oklch(0.6421 0.1426 157.76);
--signal-green-foreground: oklch(0.1934 0.0329 158.81);
--signal-green-muted: oklch(0.9409 0.0332 165.14);
--signal-amber: oklch(0.8138 0.1475 79.72);
--signal-amber-foreground: oklch(0.2133 0.0444 78.32);
--signal-amber-muted: oklch(0.9577 0.0507 88.57);
--signal-blue: oklch(0.714 0.1284 236.3);
--signal-blue-foreground: oklch(0.1977 0.0426 236.05);
--signal-blue-muted: oklch(0.9448 0.0316 233.29);

--hud-line: oklch(0.1889 0.0062 236.93 / 34%);
--hud-line-soft: oklch(0.1889 0.0062 236.93 / 14%);
--hud-line-faint: oklch(0.1889 0.0062 236.93 / 8%);

--border: var(--muted);
--input: var(--muted);
--ring: oklch(0.635 0.0128 153.53);

--sidebar: var(--secondary);
--sidebar-foreground: var(--secondary-foreground);
--sidebar-primary: var(--instrument);
--sidebar-primary-foreground: var(--instrument-foreground);
--sidebar-accent: var(--primary);
--sidebar-accent-foreground: var(--primary-foreground);
--sidebar-border: var(--border);
--sidebar-ring: var(--ring);

--radius: 0;
--chamfer-sm: 10px;
--chamfer-md: 18px;
--chamfer-lg: 34px;
```

## Dark Tokens

```css
--background: oklch(0.2101 0.0073 229.25);
--foreground: oklch(0.9775 0.0079 106.55);
--secondary: oklch(0.2598 0.0103 229.34);
--muted: oklch(0.3249 0.0123 204.76);
--muted-foreground: oklch(0.7435 0.0116 149.8);
--instrument: oklch(0.9775 0.0079 106.55);
--instrument-foreground: oklch(0.1889 0.0062 236.93);
--instrument-muted: oklch(0.8908 0.0101 155.08);
--signal-red-muted: oklch(0.2589 0.0543 24.99);
--signal-green-muted: oklch(0.2919 0.0459 164.93);
--signal-amber-muted: oklch(0.2977 0.0442 75.75);
--signal-blue-muted: oklch(0.2832 0.0454 235.69);
--hud-line: oklch(0.9775 0.0079 106.55 / 42%);
--hud-line-soft: oklch(0.9775 0.0079 106.55 / 18%);
--hud-line-faint: oklch(0.9775 0.0079 106.55 / 8%);
--ring: oklch(0.6633 0.0134 177.8);
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
