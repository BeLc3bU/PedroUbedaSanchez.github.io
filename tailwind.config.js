/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html"], // Escanea todos los archivos HTML en la raíz
  safelist: [
    'bg-slate-500',
    'hover:bg-slate-600',
  ],
  theme: {
    extend: {
      colors: {
        stone: {
            100: '#f5f5f4',
            200: '#e7e5e4',
        },
        slate: {
            500: '#64748b',
            600: '#475569',
            800: '#1e293b',
            900: '#0f172a',
        },
        orange: {
            600: '#ea580c',
            700: '#c2410c',
            800: '#9a3412',
            900: '#7c2d12',
        }
      }
    },
  },
  plugins: [],
}
