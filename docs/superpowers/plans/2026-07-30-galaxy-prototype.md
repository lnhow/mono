# Galaxy Hero Prototype Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build `/galaxy-prototype` in `apps/site`: an off-center, cursor-tilted Three.js particle galaxy on a transparent React Three Fiber canvas, composed inside the hero-prototype frame (sticky dark stage, halftone parallax, blast-door intro, user-agent display, scroll ruler).

**Architecture:** Pure, framework-free galaxy math (`lib/hero/galaxy.ts`) and CSS-token color resolution (`lib/hero/css-color.ts`) are unit-tested in isolation. A thin R3F layer (`galaxy-canvas.tsx`) renders three radius-banded point clouds whose spin groups share one rotation while per-band tilt groups give cursor parallax; tilt stays screen-aligned because tilt groups never spin. `galaxy-hero.tsx` composes the canvas with the ported hero-prototype frame. The route sits outside the `(site)` group, so no shared chrome applies.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, three.js 0.185, `@react-three/fiber` 9.5, Motion (`motion/react`), Tailwind CSS 4, Vitest, Testing Library, jsdom.

**Spec:** `docs/superpowers/specs/2026-07-30-galaxy-prototype-design.md`

---

## File Structure

- Modify `apps/site/package.json`: add `three`, `@types/three`, `@react-three/fiber` from `catalog:three`.
- Create `apps/site/src/lib/hero/galaxy.ts`: ported particle math, band partitioning, `GALAXY_PARAMS`.
- Create `apps/site/src/lib/hero/galaxy.test.ts`: geometry-builder coverage.
- Create `apps/site/src/lib/hero/css-color.ts`: CSS custom property → sRGB resolver with fallbacks.
- Create `apps/site/src/lib/hero/css-color.test.ts`: resolver coverage.
- Create `apps/site/src/components/hero/galaxy-canvas.tsx`: R3F Canvas + banded points, spin/tilt/off-center, reduced motion.
- Create `apps/site/src/components/hero/galaxy-hero.tsx`: frame composition (halftone layers, canvas, blast doors, pointer tracking).
- Create `apps/site/src/components/hero/galaxy-hero.test.tsx`: frame rendering + blast-door timing.
- Create `apps/site/src/app/galaxy-prototype/page.tsx`: route composing hero, UA display, scroll ruler.
- Modify `apps/site/src/app/globals.css`: `.galaxy-prototype-*` styles.

---

### Task 1: Add three.js dependencies

**Files:**
- Modify: `apps/site/package.json`

- [ ] **Step 1: Add the dependencies**

In `apps/site/package.json`, add `"@react-three/fiber": "catalog:three"` to `dependencies` (after the `"@mdx-js/react"` line), `"three": "catalog:three"` to `dependencies` (after the `"tailwindcss"` line), and `"@types/three": "catalog:three"` to `devDependencies` (after the `"@types/react-dom"` line). The resulting blocks:

```json
  "dependencies": {
    "@content-collections/mdx": "catalog:markdown",
    "@content-collections/next": "catalog:markdown",
    "@mdx-js/react": "catalog:markdown",
    "@react-three/fiber": "catalog:three",
    "@folio/ui": "workspace:*",
    "@tailwindcss/postcss": "catalog:gui",
    "@tailwindcss/typography": "catalog:gui",
    "next": "catalog:gui",
    "motion": "catalog:gui",
    "react": "catalog:gui",
    "react-dom": "catalog:gui",
    "rehype-autolink-headings": "catalog:markdown",
    "rehype-pretty-code": "catalog:markdown",
    "rehype-slug": "catalog:markdown",
    "remark-gfm": "catalog:markdown",
    "shiki": "catalog:markdown",
    "tailwindcss": "catalog:gui",
    "three": "catalog:three"
  },
```

```json
  "devDependencies": {
    "@content-collections/core": "catalog:markdown",
    "@repo/eslint-config": "workspace:*",
    "@repo/tsconfig": "workspace:*",
    "@types/mdx": "catalog:markdown",
    "@types/node": "catalog:base",
    "@types/react": "catalog:gui",
    "@types/react-dom": "catalog:gui",
    "@types/three": "catalog:three",
    "@testing-library/react": "catalog:dev",
    "eslint": "catalog:dev",
    "jsdom": "catalog:dev",
    "reading-time": "catalog:markdown",
    "typescript": "catalog:dev",
    "vitest": "catalog:dev",
    "zod": "^4.1.11"
  }
```

- [ ] **Step 2: Install and verify**

Run from repo root: `pnpm install`
Expected: lockfile updates, no catalog resolution errors.

Run: `pnpm --filter @folio/site list three @react-three/fiber @types/three`
Expected: prints `three 0.185.x`, `@react-three/fiber 9.5.0`, `@types/three 0.185.x`.

- [ ] **Step 3: Commit**

```bash
git add apps/site/package.json pnpm-lock.yaml
git commit -m "chore(site): add three.js and react-three-fiber dependencies"
```

---

### Task 2: Pure galaxy band builder

