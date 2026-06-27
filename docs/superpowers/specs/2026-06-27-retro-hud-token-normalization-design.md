# Retro HUD Token Normalization

## Objective

Reduce repeated color definitions in the Retro HUD theme and express all concrete theme colors in OKLCH without changing the rendered palette or shadcn-compatible token API.

## Token Model

Standard shadcn semantic token names remain available. Tokens that intentionally share a color use CSS variable aliases instead of repeating concrete values.

Canonical surface and text tokens:

- `--background`
- `--foreground`
- `--secondary`
- `--muted`
- `--muted-foreground`
- `--ring`

Surface aliases:

- `--card: var(--secondary)`
- `--popover: var(--secondary)`
- `--sidebar: var(--secondary)`

Foreground aliases:

- `--secondary-foreground: var(--foreground)`
- `--card-foreground: var(--secondary-foreground)`
- `--popover-foreground: var(--secondary-foreground)`
- `--sidebar-foreground: var(--secondary-foreground)`

Control aliases:

- `--border: var(--muted)`
- `--input: var(--muted)`
- `--sidebar-border: var(--border)`
- `--sidebar-ring: var(--ring)`

Existing intentional aliases remain, including primary to signal blue, accent to signal amber, destructive to signal red, CTA to instrument, chart colors to signal colors, and sidebar action colors to their corresponding semantic tokens.

## Color Format

Every concrete theme color in `packages/ui/src/styles/globals.css` uses OKLCH. Existing hex and RGBA colors are converted to visually equivalent OKLCH values rather than redesigned.

Colors with transparency use OKLCH alpha syntax, for example `oklch(... / 34%)`. CSS variable aliases and numeric geometry variables are unchanged.

The dark theme overrides only canonical values that differ from light mode. Aliased semantic variables remain declared in the root scope and inherit the active canonical dark values.

## Compatibility

The `@theme inline` mappings and public utility names remain unchanged. Existing consumers can continue using `bg-card`, `bg-popover`, `bg-sidebar`, `border-border`, and related shadcn utilities.

The app-level stylesheet continues importing the shared package stylesheet, so the shared token file remains the single implementation source.

## Verification

The theme contract test will verify:

- Concrete color values use OKLCH.
- Repeated semantic colors use the approved aliases.
- Dark mode overrides canonical colors without redeclaring duplicate surface aliases.
- Existing Retro HUD signal, chamfer, and halftone contracts remain intact.

Run the UI theme test, UI typecheck and lint, site tests and typecheck, site build, and `git diff --check`.
