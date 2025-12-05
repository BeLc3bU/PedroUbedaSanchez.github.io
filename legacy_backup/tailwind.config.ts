import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class', // Habilita el modo oscuro basado en una clase en el <html>
  content: [
    "./*.html",
    "./header.html", // <-- Corregido para que observe el nuevo archivo
    "./footer.html", // <-- Añadido por si en el futuro tiene clases que deba observar
    "./assets/js/**/*.ts",
    "./assets/js/**/*.js"
  ],
  theme: {
    extend: {}, // Puedes extender tu paleta de colores aquí si es necesario
  },
  plugins: [],
};

export default config;