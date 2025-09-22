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

  // Estrategia "Network falling back to cache" para peticiones de navegación.
  // Esto es crucial para que la SPA funcione correctamente.
  // 1. Intenta ir a la red. Esto permite que la redirección 404 de GitHub Pages funcione cuando hay conexión.
  // 2. Si la red falla (offline), sirve el 'index.html' principal desde la caché.
  //    La SPA se cargará y el router se encargará de mostrar el contenido correcto según la URL.
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).catch(() => {
        console.log('[Service Worker] Fallo de red en navegación. Sirviendo index.html desde caché.');
        return caches.match('/'); // Sirve la página principal como fallback.
      })
    );
    return;
  }

  // Estrategia "Cache First" para los assets del App Shell y otros recursos estáticos.
  // Si el recurso está en la caché, se sirve desde ahí para máxima velocidad.
  // Si no, se va a la red, se sirve y se añade a la caché para futuras peticiones.
  // Esto no intercepta las peticiones de parciales HTML (ej. /experiencia.html),
  // ya que no están en la lista y son gestionadas por el fetch() del router en main.js.
  if (APP_SHELL_URLS.includes(url.pathname) || url.pathname.startsWith('/assets/') || /\.(webp|png|jpg|jpeg|gif|svg|ico)$/.test(url.pathname)) {
    event.respondWith(
      caches.match(request).then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }
        // Si no está en caché, lo busca en la red y lo cachea para la próxima vez.
        return fetch(request).then(networkResponse => {
          const cacheableResponse = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, cacheableResponse));
          return networkResponse;
        });
      })
    );
  }
});