# Project Guidelines & Preferences for @folio/site

## Component Colocation Architecture

- **Page-Specific Components**: Any component, canvas, or UI helper used exclusively by a specific page or route MUST be colocated in a `_components/` folder adjacent to that page.
  - Example: `src/app/(home)/page.tsx` colocates its hero visualizer and card links in `src/app/(home)/_components/galaxy-canvas.tsx`, `src/app/(home)/_components/galaxy-hero.tsx`, and `src/app/(home)/_components/stage-card-link.tsx`.
  - Example: `src/app/(site)/blog/page.tsx` colocates its post cards and demo cards in `src/app/(site)/blog/_components/`.
- **Global Components**: `src/components/` is strictly reserved for truly shared components used across multiple top-level layouts and pages (such as `site-header.tsx` and `mdx-components.tsx`).
