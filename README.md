# About

My personal website + playground monorepo for all things Javacript+related

## Featured

- [My personal blog](https://hspln.com)
  - React 19.2, NextJS 16, TailwindCSS, shadcn
- [guesart](https://hspln.com/guesart)
  - A draw and guess game to gauge my techniques compared to my internship years ago and see what I can improve on more
  - FYI, the comparison:
    - Time taken: ~60h over the span of 1 month solo  vs ~4 working weeks in a team of 4
    - Frontend: Better overall & used more advanced techniques. Notably: finally make the canvas responsive, handle reconnection, adding word images to make it easier to imagine what to draw, used AI to generate skeleton code.
    - Backend: Small improvement, finally used a DB instead of memory (this caused crashes under heavy load back then). Learned & used GCP to keep it on 24/7, nginx, SSL.
- [Custom HTML player](https://hspln.com/player)

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
|   |-- hsp             - HSP(hammerspace), the main application
|       |-- api         - API application
|       |-- web         - Web application
|-- packages
|   |-- configs         - Shared configuration
|   |-- hsp
|       |-- ui          - Shared UI components for HSP
```

## Techs

- Frontend web
  - Techs: React 19.2, Next.js 16, Shadcn (Radix UI + TailwindCSS)
  - Modules:
    - [guesart](https://web.hspln.com): Draw and Guess game
      - Techs: socket.io-client, jotai state management
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
