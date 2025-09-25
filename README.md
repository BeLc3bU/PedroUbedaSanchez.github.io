# Currículum Interactivo - Pedro Úbeda Sánchez

Este repositorio contiene el código fuente del currículum interactivo de Pedro Úbeda Sánchez, desarrollado como una **Single-Page Application (SPA)** moderna, rápida y accesible.

**➡️ Sitio en vivo:** [pedroubedasanchez.es](https://pedroubedasanchez.es)

![Captura de pantalla del currículum interactivo de Pedro Úbeda Sánchez](https://raw.githubusercontent.com/pubesan/Curriculum-SPA/main/screenshot.png)

## ✨ Características Principales

- **Single-Page Application (SPA):** Navegación fluida y sin recargas de página gracias a un router personalizado basado en la History API.
- **Progressive Web App (PWA):** Instalable en dispositivos de escritorio y móviles. Utiliza un Service Worker con estrategia *Stale-While-Revalidate* para los contenidos y *Cache First* para el App Shell, garantizando funcionamiento offline y cargas ultrarrápidas.
- **Diseño Responsivo:** Totalmente adaptable a dispositivos móviles, tabletas y ordenadores de escritorio, utilizando Tailwind CSS.
- **Formulario de Contacto Seguro:** Integración con FormSubmit.co mediante AJAX para evitar recargas de página, protegido con Google reCAPTCHA v3 para prevenir spam. Incluye validación en tiempo real y feedback claro al usuario.
- **SEO Optimizado para SPA:**
  - Actualización dinámica de metaetiquetas (título, descripción, canónicas, Open Graph, Twitter Cards) para cada sección.
  - Datos estructurados (Schema.org) para mejorar la visibilidad en buscadores.
  - Sitemap y `robots.txt` para una correcta indexación.
- **Accesibilidad (a11y):**
  - Roles y atributos ARIA para una correcta interpretación por lectores de pantalla.
  - Gestión del foco en la navegación para no desorientar al usuario.
  - Contraste de color adecuado y navegación por teclado garantizada.
- **Experiencia de Usuario (UX) Cuidada:** Interfaces de carga "esqueleto" (skeleton screens) para percepciones de carga más rápidas, animaciones de entrada sutiles al hacer scroll y ofuscación de datos de contacto para mayor privacidad.
- **Rendimiento Optimizado:**
  - Carga diferida (lazy loading) de imágenes.
  - Minificación de CSS y JavaScript en el proceso de build.
  - Uso de la API `View Transitions` para animaciones de página eficientes.
  - Preload de fuentes y assets críticos.
- **Pruebas Automatizadas:** Suite de pruebas de integración (End-to-End) con Cypress para verificar la navegación y la funcionalidad principal.

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

Puedes ejecutar los siguientes comandos desde la raíz del proyecto:

- **`npm run dev`**
  Inicia un servidor de desarrollo local con BrowserSync, vigila los cambios en los archivos y recarga el navegador automáticamente. **Este es el comando que usarás la mayor parte del tiempo.**

- **`npm run build`**
  Genera la versión de producción del sitio en la carpeta `/dist`. Incluye la minificación de CSS y JavaScript y la copia de todos los assets necesarios.

- **`npm run serve`**
  Inicia un servidor local para previsualizar el contenido de la carpeta `/dist` tal y como se vería en producción.

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
    Asegúrate de que todos tus archivos, incluida la carpeta `/dist` actualizada, estén subidos a tu repositorio.

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
- **Service Worker API:** Para capacidades offline y cacheo.
- **View Transitions API:** Para animaciones de página nativas.

---

*Desarrollado con dedicación por Pedro Úbeda Sánchez.*