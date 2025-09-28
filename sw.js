const CACHE_NAME = 'curriculum-spa-cache-v12'; // Incrementa la versión para forzar la actualización
// Lista de archivos que componen el "App Shell", la estructura básica de la aplicación.
const APP_SHELL_URLS = [
  '/',
  '/index.html',
  '/assets/css/style.min.css',
  '/assets/js/main.min.js',
  '/experiencia.html',
  '/habilidades.html',
  '/formacion.html',
  '/otros-datos.html',
  '/contacto.html',
  // Componentes reutilizables
  '/header.html',
  '/footer.html',
  '/assets/fonts/inter-v20-latin-regular.woff2',
  '/assets/fonts/inter-v20-latin-700.woff2',
  '/foto-384.webp',
  '/foto-320.webp',
  '/foto-112.webp', // Añadida para el CV imprimible
  '/foto.jpg', // Fallback para el CV imprimible
  '/favicon.ico',
  '/apple-touch-icon.png',
  '/favicon-32x32.png',
  '/favicon-16x16.png',
  '/site.webmanifest',
  // Página de CV para que esté disponible offline al hacer clic en "Descargar"
  '/curriculum.html',
  '/qr-code.svg',
  '/qr-code.png' // Añadido el fallback del QR
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
  ).then(() => self.skipWaiting()); // Forzar la activación del nuevo SW
  
});

/**
 * Durante la activación, se limpian las cachés antiguas.
 */
self.addEventListener('activate', event => {
  // Habilitar la precarga de navegación para mejorar el rendimiento.
  // Esto permite que el navegador comience a buscar la página de navegación
  // mientras el Service Worker se está iniciando.
  if (self.registration.navigationPreload) {
    event.waitUntil(self.registration.navigationPreload.enable());
  }
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

    // Ignorar peticiones que no son del mismo origen o no son GET.
    if (url.origin !== self.origin || request.method !== 'GET') {
        return;
    }

    // 1. Peticiones de navegación (documento principal)
    if (request.mode === 'navigate') {
        event.respondWith((async () => {
            try {
                const preloadResponse = await event.preloadResponse;
                if (preloadResponse) return preloadResponse;
                return await fetch(request);
            } catch (error) {
                console.log('[Service Worker] Fallo de red en navegación, sirviendo index.html desde caché.');
                return caches.match('/index.html');
            }
        })());
        return;
    }

    // 2. Contenido HTML de las sub-páginas (Stale-While-Revalidate)
    if (url.pathname.endsWith('.html')) {
        event.respondWith(
            caches.match(request).then(cachedResponse => {
                const fetchPromise = fetch(request).then(networkResponse => {
                    caches.open(CACHE_NAME).then(cache => {
                        cache.put(request, networkResponse.clone());
                    });
                    return networkResponse;
                });
                return cachedResponse || fetchPromise;
            })
        );
        return;
    }

    // 3. Assets estáticos (CSS, JS, imágenes, fuentes) - Cache First
    event.respondWith(
        caches.match(request).then(cachedResponse => {
            return cachedResponse || fetch(request);
        })
    );
});