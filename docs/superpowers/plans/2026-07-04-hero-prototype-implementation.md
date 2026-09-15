# Futuristic Hero Prototype Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build `/hero-prototype` with reusable SVG clock, user-agent display, and document-height scroll ruler while preserving the current homepage and standard site chrome.

**Architecture:** Route groups separate the existing site shell from the full-bleed prototype shell without pathname checks or hydration-dependent layout. Pure time and scroll helpers are tested independently; three client components own their browser lifecycles and are composed only by the prototype page. Motion values update SVG transforms and scroll state outside React's full render loop.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Motion for React (`motion/react`), SVG, Tailwind CSS 4, Vitest, Testing Library, jsdom.

---

## File Structure

- Move `apps/site/src/app/page.tsx` to `apps/site/src/app/(site)/page.tsx`: preserve current homepage under the standard shell.
- Move `apps/site/src/app/blog/` and `apps/site/src/app/posts/` into `apps/site/src/app/(site)/`: preserve public URLs under the standard shell.
- Create `apps/site/src/app/(site)/layout.tsx`: own the existing header, constrained main area, and footer.
- Modify `apps/site/src/app/layout.tsx`: retain only document-level HTML, font, metadata, and body.
- Create `apps/site/src/app/hero-prototype/page.tsx`: compose the three features in a full-bleed, scrollable prototype.
- Create `apps/site/src/components/hero/futuristic-clock.tsx`: browser-only Motion/SVG clock.
- Create `apps/site/src/components/hero/user-agent-display.tsx`: SSR-safe user-agent skeleton and hydrated value.
- Create `apps/site/src/components/hero/scroll-ruler.tsx`: document track and fixed indicator.
- Create `apps/site/src/lib/hero/time.ts`: deterministic continuous and mechanical clock calculations.
- Create `apps/site/src/lib/hero/scroll.ts`: scroll clamping and compact pixel formatting.
- Create `apps/site/src/lib/hero/time.test.ts`: clock calculation coverage.
- Create `apps/site/src/lib/hero/scroll.test.ts`: ruler helper coverage.
- Create `apps/site/src/components/hero/user-agent-display.test.tsx`: skeleton, hydration, and fault coverage.
- Create `apps/site/src/components/hero/hero-components.test.tsx`: independent semantic rendering coverage.
- Modify `apps/site/src/app/globals.css`: prototype layout, clock, ruler, crop, and reduced-motion styles.
- Modify `apps/site/package.json`, `pnpm-workspace.yaml`, and `pnpm-lock.yaml`: add Motion and DOM test dependencies.

### Task 1: Install Animation and DOM-Test Dependencies

**Files:**
- Modify: `pnpm-workspace.yaml`
- Modify: `apps/site/package.json`
- Modify: `pnpm-lock.yaml`

- [ ] **Step 1: Add Motion to the GUI catalog and site dependencies**

Add the current Motion version to the `gui` catalog, then add these entries:

```json
"dependencies": {
  "motion": "catalog:gui"
},
"devDependencies": {
  "@testing-library/react": "catalog:dev",
  "jsdom": "catalog:dev"
}
```

- [ ] **Step 2: Install and update the lockfile**

Run: `pnpm install`

Expected: exit 0 and `motion` resolves for `@folio/site`.

- [ ] **Step 3: Verify the package resolves**

Run: `pnpm --filter @folio/site exec node -e "import('motion/react').then(() => console.log('motion ok'))"`

Expected: `motion ok`.

- [ ] **Step 4: Commit**

```bash
git add pnpm-workspace.yaml pnpm-lock.yaml apps/site/package.json
git commit -m "chore(site): add Motion and component test runtime"
```

### Task 2: Implement Pure Clock Calculations with TDD

**Files:**
- Create: `apps/site/src/lib/hero/time.test.ts`
- Create: `apps/site/src/lib/hero/time.ts`

- [ ] **Step 1: Write failing tests for continuous and mechanical angles**

```ts
import { describe, expect, it } from 'vitest'
import { getClockSnapshot } from './time'

describe('getClockSnapshot', () => {
  const date = new Date(2026, 5, 26, 12, 34, 56, 500)

  it('calculates continuous angles from wall-clock time', () => {
    expect(getClockSnapshot(date, false).angles).toEqual({
      milliseconds: 180,
      seconds: 339,
      minutes: 209.65,
      hours: 17.47083333333333,
    })
  })

  it('calculates discrete mechanical-tick angles', () => {
    expect(getClockSnapshot(date, true).angles).toEqual({
      milliseconds: 0,
      seconds: 336,
      minutes: 209.6,
      hours: 17.466666666666665,
    })
  })

  it('wraps hours on a twelve-hour dial', () => {
    const midnight = new Date(2026, 5, 27, 0, 0, 0, 0)
    expect(getClockSnapshot(midnight, false).angles.hours).toBe(0)
  })
})
```

