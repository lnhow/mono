# Galaxy Hero Prototype Design

## Goal

Build a standalone `/galaxy-prototype` page in `apps/site` that prototypes the next home-page hero: a Three.js particle galaxy (ported from `apps/learn/threejs/basics/src/18-galaxy`) rendered with React Three Fiber on a transparent canvas, composed inside the hero-prototype frame (sticky scroll stage, halftone parallax layers, blast-door intro, user-agent display, scroll ruler). The existing homepage and `/hero-prototype` remain unchanged.

## Scope

The prototype includes only:

- The particle galaxy scene on a transparent WebGL canvas over a dark stage.
- Cursor-driven scene tilt with differential per-band parallax.
- Off-center (right-biased) galaxy composition.
- The hero-prototype frame elements: sticky 240vh stage, halftone parallax layers, blast-door intro, `UserAgentDisplay`, `ScrollRuler`.

Headline/CTA text, OrbitControls, lil-gui tuning panel, and light-mode stage adaptation are explicitly excluded.

## Decisions (from brainstorming)

- **Stage**: always dark (navy `--instrument` tone) so the additive-blended particle glow reads correctly. The learn example's additive blending washes out on the site's light background; a dark stage preserves it.
- **Palette**: site tokens — inner core `--signal-amber` (accent) lerping to outer rim `--signal-blue` (primary), resolved from CSS custom properties at runtime so the galaxy always matches the theme.
- **Tech**: React Three Fiber (`@react-three/fiber` from `catalog:three`) + `three`. Scene code that is pure math lives outside R3F in testable helpers.
- **Route**: `apps/site/src/app/galaxy-prototype/page.tsx`. Like `hero-prototype`, it sits outside the `(site)` route group, so the shared site chrome never applies. `robots: { index: false, follow: false }`.

## The Galaxy

`apps/site/src/lib/hero/galaxy.ts` is a framework-independent module (no three.js import) holding:

- `GALAXY_PARAMS`: ported defaults — `count: 100000`, `radius: 5`, `radiusLag: 1`, `size: 0.01`, `branches: 5`, `randomness: 0.45`, `randomnessPower: 2.6`, `yRadiusOffset: 0.45`, `rotationSpeed: -0.5`, plus new `bandBoundaries: [1/3, 2/3]` (fractions of radius), `tiltFactors: [1.0, 0.6, 0.3]` (inner→outer), `maxTilt: 0.08` (radians), `tiltDamping: 3`, `baseTilt: Math.PI / 6` (30°), and `offset: { x: 3, y: 0, z: 0 }`.
- `buildGalaxyBands(params)`: a 1:1 port of the `18-galaxy` `createGalaxy()` math (branch angle + radius-lag positioning, powered randomness, y-offset, radius-driven color lerp), returning one `{ positions: Float32Array, colors: Float32Array }` entry per band. Particles are partitioned by radius into inner/mid/outer bands; because the source distribution is uniform in radius and the color lerp spans the full radius, banding is seamless. Takes `innerColor`/`outerColor` as `[r, g, b]` tuples (0–1).

### Theme color resolution

`apps/site/src/lib/hero/css-color.ts` resolves a CSS custom property (e.g. `--signal-amber`) to an sRGB `[r, g, b]` tuple. Primary path: a 1×1-canvas probe (`fillStyle = var(--…)`, `getImageData`) which converts any CSS color syntax the browser supports, including oklch. Fallbacks, in order: `rgb()`/`rgba()`/hex string parsing of the computed value; a hardcoded sRGB constant matching the current token. Returns the fallback when `document`/canvas 2D is unavailable (SSR, jsdom).

## Rendering

`apps/site/src/components/hero/galaxy-canvas.tsx` (client component):

