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
