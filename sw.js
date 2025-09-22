const CACHE_NAME = 'curriculum-spa-cache-v3';
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
  const url = new URL(event.request.url);

  // --- LÓGICA CLAVE PARA LA SPA ---
  // Si es una petición de navegación (HTML) Y contiene el parámetro de redirección `p`,
  // debemos ir siempre a la red para que el script de redirección de la SPA funcione.
  // No podemos servir el 'index.html' desde la caché porque no tendría el parámetro `p`.
  if (event.request.mode === 'navigate' && url.searchParams.has('p')) {
    // No usamos event.respondWith, dejamos que el navegador maneje la petición a la red.
    console.log('[Service Worker] Petición de navegación con parámetro "p", se omite la caché.');
    return;
  }

  event.respondWith(
    caches.open(CACHE_NAME).then(async (cache) => {
      const cachedResponse = await cache.match(event.request);
      const fetchedResponse = fetch(event.request).then((networkResponse) => {
        // Si la petición es exitosa, la guardamos en caché para la próxima vez.
        if (networkResponse && networkResponse.status === 200) {
          cache.put(event.request, networkResponse.clone());
        }
        return networkResponse;
      }).catch(() => {
        // Si la red falla y no hay nada en caché, la petición fallará.
        // Podríamos devolver una página offline aquí si quisiéramos.
      });

      // Devuelve la respuesta de la caché si existe, si no, espera a la respuesta de la red.
      return cachedResponse || fetchedResponse;
    })
  );
});