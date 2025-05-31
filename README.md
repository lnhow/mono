# About

This is a monorepo of stuff that I made to experiment more with development.

## Structure

```
|-- apps
|   |-- hsp         - HSP(hammerspace), a collection of web-related experiment
|       |-- api     - API application
|       |-- web     - Web application
|-- packages
|   |-- configs     - Shared configuration
|   |-- hsp
|       |-- ui      - Shared UI components for HSP
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

## Todos

- Demo
  - [ ] Contrast checker
    - [ ] Migrate to shadcn, new tailwind & react-ii8next
    - [ ] Improve design
  - [ ] Color picker
    - [ ] Migrate to shadcn, new tailwind & react-ii8next
    - [ ] Improve design
  - [ ] Redesign homepage
  - [ ] Add a PWA manifest
  - [ ] Video player
    - [ ] Planning
  - [ ] Extension to open a webpage side-by-side with the current tab 
    - [ ] Planning
  - [ ] JS Playground
    - [ ] Planning
  - [ ] View transitions experiment
    - [ ] Planning
  - [ ] ThreeJS
    - [ ] Planning
- Configuration
  - [ ] Update react-ii8next configuration
