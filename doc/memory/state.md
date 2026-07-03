# Memoria Persistente: Estado Actual del Proyecto

Este archivo detalla el estado global del desarrollo del proyecto, el roadmap de tareas inmediatas, fallos detectados y próximos pasos a seguir.

## Estado Global

- **Rama activa**: `main` (sincronizada con `origin/main` en GitHub).
- **Estado del código**: Limpio, compilable. Migrado a **Next.js 15 (App Router)** con exportación estática (`output: 'export'`) y pipeline multiplataforma para desplegar en GitHub Pages.
- **Migración AI-First**: Completada (fases de la 1 a la 10 implementadas y verificadas).
- **Migración Next.js**: Completada y verificada mediante `npm run verify` (100% verde en lint, prettier, typecheck, unit tests y build de producción).

## Tareas de la Migración Next.js

- [x] Configuración inicial y dependencias de Next.js.
- [x] Estructuración del App Router (`app/layout.tsx`, `app/page.tsx`, `app/cv/page.tsx`, `app/contact/page.tsx`).
- [x] Configuración de soporte: `loading.tsx`, `error.tsx` y `not-found.tsx` (generador de `404.html` para SPA).
- [x] Optimización e hidratación client-side de componentes interactivos (Three.js, React Flow, React PDF).
- [x] Metadatos, SEO Nativo, `robots.ts` y `sitemap.ts` estáticos.
- [x] Script multiplataforma de renombrado de build `out/` a `dist/` para compatibilidad de despliegue.

## Bugs Abiertos e Incidencias

- Ninguno. La suite de pruebas de Vitest pasa con éxito y el linter no reporta errores.

## Próximos Pasos

1.  Ajustar el workflow de CI de GitHub Actions para que compile usando Next.js en lugar de Vite.
2.  Mejorar la cobertura de pruebas unitarias en componentes del Bento Grid.
3.  Desarrollar el prototipo del minijuego 2D mediante la arquitectura multiagente.
