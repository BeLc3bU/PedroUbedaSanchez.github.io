# Plan Técnico: SPEC-003 Terminal Extendida

## Arquitectura y Componentes Afectados

1. `components/Terminal.tsx`:
    - Integración con `useTheme`, `useLanguage`, `useRouter`.
    - Parser de argumentos con split por espacios (`const [cmd, ...args] = input.trim().split(/\s+/)`).
    - Implementación de handlers para: `help`, `about`, `projects`, `skills`, `experience`, `education`, `hobbies`, `contact`, `agents`, `theme`, `lang`, `cv`, `history`, `echo`, `date`, `sudo`, `banner`, `clear`.
    - Barra de chips interactivos renderizada en el footer de la terminal.
2. `components/Terminal.test.tsx`:
    - Cobertura de comandos de sistema (`help`, `theme`, `lang`, `clear`, `echo`, comandos no encontrados).
    - Simulación de clicks en chips interactivos.
