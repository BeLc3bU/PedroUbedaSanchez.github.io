# Feature: 002-internationalization

## Objective and problem

Migrado desde especificación SDD original en spec/features/002-internationalization.

## Scope and constraints

- Proyecto: Pedro Úbeda Sánchez Portfolio (PedroUbedaSanchez.github.io)
- Runner de pruebas: npm run test (Vitest)
- Entorno: Next.js / React, Tailwind CSS

## Specs

# SPEC-002: Sistema de Internacionalización Dinámico (i18n ES / EN)

## Problema

El portafolio actual mezcla títulos y botones en inglés con biografías, puestos militares y descripciones en español. Reclutadores y visitantes internacionales no disponen de una versión completa en inglés, y usuarios hispanohablantes experimentan una interfaz incoherente.

## Objetivo

Proveer un sistema de internacionalización integral en tiempo real que permita alternar fluidamente entre Español (ES) e Inglés (EN) en toda la aplicación (Hero, Secciones, Terminal, Formulario y CV en PDF), con persistencia de preferencia en `localStorage`.

## Requisitos Funcionales y No Funcionales

- **FR-002-1**: La aplicación debe disponer de un selector visual accesible en el Header (`ES | EN`) para conmutar el idioma activo.
- **FR-002-2**: La preferencia debe persistirse en `localStorage` bajo la clave `portfolio_lang` y cargarse en visitas posteriores.
- **FR-002-3**: El contenido del Hero, Proyectos, Experiencia, Habilidades, Hobbies, Educación y Contacto debe traducirse dinámicamente según el idioma activo.
- **FR-002-4**: El generador de PDF `/cv` debe maquetar el documento en el idioma seleccionado.
- **NFR-002-1**: Cero parpadeo (_flicker_) visual en la carga y tiempo de conmutación inferior a 50ms sin recarga de página.

## Criterios de Aceptación

- **Given** la página de inicio en Español
- **When** el usuario pulsa "EN" en el Header
- **Then** todos los títulos, tags, descripciones y placeholders cambian al Inglés inmediatamente.
- **Given** una sesión previa configurada en "EN"
- **When** el usuario regresa a la web en otra pestaña
- **Then** la aplicación se renderiza directamente en Inglés.

## Tasks

# Lista de Tareas: SPEC-002 Sistema de Internacionalización

- [x] TASK-001: Crear especificación y plan en `spec/features/002-internationalization/`
- [x] TASK-002: Crear diccionarios de traducción en `data/locales/` (`es.ts`, `en.ts`, `index.ts`)
- [x] TASK-003: Crear `context/LanguageProvider.tsx`, `hooks/useLanguage.ts` y test `hooks/useLanguage.test.tsx`
- [x] TASK-004: Integrar `LanguageProvider` en `app/layout.tsx`
- [x] TASK-005: Añadir selector de idioma en `components/layout/Header.tsx`
- [x] TASK-006: Adaptar `app/page.tsx`, `components/HomeContent.tsx`, `components/HeroInteractive.tsx`, `components/ContactForm.tsx`, `components/CVDocument.tsx` y `app/cv/page.tsx`
- [x] TASK-007: Ejecutar ciclo de verificación autónoma (`npm run verify` - 37/37 tests en verde y build OK)

## Log

- L1: Especificación histórica implementada.
- L2 (2026-11-04): Migración a estándar ODD (Gentle Shell). Documento en odd/tasks/002-internationalization.md.
