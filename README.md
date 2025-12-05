# Currículum Interactivo - Pedro Úbeda Sánchez

Este repositorio contiene el código fuente del currículum interactivo de Pedro Úbeda Sánchez, una aplicación web moderna construida con **React**, **TypeScript**, **Tailwind CSS** y **Vite**.

**➡️ Sitio en vivo:** [pedroubedasanchez.es](https://pedroubedasanchez.es)

![Captura de pantalla del currículum interactivo de Pedro Úbeda Sánchez](https://pedroubedasanchez.es/foto.webp)

## ✨ Características Principales

- **Arquitectura Moderna:** Desarrollada con React 18+ y TypeScript para máxima robustez y mantenibilidad.
- **Rendimiento Ultrarrápido:** Utiliza Vite para un entorno de desarrollo instantáneo y builds optimizados.
- **Diseño Responsivo y Elegante:** Interfaz adaptable construida con Tailwind CSS, optimizada para móviles, tablets y escritorio.
- **Navegación Fluida:** SPA (Single Page Application) real con `react-router-dom` y animaciones de transición.
- **Modo Oscuro:** Soporte nativo para modo claro y oscuro, respetando la preferencia del sistema y permitiendo cambio manual persistente.
- **SEO Ready:** Gestión dinámica de metaetiquetas con `react-helmet-async` para asegurar la mejor indexación en buscadores.
- **Accesibilidad (a11y):** Componentes semánticos, gestión de foco y navegación por teclado.
- **Formulario de Contacto:** Funcionalidad completa con validación en tiempo real y envío asíncrono.
- **PWA Ready:** Estructura preparada para funcionar como Progressive Web App (Service Workers configurables via Vite PWA plugin).

## 📂 Estructura del Proyecto

```
curriculum-react/
├── public/                 # Assets estáticos (imágenes, fuentes, robots.txt, etc.)
├── src/
│   ├── components/         # Componentes reutilizables (TimelineItem, Cards, etc.)
│   ├── hooks/              # Custom Hooks (useTheme, etc.)
│   ├── layout/             # Componentes de estructura (Layout, Header, Footer)
│   ├── pages/              # Componentes de página (Home, Experience, Skills, etc.)
│   ├── App.tsx             # Configuración de rutas principal
│   ├── main.tsx            # Punto de entrada de la aplicación
│   └── index.css           # Estilos globales y directivas de Tailwind
├── legacy_backup/          # Copia de seguridad del proyecto original (vanilla JS)
├── index.html              # Entry point HTML de Vite
├── package.json            # Dependencias y scripts
├── tailwind.config.js      # Configuración de diseño
└── vite.config.ts          # Configuración del bundler
```

## 🚀 Cómo Empezar

Sigue estos pasos para ejecutar el proyecto en tu entorno local.

### Prerrequisitos

- Node.js (versión 18 o superior)
- npm (gestor de paquetes)

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

- **`npm run dev`**
  Inicia el servidor de desarrollo local. Accede a `http://localhost:5173`.

- **`npm run build`**
  Compila la aplicación para producción en la carpeta `dist/`.

- **`npm run preview`**
  Previsualiza la build de producción localmente.

- **`npm run lint`**
  Ejecuta ESLint para asegurar la calidad del código.

## ☁️ Despliegue

El proyecto está optimizado para desplegarse fácilmente en plataformas estáticas como GitHub Pages, Vercel o Netlify.

### GitHub Pages

1.  Ejecuta `npm run build`.
2.  Sube el contenido de la carpeta `dist/` a tu rama de despliegue (o configura una GitHub Action para hacerlo automáticamente).

## 💻 Tecnologías

- **React**
- **TypeScript**
- **Vite**
- **Tailwind CSS**
- **React Router**
- **React Helmet Async**
- **Lucide React** (Iconos)

---

*Desarrollado con dedicación por Pedro Úbeda Sánchez.*