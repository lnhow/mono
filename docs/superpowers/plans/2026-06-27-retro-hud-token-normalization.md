# Retro HUD Token Normalization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace repeated Retro HUD color values with semantic aliases and convert every concrete theme color to visually equivalent OKLCH.

**Architecture:** `packages/ui/src/styles/globals.css` remains the single token source consumed by the site. Standard shadcn token names remain public, but repeated surfaces, foregrounds, borders, and inputs resolve through canonical variables so light/dark overrides only change the canonical values.

**Tech Stack:** CSS custom properties, Tailwind CSS v4 `@theme inline`, Vitest contract tests, pnpm/Turborepo.

---

### Task 1: Lock the normalized token contract

**Files:**
- Modify: `packages/ui/test/theme.test.ts`
- Test: `packages/ui/test/theme.test.ts`

- [ ] **Step 1: Replace the palette assertions with alias and OKLCH assertions**

Replace the first two theme tests with:

```ts
it("uses OKLCH for every concrete Retro HUD color", () => {
  expect(globals).toContain("--background: oklch(0.956 0.0067 115.71);")
  expect(globals).toContain("--foreground: oklch(0.1889 0.0062 236.93);")
  expect(globals).toContain("--instrument: oklch(0.2101 0.0073 229.25);")
  expect(globals).toContain(
    "--instrument-foreground: oklch(0.9775 0.0079 106.55);"
  )
  expect(globals).toContain(
    "--hud-line: oklch(0.1889 0.0062 236.93 / 34%);"
  )
  expect(globals).not.toMatch(/#[0-9a-f]{3,8}\b/i)
  expect(globals).not.toMatch(/rgba?\(/i)
})

it("aliases repeated shadcn colors to canonical semantic tokens", () => {
  expect(globals).toContain("--card: var(--secondary);")
  expect(globals).toContain("--popover: var(--secondary);")
  expect(globals).toContain("--sidebar: var(--secondary);")
  expect(globals).toContain("--secondary-foreground: var(--foreground);")
  expect(globals).toContain(
    "--card-foreground: var(--secondary-foreground);"
  )
  expect(globals).toContain(
    "--popover-foreground: var(--secondary-foreground);"
  )
  expect(globals).toContain(
    "--sidebar-foreground: var(--secondary-foreground);"
  )
  expect(globals).toContain("--border: var(--muted);")
  expect(globals).toContain("--input: var(--muted);")
  expect(globals).toContain("--sidebar-border: var(--border);")
  expect(globals).toContain("--sidebar-ring: var(--ring);")
})

it("defines dark canonical colors and signal foreground/muted variants", () => {
  expect(globals).toContain("--background: oklch(0.2101 0.0073 229.25);")
  expect(globals).toContain("--secondary: oklch(0.2598 0.0103 229.34);")
  expect(globals).toContain("--instrument: oklch(0.9775 0.0079 106.55);")
  expect(globals).toContain("--signal-red: oklch(0.671 0.2168 29.19);")
  expect(globals).toContain(
    "--signal-red-foreground: oklch(0.1756 0.063 34.07);"
  )
  expect(globals).toContain("--signal-red-muted: oklch(0.933 0.034 29);")
  expect(globals).toContain("--signal-green: oklch(0.6421 0.1426 157.76);")
  expect(globals).toContain(
    "--signal-green-foreground: oklch(0.1934 0.0329 158.81);"
  )
  expect(globals).toContain(
    "--signal-green-muted: oklch(0.9409 0.0332 165.14);"
  )
  expect(globals).toContain("--signal-amber: oklch(0.8138 0.1475 79.72);")
  expect(globals).toContain(
    "--signal-amber-foreground: oklch(0.2133 0.0444 78.32);"
  )
  expect(globals).toContain(
    "--signal-amber-muted: oklch(0.9577 0.0507 88.57);"
  )
  expect(globals).toContain("--signal-blue: oklch(0.714 0.1284 236.3);")
  expect(globals).toContain(
    "--signal-blue-foreground: oklch(0.1977 0.0426 236.05);"
  )
  expect(globals).toContain(
    "--signal-blue-muted: oklch(0.9448 0.0316 233.29);"
  )
})
```

- [ ] **Step 2: Run the focused test and verify RED**

Run:

```bash
CI=true pnpm --filter @folio/ui test -- theme.test.ts
```

Expected: FAIL because `globals.css` still contains hex/RGBA concrete values and repeated literal surface colors.

- [ ] **Step 3: Commit the failing contract test**

```bash
git add packages/ui/test/theme.test.ts
git commit -m "test: define normalized HUD token contract"
```

### Task 2: Normalize aliases and convert the palette

**Files:**
- Modify: `packages/ui/src/styles/globals.css`
- Test: `packages/ui/test/theme.test.ts`

- [ ] **Step 1: Replace the root token declarations**

Use these root declarations, retaining the existing radius, chart, and `@theme inline` mappings:

```css
:root {
  --background: oklch(0.956 0.0067 115.71);
  --foreground: oklch(0.1889 0.0062 236.93);
  --secondary: oklch(0.9837 0.0066 106.52);
  --secondary-foreground: var(--foreground);
  --card: var(--secondary);
  --card-foreground: var(--secondary-foreground);
  --popover: var(--secondary);
  --popover-foreground: var(--secondary-foreground);
  --primary: var(--signal-blue);
  --primary-foreground: var(--signal-blue-foreground);
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
}
```

- [ ] **Step 2: Reduce dark mode to canonical overrides**

Keep the selectors and use:

```css
.dark,
[data-theme='dark'] {
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
}
```

- [ ] **Step 3: Run the focused test and verify GREEN**

Run:

```bash
CI=true pnpm --filter @folio/ui test -- theme.test.ts
```

Expected: all tests in `theme.test.ts` PASS.

- [ ] **Step 4: Commit the implementation**

```bash
git add packages/ui/src/styles/globals.css
git commit -m "refactor: normalize HUD color tokens"
```

### Task 3: Update the durable token reference and verify the workspace

**Files:**
- Modify: `docs/superpowers/specs/2026-06-23-retro-future-hud-theme-reference.md`

- [ ] **Step 1: Replace the Light and Dark token examples**

Use the exact root and dark declarations from Task 2. Add this sentence before the Light Tokens block:

```markdown
Repeated shadcn semantic colors remain available as aliases so components preserve their expected token API without duplicating concrete palette values.
```

- [ ] **Step 2: Run package verification**

```bash
CI=true pnpm --filter @folio/ui test -- theme.test.ts
CI=true pnpm --filter @folio/ui typecheck
CI=true pnpm --filter @folio/ui lint
CI=true pnpm --filter @folio/site test
CI=true pnpm --filter @folio/site typecheck
```

Expected: commands pass; existing lint warnings may remain unchanged.

- [ ] **Step 3: Run the site build and whitespace check**

```bash
CI=true pnpm --filter @folio/site build
git diff --check
```

Expected: the build and whitespace check pass.

- [ ] **Step 4: Commit the reference update**

```bash
git add docs/superpowers/specs/2026-06-23-retro-future-hud-theme-reference.md
git commit -m "docs: update HUD tokens to OKLCH aliases"
```
