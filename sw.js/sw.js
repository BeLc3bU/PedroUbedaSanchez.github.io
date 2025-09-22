const CACHE_NAME = 'curriculum-spa-cache-v7';
// Lista de archivos que componen el "cascarón" de la aplicación.
const APP_SHELL_URLS = [
  '/',
  '/index.html',
  '/assets/css/style.min.css',
  '/assets/js/main.min.js',
  '/header.html',
  '/footer.html',
  '/assets/fonts/inter-v20-latin-regular.woff2',
  '/assets/fonts/inter-v20-latin-700.woff2',
  '/foto-384.webp',
  '/foto-320.webp',
  '/favicon.ico',
  '/apple-touch-icon.png',
  '/favicon-32x32.png',
  '/favicon-16x16.png',
  '/site.webmanifest',
  // Página de CV para que esté disponible offline
  '/curriculum.html',
  '/foto.webp',
  // Añadir las páginas parciales para una experiencia offline completa
  '/experiencia.html',
  '/habilidades.html',
  '/formacion.html',
  '/otros-datos.html',
  '/contacto.html'
];

/**
 * En la instalación, se cachean los recursos estáticos principales.
 */
self.addEventListener('install', event => {
  console.log('[Service Worker] Instalando...');
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[Service Worker] Cacheando el App Shell');
      return cache.addAll(APP_SHELL_URLS);
    })
  );
});

/**
 * Durante la activación, se limpian las cachés antiguas.
 */
self.addEventListener('activate', event => {
  console.log('[Service Worker] Activando...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('[Service Worker] Eliminando caché antigua:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

/**
 * Intercepta las peticiones y sirve desde la caché si es posible (estrategia Stale-While-Revalidate).
 */
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Estrategia para peticiones de navegación (páginas HTML)
  if (request.mode === 'navigate') {
    // Siempre intentar ir a la red primero para las páginas.
    // Esto asegura que la redirección 404 funcione siempre.
    // Si la red falla, se sirve el index.html desde la caché como fallback.
    event.respondWith(
      fetch(request).catch(() => {
        console.log('[Service Worker] Fallo de red en navegación. Sirviendo index.html desde caché.');
        return caches.match('/');
      })
    );
    return;
  }

  // Estrategia para todos los demás recursos (CSS, JS, imágenes, fuentes)
  // "Cache First": si está en caché, se sirve desde ahí. Si no, se va a la red.
  if (APP_SHELL_URLS.includes(url.pathname) || url.pathname.startsWith('/assets/')) {
    event.respondWith(
      caches.match(request).then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(request).then(networkResponse => {
          // Opcional: guardar en caché los nuevos assets que se encuentren
          // caches.open(CACHE_NAME).then(cache => cache.put(request, networkResponse.clone()));
          return networkResponse;
        });
      })
    );
  }
});