- `<Canvas gl={{ alpha: true, antialias: true }} dpr={[1, 2]} camera={{ position: [0, 8, 8], fov: 75 }}>` with a fully transparent clear color (`setClearColor(…, 0)`) and no scene background — the CSS stage shows through.
- Camera looks at the scene origin; the galaxy group is positioned at `offset` (right of frame). On narrow viewports the x-offset scales down proportionally to aspect so the galaxy never clips off-screen.
- Structure per band: `<group position={offset} rotation={[baseTilt, 0, 0]}>` → per-band tilt group → per-band spin group → `<points>`. The `baseTilt` (30° about x) tips the disc normal toward the camera so the galaxy slightly faces the screen by default instead of lying flat. The spin groups all receive the same `rotation.y = elapsed × rotationSpeed` each frame, keeping the spiral coherent across bands. The tilt groups never spin, so cursor tilt stays screen-aligned.
- Cursor tilt: `pointermove` on the stage container updates a normalized target (−1…1). `useFrame` eases the current tilt toward it with `THREE.MathUtils.damp` and applies `rotation.x`/`rotation.z = tilt × maxTilt × tiltFactors[band]`. Inner band follows the cursor most; the rim barely moves — parallax within the particle field.
- Material: `pointsMaterial` with `size: 0.01`, `vertexColors`, `depthWrite: false`, `blending: THREE.AdditiveBlending` (direct port).
- Geometry is built once in `useMemo` and disposed on unmount; colors are resolved once on mount with no theme-change subscription (acceptable because the stage is always dark and the signal tokens are identical in both site themes).
- `prefers-reduced-motion`: no spin, no cursor tilt; renders one static frame.

## Frame and Composition

`apps/site/src/components/hero/galaxy-hero.tsx` (client component) composes:

1. Three halftone parallax layers (ported from `MechaHero`, driven by `useParallax`) — light dots at 3–8% opacity over the dark stage.
2. The transparent `GalaxyCanvas`, absolutely filling the stage — the centerpiece, replacing `AegisHud` and the targeting-bracket ring.
3. The blast-door intro: two `bg-card` chamfered panels with `SYS.INIT // L/R-PANEL` labels that slide out 600ms after mount.

The page (`galaxy-prototype/page.tsx`) mirrors `hero-prototype/page.tsx`: `<main class="galaxy-prototype-page">` (240vh), sticky full-viewport stage, `UserAgentDisplay` top-left with `mix-blend-difference` (works over light page and dark stage), and `ScrollRuler`.

`globals.css` gains `.galaxy-prototype-*` classes: page (240vh, overflow-x clip), stage (sticky, 100vh, `min-height: 42rem`, dark `--instrument` background with a subtle radial vignette), canvas fill, and user-agent overlay positioning. `prefers-reduced-motion` CSS kills transitions as in the hero-prototype styles.

## Pure Calculations and Testing

Unit tests (vitest, jsdom):

- `buildGalaxyBands`: total particle count preserved across bands; positions/colors array lengths = count × 3; every particle radius falls in its band's boundary range; first-band colors match the inner color at radius 0 and trend toward the outer color with radius.
- `css-color`: rgb/hex fallback parsing; canvas-unavailable fallback constant.

Component tests: `GalaxyHero` renders its stage and blast-door labels (canvas itself mocked, consistent with how three.js is untestable in jsdom without WebGL).

Browser verification (chrome-devtools against `pnpm dev`): transparent canvas shows the dark stage behind particles; amber→blue gradient visible; galaxy sits right of center; cursor movement tilts the scene with visibly different rates between core and rim; blast doors open after mount; scroll ruler tracks the 240vh page; `prefers-reduced-motion` emulation yields a static galaxy.

## Error and Compatibility Behavior

- WebGL unavailable: the R3F `Canvas` fallback renders nothing; the stage (halftone, vignette, overlays) still presents as a complete static hero.
- Server rendering never reads browser globals: color resolution and pointer listeners run client-side only; initial SSR output contains no canvas-dependent markup.
- The galaxy route adds `three`, `@types/three`, `@react-three/fiber` from `catalog:three`; no other app is affected.

## Acceptance Criteria

- `/galaxy-prototype` renders the galaxy on a transparent canvas over the dark stage; page background below the stage and all existing routes are unchanged.
- Galaxy math matches the `18-galaxy` port (100k particles, 5 branches, additive blending, radius lerp).
- Colors resolve from `--signal-amber`/`--signal-blue` CSS variables.
- Galaxy is off-center right on desktop and remains fully in frame on mobile.
- Galaxy is tilted 30° about x by default so the disc slightly faces the screen.
- Cursor movement tilts the scene; inner/mid/outer bands move at visibly different rates; tilt is eased and screen-aligned.
- Spin and tilt are disabled under `prefers-reduced-motion`.
- Blast doors open after mount; `UserAgentDisplay` and `ScrollRuler` behave as on `/hero-prototype`.
- Automated tests, lint, type checking pass; browser screenshots verify the above.
