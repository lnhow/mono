# @folio/site

The stable production site for Hao Le. It is a Next.js App Router application
that consumes the shared `@folio/ui` package and publishes the migrated blog.

## Architecture & Conventions

- **Component Colocation**: Components used by a single page are colocated in `_components/` beside the page (e.g. `src/app/(home)/_components/` next to `src/app/(home)/page.tsx`). Global components shared across multiple layouts are kept in `src/components/`.

## Environment

Copy `.env.example` to `.env.local` for local overrides:

```sh
cp apps/site/.env.example apps/site/.env.local
```

`NEXT_PUBLIC_SITE_URL` is the canonical public origin used for metadata,
Open Graph thumbnails, `robots.txt`, and `sitemap.xml`. It must be an absolute
HTTP(S) URL. When omitted, the app uses `https://www.haoln7f8.com`.

## Commands

Run commands from the repository root:

```sh
pnpm --filter @folio/site dev
pnpm --filter @folio/site check
pnpm --filter @folio/site build
```

The package-level `check` command delegates test, lint, and typecheck to
Turborepo. The production build generates Content Collections output from the
three tracked MDX posts; generated files are not required in a clean checkout.
