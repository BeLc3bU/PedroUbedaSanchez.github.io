# Feature: 006-pipeline-verification

## Objective and problem

Migrado desde especificación SDD original en spec/features/006-pipeline-verification.

## Scope and constraints

- Proyecto: Pedro Úbeda Sánchez Portfolio (PedroUbedaSanchez.github.io)
- Runner de pruebas: npm run test (Vitest)
- Entorno: Next.js / React, Tailwind CSS

## Specs

# SPEC-006: Sincronización de Pipeline CI/CD y Verificación Local

## Problema

El script `scripts/loop-verify.js` contenía referencias a la compilación heredada de Vite (`Vite Compilación de Producción`) e invocaba comandos de formateo que en entornos Windows podían fallar si los binarios locales no estaban en el PATH global. Adicionalmente, el workflow de GitHub Actions `ci-tests.yml` requería sincronizarse con la arquitectura estática de Next.js 16.

## Objetivo

Unificar la ejecución de verificación local y continua para que tanto `node scripts/loop-verify.js` (o `npm run verify`) como las GitHub Actions ejecuten:

1. Verificación de Formato Prettier (`npx prettier --check .`)
2. Análisis Estático ESLint (`npm run lint` / `npx eslint .`)
3. Comprobación de Tipos TypeScript (`npm run typecheck` / `npx tsc --noEmit`)
4. Pruebas Unitarias Vitest (`npx vitest run`)
5. Compilación de Producción Next.js (`npm run build`)

## Requisitos Funcionales y No Funcionales

- **FR-006-1**: `scripts/loop-verify.js` debe invocar comandos de forma multiplataforma y robusta.
- **NFR-006-1**: Salida 0 (éxito) únicamente si los 5 pasos se completan satisfactoriamente; salida 1 ante cualquier fallo con detalle del error.

## Criterios de Aceptación

- **Given** un entorno de desarrollo limpio
- **When** se ejecuta `node scripts/loop-verify.js`
- **Then** se ejecutan secuencialmente los 5 pasos y se obtiene un mensaje final de éxito y código de salida 0.

## Tasks

# Lista de Tareas: SPEC-006 Sincronización de Pipeline CI/CD

- [x] TASK-001: Crear especificación y plan en `spec/features/006-pipeline-verification/`
- [x] TASK-002: Actualizar `scripts/loop-verify.js`
- [x] TASK-003: Actualizar `.github/workflows/ci-tests.yml`
- [x] TASK-004: Validar ejecución

## Log

- L1: Especificación histórica implementada.
- L2 (2026-11-04): Migración a estándar ODD (Gentle Shell). Documento en odd/tasks/006-pipeline-verification.md.
