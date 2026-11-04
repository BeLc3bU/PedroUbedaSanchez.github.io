# Feature: 001-cleanup-modularization

## Objective and problem

Migrado desde especificación SDD original en spec/features/001-cleanup-modularization.

## Scope and constraints

- Proyecto: Pedro Úbeda Sánchez Portfolio (PedroUbedaSanchez.github.io)
- Runner de pruebas: npm run test (Vitest)
- Entorno: Next.js / React, Tailwind CSS

## Specs

# SPEC-001: Limpieza de Componentes Huérfanos y Unificación Modular

## Problema

Existen archivos y componentes huérfanos generados durante la migración a Next.js:

- `components/FeatureCards.tsx` (no usado)
- `components/SkillsMap.tsx` y `components/ClientSkillsMap.tsx` (no usados)
- `index.html` (remanente de Vite en la raíz)
- La sección de experiencia en `app/page.tsx` no reutiliza `components/TimelineItem.tsx`.

## Objetivo

1. Refactorizar `components/TimelineItem.tsx` e integrarlo en `app/page.tsx` para renderizar los elementos de experiencia profesional y militar.
2. Eliminar componentes huérfanos no utilizados (`FeatureCards.tsx`, `SkillsMap.tsx`, `ClientSkillsMap.tsx`, `index.html`).
3. Actualizar `components/TimelineItem.test.tsx` para validar el nuevo contrato de props.

## Criterios de Aceptación

- **Given** la página de inicio
- **When** se renderiza la sección "Work experience"
- **Then** cada hito se muestra utilizando el componente `TimelineItem`.
- **Given** la suite de pruebas
- **When** se ejecutan los tests
- **Then** `TimelineItem.test.tsx` pasa al 100% sin advertencias.

## Tasks

# Lista de Tareas: SPEC-001 Limpieza y Modularización

- [x] TASK-001: Crear especificación y plan en `spec/features/001-cleanup-modularization/`
- [x] TASK-002: Refactorizar `components/TimelineItem.tsx`
- [x] TASK-003: Integrar `TimelineItem` en `app/page.tsx`
- [x] TASK-004: Actualizar `components/TimelineItem.test.tsx`
- [x] TASK-005: Eliminar archivos huérfanos (`FeatureCards.tsx`, `SkillsMap.tsx`, `ClientSkillsMap.tsx`, `index.html`)
- [x] TASK-006: Validar tests y compilación

## Log

- L1: Especificación histórica implementada.
- L2 (2026-11-04): Migración a estándar ODD (Gentle Shell). Documento en odd/tasks/001-cleanup-modularization.md.
