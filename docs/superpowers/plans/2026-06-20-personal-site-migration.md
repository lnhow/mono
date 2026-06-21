# Personal Site Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create an independent stable personal site, a pure reusable UI package, and a migrated real-post content pipeline without changing legacy HSP paths.

**Architecture:** `apps/site` owns stable routes, content, metadata, and site compositions. `packages/ui` is a just-in-time TypeScript/React workspace package initialized through the official shadcn monorepo CLI, with complete component, hook, utility, and stylesheet exports. Pure post and experiment-catalog helpers isolate behavior for fast unit tests.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript 5.9, Tailwind CSS 4, Content Collections/MDX, Vitest, Turborepo, pnpm.

---

## File map

### Documentation

- `docs/superpowers/specs/2026-06-20-personal-site-migration-design.md`: approved architecture and stable route contract.
- `docs/superpowers/plans/2026-06-20-personal-site-migration.md`: implementation checklist and verification commands.

### UI package

- `packages/ui/package.json`: package scripts, dependencies, and explicit exports.
- `packages/ui/tsconfig.json`, `packages/ui/eslint.config.mjs`: shared TypeScript and lint configuration.
- `packages/ui/components.json`: shared shadcn registry installation targets and aliases.
- `packages/ui/src/lib/utils.ts`: CLI-compatible class-name merging utility.
- `packages/ui/src/components/*.tsx`: the complete shadcn component registry installed by the CLI.
- `packages/ui/src/hooks/*.ts`: shadcn component support hooks installed by the CLI.
- `packages/ui/src/styles/globals.css`: Tailwind import plus default light shadcn semantic variables.

### Site application

- `apps/site/package.json`, `components.json`, `tsconfig.json`, `eslint.config.mjs`, `vitest.config.ts`, `next.config.ts`, `postcss.config.mjs`, `next-env.d.ts`: standalone app, shadcn monorepo routing, and package tasks.
- `apps/site/content-collections.ts`: post schema, MDX compilation, slug and reading-time derivation.
- `apps/site/src/content/posts/*.mdx`: the three real posts copied from the legacy source; no `test.mdx`.
- `apps/site/src/lib/posts.ts`, `posts.test.ts`: visible-post filtering, sorting, lookup, and static params.
- `apps/site/src/lib/experiments.ts`, `experiments.test.ts`: typed link catalog and uniqueness/URL rules.
- `apps/site/src/lib/site.ts`: canonical origin and shared identity constants.
- `apps/site/src/components/*.tsx`: site-only header, cards, catalog, and MDX compositions.
- `apps/site/src/app/**`: stable shell, home, blog, post, metadata, sitemap, and robots routes.

### Workspace

- `turbo.jsonc`: register a shared `typecheck` task.
- `pnpm-lock.yaml`: register the two new workspace importers.

No workspace glob change is needed because `apps/*` and `packages/*` already include both packages.

## Task 1: Establish package boundaries

- [ ] **Step 1: Add package manifests and configs**

Create `@folio/ui` with wildcard exports for `./components/*`, `./hooks/*`, and `./lib/*`, plus `./globals.css`. Create `@folio/site` with package-local `dev`, `build`, `lint`, `typecheck`, and `test` scripts. Declare `@folio/ui: workspace:*` in the site so Turbo recognizes the dependency edge.

- [ ] **Step 2: Register typechecking**

Add this shared task to `turbo.jsonc`:

```jsonc
"typecheck": {
  "dependsOn": ["^typecheck"],
  "outputs": []
}
```

Task logic remains in package scripts; the root remains a delegator.

- [ ] **Step 3: Resolve the workspace lockfile**

Run `pnpm install --lockfile-only`. Expected: exit 0 and importers for `apps/site` and `packages/ui`.

## Task 2: Generate the pure UI package

- [ ] **Step 1: Configure the official monorepo targets**

Create matching `components.json` files in `apps/site` and `packages/ui`, using the Radix Nova preset, Lucide icons, neutral base color, CSS variables, and `@folio/ui` aliases. Package-local generated imports use `#components`, `#hooks`, and `#lib` package imports.

- [ ] **Step 2: Initialize and install the registry through shadcn**

Run `pnpm dlx shadcn@latest init` against `apps/site`, then `pnpm dlx shadcn@latest add --all --overwrite --cwd apps/site --yes`. Keep the generated complete component set and dependencies. Retain the default neutral semantic variables, but remove generated dark-theme selectors, theme-provider integration, and `next-themes` so the package exposes one fixed scheme. Do not add HSP tokens.

- [ ] **Step 3: Verify the boundary**

