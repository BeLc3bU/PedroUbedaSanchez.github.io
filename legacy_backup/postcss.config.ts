export default {
  plugins: {
    tailwindcss: {},
    // cssnano se encargará de la minificación.
    // Se aplica automáticamente cuando PostCSS se ejecuta en modo producción.
    cssnano: {},
  },
} as const;