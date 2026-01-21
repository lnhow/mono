# GEMINI Project Context

This document provides context for the `mono` project, a personal monorepo for JavaScript-related projects.

## Project Overview

This is a **pnpm/Turborepo monorepo** that houses several applications and shared packages.

### Key Applications:

*   **`apps/hsp/web`**: The main web application, built with **Next.js 16** and React 19. It includes:
    *   A personal blog.
    *   `guesart`: A draw-and-guess game using `socket.io-client` and `jotai`.
    *   A custom HTML player using modern browser APIs.
*   **`apps/hsp/api`**: The backend API for the `hsp` applications, built with **Nest.js**, Socket.io, Prisma, and MongoDB.
*   **`apps/explore/*`**: A directory for experimental projects, including Micro-Frontends (MFE) with React and Vue.
*   **`apps/storybook`**: A Storybook instance for developing and showcasing UI components.

### Shared Packages:

*   **`packages/hsp/ui`**: A shared UI component library based on **shadcn/ui** (Radix UI + TailwindCSS).
*   **`packages/configs`**: Shared configurations for tools like ESLint and TypeScript.
*   **`packages/i18n`**: Shared internationalization utilities.
*   **`packages/remark-toc`**: A remark plugin for generating tables of contents.

## Building and Running

The project uses `pnpm` as its package manager and `turborepo` to manage tasks.

### Initial Setup

1.  **Install pnpm**: If you don't have it, install it globally: `npm install -g pnpm`.
2.  **Environment Variables**: Copy the example environment file for the API and fill it out.
    ```bash
    cp ./apps/hsp/api/.env.example ./apps/hsp/api/.env
    # Open the .env file and add your database connection string, etc.
    ```
3.  **Install Dependencies**:
    ```bash
    pnpm install
    ```

### Development

*   **Run all applications in development mode**:
    ```bash
    pnpm dev
    ```
*   **Run only the main `hsp` web and api applications**:
    ```bash
    pnpm dev:hsp
    ```
*   **Run Storybook**:
    ```bash
    pnpm storybook
    ```

### Building for Production

*   **Build all applications and packages**:
    ```bash
    pnpm build
    ```
    Turborepo will cache artifacts and only rebuild what has changed.

### Testing

*   **Run unit tests**:
    ```bash
    pnpm test
    ```
*   **Run end-to-end tests**:
    ```bash
    pnpm test:e2e
    ```

## Development Conventions

### Code Style & Linting

*   **ESLint**: The project uses ESLint v9 with shared configurations located in `packages/configs/eslint-config`. Run the linter with:
    ```bash
    pnpm lint
    ```
*   **Prettier**: Code formatting is enforced by Prettier. The configuration is in the root `.prettierrc` file.
*   **Husky**: A `pre-commit` hook is set up with Husky to run checks (likely linting) before allowing a commit.

### Database

*   The API uses **Prisma** as its ORM. Schema and migration files are located in `apps/hsp/api/prisma`.
*   Turborepo has scripts configured for database tasks like `db:generate` and `db:migrate`.

### Deployment

*   **Frontend (`hsp/web`)**: Deployed on **Vercel**.
*   **Backend (`hsp/api`)**: Deployed on a **GCP Compute Engine VM** using Nginx and PM2. The deployment workflow is defined in `.github/workflows/hsp_api_deploy.yml`.
*   **Database**: A **MongoDB Atlas** cluster is used for the database.