**Files:**
- Create: `apps/site/src/lib/hero/galaxy.ts`
- Test: `apps/site/src/lib/hero/galaxy.test.ts`

- [ ] **Step 1: Write the failing test**

Create `apps/site/src/lib/hero/galaxy.test.ts`:

```ts
import { describe, expect, it } from 'vitest'

import { buildGalaxyBands, GALAXY_PARAMS, resolveBandIndex } from './galaxy'

const INNER = [1, 0, 0] as const
const OUTER = [0, 0, 1] as const
const TEST_PARAMS = { ...GALAXY_PARAMS, count: 3000 }

/** Deterministic LCG so particle assertions are stable. */
function createSeededRandom(seed: number) {
  let state = seed
  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296
    return state / 4294967296
  }
}

describe('resolveBandIndex', () => {
  it.each([
    [0, 0],
    [0.33, 0],
    [0.34, 1],
    [0.66, 1],
    [0.67, 2],
    [1, 2],
  ])('maps radius fraction %s to band %s', (fraction, expected) => {
    expect(resolveBandIndex(fraction * 5, 5, [1 / 3, 2 / 3])).toBe(expected)
  })
})

describe('buildGalaxyBands', () => {
  const bands = buildGalaxyBands(INNER, OUTER, TEST_PARAMS, createSeededRandom(42))

  it('creates three bands with matching position/color lengths', () => {
    expect(bands).toHaveLength(3)
    for (const band of bands) {
      expect(band.positions.length).toBe(band.colors.length)
      expect(band.positions.length % 3).toBe(0)
    }
  })

  it('preserves the total particle count across bands', () => {
    const total = bands.reduce((sum, band) => sum + band.positions.length / 3, 0)
    expect(total).toBe(TEST_PARAMS.count)
  })

  it('distributes particles roughly uniformly across bands', () => {
    for (const band of bands) {
      const count = band.positions.length / 3
      expect(count).toBeGreaterThan(TEST_PARAMS.count / 3 - 150)
      expect(count).toBeLessThan(TEST_PARAMS.count / 3 + 150)
    }
  })

  it('encodes radius as an inner-to-outer color lerp within each band range', () => {
    // With INNER=[1,0,0] and OUTER=[0,0,1], lerp t = 0.7 * radiusFraction gives
    // color = [1 - t, 0, t], so the blue channel must fall in each band's range.
    const ranges: ReadonlyArray<readonly [number, number]> = [
      [0, 0.7 / 3],
      [0.7 / 3, 1.4 / 3],
      [1.4 / 3, 0.7 + 1e-6],
    ]
    bands.forEach((band, bandIndex) => {
      const [min, max] = ranges[bandIndex]!
      for (let i = 0; i < band.colors.length; i += 3) {
        const r = band.colors[i]!
        const g = band.colors[i + 1]!
        const b = band.colors[i + 2]!
        expect(Math.abs(r + b - 1)).toBeLessThan(1e-6)
        expect(g).toBe(0)
        expect(b).toBeGreaterThanOrEqual(min)
        expect(b).toBeLessThan(max)
      }
    })
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm --filter @folio/site exec vitest run src/lib/hero/galaxy.test.ts`
Expected: FAIL — `Cannot find module './galaxy'`.

- [ ] **Step 3: Implement `galaxy.ts`**

Create `apps/site/src/lib/hero/galaxy.ts`:

