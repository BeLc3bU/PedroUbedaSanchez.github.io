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
- **Formulario de Contacto Robusto y Seguro:** Envío de datos mediante **AJAX (Fetch API)** sin recargar la página. Incluye:
  - Protección anti-spam con **Google reCAPTCHA v3**.
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
  - Contraste de color adecuado y navegación por teclado garantizada.
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

Esta es una lista de características y mejoras planificadas para futuras versiones del proyecto, enfocadas en enriquecer la experiencia de usuario y la robustez técnica.

- **[ ] 🌙 Modo Oscuro (Dark Mode):**
  - Implementar una paleta de colores para modo oscuro que mantenga la legibilidad y la estética del sitio, utilizando las utilidades `dark:` de Tailwind CSS.
  - Añadir un interruptor en la UI para que el usuario pueda alternar entre el modo claro y oscuro, guardando su preferencia.
  - Respetar la preferencia del sistema operativo del usuario (`prefers-color-scheme`) como estado inicial.

- **[ ] 🌐 Internacionalización (i18n):**
  - Abstraer todo el contenido de texto (títulos, párrafos, etc.) a archivos de idioma (ej. `es.json`, `en.json`).
  - Añadir un selector de idioma en la navegación para permitir a los visitantes cambiar entre español e inglés.
  - Ajustar las metaetiquetas SEO y atributos `lang` dinámicamente según el idioma seleccionado.

- **[ ] 🧪 Expansión de la Cobertura de Pruebas:**
  - Integrar `cypress-axe` para ejecutar auditorías de accesibilidad automatizadas en cada página durante las pruebas E2E.
  - Añadir pruebas de regresión visual para detectar cambios inesperados en la UI entre commits.
  - Crear pruebas para flujos de usuario más complejos, como la funcionalidad de impresión del CV y la interacción completa con el menú móvil.

- **[ ] ✨ Micro-interacciones y Mejoras de UX:**
  - Añadir animaciones sutiles a elementos interactivos (botones, enlaces) al pasar el ratón o enfocarlos para mejorar el feedback.
  - Animar la carga del gráfico de habilidades para una presentación más dinámica y atractiva.

- **[ ] 🚀 Monitorización del Rendimiento en Producción:**
  - Integrar un sistema de monitorización de Core Web Vitals para rastrear el rendimiento real que experimentan los usuarios.
  - Configurar Lighthouse CI en un flujo de GitHub Actions para prevenir regresiones de rendimiento, accesibilidad y SEO en cada `push`.

---

*Desarrollado con dedicación por Pedro Úbeda Sánchez.*