- [ ] **Step 2: Run the tests and verify the missing-module failure**

Run: `pnpm --filter @folio/site test -- src/lib/hero/time.test.ts`

Expected: FAIL because `./time` does not exist.

- [ ] **Step 3: Implement the snapshot helper**

Define and export `ClockAngles`, `ClockSnapshot`, and `getClockSnapshot(date, mechanical)`. Continuous formulas use millisecond fractions; mechanical formulas zero milliseconds, step seconds by 6 degrees, and advance minutes and hours using whole-second precision. Return the original `Date` with the angles so formatting remains a presentation concern.

- [ ] **Step 4: Run the clock tests**

Run: `pnpm --filter @folio/site test -- src/lib/hero/time.test.ts`

Expected: 3 tests pass.

- [ ] **Step 5: Commit**

```bash
git add apps/site/src/lib/hero/time.ts apps/site/src/lib/hero/time.test.ts
git commit -m "feat(site): add deterministic clock calculations"
```

### Task 3: Implement Scroll Helpers with TDD

**Files:**
- Create: `apps/site/src/lib/hero/scroll.test.ts`
- Create: `apps/site/src/lib/hero/scroll.ts`

- [ ] **Step 1: Write failing tests for scroll bounds and labels**

```ts
import { describe, expect, it } from 'vitest'
import { clampScrollPosition, formatPixelPosition } from './scroll'

describe('clampScrollPosition', () => {
  it.each([
    [-20, 3000, 1000, 0],
    [1000, 3000, 1000, 1000],
    [9000, 3000, 1000, 2000],
    [200, 800, 1000, 0],
  ])('clamps %s for document %s and viewport %s', (value, height, viewport, expected) => {
    expect(clampScrollPosition(value, height, viewport)).toBe(expected)
  })
})

describe('formatPixelPosition', () => {
  it.each([
    [0, '0 px'],
    [999, '999 px'],
    [1234, '1.2k px'],
    [1234567, '1.2m px'],
  ])('formats %s as %s', (value, expected) => {
    expect(formatPixelPosition(value)).toBe(expected)
  })
})
```

- [ ] **Step 2: Run the tests and verify the missing-module failure**

Run: `pnpm --filter @folio/site test -- src/lib/hero/scroll.test.ts`

Expected: FAIL because `./scroll` does not exist.

- [ ] **Step 3: Implement scroll helpers**

Implement `clampScrollPosition` with `Math.max(0, documentHeight - viewportHeight)` and finite-number guards. Implement `formatPixelPosition` with rounded whole pixels below 1000 and truncated one-decimal `k`/`m` units above each threshold.

- [ ] **Step 4: Run the scroll tests**

Run: `pnpm --filter @folio/site test -- src/lib/hero/scroll.test.ts`

Expected: all parameterized cases pass.

- [ ] **Step 5: Commit**

```bash
git add apps/site/src/lib/hero/scroll.ts apps/site/src/lib/hero/scroll.test.ts
git commit -m "feat(site): add scroll ruler calculations"
```

### Task 4: Isolate the Existing Site Shell

**Files:**
- Create: `apps/site/src/app/(site)/layout.tsx`
- Move: `apps/site/src/app/page.tsx` to `apps/site/src/app/(site)/page.tsx`
- Move: `apps/site/src/app/blog/` to `apps/site/src/app/(site)/blog/`
- Move: `apps/site/src/app/posts/` to `apps/site/src/app/(site)/posts/`
- Modify: `apps/site/src/app/layout.tsx`

- [ ] **Step 1: Add a route-shell regression test**

Create `apps/site/src/app/layout.test.tsx` that renders `RootLayout` and verifies it contains neither `SiteHeader` text nor the footer, then renders the new `(site)/layout` and verifies `Hao Le`, `Home`, `Blog`, and a footer are present around supplied children.

- [ ] **Step 2: Run the test and verify it fails**

Run: `pnpm --filter @folio/site test -- src/app/layout.test.tsx`

Expected: FAIL because `(site)/layout.tsx` does not exist and the root still owns site chrome.

- [ ] **Step 3: Move pages into the route group and split layouts**

Move existing UI routes without changing their contents. Keep font, metadata, `<html>`, and `<body>{children}</body>` in root layout. Move `SiteHeader`, constrained `<main>`, and footer markup unchanged into `(site)/layout.tsx`.

- [ ] **Step 4: Run layout and existing tests**