```ts
/**
 * Pure galaxy particle math, ported 1:1 from
 * apps/learn/threejs/basics/src/18-galaxy/script.ts.
 * Kept free of three.js so it stays unit-testable in plain node.
 */

export type RgbColor = readonly [number, number, number]

export interface GalaxyParams {
  readonly count: number
  readonly radius: number
  readonly radiusLag: number
  readonly size: number
  readonly branches: number
  readonly randomness: number
  readonly randomnessPower: number
  readonly yRadiusOffset: number
  readonly rotationSpeed: number
  /** Fractions of radius where inner/mid and mid/outer bands split. */
  readonly bandBoundaries: readonly number[]
  /** Cursor-tilt multiplier per band, inner to outer. */
  readonly tiltFactors: readonly number[]
  /** Maximum cursor tilt in radians (applied to the inner band). */
  readonly maxTilt: number
  /** Damping lambda for cursor-tilt easing. */
  readonly tiltDamping: number
  /** Resting tilt about x (30deg) so the disc slightly faces the screen. */
  readonly baseTilt: number
  /** Scene-space offset of the galaxy center. */
  readonly offset: { readonly x: number; readonly y: number; readonly z: number }
}

export const GALAXY_PARAMS: GalaxyParams = {
  count: 100_000,
  radius: 5,
  radiusLag: 1,
  size: 0.01,
  branches: 5,
  randomness: 0.45,
  randomnessPower: 2.6,
  yRadiusOffset: 0.45,
  rotationSpeed: -0.5,
  bandBoundaries: [1 / 3, 2 / 3],
  tiltFactors: [1, 0.6, 0.3],
  maxTilt: 0.08,
  tiltDamping: 3,
  baseTilt: Math.PI / 6,
  offset: { x: 3, y: 0, z: 0 },
}

export interface GalaxyBand {
  positions: Float32Array
  colors: Float32Array
}

export function resolveBandIndex(
  particleRadius: number,
  galaxyRadius: number,
  bandBoundaries: readonly number[],
): number {
  const first = bandBoundaries[0]! * galaxyRadius
  const second = bandBoundaries[1]! * galaxyRadius
  if (particleRadius < first) return 0
  if (particleRadius < second) return 1
  return 2
}

export function buildGalaxyBands(
  innerColor: RgbColor,
  outerColor: RgbColor,
  params: GalaxyParams = GALAXY_PARAMS,
  random: () => number = Math.random,
): GalaxyBand[] {
  const {
    count,
    radius,
    radiusLag,
    branches,
    randomness,
    randomnessPower,
    yRadiusOffset,
    bandBoundaries,
  } = params

  const radii = new Float32Array(count)
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)

  for (let i = 0; i < count; i++) {
    const particleRadius = random() * radius
    radii[i] = particleRadius
    const radiusLagAngle = particleRadius * radiusLag
    const branchAngle = ((i % branches) / branches) * Math.PI * 2

    const randomX =
      Math.pow(random(), randomnessPower) *
      (random() < 0.5 ? -1 : 1) *
      randomness *
      particleRadius
    const randomY =
      Math.pow(random(), randomnessPower) *
        (random() < 0.5 ? -1 : 1) *
        randomness *
        particleRadius +
      particleRadius * yRadiusOffset
    const randomZ =
      Math.pow(random(), randomnessPower) *
      (random() < 0.5 ? -1 : 1) *
      randomness *
      particleRadius

    positions[i * 3] =
      particleRadius * Math.sin(branchAngle + radiusLagAngle) + randomX
    positions[i * 3 + 1] = randomY
    positions[i * 3 + 2] =
      particleRadius * Math.cos(branchAngle + radiusLagAngle) + randomZ

    const t = (particleRadius * 0.7) / radius
    colors[i * 3] = innerColor[0] + (outerColor[0] - innerColor[0]) * t
    colors[i * 3 + 1] = innerColor[1] + (outerColor[1] - innerColor[1]) * t
    colors[i * 3 + 2] = innerColor[2] + (outerColor[2] - innerColor[2]) * t
  }

  const bandCounts = [0, 0, 0]
  for (let i = 0; i < count; i++) {
    bandCounts[resolveBandIndex(radii[i]!, radius, bandBoundaries)]! += 1
  }

  const bands: GalaxyBand[] = bandCounts.map((bandCount) => ({
    positions: new Float32Array(bandCount * 3),
    colors: new Float32Array(bandCount * 3),
  }))
  const cursors = [0, 0, 0]

  for (let i = 0; i < count; i++) {
    const bandIndex = resolveBandIndex(radii[i]!, radius, bandBoundaries)
    const target = cursors[bandIndex]! * 3
    const source = i * 3
    bands[bandIndex]!.positions[target] = positions[source]!
    bands[bandIndex]!.positions[target + 1] = positions[source + 1]!
    bands[bandIndex]!.positions[target + 2] = positions[source + 2]!
    bands[bandIndex]!.colors[target] = colors[source]!
    bands[bandIndex]!.colors[target + 1] = colors[source + 1]!
    bands[bandIndex]!.colors[target + 2] = colors[source + 2]!
    cursors[bandIndex]! += 1
  }

  return bands
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm --filter @folio/site exec vitest run src/lib/hero/galaxy.test.ts`
Expected: PASS — 6 tests.

- [ ] **Step 5: Commit**

```bash
git add apps/site/src/lib/hero/galaxy.ts apps/site/src/lib/hero/galaxy.test.ts
git commit -m "feat(site): add pure galaxy particle band builder"
```

---

### Task 3: CSS token color resolver

**Files:**
- Create: `apps/site/src/lib/hero/css-color.ts`
- Test: `apps/site/src/lib/hero/css-color.test.ts`

- [ ] **Step 1: Write the failing test**

Create `apps/site/src/lib/hero/css-color.test.ts`:

