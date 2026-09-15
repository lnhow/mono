# Personal Site Migration Design

## Status

Approved for implementation on 2026-06-20. This document captures the architecture decisions supplied with the migration request. The implementation must not modify `apps/hsp/web` or `packages/hsp/ui`.

## Goal

Establish a stable personal site independently of the HSP application, with a reusable UI package generated from the complete shadcn registry and the existing real blog posts. The migration covers stable public behavior only; experiments remain links to their existing locations.

## Considered approaches

1. **New app and pure UI package (selected).** Build `apps/site` and `packages/ui`, copying only real content and reimplementing the small stable presentation layer. This provides clean dependency boundaries and leaves the legacy application operational.
2. **Refactor the HSP app in place.** This would reduce initial duplication but mixes migration work with experimental routes and risks breaking legacy behavior. It is rejected.
3. **Create a new app that consumes `@hsp/ui`.** This is faster initially but preserves theme, state, socket, and feature coupling. It is rejected.

## Stable route contract

| Route | Contract |
| --- | --- |
| `/` | Portfolio summary, latest visible posts, and a typed catalog of links to experiments. |
| `/blog` | All visible posts in descending effective-date order. |
| `/posts/[slug]` | A statically enumerable visible post, rendered from MDX. Unknown, draft, or archived slugs return not found. |
| `/posts/[slug]/opengraph-image` | A generated image using the post title and description for visible posts. |
| `/sitemap.xml` | Home, blog, and visible post URLs. |
| `/robots.txt` | Allows public crawling and points to the sitemap. |

A health route is not needed for this static-oriented slice. Existing experiment paths are not stable contracts and are not recreated. The experiment catalog contains typed external or legacy links only; it does not embed content or use Module Federation.

## Architecture

`apps/site` is a standalone Next.js App Router application. Its content collection compiles MDX from `src/content/posts`, derives slugs from filenames, estimates reading time, and supplies typed post documents. A focused `src/lib/posts.ts` module owns visibility, effective-date sorting, lookup, and route-param behavior so non-visual rules can be unit tested without rendering pages.

`packages/ui`, published in the workspace as `@folio/ui`, is initialized and populated through the official shadcn CLI monorepo workflow. It exports the complete generated component registry, generated hooks and utilities, and a stylesheet containing default neutral shadcn semantic variables. It has no application feature modules, global state, sockets, `next-themes`, or dependency on `@hsp/ui`.

The site imports explicit `@folio/ui` subpath exports. Site-level compositions such as the header, post card, MDX typography, and experiment list remain in `apps/site`; they are not generalized prematurely.

## Content and data flow

The three real MDX posts are copied unchanged into the new app. `test.mdx` is excluded because it is a development fixture rather than published content. At build time, Content Collections validates frontmatter and compiles MDX. Routes read the generated collection, filter out `draft` and `archived` posts in every environment, and sort by `updatedAt ?? createdAt`, descending, with creation date and slug as deterministic tie-breakers.

Post metadata includes canonical URLs, article timestamps, tags, Open Graph data, and Twitter card data. Root metadata defines the production URL from `NEXT_PUBLIC_SITE_URL`, falling back to `https://www.haoln7f8.com`. Sitemap and robots use the same URL helper to avoid inconsistent origins.

## Presentation

This slice uses a restrained, readable layout with no investment in the future paper/pen/sticker visual direction. The stylesheet uses default shadcn semantic variables and a single light color scheme. There is no theme provider, toggle, dark-mode selector, or legacy HSP token.

## Error handling

Missing or hidden posts use Next.js `notFound()`. Metadata for an unknown post returns a minimal “Post not found” title. Invalid frontmatter fails the content build. Catalog links are compile-time checked against a small union of experiment categories and link kinds.

## Testing and verification

Unit tests drive post visibility, deterministic sorting, lookup, and experiment-catalog shape. Tests use plain typed fixtures and the real exported helpers. Verification runs the site and UI package tests, lint, typecheck where configured, and a production build. The final diff audit must prove that `apps/hsp/web/**` and `packages/hsp/ui/**` are untouched.

## Out of scope

- Moving, deleting, or modifying legacy HSP files
- Copying experimental routes into the stable app
- Module Federation or iframe embedding
- Dark/light theme machinery
- A final paper/pen/sticker visual system
- Analytics, sockets, Jotai, or feature-specific UI modules
