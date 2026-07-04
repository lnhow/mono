# Futuristic Hero Prototype Design

## Goal

Build a standalone `/hero-prototype` page in `apps/site` that prototypes three reusable technical-display components from the supplied mobile reference: a futuristic clock, a browser user-agent display, and a scroll ruler. The existing homepage remains unchanged.

Motion for React is the shared animation layer. This prototype uses only the primitives needed now, while establishing an idiomatic base for later sequenced entrances, SVG morphing, and scroll choreography.

## Scope

The prototype includes only:

- The live clock and its four concentric time rings.
- The current browser user-agent display.
- The right-edge scroll ruler and its live scroll value.

The name, biography, decorative grid, device indicators, red curve, and other reference elements are explicitly excluded.

## Route Isolation

`/hero-prototype` is a full-bleed page. It must not render the shared site header, footer, centered width constraint, or standard page padding. Existing routes retain the current shared shell and the current `/` page is not modified.

Route-shell selection will be explicit in the shared layout so the prototype is isolated without coupling any of its three components to route detection. This preserves the components for later placement on the homepage or elsewhere.

## Components

### FuturisticClock

`FuturisticClock` is a browser-only client component with a responsive SVG visualization and an HTML text readout. The route loads it with server rendering disabled so the server never emits a timestamp that can disagree with the visitor's clock during hydration. Its reserved layout box is initially transparent, then fades in through a Motion entrance after the component mounts. This prevents both time-text hydration mismatches and visible layout movement. It owns the current local time and animation lifecycle but does not own page positioning.

The SVG contains four concentric rings, ordered from outside to inside:

1. Milliseconds
2. Seconds
3. Minutes
4. Hours

Each ring has distinct tick density and weight. The rings rotate according to their current time-derived angle, and the four angles are displayed to two decimal places near their respective rings. The date and 12-hour time readout use the visitor's local time zone.

Normal-motion mode uses Motion's `useAnimationFrame` hook to drive time-derived Motion values. Animated SVG groups consume those values as rotation transforms without making React reconcile the complete SVG tree on every frame. Angles remain calculated from the current wall clock rather than accumulated animation time, so background-tab throttling cannot make the clock drift. Angles are continuous:

- Milliseconds: progress through the current second.
- Seconds: seconds plus millisecond progress.
- Minutes: minutes plus second progress.
- Hours: 12-hour position plus minute progress.

Reduced-motion mode is selected with Motion's `useReducedMotion` hook. It uses a one-second aligned timer and makes discrete mechanical jumps with no interpolation:

- Milliseconds jump to zero.
- Seconds advance in six-degree steps.
- Minutes and hours advance to their discrete positions for the current whole second.
- Time and angle labels update on the same tick.

The normal and reduced timing strategies are isolated in keyed internal controllers so only one is mounted at a time. Motion owns animation-frame cleanup when the normal controller unmounts. The reduced controller cancels its timer on unmount, including when the media preference changes.

### UserAgentDisplay

`UserAgentDisplay` is a client component that reads `navigator.userAgent` after hydration. It renders a stable placeholder before the browser value is available, wraps long values, and exposes the text as ordinary selectable content. It owns no absolute or fixed positioning.

### ScrollRuler

`ScrollRuler` is a client component made of two coordinated layers. A document-flow track is positioned along the right edge and spans the complete document scroll height, so its ticks move with the page. A viewport-fixed indicator remains in place while the document and track scroll behind it. The indicator contains the vertical `scroll-height` label and the current absolute `scrollY` value in pixels. Motion's `useScroll` supplies the scroll position, and `useMotionValueEvent` updates the textual value without installing a parallel scroll listener.

Large pixel values use a compact, one-decimal representation: `1234 px` becomes `1.2k px`, and `1234567 px` becomes `1.2m px`. Values below 1000 remain whole pixels.

The current scroll position is clamped to `[0, document.scrollHeight - innerHeight]`. A non-scrollable document resolves to zero. Motion owns scroll subscription and cleanup; resize measurement remains local to the component and is cleaned up on unmount.

## Composition and Responsive Behavior

The prototype page supplies layout only. It places the user-agent display at the upper left, the clock around the left-center, and the ruler on the right edge. It includes sufficient vertical height to demonstrate the ruler.

On mobile, the clock is deliberately oversized and offset beyond the left viewport edge, reproducing the partial crop in the supplied reference. Its date/time readout remains visible. At wider breakpoints, the clock scales and repositions until the complete SVG fits within the viewport.

The page uses the site's existing neutral palette and type system, with high-contrast dark clock accents and light technical guide marks. The SVG scales through its `viewBox`; tick geometry is not recalculated for each breakpoint.

## Pure Calculations and Testing

Time-to-angle conversion, scroll-position clamping, and compact pixel formatting live in framework-independent helpers. Unit tests cover:

- Continuous angles for a fixed timestamp.
- Discrete reduced-motion angles.
- Twelve-hour wrapping.
- Scroll position at the start, midpoint, end, over-scroll bounds, and a non-scrollable page.
- Pixel labels below 1000 and compact `k` and `m` labels at representative boundaries.

Component tests verify the three reusable components can be rendered independently and expose their key accessible text. Browser verification checks the clock's reserved transparent state and post-mount fade-in, mobile crop, wider-screen full clock, live time movement, reduced-motion ticking, user-agent value, full-document ruler track, fixed indicator, and updating compact pixel value while scrolling.

## Error and Compatibility Behavior

- The clock is excluded from server rendering; its reserved transparent box becomes visible only after mount.
- Server rendering never reads browser globals.
- Missing `matchMedia` support falls back to normal animation.
- Motion is imported from `motion/react`; no legacy `framer-motion` package is introduced.
- A non-scrollable or temporarily zero-height document reports a zero-pixel position.
- SVG and textual time remain understandable if decorative CSS fails.

## Acceptance Criteria

- `/hero-prototype` renders without the shared site chrome while all existing routes remain unchanged.
- The three features are separate reusable components and the route only composes them.
- Four SVG rings and four two-decimal angle values track local time.
- The clock emits no server timestamp and fades in after browser mount without layout movement.
- Normal motion is continuous; reduced motion ticks once per second without interpolation.
- The clock is cropped on mobile and fully visible on sufficiently wide screens.
- The user-agent text reflects the visitor's browser.
- The ruler track spans and scrolls with the full document while its indicator stays fixed in the viewport.
- The indicator reports current scroll pixels with one-decimal `k` and `m` truncation for large values.
- Automated tests, lint, type checking, and the production build pass.