```ts
// @vitest-environment jsdom

import { afterEach, describe, expect, it, vi } from 'vitest'

import {
  GALAXY_INNER_FALLBACK,
  parseColorString,
  resolveCssColor,
} from './css-color'

describe('parseColorString', () => {
  it.each<[string, [number, number, number]]>([
    ['#ff4c40', [1, 76 / 255, 64 / 255]],
    ['rgb(255, 0, 128)', [1, 0, 128 / 255]],
    ['rgba(0, 255, 255, 0.5)', [0, 1, 1]],
  ])('parses %s', (input, expected) => {
    const parsed = parseColorString(input)
    expect(parsed).not.toBeNull()
    expected.forEach((channel, index) => {
      expect(parsed![index]).toBeCloseTo(channel, 5)
    })
  })

  it('returns null for non-sRGB strings', () => {
    expect(parseColorString('oklch(0.8138 0.1475 79.72)')).toBeNull()
    expect(parseColorString('')).toBeNull()
  })
})

describe('resolveCssColor', () => {
  afterEach(() => vi.restoreAllMocks())

  it('returns the fallback when the property is missing', () => {
    expect(resolveCssColor('--does-not-exist', GALAXY_INNER_FALLBACK)).toBe(
      GALAXY_INNER_FALLBACK,
    )
  })

  it('parses rgb values when canvas 2d is unavailable (jsdom)', () => {
    vi.spyOn(window, 'getComputedStyle').mockReturnValue({
      getPropertyValue: () => 'rgb(10, 20, 30)',
    } as unknown as CSSStyleDeclaration)
    const resolved = resolveCssColor('--test-color', GALAXY_INNER_FALLBACK)
    expect(resolved[0]).toBeCloseTo(10 / 255, 5)
    expect(resolved[1]).toBeCloseTo(20 / 255, 5)
    expect(resolved[2]).toBeCloseTo(30 / 255, 5)
  })

  it('returns the fallback for values nothing can parse', () => {
    vi.spyOn(window, 'getComputedStyle').mockReturnValue({
      getPropertyValue: () => 'oklch(0.8138 0.1475 79.72)',
    } as unknown as CSSStyleDeclaration)
    expect(resolveCssColor('--signal-amber', GALAXY_INNER_FALLBACK)).toBe(
      GALAXY_INNER_FALLBACK,
    )
  })
})
```

Note: jsdom's `canvas.getContext('2d')` returns `null` (no `canvas` package installed), so tests exercise the parser/fallback paths; the canvas-probe path is covered by browser verification in Task 7.

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm --filter @folio/site exec vitest run src/lib/hero/css-color.test.ts`
Expected: FAIL — `Cannot find module './css-color'`.

- [ ] **Step 3: Implement `css-color.ts`**

Create `apps/site/src/lib/hero/css-color.ts`:

```ts
/** Resolves CSS custom property colors (including oklch) to 0-1 sRGB channels. */

export type SrgbColor = readonly [number, number, number]

/**
 * Hardcoded sRGB equivalents of --signal-amber and --signal-blue from
 * packages/ui/src/styles/globals.css, used when canvas probing is unavailable.
 */
export const GALAXY_INNER_FALLBACK: SrgbColor = [0.957, 0.713, 0.248]
export const GALAXY_OUTER_FALLBACK: SrgbColor = [0.258, 0.683, 0.91]

const HEX_PATTERN = /^#([0-9a-f]{6})$/i
const RGB_PATTERN = /^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i
const SENTINEL = '#010203'

/** Parses rgb()/hex CSS color strings. Returns null for anything else (e.g. oklch). */
export function parseColorString(value: string): SrgbColor | null {
  const hex = HEX_PATTERN.exec(value.trim())
  if (hex) {
    const int = Number.parseInt(hex[1]!, 16)
    return [
      ((int >> 16) & 0xff) / 255,
      ((int >> 8) & 0xff) / 255,
      (int & 0xff) / 255,
    ]
  }
  const rgb = RGB_PATTERN.exec(value.trim())
  if (rgb) {
    return [
      Number(rgb[1]) / 255,
      Number(rgb[2]) / 255,
      Number(rgb[3]) / 255,
    ]
  }
  return null
}

/**
 * Converts any browser-supported CSS color (oklch, lab, color-mix, ...) to sRGB
 * by rasterizing it through a 1x1 canvas. Returns null when canvas 2d is
 * unavailable (jsdom) or the value is not a valid color.
 */
function probeWithCanvas(colorValue: string): SrgbColor | null {
  const canvas = document.createElement('canvas')
  canvas.width = 1
  canvas.height = 1
  const context = canvas.getContext('2d', { willReadFrequently: true })
  if (!context) return null

  context.fillStyle = SENTINEL
  context.fillStyle = colorValue
  // Invalid color strings are ignored by fillStyle, leaving the sentinel.
  if (
    context.fillStyle === SENTINEL &&
    colorValue.trim().toLowerCase() !== SENTINEL
  ) {
    return null
  }

  context.fillRect(0, 0, 1, 1)
  const { data } = context.getImageData(0, 0, 1, 1)
  return [data[0]! / 255, data[1]! / 255, data[2]! / 255]
}

