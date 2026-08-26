# Plan Técnico: SPEC-002 Sistema de Internacionalización

## Arquitectura y Componentes Afectados

1. `data/locales/`:
    - `es.ts`: Diccionario de traducciones en Español.
    - `en.ts`: Diccionario de traducciones en Inglés.
    - `index.ts`: Tipos y exportación de diccionarios.
2. `hooks/useLanguage.tsx`:
    - Contexto React, Provider y custom hook `useLanguage` con soporte SSR seguro.
3. `hooks/useLanguage.test.tsx`:
    - Pruebas unitarias para conmutación de idioma y lectura de `localStorage`.
4. `app/layout.tsx`:
    - Inclusión del `LanguageProvider`.
5. `components/layout/Header.tsx`:
    - Botón selector `ES | EN` en la barra superior y en el menú móvil.
6. `app/page.tsx`, `components/HeroInteractive.tsx`, `components/ContactForm.tsx`, `components/CVDocument.tsx`:
    - Conexión con los diccionarios de traducción.