Run: `pnpm --filter @folio/site test`

Expected: all tests pass and URLs remain unchanged because parenthesized route groups do not affect paths.

- [ ] **Step 5: Commit**

```bash
git add apps/site/src/app
git commit -m "refactor(site): split standard and full-bleed route shells"
```

### Task 5: Build the User-Agent Display with TDD

**Files:**
- Create: `apps/site/src/components/hero/user-agent-display.test.tsx`
- Create: `apps/site/src/components/hero/user-agent-display.tsx`
- Modify: `apps/site/vitest.config.ts`

- [ ] **Step 1: Enable jsdom for component tests and write failing behavior tests**

Use `// @vitest-environment jsdom`, Testing Library, and fake a configurable `navigator.userAgent`. Assert the initial render contains `[data-slot="skeleton"]`; after effects flush, assert a valid UA replaces it. Add empty and throwing getter cases that retain the skeleton.

- [ ] **Step 2: Run the component test and verify failure**

Run: `pnpm --filter @folio/site test -- src/components/hero/user-agent-display.test.tsx`

Expected: FAIL because `UserAgentDisplay` does not exist.

- [ ] **Step 3: Implement the component**

Import `Skeleton` from `@folio/ui/components/skeleton`. Initialize state to `null`, read `navigator.userAgent` inside an effect callback, trim it, catch access failures, and render three fixed-width skeleton rows until a non-empty value exists. Render the final value in a semantic `<output aria-label="Browser user agent">`.

- [ ] **Step 4: Run the user-agent tests**

Run: `pnpm --filter @folio/site test -- src/components/hero/user-agent-display.test.tsx`

Expected: all skeleton, success, and failure cases pass.

- [ ] **Step 5: Commit**

```bash
git add apps/site/src/components/hero/user-agent-display.tsx apps/site/src/components/hero/user-agent-display.test.tsx apps/site/vitest.config.ts
git commit -m "feat(site): add resilient user agent display"
```

### Task 6: Build the Motion SVG Clock

**Files:**
- Create: `apps/site/src/components/hero/futuristic-clock.tsx`
- Create: `apps/site/src/components/hero/futuristic-clock.test.tsx`

- [ ] **Step 1: Write a failing semantic clock test**

Render the component in jsdom with Motion mocked only for time hooks. Assert it exposes a `timer` role, a labelled SVG, four ring groups identified by `data-ring`, four angle outputs, a formatted date, and a formatted 12-hour time.

- [ ] **Step 2: Run the clock test and verify failure**

Run: `pnpm --filter @folio/site test -- src/components/hero/futuristic-clock.test.tsx`

Expected: FAIL because `FuturisticClock` does not exist.

- [ ] **Step 3: Implement shared clock presentation**

Generate SVG tick arrays once at module scope. Render four concentric `<motion.g>` rings with different radii, counts, colors, and tick lengths. Render HTML date/time and angle outputs with tabular numerals. Keep page positioning out of the component.

- [ ] **Step 4: Implement normal and mechanical controllers**

Normal controller calls `useAnimationFrame`, derives a fresh snapshot from `new Date()`, and sets Motion values for ring rotations. Mechanical controller aligns its first timeout to the next second, then updates once per second with discrete snapshots. Select the keyed controller through `useReducedMotion` so only one strategy is mounted.

- [ ] **Step 5: Add browser-only entrance behavior**

Export the component normally, but dynamically import it with `{ ssr: false }` from the prototype page in Task 8. Wrap its visible content in a Motion element with opacity entrance while the page reserves identical dimensions through the dynamic-loading skeleton box.

- [ ] **Step 6: Run clock and helper tests**

Run: `pnpm --filter @folio/site test -- src/lib/hero/time.test.ts src/components/hero/futuristic-clock.test.tsx`

Expected: all tests pass.

- [ ] **Step 7: Commit**

```bash
git add apps/site/src/components/hero/futuristic-clock.tsx apps/site/src/components/hero/futuristic-clock.test.tsx
git commit -m "feat(site): add Motion-driven SVG clock"
```

### Task 7: Build the Document-Height Scroll Ruler

**Files:**
- Create: `apps/site/src/components/hero/scroll-ruler.tsx`
- Create: `apps/site/src/components/hero/scroll-ruler.test.tsx`

- [ ] **Step 1: Write a failing ruler structure test**

Mock `useScroll` and `useMotionValueEvent`, render independently, and assert a document-flow element labelled `Scroll ruler track`, a fixed element labelled `Current scroll height`, the text `scroll-height`, and initial `0 px`.

- [ ] **Step 2: Run the ruler test and verify failure**