/** Resolves a CSS custom property (e.g. `--signal-amber`) to 0-1 sRGB channels. */
export function resolveCssColor(
  propertyName: string,
  fallback: SrgbColor,
): SrgbColor {
  if (typeof document === 'undefined') return fallback
  const rawValue = getComputedStyle(document.documentElement)
    .getPropertyValue(propertyName)
    .trim()
  if (!rawValue) return fallback
  return probeWithCanvas(rawValue) ?? parseColorString(rawValue) ?? fallback
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm --filter @folio/site exec vitest run src/lib/hero/css-color.test.ts`
Expected: PASS — 6 tests.

- [ ] **Step 5: Commit**

```bash
git add apps/site/src/lib/hero/css-color.ts apps/site/src/lib/hero/css-color.test.ts
git commit -m "feat(site): add css variable color resolver for webgl"
```

---

### Task 4: R3F galaxy canvas component

**Files:**
- Create: `apps/site/src/components/hero/galaxy-canvas.tsx`

No unit test: R3F/WebGL cannot render in jsdom. This component is covered by browser verification (Task 7) and by `galaxy-hero.test.tsx` mocking it (Task 5).

- [ ] **Step 1: Implement `galaxy-canvas.tsx`**

Key API facts (verified against R3F v9 docs):
- `Canvas` creates a translucent renderer by default (`alpha: true`, `antialias: true`); `flat` switches tone mapping to `NoToneMapping` (matches the learn example).
- `fallback` renders DOM content when WebGL is unsupported.
- `frameloop="demand"` renders only on `invalidate()`.

Create `apps/site/src/components/hero/galaxy-canvas.tsx`:

```tsx
'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useReducedMotion } from 'motion/react'
import { useEffect, useMemo, useRef, type RefObject } from 'react'
import * as THREE from 'three'

import {
  GALAXY_INNER_FALLBACK,
  GALAXY_OUTER_FALLBACK,
  resolveCssColor,
} from '@/lib/hero/css-color'
import { buildGalaxyBands, GALAXY_PARAMS } from '@/lib/hero/galaxy'

/** Normalized cursor position in [-1, 1], shared from the hero container. */
export interface GalaxyTiltTarget {
  x: number
  y: number
}

interface GalaxyCanvasProps {
  tiltTarget: RefObject<GalaxyTiltTarget>
}

export function GalaxyCanvas({ tiltTarget }: GalaxyCanvasProps) {
  const reducedMotion = useReducedMotion()

  return (
    <Canvas
      aria-hidden
      flat
      dpr={[1, 2]}
      frameloop={reducedMotion === true ? 'demand' : 'always'}
      camera={{ position: [0, 8, 8], fov: 75, near: 0.1, far: 100 }}
      fallback={<div className="absolute inset-0" aria-hidden />}
      onCreated={(state) => state.camera.lookAt(0, 0, 0)}
    >
      <GalaxyPoints tiltTarget={tiltTarget} reducedMotion={reducedMotion === true} />
    </Canvas>
  )
}

interface GalaxyPointsProps {
  tiltTarget: RefObject<GalaxyTiltTarget>
  reducedMotion: boolean
}

function GalaxyPoints({ tiltTarget, reducedMotion }: GalaxyPointsProps) {
  const geometries = useMemo(() => {
    const inner = resolveCssColor('--signal-amber', GALAXY_INNER_FALLBACK)
    const outer = resolveCssColor('--signal-blue', GALAXY_OUTER_FALLBACK)
    return buildGalaxyBands(inner, outer).map((band) => {
      const geometry = new THREE.BufferGeometry()
      geometry.setAttribute(
        'position',
        new THREE.BufferAttribute(band.positions, 3),
      )
      geometry.setAttribute('color', new THREE.BufferAttribute(band.colors, 3))
      return geometry
    })
  }, [])

  useEffect(
    () => () => geometries.forEach((geometry) => geometry.dispose()),
    [geometries],
  )

  const tiltRefs = useRef<(THREE.Group | null)[]>([])
  const spinRefs = useRef<(THREE.Group | null)[]>([])
  const tilt = useRef({ x: 0, y: 0 })

  const size = useThree((state) => state.size)
  const invalidate = useThree((state) => state.invalidate)

  // Shrink the off-center offset on narrow viewports so the galaxy stays in frame.
  const aspect = size.width / size.height
  const offsetScale = Math.min(1, aspect / 1.2)
  const offset: [number, number, number] = [
    GALAXY_PARAMS.offset.x * offsetScale,
    GALAXY_PARAMS.offset.y,
    GALAXY_PARAMS.offset.z,
  ]

  // In demand mode (reduced motion), draw the single static frame.
  useEffect(() => {
    if (reducedMotion) invalidate()
  }, [reducedMotion, invalidate])

  useFrame((state, delta) => {
    if (reducedMotion) return

    const spin = state.clock.elapsedTime * GALAXY_PARAMS.rotationSpeed
    tilt.current.x = THREE.MathUtils.damp(
      tilt.current.x,
      tiltTarget.current?.y ?? 0,
      GALAXY_PARAMS.tiltDamping,
      delta,
    )
    tilt.current.y = THREE.MathUtils.damp(
      tilt.current.y,
      tiltTarget.current?.x ?? 0,
      GALAXY_PARAMS.tiltDamping,
      delta,
    )

    spinRefs.current.forEach((group) => {
      if (group) group.rotation.y = spin
    })
    tiltRefs.current.forEach((group, index) => {
      if (!group) return
      const factor = GALAXY_PARAMS.tiltFactors[index] ?? 1
      group.rotation.x = tilt.current.x * GALAXY_PARAMS.maxTilt * factor
      group.rotation.z = -tilt.current.y * GALAXY_PARAMS.maxTilt * factor
    })
  })

  return (
    <group>
      {geometries.map((geometry, index) => (
        <group
          key={index}
          ref={(group) => {
            tiltRefs.current[index] = group
          }}
          position={offset}
        >
          {/* baseTilt: resting 30deg tilt so the disc slightly faces the screen */}
          <group rotation={[GALAXY_PARAMS.baseTilt, 0, 0]}>
            <group
              ref={(group) => {
                spinRefs.current[index] = group
              }}
            >
              <points geometry={geometry}>
                <pointsMaterial
                  size={GALAXY_PARAMS.size}
                  vertexColors
                  depthWrite={false}
                  blending={THREE.AdditiveBlending}
                />
              </points>
            </group>
          </group>
        </group>
      ))}
    </group>
  )
}
```

Structure rationale: each band is `tilt group (position=offset, cursor tilt)` → `base-tilt group (constant 30deg)` → `spin group (shared y-rotation)`. Tilt groups never spin, so cursor tilt stays screen-aligned; spin values are identical across bands, so the spiral stays coherent; per-band `tiltFactors` create the parallax difference.

- [ ] **Step 2: Typecheck**

Run: `pnpm --filter @folio/site typecheck`
Expected: PASS (this also generates Next route types; the new route does not exist yet, which is fine).

- [ ] **Step 3: Commit**

```bash
git add apps/site/src/components/hero/galaxy-canvas.tsx
git commit -m "feat(site): add r3f galaxy canvas component"
```

---

### Task 5: Galaxy hero frame component

**Files:**
- Create: `apps/site/src/components/hero/galaxy-hero.tsx`
- Test: `apps/site/src/components/hero/galaxy-hero.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `apps/site/src/components/hero/galaxy-hero.test.tsx`:

```tsx
// @vitest-environment jsdom

import { act, cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { GalaxyHero } from './galaxy-hero'

vi.mock('./galaxy-canvas', () => ({
  GalaxyCanvas: () => <div data-testid="galaxy-canvas" />,
}))

afterEach(cleanup)

describe('GalaxyHero', () => {
  it('renders the galaxy canvas and blast-door panels', () => {
    render(<GalaxyHero />)

    expect(screen.getByTestId('galaxy-canvas')).toBeTruthy()
    expect(screen.getByText('SYS.INIT // L-PANEL')).toBeTruthy()
    expect(screen.getByText('SYS.INIT // R-PANEL')).toBeTruthy()
  })

  it('opens the blast doors 600ms after mount', () => {
    vi.useFakeTimers()
    try {
      render(<GalaxyHero />)
      const leftLabel = screen.getByText('SYS.INIT // L-PANEL')
      const panel = leftLabel.parentElement
      expect(panel?.style.transform).toBe('translateX(0)')

      act(() => {
        vi.advanceTimersByTime(600)
      })
      expect(panel?.style.transform).toBe('translateX(-100%)')
    } finally {
      vi.useRealTimers()
    }
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm --filter @folio/site exec vitest run src/components/hero/galaxy-hero.test.tsx`
Expected: FAIL — `Cannot find module './galaxy-hero'`.

- [ ] **Step 3: Implement `galaxy-hero.tsx`**

Port the frame from `mecha-hero.tsx` with three changes: halftone dots use `text-instrument-foreground` (light, for the dark stage), the AegisHud/bracket layers are replaced by the galaxy canvas, and the root has no `bg-background` (the stage CSS shows through the transparent canvas). Blast doors are verbatim.

Create `apps/site/src/components/hero/galaxy-hero.tsx`:

```tsx
'use client'

import { useEffect, useRef, useState } from 'react'

import { useParallax } from '@/hooks/use-parallax'

import { GalaxyCanvas, type GalaxyTiltTarget } from './galaxy-canvas'

export function GalaxyHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  useParallax(containerRef)

  const tiltTarget = useRef<GalaxyTiltTarget>({ x: 0, y: 0 })
  const [isOpened, setIsOpened] = useState(false)

  useEffect(() => {
    // Blast doors open shortly after mount
    const timer = setTimeout(() => setIsOpened(true), 600)
    return () => clearTimeout(timer)
  }, [])

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    tiltTarget.current = {
      x: ((event.clientX - bounds.left) / bounds.width) * 2 - 1,
      y: ((event.clientY - bounds.top) / bounds.height) * 2 - 1,
    }
  }

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      className="relative isolate flex h-full w-full items-center justify-center overflow-hidden"
    >
      {/* Background Halftone 1 (Deepest, sparsest) */}
      <div
        className="absolute inset-[-150%] bg-halftone text-instrument-foreground opacity-[0.03] pointer-events-none"
        style={{
          backgroundSize: '32px 32px',
          '--parallax-depth-x': 0.1,
          '--parallax-depth-y': 0.1,
          '--scroll-depth': -0.1,
          transform: `translate3d(calc(var(--parallax-x) * 1px * var(--parallax-depth-x)), calc((var(--parallax-y) * var(--parallax-depth-y) + var(--scroll-y) * var(--scroll-depth)) * 1px), 0)`
        } as React.CSSProperties}
      />

      {/* Background Halftone 2 (Mid) */}
      <div
        className="absolute inset-[-100%] bg-halftone text-instrument-foreground opacity-[0.05] pointer-events-none"
        style={{
          backgroundSize: '16px 16px',
          '--parallax-depth-x': 0.2,
          '--parallax-depth-y': 0.2,
          '--scroll-depth': -0.3,
          transform: `translate3d(calc(var(--parallax-x) * 1px * var(--parallax-depth-x)), calc((var(--parallax-y) * var(--parallax-depth-y) + var(--scroll-y) * var(--scroll-depth)) * 1px), 0)`
        } as React.CSSProperties}
      />

      {/* Background Halftone 3 (Closer) */}
      <div
        className="absolute inset-[-50%] bg-halftone text-instrument-foreground opacity-[0.08] pointer-events-none"
        style={{
          backgroundSize: '8px 8px',
          '--parallax-depth-x': 0.3,
          '--parallax-depth-y': 0.3,
          '--scroll-depth': -0.5,
          transform: `translate3d(calc(var(--parallax-x) * 1px * var(--parallax-depth-x)), calc((var(--parallax-y) * var(--parallax-depth-y) + var(--scroll-y) * var(--scroll-depth)) * 1px), 0)`
        } as React.CSSProperties}
      />

      {/* Galaxy canvas (transparent; the dark stage shows through) */}
      <div className="absolute inset-0">
        <GalaxyCanvas tiltTarget={tiltTarget} />
      </div>

      {/* Blast Doors (Armor Panels) - Fixed to container, no parallax */}
      <div
        className="absolute inset-0 z-40 flex pointer-events-none"
        aria-hidden
      >
        {/* Left Panel */}
        <div
          className="h-full w-1/2 bg-card border-r-2 border-primary/10 chamfer-surface shadow-2xl transition-transform duration-1000 ease-in-out relative flex items-center justify-end pr-4 md:pr-8"
          style={{ transform: isOpened ? 'translateX(-100%)' : 'translateX(0)' }}
        >
          <div className="w-1 md:w-2 h-16 md:h-32 bg-primary/20 rounded-full animate-pulse" />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] md:text-xs text-primary/30 tracking-widest font-mono rotate-180" style={{ writingMode: 'vertical-rl' }}>
            SYS.INIT // L-PANEL
          </div>
        </div>
        {/* Right Panel */}
        <div
          className="h-full w-1/2 bg-card border-l-2 border-primary/10 chamfer-surface shadow-2xl transition-transform duration-1000 ease-in-out relative flex items-center justify-start pl-4 md:pl-8"
          style={{ transform: isOpened ? 'translateX(100%)' : 'translateX(0)' }}
        >
          <div className="w-1 md:w-2 h-16 md:h-32 bg-primary/20 rounded-full animate-pulse" />
          <div className="absolute left-2 top-1/2 -translate-y-1/2 text-[10px] md:text-xs text-primary/30 tracking-widest font-mono" style={{ writingMode: 'vertical-rl' }}>
            SYS.INIT // R-PANEL
          </div>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm --filter @folio/site exec vitest run src/components/hero/galaxy-hero.test.tsx`
Expected: PASS — 2 tests.

- [ ] **Step 5: Commit**

```bash
git add apps/site/src/components/hero/galaxy-hero.tsx apps/site/src/components/hero/galaxy-hero.test.tsx
git commit -m "feat(site): add galaxy hero frame component"
```

---

### Task 6: Route page and styles

**Files:**
- Create: `apps/site/src/app/galaxy-prototype/page.tsx`
- Modify: `apps/site/src/app/globals.css`

- [ ] **Step 1: Create the page**

Create `apps/site/src/app/galaxy-prototype/page.tsx` (mirrors `hero-prototype/page.tsx`):

```tsx
import type { Metadata } from 'next'

import { ScrollRuler } from '@/components/hero/scroll-ruler'
import { UserAgentDisplay } from '@/components/hero/user-agent-display'
import { GalaxyHero } from '@/components/hero/galaxy-hero'

export const metadata: Metadata = {
  title: 'Galaxy Hero Prototype',
  robots: { follow: false, index: false },
}

export default function GalaxyPrototypePage() {
  return (
    <main className="galaxy-prototype-page">
      <div className="galaxy-prototype-stage relative">
        <div className="galaxy-prototype-user-agent absolute top-4 left-4 z-50 mix-blend-difference pointer-events-auto">
          <UserAgentDisplay />
        </div>
        <div className="h-full w-full">
          <GalaxyHero />
        </div>
      </div>
      <ScrollRuler />
    </main>
  )
}
```

- [ ] **Step 2: Add the styles**

Append to the end of `apps/site/src/app/globals.css` (one blank line before the block):

```css
.galaxy-prototype-page {
  --hero-accent: #ff4c40;
  --hero-line: color-mix(in oklab, var(--instrument-foreground) 28%, transparent);
  position: relative;
  min-height: 240vh;
  overflow-x: clip;
}

.galaxy-prototype-stage {
  position: sticky;
  top: 0;
  height: 100vh;
  min-height: 42rem;
  overflow: clip;
  background:
    radial-gradient(
      120% 90% at 68% 42%,
      color-mix(in oklab, var(--instrument) 82%, var(--signal-blue)) 0%,
      var(--instrument) 52%,
      oklch(0.157 0.006 229.25) 100%
    );
}

.galaxy-prototype-user-agent {
  position: absolute;
  z-index: 3;
  top: 1.25rem;
  left: 1.25rem;
  width: min(68vw, 36rem);
  opacity: 0.42;
}

@media (min-width: 48rem) {
  .galaxy-prototype-user-agent {
    width: min(42vw, 36rem);
  }
}

@media (prefers-reduced-motion: reduce) {
  .galaxy-prototype-page .chamfer-surface {
    transition: none !important;
  }
}
```

Notes:
- `--hero-accent` / `--hero-line` are consumed by the shared `ScrollRuler` styles. The light-tinted `--hero-line` keeps ruler ticks visible over the dark stage; the ruler's hardcoded `--foreground`-based major ticks stay subtle on the stage and read normally on the light page below — acceptable for the prototype.
- The stage gradient is a subtle navy vignette biased toward the galaxy's off-center position (right of center at `68% 42%`).

- [ ] **Step 3: Run the full site check**

Run: `pnpm --filter @folio/site check`
Expected: PASS (test, lint, typecheck via turbo).

- [ ] **Step 4: Commit**

```bash
git add apps/site/src/app/galaxy-prototype/page.tsx apps/site/src/app/globals.css
git commit -m "feat(site): add galaxy-prototype route and styles"
```

---

### Task 7: Browser verification and final gate

**Files:** none (verification only)

- [ ] **Step 1: Start the dev server**

Run: `pnpm --filter @folio/site dev` (port 10240, background it).
Expected: `Ready` with no compile errors for `/galaxy-prototype`.

- [ ] **Step 2: Verify default render**

Navigate chrome-devtools to `http://localhost:10240/galaxy-prototype`, wait for blast doors to open (~1.6s), take a screenshot.
Verify against the spec acceptance criteria:
- Galaxy visible, off-center to the right, disc tilted ~30deg toward the viewer (not flat top-down).
- Amber core lerping to blue rim; additive glow reads against the dark stage.
- Stage gradient/halftone visible around particles (canvas is transparent, not a black rectangle).
- User-agent text top-left, readable via mix-blend-difference.

- [ ] **Step 3: Verify cursor tilt parallax**

Hover the cursor to the far left of the stage, screenshot; hover to the far right, screenshot.
Verify: the scene tilts following the cursor, easing smoothly; the dense inner core shifts visibly more than the sparse outer rim (differential band parallax).

- [ ] **Step 4: Verify reduced motion**

Emulate `prefers-reduced-motion: reduce` (chrome-devtools `emulate`), reload, screenshot.
Verify: galaxy renders as a static frame (no spin over ~3s of observation); blast doors snap open without animation.

- [ ] **Step 5: Verify mobile framing**

Resize to 390x844, screenshot.
Verify: galaxy remains in frame (offset scaled down), stage fills the viewport, no horizontal scroll.

- [ ] **Step 6: Verify scroll behavior**

Scroll ~1200px down.
Verify: sticky stage holds while the page scrolls; `ScrollRuler` indicator value updates; the page below the stage is the site light background.

- [ ] **Step 7: Production build**

Run: `pnpm --filter @folio/site build`
Expected: build succeeds; `/galaxy-prototype` listed in the route output. Stop the dev server afterwards.

- [ ] **Step 8: Final full check**

Run: `pnpm --filter @folio/site check`
Expected: PASS.

---

## Self-Review Notes

- **Spec coverage:** every spec section maps to a task — deps (T1), galaxy math + bands (T2), color resolution (T3), rendering incl. baseTilt/off-center/cursor parallax/reduced motion (T4), frame + blast doors (T5), route + page CSS + ruler/UA composition (T6), acceptance-criteria browser checks (T7).
- **Type consistency:** `GalaxyTiltTarget` is defined in `galaxy-canvas.tsx` and imported by `galaxy-hero.tsx`; `buildGalaxyBands(inner, outer, params, random)` signature matches Task 2 tests; `resolveCssColor(name, fallback)` matches Task 3 tests and Task 4 usage; `GALAXY_PARAMS` fields used in Task 4 (`size`, `rotationSpeed`, `tiltFactors`, `maxTilt`, `tiltDamping`, `baseTilt`, `offset`) all exist in Task 2's `GalaxyParams`.
- **Known tuning points for browser verification:** `baseTilt` sign (if the disc tips away from the camera instead of toward it, change to `-Math.PI / 6`), `offset.x`, and `maxTilt` may need small visual adjustments in Task 7; they are single-constant edits in `GALAXY_PARAMS`.
