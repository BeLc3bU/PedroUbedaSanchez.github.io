# AGENTS.md - Directrices de Desarrollo AI-First

Este archivo contiene el marco operativo de desarrollo AI-First y las directrices estrictas para los agentes de Inteligencia Artificial que mantengan y extiendan este repositorio.

---

## 1. Descripción del Proyecto

Este proyecto es un portafolio web personal interactivo, dinámico y premium que actúa como Currículum Vitae. Está diseñado bajo una estética minimalista con toques tecnológicos avanzados, incluyendo visualizaciones interactivas (Three.js), diagramación de flujos de conocimiento (ReactFlow), generación dinámica de documentos (React-PDF) y una interfaz de consola/terminal interactiva.

---

## 2. Stack Tecnológico

- **Lenguaje**: TypeScript v5.9 (modo estricto)
- **Framework**: React v19.2 (Componentes Funcionales)
- **Runtime & Herramienta de Construcción**: Node.js + Vite v7.3
- **Estilos**: Tailwind CSS v3.4 (con PostCSS y Autoprefixer)
- **Interactividad y Animaciones**: Framer Motion v12.4
- **Librerías de Visualización**: Three.js (`three` y `@react-three/fiber` / `@react-three/drei`), ReactFlow v11
- **Manejo de Formularios y Validación**: react-hook-form v7.76 + Zod v4
- **Notificaciones**: Sonner v2.0
- **SEO**: React Helmet v6.1
- **Testing**: Vitest v3.2 + React Testing Library v16 + jsdom v26
- **Lint & Formateo**: ESLint v9.39 + Prettier v3.8
- **Git Hooks**: Husky v9.1 + lint-staged v16

---

## 3. Comandos Reales del Proyecto

| Comando                | Descripción                                                                                                                    |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `npm run dev`          | Inicia el servidor de desarrollo local de Vite en `http://localhost:5173`.                                                     |
| `npm run build`        | Compila TypeScript (`tsc -b`), genera la build de producción en `dist`, autogenera el sitemap y copia el 404 para despliegues. |
| `npm run lint`         | Ejecuta el análisis estático de ESLint.                                                                                        |
| `npm run format`       | Aplica el formateo automático de Prettier en todo el proyecto.                                                                 |
| `npm run format:check` | Comprueba si existen desviaciones de formato respecto a Prettier.                                                              |
| `npx vitest`           | Inicia el ejecutor de pruebas en modo interactivo (watch).                                                                     |
| `npx vitest run`       | Corre todas las pruebas unitarias y de componentes una única vez.                                                              |
| `npx vitest <path>`    | Ejecuta un archivo de prueba específico.                                                                                       |
| `npm run preview`      | Previsualiza localmente la build de producción generada en `dist`.                                                             |

---

## 4. Arquitectura y Estructura del Código

La estructura de carpetas sigue un patrón estructurado modular en React:

- [src/main.tsx](file:///c:/Users/pubes/Desktop/Proyectos/Curriculum%20typescrpit/src/main.tsx): Punto de inicio de la aplicación.
- [src/App.tsx](file:///c:/Users/pubes/Desktop/Proyectos/Curriculum%20typescrpit/src/App.tsx): Componente principal, configurador de rutas con React Router DOM.
- [src/index.css](file:///c:/Users/pubes/Desktop/Proyectos/Curriculum%20typescrpit/src/index.css): Definición de tokens de diseño, variables HSL, temas y estilos globales.
- [src/components/](file:///c:/Users/pubes/Desktop/Proyectos/Curriculum%20typescrpit/src/components/): Componentes interactivos de interfaz (Hero, Terminal, CVDocument).
    - `bento/`: Estructuras y tarjetas del Bento Grid.
    - `ui/`: Botones, inputs y componentes atómicos basados en Radix y Tailwind CSS.
- [src/pages/](file:///c:/Users/pubes/Desktop/Proyectos/Curriculum%20typescrpit/src/pages/): Vistas asociadas a las rutas (Home, CVPage, Contact, Projects, etc.).
- [src/hooks/](file:///c:/Users/pubes/Desktop/Proyectos/Curriculum%20typescrpit/src/hooks/): Custom hooks reutilizables (useTheme, usePrint, useReducedMotion).
- [src/data/](file:///c:/Users/pubes/Desktop/Proyectos/Curriculum%20typescrpit/src/data/): Archivos JSON/TypeScript que estructuran el contenido dinámico del currículum.
- [src/lib/](file:///c:/Users/pubes/Desktop/Proyectos/Curriculum%20typescrpit/src/lib/): Proveedores o configuraciones de dependencias externas.
- [src/utils/](file:///c:/Users/pubes/Desktop/Proyectos/Curriculum%20typescrpit/src/utils/): Funciones de utilidad auxiliares.

---

## 5. Convenciones de Código

### Naming (Nomenclatura)

- **Componentes de React**: PascalCase (ej. `ProjectCard.tsx`, `TimelineItem.tsx`).
- **Hooks**: camelCase con prefijo `use` (ej. `useTheme.ts`).
- **Utilidades y Variables**: camelCase (ej. `cn.ts`, `isDark`).
- **Tipos e Interfaces**: PascalCase (ej. `ProjectProps`, `SkillType`).
- **Archivos de Tests**: `<Nombre_Fichero>.test.tsx` o `<Nombre_Fichero>.test.ts` situados inmediatamente al lado de su archivo origen.

### Organización y Estructuración

- Cada componente funcional debe ser exportado por defecto (`export default`).
- Tipar explícitamente todas las Props mediante interfaces.
- Separar las preocupaciones: delegar la lógica compleja a custom hooks y mantener la UI declarativa.

### Manejo de Errores y Logging

- Utilizar bloques `try/catch` para peticiones asíncronas y operaciones propensas a fallos (ej. persistencia local, carga de PDFs).
- Utilizar abstracciones de logger o consola limpia. Evitar `console.log` en producción.
- Mostrar alertas elegantes al usuario usando `sonner` en lugar de `alert()` del navegador.

### Testing

- Todo componente interactivo o de lógica crítica (hooks, utilidades) debe contar con pruebas unitarias (`vitest` + `@testing-library/react`).
- Garantizar la independencia de los tests limpiando los mocks y estados locales en `beforeEach`.

### Documentación

- Mantener comentarios concisos explicando el "porqué" de lógicas complejas, no el "cómo".
- Las decisiones arquitectónicas críticas deben documentarse en el registro de decisiones (`doc/memory/decisions.md`).

### Seguridad

- No harcodear claves de API ni credenciales sensibles. Usar variables de entorno (`.env`).
- Sanitizar entradas de usuario y validar esquemas de datos con `Zod`.

### Estilos (Tailwind CSS)

- Enfoque móvil-first utilizando breakpoints de Tailwind (`md:`, `lg:`).
- Utilizar variables de tema de color semántico definidas en CSS para soportar dark mode (`dark:`).
- Usar la utilidad `cn(...)` para combinar y condicionar clases de Tailwind de forma limpia.

---

## 6. Restricciones del Agente

- **Prohibición de cambios masivos sin plan**: El agente NUNCA debe modificar código sustancial sin un plan de implementación aprobado previamente.
- **No inventar librerías**: No instales nuevas dependencias en `package.json` a menos que sea explícitamente aprobado.
- **No degradar la arquitectura**: Respetar el flujo de datos unidireccional y la separación de componentes/páginas/hooks.
- **No dejar código muerto u huérfano**: Si se refactoriza o elimina una funcionalidad, deben borrarse sus archivos de test, datos y referencias correspondientes.
- **No modificar estilos globales**: Evitar realizar cambios ad-hoc sobre `index.css` que puedan romper el diseño unificado de la aplicación.

---

## 7. Flujo de Trabajo (AI-First Workflow)

Los agentes operarán estrictamente bajo el siguiente flujo:

1.  **Plan Mode**: Ante cualquier tarea compleja, detenerse y crear o actualizar un plan de implementación en `implementation_plan.md` y esperar aprobación del usuario.
2.  **Spec-Driven Development**: Antes de implementar una feature, se redactará su especificación detallada en `spec/features/` bajo un flujo de ciclo de vida (Specify -> Plan -> Tasks -> Implement -> Verify).
3.  **Límite de Confianza**: Si la confianza del agente sobre una tarea es inferior al **80%**, debe detenerse e interactuar con el usuario para resolver dudas.
4.  **Resumen de Cambios**: Al finalizar cada turno, se debe proveer un resumen exhaustivo de cambios e indicar los archivos modificados.

---

## 8. Verificación y Criterios de Aceptación (QA)

Ninguna tarea se dará por finalizada a menos que se cumplan las siguientes validaciones locales de forma exitosa:

- `npm run lint` pasa sin advertencias ni errores.
- `npm run build` compila la aplicación para producción sin fallos.
- `npx vitest run` pasa el 100% de la suite de pruebas del proyecto.
- La documentación y especificaciones se encuentran sincronizadas.
