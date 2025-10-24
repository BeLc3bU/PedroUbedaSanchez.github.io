# Currículum Interactivo - Pedro Úbeda Sánchez

Este repositorio contiene el código fuente del currículum web interactivo de Pedro Úbeda Sánchez, desarrollado como una Single-Page Application (SPA) estática, optimizada para ser rápida y accesible.

**➡️ Sitio en vivo:** [pedroubedasanchez.es](https://pedroubedasanchez.es)

![Captura de pantalla del currículum interactivo de Pedro Úbeda Sánchez](https://raw.githubusercontent.com/pubesan/Curriculum-SPA/main/screenshot.png)

## ✨ Características Principales

- **Single-Page Application (SPA):** Navegación fluida sin recargas de página, gestionada con JavaScript puro y la History API.
- **Progressive Web App (PWA):** El sitio es instalable en dispositivos móviles y de escritorio para un acceso rápido y funciona offline gracias a un Service Worker.
- **Diseño Responsivo:** Se adapta a cualquier tamaño de pantalla, desde móviles a ordenadores de escritorio.
- **Modo Oscuro:** Incluye un tema oscuro que respeta la configuración del sistema y puede ser controlado por el usuario.
- **SEO Optimizado:** Metaetiquetas dinámicas y datos estructurados (Schema.org) para un mejor posicionamiento en buscadores.
- **Accesibilidad (a11y):** Desarrollado siguiendo las mejores prácticas para asegurar que sea usable por todo el mundo, incluyendo usuarios de lectores de pantalla.
- **Rendimiento:** Optimizado para una carga rápida, con precarga de recursos críticos y un excelente rendimiento general.

## 🚀 Cómo Ver el Sitio en Local

Puedes ver el sitio en tu máquina local de dos maneras:

### 1. Usando el Emulador de Firebase (Recomendado)

Si tienes Firebase CLI instalado, este método simula el entorno de hosting real.

1.  **Inicia el emulador:**
    ```bash
    firebase emulators:start --only hosting
    ```
2.  Abre tu navegador y ve a **http://127.0.0.1:5000**.

### 2. Usando un servidor local simple

Si no tienes Firebase, puedes usar cualquier servidor web estático. Si tienes Python instalado, es muy fácil:

1.  **Navega a la carpeta del proyecto en tu terminal.**
2.  **Inicia el servidor:**
    ```bash
    # Para Python 3
    python -m http.server
    ```
3.  Abre tu navegador y ve a **http://localhost:8000**.

## 💻 Tecnologías Utilizadas

- **HTML5 / CSS3 / JavaScript (ES6+)**
- **Tailwind CSS:** (Los estilos están pre-compilados en `style.min.css`)
- **Service Worker API:** Para las capacidades PWA y offline.
- **View Transitions API:** Para animaciones de página nativas en navegadores compatibles.
- **Firebase Hosting:** Para el despliegue y emulación.

---

*Desarrollado con dedicación por Pedro Úbeda Sánchez.*
