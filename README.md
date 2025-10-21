# Currículum Interactivo - Pedro Úbeda Sánchez

Este repositorio contiene el código fuente del currículum interactivo de Pedro Úbeda Sánchez, desarrollado como una **Single-Page Application (SPA)** moderna, rápida y accesible.

**➡️ Sitio en vivo:** [pedroubedasanchez.es](https://pedroubedasanchez.es)

![Captura de pantalla del currículum interactivo de Pedro Úbeda Sánchez](https://raw.githubusercontent.com/pubesan/Curriculum-SPA/main/screenshot.png)

## ✨ Características Principales

- **Single-Page Application (SPA) Real:** Navegación instantánea sin recargas. Utiliza un router personalizado basado en la **History API** (`pushState`, `popstate`) para URLs limpias (ej. `/experiencia`). Es totalmente compatible con servicios de hosting estático como GitHub Pages gracias a un script de redirección inteligente en `404.html`.
- **Progressive Web App (PWA) Resiliente:** Instalable en escritorio y móvil. Utiliza un Service Worker con estrategias de caché avanzadas:
  - **Network First (con fallback a caché)** para la navegación principal, asegurando que el usuario siempre vea la versión más reciente si está online.
  - **Stale-While-Revalidate** para todos los assets (HTML, CSS, JS, imágenes), garantizando cargas instantáneas y actualizaciones en segundo plano.
- **Diseño Responsivo:** Totalmente adaptable a dispositivos móviles, tabletas y ordenadores de escritorio, utilizando Tailwind CSS.
- **Modo Oscuro:** Paleta de colores dual que respeta la configuración del sistema (`prefers-color-scheme`) y permite al usuario cambiar de tema manualmente, guardando su preferencia.
- **Formulario de Contacto Robusto y Seguro:** Envío de datos mediante **AJAX (Fetch API)** sin recargar la página. Incluye:
  - Protección anti-spam con la técnica "Honeypot".
  - Validación de campos en tiempo real con feedback claro.
  - Estados de carga (spinner), éxito y error para una experiencia de usuario impecable.
- **SEO Optimizado para SPA:**
  - Actualización dinámica de metaetiquetas (título, descripción, canónicas, Open Graph, Twitter Cards) para cada sección.
  - Datos estructurados (Schema.org) para mejorar la visibilidad en buscadores.
  - Sitemap y `robots.txt` para una correcta indexación.
- **CV Imprimible sin Interrupciones:** Permite al usuario imprimir una versión optimizada del CV (`curriculum.html`) directamente desde la SPA a través de un `iframe` oculto, sin abandonar la página principal.
- **Accesibilidad (a11y):**
  - Roles y atributos ARIA para una correcta interpretación por lectores de pantalla.
  - Gestión del foco inteligente en la navegación, menús y modales para no desorientar al usuario (incluyendo trampas de foco en el menú móvil).
  - Contraste de color adecuado, estilos de foco visibles y respeto por la preferencia de "movimiento reducido" del usuario.
- **Experiencia de Usuario (UX) Superior:**
  - **Transiciones de Página Nativas:** Utiliza la **View Transitions API** para crear animaciones de deslizamiento direccional (`slide-forward`, `slide-backward`) que dan contexto a la navegación.
  - **Interfaces de Carga "Esqueleto" (Skeleton Screens):** Muestra esqueletos de carga específicos para cada tipo de página, mejorando drásticamente la percepción de velocidad.
  - Animaciones de entrada sutiles al hacer scroll y ofuscación de datos de contacto para mayor privacidad.
- **Rendimiento Optimizado:**
  - Carga optimizada de imágenes y precarga de assets críticos (LCP, fuentes).
  - Minificación de CSS y JavaScript en el proceso de build.
- **Pruebas Automatizadas:** Suite de pruebas de integración (End-to-End) con **Cypress** para verificar la navegación, la carga de contenido y la validación de formularios.

## 📂 Estructura del Proyecto

```
curriculum-spa/
├── cypress/                # Pruebas de integración End-to-End
├── dist/                   # Carpeta de producción (generada por 'npm run build')
├── assets/
│   ├── css/                # Archivos fuente de CSS (input.css)
│   ├── fonts/              # Fuentes locales (woff2)
│   └── js/                 # Archivos fuente de JavaScript (main.js)
├── .gitignore
├── 404.html                # Página 404 para el truco de redirección en SPAs
├── CNAME                   # Para el dominio personalizado en GitHub Pages
├── index.html              # El "cascarón" principal de la SPA
├── curriculum.html         # Versión imprimible del CV
├── (otras páginas).html    # Fragmentos de contenido para cada sección
├── package.json            # Dependencias y scripts del proyecto
├── postcss.config.js       # Configuración de PostCSS (Tailwind, cssnano)
├── README.md               # Esta documentación
└── sw.js                   # El Service Worker
```

## 🚀 Cómo Empezar

Sigue estos pasos para configurar el proyecto en tu entorno local.

### Prerrequisitos

- Node.js (versión 18 o superior)
- npm (generalmente se instala con Node.js)

### Instalación

1.  **Clona el repositorio:**
    ```bash
    git clone https://github.com/tu-usuario/tu-repositorio.git
    cd tu-repositorio
    ```

2.  **Instala las dependencias:**
    ```bash
    npm install
    ```

## 🛠️ Scripts Disponibles

Puedes ejecutar los siguientes comandos desde la raíz del proyecto.

- **`npm run dev`**
  Inicia un servidor de desarrollo local con BrowserSync, vigila los cambios en los archivos y recarga el navegador automáticamente. **Este es el comando que usarás la mayor parte del tiempo.**

- **`npm run build`**
  Genera la versión de producción del sitio en la carpeta `dist/`. Incluye la minificación de CSS y JavaScript y la copia de todos los assets necesarios.

- **`npm run serve`**
  Inicia un servidor local para previsualizar el contenido de la carpeta `dist/` tal y como se vería en producción.

- **`npm run cypress:open`**
  Abre el Test Runner interactivo de Cypress para ejecutar y depurar las pruebas de integración.

- **`npm run cypress:run`**
  Ejecuta todas las pruebas de Cypress en modo "headless" (sin interfaz gráfica), ideal para entornos de integración continua.


## ☁️ Despliegue

El proyecto está configurado para ser desplegado en **GitHub Pages** con un dominio personalizado.

1.  **Construye el proyecto:**
    ```bash
    npm run build
    ```

2.  **Sube los cambios a GitHub:**
    Asegúrate de que todos tus archivos, incluida la carpeta `dist/` actualizada, estén subidos a tu repositorio.

3.  **Configura GitHub Pages:**
    - En tu repositorio, ve a `Settings` > `Pages`.
    - En "Build and deployment", selecciona `Deploy from a branch`.
    - Elige tu rama (`main` o `master`) y la carpeta `/dist` como fuente.
    - En la sección "Custom domain", introduce tu dominio (ej. `pedroubedasanchez.es`) y guarda.

4.  **Configura tu DNS:**
    Apunta los registros `A` y `CNAME` de tu dominio a los servidores de GitHub Pages como se indica en su documentación oficial.

## 💻 Tecnologías Utilizadas

- **HTML5 / CSS3 / JavaScript (ES6+)**
- **Tailwind CSS:** Framework de CSS "utility-first".
- **PostCSS:** Herramienta para transformar CSS con plugins como `cssnano` (para minificar).
- **Terser:** Minificador de JavaScript.
- **Cypress:** Framework para pruebas End-to-End.
- **BrowserSync:** Servidor de desarrollo con recarga en vivo.
- **npm-run-all & onchange:** Utilidades para orquestar los scripts de build y watch.
- **Service Worker API:** Para capacidades offline y estrategias de caché avanzadas.
- **View Transitions API:** Para animaciones de página nativas.

## 🗺️ Roadmap y Futuras Mejoras
 
Esta es una lista de características y mejoras planificadas, organizadas en sprints para un desarrollo iterativo.

### Sprint 1: Mejoras de Experiencia de Usuario Inmediata

*   **Objetivo:** Mejorar la estética y el feedback visual.
*   **Issues:**
    - **[x] 🌙 Modo Oscuro (Dark Mode):** Implementada una paleta de colores para modo oscuro que mantiene la legibilidad, utilizando las utilidades `dark:` de Tailwind CSS. Se ha añadido un interruptor en la UI para que el usuario pueda alternar entre modos, guardando su preferencia y respetando la configuración del sistema (`prefers-color-scheme`).
    - **[x] ✨ Micro-interacciones y Mejoras de UX:** Añadidas animaciones de entrada en scroll, transiciones de página fluidas y estados de foco mejorados.

### Sprint 2: Expansión de Contenido y Calidad

*   **Objetivo:** Ampliar el alcance de la audiencia y fortalecer la calidad del código con pruebas de accesibilidad.
*   **Issues:**
    - **[ ] 🌐 Internacionalización (i18n):** Abstraer todo el contenido de texto a archivos de idioma (ej. `es.json`, `en.json`). Añadir un selector de idioma en la navegación y ajustar las metaetiquetas SEO y el atributo `lang` dinámicamente.
    - **[ ] 🧪 Expansión de Pruebas (Accesibilidad):** Integrar `cypress-axe` para ejecutar auditorías de accesibilidad automatizadas en cada página durante las pruebas E2E, asegurando el cumplimiento de los estándares WCAG.

### Sprint 3: Robustez, Operaciones y Calidad Visual

*   **Objetivo:** Implementar herramientas para asegurar la calidad y el rendimiento a largo plazo del proyecto.
*   **Issues:**
    - **[ ] 🚀 Monitorización del Rendimiento en Producción:** Integrar un sistema de monitorización de Core Web Vitals para rastrear el rendimiento real. Configurar Lighthouse CI en un flujo de GitHub Actions para prevenir regresiones de rendimiento, accesibilidad y SEO en cada `push`.
    - **[ ] 🧪 Expansión de Pruebas (Avanzado):** Añadir pruebas de regresión visual para detectar cambios inesperados en la UI entre commits. Crear pruebas para flujos de usuario más complejos, como la funcionalidad de impresión del CV y la interacción completa con el menú móvil.

---

*Desarrollado con dedicación por Pedro Úbeda Sánchez.*