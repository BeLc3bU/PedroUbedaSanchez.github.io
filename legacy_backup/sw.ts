/// <reference lib="webworker" />

export {}; // Asegura que es un módulo
declare const self: ServiceWorkerGlobalScope & typeof globalThis;

const CACHE_NAME = 'curriculum-spa-cache-v14'; // Incrementa la versión para forzar la actualización
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
self.addEventListener('install', (event: ExtendableEvent) => {
  console.log('[Service Worker] Instalando...');
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[Service Worker] Cacheando el App Shell');
      return cache.addAll(APP_SHELL_URLS);
    }).then(() => {
      // Envía un mensaje a los clientes para indicar que una nueva versión está lista.
      return self.clients.matchAll({ type: 'window' }).then((clients: readonly WindowClient[]) => {
        clients.forEach(client => {
          client.postMessage({ type: 'NEW_VERSION_INSTALLED' });
        });
      });
    }).then(() => self.skipWaiting()) // Forzar la activación del nuevo SW
  );
});

/**
 * Durante la activación, se limpian las cachés antiguas.
 */
self.addEventListener('activate', (event: ExtendableEvent) => {
  // Habilitar la precarga de navegación para mejorar el rendimiento.
  // Esto permite que el navegador comience a buscar la página de navegación
  // mientras el Service Worker se está iniciando.
  if (self.registration.navigationPreload) {
    event.waitUntil(self.registration.navigationPreload.enable());
  }
  console.log('[Service Worker] Activando...');
  event.waitUntil(
    caches.keys().then((cacheNames: string[]) => {
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
self.addEventListener('fetch', (event: FetchEvent) => {
    const { request } = event;
    const url = new URL(request.url);

    // Ignorar peticiones que no son del mismo origen o no son GET.
    if (url.origin !== self.origin || request.method !== 'GET') {
        return;
    }

    // 1. Peticiones de navegación (documento principal)
    if (request.mode === 'navigate') {
        event.respondWith((async (): Promise<Response> => {
            try {
                // Intenta usar la respuesta precargada si está disponible.
                const preloadResponse: Response | undefined = await event.preloadResponse;
                if (preloadResponse) return preloadResponse;
                // Si no, ve a la red.
                return await fetch(request);
            } catch (error) {
                // Si la red falla, sirve el 'cascarón' principal desde la caché.
                console.log('[Service Worker] Fallo de red en navegación. Sirviendo App Shell desde caché.');
                const cachedResponse = await caches.match('/index.html');
                return cachedResponse || new Response('Service Worker offline fallback', { status: 503 });
            }
        })());
        return;
    }

    // 2. Estrategia Stale-While-Revalidate para todos los demás assets (HTML, CSS, JS, imágenes, etc.)
    // Esto asegura que el usuario vea el contenido cacheado al instante,
    // mientras se busca una versión nueva en segundo plano para la próxima visita.
    // Es ideal para assets que pueden cambiar entre despliegues.
    if (request.destination === 'document' || 
        request.destination === 'style' || 
        request.destination === 'script' || 
        request.destination === 'image' ||
        request.destination === 'font') {
        event.respondWith(
            caches.match(request).then((cachedResponse: Response | undefined) => {
                const fetchPromise = fetch(request).then((networkResponse: Response) => {
                    const responseToCache = networkResponse.clone();
                    caches.open(CACHE_NAME).then(cache => {
                        cache.put(request, responseToCache);
                    });
                    return networkResponse;
                }).catch(error => {
                    console.error('[SW] Fetch failed:', error);
                    throw error;
                });
                // Devuelve la respuesta cacheada si existe, si no, espera a la red.
                // La próxima vez, la versión de red ya estará en caché.
                return cachedResponse || fetchPromise;
            })
        );
        return;
    }

});