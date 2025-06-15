# About

This is a monorepo of stuff that I made to experiment more with development.

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
  - React 19
  - Next.js 15
  - Shadcn (Radix UI + TailwindCSS)
- Backend
  - Nest.js
  - Prisma
  - MongoDB
  - Socket.io
- Config
  - Turborepo - Monorepo management
  - PNPM
  - Prettier
  - Eslint v9
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
    - [ ] Migrate to shadcn, new tailwind & react-ii8next
    - [ ] Improve design
  - [ ] Color picker
    - [ ] Migrate to shadcn, new tailwind & react-ii8next
    - [ ] Improve design
- Configuration
  - [ ] Update react-ii8next configuration
