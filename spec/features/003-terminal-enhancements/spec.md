# SPEC-003: Suite Extendida de Comandos para la Terminal Interactiva

## Problema

La consola interactiva actual es solo un visor estático de información; no permite alterar el estado global de la aplicación (tema visual, idioma), carece de soporte táctil ágil en dispositivos móviles y no está sincronizada con el sistema de internacionalización.

## Objetivo

Transformar la terminal en una consola reactiva de control del sistema que permita modificar tema, idioma y navegación mediante comandos CLI y chips rápidos táctiles, manteniendo una experiencia fiel a entornos Unix/Linux.

## Requisitos Funcionales y No Funcionales

- **FR-003-1**: El comando `theme [light|dark|toggle]` debe cambiar el tema global de la web inmediatamente y reflejar el resultado en la consola.
- **FR-003-2**: El comando `lang [es|en|toggle]` debe conmutar el idioma de la aplicación en tiempo real.
- **FR-003-3**: Los comandos `cv` y `resume` deben navegar a la vista de currículum `/cv`.
- **FR-003-4**: El comando `history` debe listar todos los comandos ejecutados durante la sesión.
- **FR-003-5**: Los comandos `echo <msg>`, `date`, `sudo <cmd>` y `clear` deben funcionar con la semántica habitual de una terminal Unix.
- **FR-003-6**: La terminal debe ofrecer una barra de _quick chips_ interactivos accesibles tanto en móviles como en escritorio.
- **NFR-003-1**: Tiempo de respuesta de ejecución inferior a 16ms sin bloqueos de renderizado.

## Criterios de Aceptación

- **Given** la terminal abierta en modo oscuro
- **When** el usuario escribe `theme light` y presiona Enter
- **Then** el tema cambia a claro y la terminal imprime `[Theme] Switched to light mode.`
- **Given** la terminal en cualquier dispositivo
- **When** el usuario pulsa el chip "lang"
- **Then** el idioma conmuta entre ES y EN de inmediato.