Run `pnpm --filter @folio/ui typecheck` and `pnpm --filter @folio/ui lint`. Expected: both exit 0; `rg '@hsp/ui|next-themes|jotai|socket' packages/ui` returns no matches.

## Task 3: Drive post behavior with tests

- [ ] **Step 1: Write failing visibility and sorting tests**

Create fixtures and assertions for published-only visibility, effective-date descending sorting, deterministic creation-date/slug tie-breaks, visible-only lookup, and visible-only static params:

```ts
expect(getVisiblePosts([published, draft, archived]).map(({ slug }) => slug))
  .toEqual(["published"])
expect(getPostBySlug([draft], "draft")).toBeUndefined()
expect(getPostStaticParams([published, draft])).toEqual([{ slug: "published" }])
```

- [ ] **Step 2: Run and confirm RED**

Run `pnpm --filter @folio/site test -- src/lib/posts.test.ts`. Expected: failure because the helpers do not exist.

- [ ] **Step 3: Implement minimal helpers**

Define a structural `PostRecord` and export `isVisiblePost`, `getVisiblePosts`, `getPostBySlug`, and `getPostStaticParams`. Never mutate input. Exclude draft and archived records in all environments.

- [ ] **Step 4: Run and confirm GREEN**

Repeat the filtered test. Expected: all post-helper tests pass.

## Task 4: Drive the experiment catalog with tests

- [ ] **Step 1: Write failing catalog tests**

Assert unique slugs, absolute HTTPS URLs, and fixed categories `creative-coding`, `tools`, or `performance`.

- [ ] **Step 2: Run and confirm RED**

Run `pnpm --filter @folio/site test -- src/lib/experiments.test.ts`. Expected: failure because the catalog does not exist.

- [ ] **Step 3: Implement the typed catalog**

Export readonly `Experiment` and `ExperimentCategory` types plus entries linking to existing production experiments including 3D text, cake, physics, spiral, palette, player, contrast checker, and Next.js performance. Build URLs against `https://www.hspln.com`; the new app does not own these routes.

- [ ] **Step 4: Run and confirm GREEN**

Repeat the catalog test. Expected: all catalog tests pass.

## Task 5: Configure and migrate content

- [ ] **Step 1: Add the content pipeline**

Validate post frontmatter with Content Collections. Compile MDX with GFM, heading slugs/autolinks, and syntax highlighting. Derive filename slug, post URL, and numeric reading time.

- [ ] **Step 2: Copy real posts only**

Add `251008-the-first-post.mdx`, `251014-output-vs-outcome.mdx`, and `251228-2025-in-reflection.mdx` to `apps/site/src/content/posts`. Do not add `test.mdx`; the spec records its fixture-only purpose.

- [ ] **Step 3: Validate generated content**

Run `pnpm --filter @folio/site typecheck`. Expected: Content Collections generation succeeds and generated imports are typed.

## Task 6: Implement stable routes and metadata

- [ ] **Step 1: Build the shared shell and home**

Import `@folio/ui/globals.css`, define root metadata, and render a semantic header/footer. Home contains the portfolio introduction, latest visible posts, and the experiment-link catalog.

- [ ] **Step 2: Build blog and post routes**

`/blog` renders all visible posts. `/posts/[slug]` uses visible-only lookup, `notFound()`, `MDXContent`, and local MDX overrides. Static params include visible posts only. Metadata emits canonical, article timestamps/tags, Open Graph, and Twitter fields.

- [ ] **Step 3: Add OG, sitemap, and robots**

Generate a 1200×630 post image. Sitemap includes `/`, `/blog`, and visible posts. Robots allows public crawling and references the same canonical origin.

- [ ] **Step 4: Confirm route contract**

Run `pnpm --filter @folio/site build`. Expected: exit 0 with home, blog, post, post OG image, robots, and sitemap routes; no experiment route.

## Task 7: Full verification and scope audit

- [ ] **Step 1: Run fresh targeted checks**

Run:

```bash
pnpm --filter @folio/ui lint
pnpm --filter @folio/ui typecheck
pnpm --filter @folio/site test
pnpm --filter @folio/site lint
pnpm --filter @folio/site typecheck
pnpm --filter @folio/site build
```

Expected: every command exits 0 with no test, lint, typecheck, or build failures.

- [ ] **Step 2: Inspect all changes**

Run:

```bash
git status --short
git diff --stat
git diff -- apps/hsp/web packages/hsp/ui
rg '@hsp/ui|next-themes|jotai|socket.io|ModuleFederation' apps/site packages/ui
```

Expected: only authorized paths changed, the forbidden-path diff is empty, and the dependency scan has no matches.

- [ ] **Step 3: Leave work unstaged**

Do not stage, commit, push, or create a PR. Report every changed path and exact verification results.
