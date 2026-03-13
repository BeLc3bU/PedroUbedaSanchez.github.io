---
name: vite-build
description: Build, test and run the Vite development server
license: MIT
compatibility: opencode
metadata:
  audience: developers
  workflow: development
---
## What I do
- Run Vite dev server with npm run dev
- Build for production with npm run build
- Run tests with Vitest
- Lint code with npm run lint
- Preview production build with npm run preview

## When to use me
Use this when you need to:
- Start development server
- Build for production
- Run test suite
- Check for linting errors
- Preview built application

## Available npm scripts
- `npm run dev` - Start Vite dev server
- `npm run build` - Build for production (TypeScript + Vite + copy-404)
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build
- `npm run test` - Run Vitest tests (if configured)

## Project structure
- Source code in src/
- Built output in dist/
- Public assets in public/
- Vite config in vite.config.ts
- Tailwind config in tailwind.config.js
