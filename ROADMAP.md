# 🗺️ Roadmap de Mejoras y Evolución SDD - Pedro Úbeda

Este documento detalla la planificación oficial y el estado de evolución del portafolio interactivo, estructurado bajo la metodología **Spec-Driven Development (SDD)**.

---

## 🏗️ Fases de Evolución SDD

```
┌─────────────────────────────────────────────────────────────┐
│ Fase 0: Baseline & Estabilidad CI/CD (P0)                  │
│ [x] SPEC-006 Sincronización Pipeline & Loop Verify          │
├─────────────────────────────────────────────────────────────┤
│ Fase 1: Calidad Core & Seguridad (P0/P1)                    │
│ [x] SPEC-005 Blindaje Anti-Spam (Honeypot) Formulario       │
│ [x] SPEC-001 Limpieza de Huérfanos & Modularización         │
├─────────────────────────────────────────────────────────────┤
│ Fase 2: UX & Alcance Profesional (P1/P2)                    │
│ [x] SPEC-002 Sistema de Internacionalización (i18n ES/EN)   │
│ [x] SPEC-003 Terminal Extendida & Comandos Reactivos        │
├─────────────────────────────────────────────────────────────┤
│ Fase 3: Innovación & Gamificación (P2/P3)                   │
│ [x] SPEC-004 Minijuego RPG 2D Embebido en Canvas            │
└─────────────────────────────────────────────────────────────┘
```

---

## 📌 Especificaciones Planificadas (Backlog SDD)

### [SPEC-006] Sincronización de Pipeline CI/CD y Verificación Local

- **Prioridad:** P0 (Crítica)
- **Estado:** ✅ Completado
- **Objetivo:** Garantizar que `npm run verify` y GitHub Actions ejecuten las validaciones estáticas, pruebas unitarias y compilación de Next.js de forma 100% robusta y multiplataforma.

### [SPEC-005] Blindaje Anti-Spam en Formulario de Contacto (Honeypot + Sanitización)

- **Prioridad:** P0 (Crítica)
- **Estado:** ✅ Completado
- **Objetivo:** Añadir campo señuelo oculto (`website_hp`) y validaciones de tiempo para mitigar el spam de bots sin requerir captchas invasivos.

### [SPEC-001] Limpieza de Componentes Huérfanos y Unificación Modular

- **Prioridad:** P1 (Alta)
- **Estado:** ✅ Completado
- **Objetivo:** Eliminar código muerto (`FeatureCards.tsx`, `SkillsMap.tsx`, `index.html`), desacoplar dependencias no utilizadas (`reactflow`) e integrar `TimelineItem.tsx` en la sección de experiencia.

### [SPEC-002] Sistema de Internacionalización Dinámico (i18n ES / EN)

- **Prioridad:** P1 (Alta)
- **Estado:** ✅ Completado
- **Objetivo:** Proveer conmutación de idioma en tiempo real entre Español e Inglés para todos los módulos de la web y el CV en PDF.

### [SPEC-003] Suite Extendida de Comandos para la Terminal Interactiva

- **Prioridad:** P2 (Media)
- **Estado:** ✅ Completado
- **Objetivo:** Añadir comandos reactivos (`theme`, `cv`, `lang`, `history`, `clear`) y mejorar la ergonomía táctil en móviles.

### [SPEC-004] Minijuego RPG 2D Embebido (Experiencia de Hangar & Agentes)

- **Prioridad:** P2 (Media)
- **Estado:** ✅ Completado
- **Objetivo:** Desarrollar una experiencia interactiva en Canvas pixel-art donde el visitante interactúa con el perfil y los agentes virtuales.

---

## ✅ Funcionalidades Completadas (Baseline)

### 1. Migración a Next.js 16 (App Router)

- **Estado:** ✅ Completado
- **Descripción:** Exportación estática `output: 'export'` con generación de sitemap, robots y 404 para GitHub Pages.

### 2. Sistema de CV Dinámico en PDF

- **Estado:** ✅ Completado
- **Descripción:** Generación de PDF con `@react-pdf/renderer` en cliente (`/cv`).

### 3. Sistema de Agentes IA Frontend

- **Estado:** ✅ Completado
- **Descripción:** Framework modular de agentes en `agents/` con orquestación en la Terminal.

### 4. SEO & Accesibilidad

- **Estado:** ✅ Completado
- **Descripción:** Metadatos Open Graph, Twitter Cards, `skip-to-content` y soporte `prefers-reduced-motion`.
