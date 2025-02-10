# Migrating yarn to pnpm
0. Install `pnpm`
   1. Install `node 22`
1. Delete all `node_modules`: `npx npkill`
2. Create `pnpm-workspace.yaml`
3. Change `package.json`: 
   1. Add script: `"preinstall": "npx only-allow pnpm"`
   2. Change field `package-manager` to which ever pnpm version used:
      - `"packageManager": "pnpm@10.2.1"`
4. Run `pnpm import` to create `pnpm-lock.yaml`
5. Delete `yarn.lock`
6. Re-install depenedencies `pnpm i`
7. 