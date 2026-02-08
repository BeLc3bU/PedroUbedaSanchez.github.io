# Currículum Interactivo - Pedro Úbeda Sánchez (Premium Dark Tech Edition)

Este repositorio contiene la versión evolucionada del currículum interactivo de Pedro Úbeda Sánchez. La aplicación ha sido rediseñada con una estética **"Dark Tech"** premium, enfocada en la precisión y el alto rendimiento, ideal para perfiles técnicos y de defensa.

**➡️ Sitio en vivo:** [pedroubedasanchez.es](https://pedroubedasanchez.es)

## ✨ Características Principales

- **Estética Dark Tech Premium:** Diseño basado en *glassmorphism*, rejillas geométricas y tipografía técnica de alto impacto (`Space Grotesk`).
- **Arquitectura Moderna:** Desarrollada con React 19 y TypeScript para máxima robustez.
- **Sección de Proyectos [NUEVO]:** Galería especializada para destacar intervenciones técnicas en IT y Aviónica.
- **Rendimiento Optimizado:** Utiliza Vite 7 para builds instantáneos y carga ultra-precisa.
- **Navegación Fluida:** Header con efecto de desenfoque dinámico y transiciones suaves.
- **SEO & Accesibilidad:** Metaetiquetas dinámicas y cumplimiento de estándares web modernos.
- **Suite de Pruebas:** Configuración base con **Vitest** y **React Testing Library** para asegurar la calidad del software.

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

- **React 19**
- **TypeScript**
- **Vite 7**
- **Tailwind CSS**
- **Vitest** (Testing)
- **React Router**
- **React Helmet**
- **Lucide React** (Iconos)

---

*Desarrollado con dedicación por Pedro Úbeda Sánchez.*