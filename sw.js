const CACHE_NAME = 'curriculum-spa-cache-v9'; // Incrementa la versión para forzar la actualización
// Lista de archivos que componen el "App Shell", la estructura básica de la aplicación.
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
  // Página de CV para que esté disponible offline al hacer clic en "Descargar"
  '/curriculum.html'
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

  // Ignorar peticiones que no son del mismo origen (ej. Google Analytics, reCAPTCHA).
  if (url.origin !== self.origin) {
    return;
  }

  // 1. Peticiones de navegación (el documento principal):
  // Estrategia: Network falling back to cache. Intenta la red primero, si falla (offline), sirve el index.html desde la caché.
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).catch(() => {
        console.log('[Service Worker] Fallo de red en navegación. Sirviendo index.html desde caché.');
        return caches.match('/');
      })
    );
    return;
  }

  // 2. Fragmentos de página HTML (ej. /experiencia.html):
  // Estrategia: Stale-While-Revalidate. Sirve desde caché para velocidad, pero actualiza en segundo plano.
  if (url.pathname.endsWith('.html') && !APP_SHELL_URLS.includes(url.pathname)) {
    event.respondWith(
      caches.open(CACHE_NAME).then(cache => {
        return cache.match(request).then(cachedResponse => {
          const fetchPromise = fetch(request).then(networkResponse => {
            cache.put(request, networkResponse.clone());
            return networkResponse;
          });
          // Devuelve la respuesta cacheada si existe, si no, espera a la red.
          return cachedResponse || fetchPromise;
        });
      })
    );
    return;
  }

  // 3. App Shell y assets estáticos (CSS, JS, fuentes, imágenes):
  // Estrategia: Cache First. Si está en caché, se sirve desde ahí. Si no, se va a la red y se cachea.
  event.respondWith(
    caches.match(request).then(cachedResponse => {
      return cachedResponse || fetch(request).then(networkResponse => {
        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(request, responseToCache);
        });
        return networkResponse;
      });
    })
  );
});