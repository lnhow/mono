# About

This is a monorepo of stuff that I made to experiment more with development.

## To start local development

1. Check the `.env.example` file in `apps/hsp/api` and provide an `.env` based on it 
   1. `cp ./apps/hsp/api/.env.example ./apps/hsp/api/.env`
   2. `code ./apps/hsp/api/.env` (Replace `code` with the editor of your choice)
2. Install dependencies: `pnpm install` (Provided you have installed [pnpm](https://pnpm.io/installation))
3. Run `pnpm dev:hsp`

## Structure

```
|-- .config
|   |-- gcp             - GCP configuration
|       |-- README.md   - Deployment documentation
|-- apps
|   |-- hsp             - HSP(hammerspace), a collection of web-related experiment
|       |-- api         - API application
|       |-- web         - Web application
|-- packages
|   |-- configs         - Shared configuration
|   |-- hsp
|       |-- ui          - Shared UI components for HSP
```

## Techs

- Frontend web
  - Techs: React 19, Next.js 15, Shadcn (Radix UI + TailwindCSS)
  - Modules:
    - [guesart](https://web.hspln.com): Draw and Guess game
      - Techs: jotai, socket.io-client
    - [Custom HTML player](https://web.hspln.com/player)
      - Techs: `Picture-in-picture API`, `Fullscreen API`, `useSyncExternalStore`, Pure React & TailwindCSS
- Backend
  - Techs: Nest.js, Socket.io, Prisma, MongoDB
- Config: PNPM, Turborepo - Monorepo management, Prettier, Eslint v9
- Deployment
  - Frontend web: Vercel
  - Backend: 
    - GCP Compute Engine VM on free tier.
      - The reason is to learn more about GCP and keep it running 24/7 while keeping the costs low
    - Nginx
    - PM2
    - SSL: Let's Encrypt
  - MongoDB: MongoDB Atlas

## Todos

- Demo
  - [ ] Redesign homepage
  - [ ] Add a PWA manifest
  - [ ] Extension to open a webpage side-by-side with the current tab 
    - [ ] Planning
  - [ ] View transitions experiment
    - [ ] Planning
  - [ ] ThreeJS
    - [ ] Planning
  - [ ] JS Playground
    - [ ] Planning
  - [ ] Contrast checker
    - [ ] Migrate to shadcn, remove old libraries
    - [ ] Improve design
  - [ ] Color picker
    - [ ] Migrate to shadcn, remove old libraries
    - [ ] Improve design
- Configuration
  - [ ] Update react-ii8next configuration