Run: `pnpm --filter @folio/site test -- src/components/hero/scroll-ruler.test.tsx`

Expected: FAIL because `ScrollRuler` does not exist.

- [ ] **Step 3: Implement track and indicator layers**

Use an absolutely positioned track with `height: 100%` inside the page's full document container. Generate repeated major/minor marks with CSS gradients. Place the indicator fixed at the upper-right reference position with a red datum line, vertical label, and output value.

- [ ] **Step 4: Subscribe through Motion**

Read `scrollY` from `useScroll`, subscribe with `useMotionValueEvent`, clamp against `document.documentElement.scrollHeight` and `window.innerHeight`, then set the formatted label only when it changes. Recalculate bounds on resize and remove the resize listener on cleanup.

- [ ] **Step 5: Run ruler tests**

Run: `pnpm --filter @folio/site test -- src/lib/hero/scroll.test.ts src/components/hero/scroll-ruler.test.tsx`

Expected: all tests pass.

- [ ] **Step 6: Commit**

```bash
git add apps/site/src/components/hero/scroll-ruler.tsx apps/site/src/components/hero/scroll-ruler.test.tsx
git commit -m "feat(site): add document-height scroll ruler"
```

### Task 8: Compose and Style `/hero-prototype`

**Files:**
- Create: `apps/site/src/app/hero-prototype/page.tsx`
- Create: `apps/site/src/app/hero-prototype/futuristic-clock-loader.tsx`
- Create: `apps/site/src/app/hero-prototype/page.test.tsx`
- Modify: `apps/site/src/app/globals.css`

- [ ] **Step 1: Write a failing composition test**

Render the page with the dynamic clock loader mocked. Assert the page composes user-agent, clock slot, and ruler without importing their positioning into the reusable component files.

- [ ] **Step 2: Run the page test and verify failure**

Run: `pnpm --filter @folio/site test -- src/app/hero-prototype/page.test.tsx`

Expected: FAIL because the route does not exist.

- [ ] **Step 3: Create the browser-only clock loader**

Create a client module that uses `next/dynamic` with `{ ssr: false }`. Its loading function returns a transparent, `aria-hidden` box with the exact clock aspect ratio so the server and client reserve identical space.

- [ ] **Step 4: Compose the route**

Create a minimum `220vh` full-bleed `<main>`. Place `UserAgentDisplay` near the upper-left, the clock slot in a sticky first-viewport stage at left-center, and `ScrollRuler` as the right-edge overlay. Do not add excluded reference content.

- [ ] **Step 5: Add responsive technical styling**

In `globals.css`, add namespaced `.hero-prototype-*` rules. At narrow widths, size the clock above viewport width and translate it left for cropping. At desktop width, constrain the SVG so its full diameter is visible. Add neutral guide colors, dashed/ticked rings, tabular typography, ruler gradients, fixed indicator, hydration fade, and `overflow-x: clip`.

- [ ] **Step 6: Run route and complete unit tests**

Run: `pnpm --filter @folio/site test`

Expected: all tests pass.

- [ ] **Step 7: Commit**

```bash
git add apps/site/src/app/hero-prototype apps/site/src/app/globals.css
git commit -m "feat(site): compose futuristic hero prototype"
```

### Task 9: Verify Behavior and Production Readiness

**Files:**
- Modify only if verification exposes defects in files from Tasks 1-8.

- [ ] **Step 1: Run static verification**

Run: `pnpm --filter @folio/site test && pnpm --filter @folio/site lint && pnpm --filter @folio/site typecheck`

Expected: all commands exit 0 with no site errors.

- [ ] **Step 2: Run the production build**

Run: `pnpm --filter @folio/site build`

Expected: exit 0 and `/hero-prototype`, `/`, `/blog`, and post routes are generated successfully.

- [ ] **Step 3: Verify in-browser at mobile width**

Run the site at port 10240 and inspect `/hero-prototype` at approximately `390 × 844`. Verify the clock is partially cropped on the left, date/time and angle values remain visible, user-agent skeleton becomes text, ruler track scrolls with the page, and the indicator remains fixed while its pixel value changes.

- [ ] **Step 4: Verify in-browser at desktop width**

Inspect at approximately `1440 × 1000`. Verify the complete clock is visible, no horizontal scrollbar appears, and standard `/` still has its original header, content, and footer.

- [ ] **Step 5: Verify reduced motion**

Emulate `prefers-reduced-motion: reduce`. Verify rings jump once per second without interpolation and no continuous frame controller remains mounted.

- [ ] **Step 6: Review the final diff**

Run: `git diff --check && git status --short`

Expected: no whitespace errors; only intended implementation files remain uncommitted.
