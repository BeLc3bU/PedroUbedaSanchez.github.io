/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./header.html", // <-- Corregido para que observe el nuevo archivo
    "./footer.html", // <-- Añadido por si en el futuro tiene clases que deba observar
    "./assets/js/**/*.js"
  ],
  theme: {},
  plugins: [],
}