# Feature: bugfix-20260706-linkedin-link

## Objective and problem

Migrado desde especificación SDD original en spec/features/bugfix-20260706-linkedin-link.

## Scope and constraints

- Proyecto: Pedro Úbeda Sánchez Portfolio (PedroUbedaSanchez.github.io)
- Runner de pruebas: npm run test (Vitest)
- Entorno: Next.js / React, Tailwind CSS

## Specs

# Spec: Bugfix LinkedIn Link

## Descripción del Bug

El enlace de LinkedIn en el portafolio personal es incorrecto o apunta a una dirección antigua/incorrecta (`pubesan` o `pedro-úbeda-sánchez`).

## Enlace Correcto

`https://www.linkedin.com/in/pedroubedasanchez`

## Comportamiento Esperado

Todos los enlaces, texto visible y metadatos (JSON-LD) que dirijan a la red social LinkedIn deben apuntar a la dirección correcta.

## Tasks

# Tasks: Bugfix LinkedIn Link

- [x] Buscar todas las instancias del enlace incorrecto de LinkedIn en el proyecto.
- [x] Reemplazar el enlace en `data/portfolio.tsx`.
- [x] Reemplazar el texto visible en `components/ContactForm.tsx`.
- [x] Reemplazar el enlace en `index.html`.
- [x] Ejecutar validaciones completas del proyecto (`npm run verify`).
- [x] Inicializar repositorio local Git, conectar origen remoto y hacer push a producción (`origin main`).

## Log

- L1: Especificación histórica implementada.
- L2 (2026-11-04): Migración a estándar ODD (Gentle Shell). Documento en odd/tasks/bugfix-20260706-linkedin-link.md.
