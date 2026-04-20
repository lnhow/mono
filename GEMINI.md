# GEMINI Project Context

This document provides context for the `mono` project, a personal monorepo for JavaScript-related projects.

## Project Overview

This is a **pnpm/Turborepo monorepo** housing several applications and shared packages.

### Key Applications:

*   **`apps/hsp/web`**: Main web application (Next.js 16, React 19). Includes a personal blog, `guesart` (draw-and-guess game), and a custom HTML player.
*   **`apps/hsp/api`**: Backend API for `hsp` (Nest.js, Socket.io, Prisma, MongoDB).
*   **`apps/explore/*`**: Experimental projects, including Micro-Frontends (MFE).
*   **`apps/storybook`**: Storybook instance for UI components.

### Shared Packages:

*   **`packages/hsp/ui`**: Shared UI components based on shadcn/ui.
*   **`packages/configs`**: Shared ESLint and TypeScript configurations.
*   **`packages/i18n`**: Shared internationalization utilities.
*   **`packages/remark-toc`**: Remark plugin for TOC generation.

## Building and Running

*   **Install dependencies**: `pnpm install`
*   **Dev all**: `pnpm dev`
*   **Dev main apps**: `pnpm dev:hsp`
*   **Storybook**: `pnpm storybook`
*   **Build**: `pnpm build`
*   **Test**: `pnpm test` / `pnpm test:e2e`

*Note: Copy `.env.example` to `.env` in `apps/hsp/api` before running the backend.*

## Development Conventions

### Commit Convention
Please refer to the [Commit Convention](docs/commit-convention.md) documentation for semantic commit rules.

### Code Style & Linting
*   **ESLint / Prettier**: Enforced via `pnpm lint` and formatting configurations.
*   **Husky**: Pre-commit hooks run linting checks.

### Database
*   **Prisma ORM** with MongoDB Atlas. Schema in `apps/hsp/api/prisma`.
*   Run tasks via `db:generate` and `db:migrate` scripts.

### Deployment
*   **Frontend**: Vercel.
*   **Backend**: GCP Compute Engine VM (Nginx + PM2). Workflow in `.github/workflows/hsp_api_deploy.yml`.
