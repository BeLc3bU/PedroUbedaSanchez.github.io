/**
 * =============================================================================
 * TYPE DEFINITIONS
 * =============================================================================
 */

interface MetaData {
  title: string;
  description: string;
  canonical: string;
  og: {
    title?: string;
    description?: string;
    url?: string;
    twitterTitle?: string;
    twitterDescription?: string;
  };
}

interface PageData extends MetaData {
  content: string;
}

interface RedirectionParams {
  [key: string]: string;
}

/**
 * =============================================================================
 * CORE: GESTIÓN DE SPA EN GITHUB PAGES
 * =============================================================================
 * Este script se ejecuta de forma síncrona al inicio para gestionar la redirección
 * desde 404.html en entornos como GitHub Pages.
 * Si la URL contiene un parámetro `p` (ej. /?p=/experiencia), lo utiliza para
 * reescribir la URL a la ruta correcta (ej. /experiencia) usando history.replaceState.
 * Esto "limpia" la URL antes de que el router de la SPA comience a funcionar.
 * Fuente: https://github.com/rafgraph/spa-github-pages
 */
(function(): void {
    const l = window.location;
    if (l.search) {
        const params: RedirectionParams = {};
        l.search.slice(1).split('&').forEach(part => {
            const item = part.split('=');
            params[item[0]] = decodeURIComponent(item[1]).replace(/~and~/g, '&');
        });
        if (params.p) {
            // Reconstruye la URL a la ruta correcta de la SPA.
            // l.pathname es la ruta base (ej. '/' o '/repo/'). params.p es la ruta de la página.
            const newPath = l.pathname.replace(/\/$/, '') + params.p;
            window.history.replaceState(null, null, newPath + (params.q ? '?' + params.q : '') + l.hash);
        }
    }
}());

/**
 * =============================================================================
 * COMPONENTES DE UI Y ACCESIBILIDAD
 * =============================================================================
 */

/**
 * Gestiona la apertura y cierre del menú de navegación móvil tipo overlay.
 */
function initializeMobileMenu(): void {
    const openButton = document.getElementById('mobile-menu-button');
    const closeButton = document.getElementById('mobile-menu-close-button');
    const menu = document.getElementById('mobile-menu-overlay');

    if (!openButton || !closeButton || !menu) return;

    const focusableElements = menu.querySelectorAll<HTMLElement>('a[href], button');
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleFocusTrap = (e: KeyboardEvent): void => {
        if (e.key !== 'Tab') return;
        if (e.shiftKey) { // Shift + Tab
            if (document.activeElement === firstElement) {
                lastElement.focus();
                e.preventDefault();
            }
        } else { // Tab
            if (document.activeElement === lastElement) {
                firstElement.focus();
                e.preventDefault();
            }
        }
    };

    const openMenu = (): void => {
        menu.classList.remove('hidden');
        menu.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden'; // Evita el scroll del fondo
        closeButton.focus();
        document.addEventListener('keydown', handleFocusTrap);
    };

    const closeMenu = (): void => {
        menu.classList.add('hidden');
        menu.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = ''; // Restaura el scroll
        openButton.focus();
        document.removeEventListener('keydown', handleFocusTrap);
    };

    openButton.addEventListener('click', openMenu);
    closeButton.addEventListener('click', closeMenu);

    // Cerrar al hacer clic en un enlace
    menu.querySelectorAll('.nav-link-mobile').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Cerrar con la tecla Escape
    document.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.key === 'Escape' && !menu.classList.contains('hidden')) {
            closeMenu();
        }
    });
}

/**
 * Inicializa la funcionalidad del modo oscuro.
 */
function initializeDarkMode(): void {
    const toggleButton = document.getElementById('dark-mode-toggle');
    if (!toggleButton) return;

    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');

    // Función para aplicar el tema y actualizar el icono
    const applyTheme = (theme: 'dark' | 'light'): void => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            sunIcon.classList.add('hidden');
            moonIcon.classList.remove('hidden');
        } else {
            document.documentElement.classList.remove('dark');
            sunIcon.classList.remove('hidden');
            moonIcon.classList.add('hidden');
        }
    };

    // Al cargar, determina el tema a aplicar
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null;
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        applyTheme(savedTheme);
    } else {
        applyTheme(systemPrefersDark ? 'dark' : 'light');
    }

    // Listener para el botón
    toggleButton.addEventListener('click', () => {
        const isDark = document.documentElement.classList.contains('dark');
        const newTheme: 'dark' | 'light' = isDark ? 'light' : 'dark';
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
    });
}

/**
 * Mejora la accesibilidad del enlace "Saltar al contenido principal".
 */
function setupSkipLink(): void {
    const skipLink = document.querySelector<HTMLAnchorElement>('a[href="#main-content"]');
    const mainContent = document.getElementById('main-content');

    if (!skipLink || !mainContent) return;

    skipLink.addEventListener('click', (e: MouseEvent) => {
        e.preventDefault();
        const targetElement = document.getElementById(skipLink.hash.substring(1));
        if (!targetElement) return;

        // Mueve el foco al contenedor principal, haciéndolo enfocable temporalmente.
        targetElement.setAttribute('tabindex', '-1');
        targetElement.focus({ preventScroll: true }); // preventScroll evita un salto brusco.
        
        // Scroll suave al objetivo.
        targetElement.scrollIntoView({ behavior: 'smooth' });

        // Elimina el tabindex después de que el foco se haya movido para no alterar el orden de tabulación.
        targetElement.addEventListener('blur', () => {
            targetElement.removeAttribute('tabindex');
        }, { once: true });
    });
}

/**
 * Ofusca un número de teléfono, revelándolo al hacer clic.
 * @param {string} linkId - El ID del elemento <a> que contendrá el enlace tel:.
 * @param {string} textId - El ID del elemento <span> que mostrará el texto del teléfono.
 * @param {string} [prefix=''] - Un prefijo opcional para añadir antes del número (ej. un emoji).
 */
function setupPhoneObfuscation(linkId: string, textId: string, prefix: string = ''): void {
    const linkElement = document.getElementById(linkId) as HTMLAnchorElement | null;
    const textElement = document.getElementById(textId);

    if (!linkElement || !textElement) return;

    const phoneNumber = atob('KzM0IDYzNSA5NDUgNzc5'); // Decodifica a: +34 635 945 779

    linkElement.addEventListener('click', function revealPhone(e: MouseEvent) {
        e.preventDefault();
        
        // Cambia el texto y el enlace
        textElement.textContent = `${prefix}${phoneNumber}`.trim();
        linkElement.href = `tel:${phoneNumber.replace(/\s/g, '')}`;
        
        // Elimina el listener para que los siguientes clics funcionen como una llamada normal
        linkElement.removeEventListener('click', revealPhone);
    });
}

/**
 * Gestiona la visibilidad y funcionalidad del botón "Volver Arriba".
 */
function setupBackToTopButton(): void {
    const backToTopButton = document.getElementById('back-to-top');
    if (!backToTopButton) return;

    let isVisible = false;
    let scrollTimeout: ReturnType<typeof setTimeout>;

    // Mostrar/ocultar el botón al hacer scroll
    window.addEventListener('scroll', () => {
        // Usamos un debounce simple para no sobrecargar el hilo principal.
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            const shouldBeVisible = window.scrollY > 300;
            if (shouldBeVisible !== isVisible) {
                backToTopButton.style.opacity = shouldBeVisible ? '1' : '0';
                backToTopButton.style.transform = shouldBeVisible ? 'scale(1)' : 'scale(0.9)';
                backToTopButton.setAttribute('aria-hidden', String(!shouldBeVisible));
                isVisible = shouldBeVisible;
            }
        }, 100);
    }, { passive: true });

    // Scroll suave hacia arriba al hacer clic
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Anima los elementos cuando entran en el viewport usando Intersection Observer.
 */
function setupScrollAnimations(): void {
    const elementsToAnimate = document.querySelectorAll<HTMLElement>('.animate-on-scroll');

    if (!elementsToAnimate.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Añade un pequeño retardo escalonado para un efecto más agradable
                setTimeout(() => {
                    entry.target.classList.add('is-visible');
                }, index * 100);
                observer.unobserve(entry.target); // Animar solo una vez
            }
        });
    }, {
        threshold: 0.1 // Se activa cuando el 10% del elemento es visible
    });

    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
}
/**
 * Configura la validación en tiempo real para el formulario de contacto.
 */
function setupFormValidation(): void {
    const form = document.getElementById('contact-form') as HTMLFormElement | null;
    if (!form) return;

    const fields = form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('input[required], textarea[required]');
    const submitButton = form.querySelector<HTMLButtonElement>('button[type="submit"]');
    const generalErrorContainer = document.getElementById('form-general-error');

    // Elementos para el estado de carga del botón
    const buttonText = submitButton.querySelector<HTMLElement>('.button-text');
    const spinner = submitButton.querySelector<HTMLElement>('.button-spinner');

    const showError = (field: HTMLInputElement | HTMLTextAreaElement, message: string): void => {
        const errorContainer = document.getElementById(`${field.id}-error`);
        if (errorContainer) {
            errorContainer.textContent = message;
            errorContainer.classList.add('form-error-active');
        }
        field.setAttribute('aria-invalid', 'true');
        field.classList.add('input-error');
    };

    const hideError = (field: HTMLInputElement | HTMLTextAreaElement): void => {
        const errorContainer = document.getElementById(`${field.id}-error`);
        if (errorContainer) {
            errorContainer.textContent = '';
            errorContainer.classList.remove('form-error-active');
        }
        field.setAttribute('aria-invalid', 'false');
        field.classList.remove('input-error');
    };

    const validateField = (field: HTMLInputElement | HTMLTextAreaElement): boolean => {
        if (field.validity.valueMissing) {
            showError(field, 'Este campo es obligatorio.');
            return false;
        }
        if (field.validity.typeMismatch && (field as HTMLInputElement).type === 'email') {
            showError(field, 'Por favor, introduce una dirección de correo válida.');
            return false;
        }
        hideError(field);
        return true;
    };

    const formWrapper = document.getElementById('contact-form-wrapper');
    const successMessageContainer = document.getElementById('form-success-message');

    // Lógica para el contador de caracteres
    const messageField = document.getElementById('message') as HTMLTextAreaElement | null;
    const charCounter = document.getElementById('char-counter');

    if (messageField && charCounter) {
        const maxLength = parseInt(messageField.getAttribute('maxlength') || '0', 10);
        
        const updateCounter = (): void => {
            const currentLength = messageField.value.length;
            charCounter.textContent = `${currentLength} / ${maxLength}`;

            // Cambiar color si se acerca o pasa del límite
            charCounter.classList.remove('text-slate-500', 'text-orange-600', 'text-red-600', 'font-bold');
            if (currentLength > maxLength) {
                charCounter.classList.add('text-red-600', 'font-bold');
            } else if (currentLength > maxLength * 0.9) {
                charCounter.classList.add('text-orange-600');
            } else {
                charCounter.classList.add('text-slate-500');
            }
        };

        messageField.addEventListener('input', updateCounter);
        // Asegurarse de que el contador se reinicie con el formulario
        form.addEventListener('reset', () => setTimeout(updateCounter, 0));
    }

    const handleFormSubmit = async (e: Event): Promise<void> => {
        e.preventDefault();
        submitButton.disabled = true;
        if (buttonText) buttonText.classList.add('hidden');
        if (spinner) spinner.classList.remove('hidden');
        if (generalErrorContainer) generalErrorContainer.textContent = '';

        let isFormValid = true;
        for (const field of fields) {
            if (!validateField(field)) {
                isFormValid = false;
                // Enfocar el primer campo con error para mejorar la accesibilidad
                field.focus();
                break; // Salir del bucle en el primer error
            }
        }
        
        if (!isFormValid) {
            console.log('Formulario no válido. No se enviará.');
            submitButton.disabled = false;
            if (buttonText) buttonText.classList.remove('hidden');
            if (spinner) spinner.classList.add('hidden');
            return;
        }

        try {
            // Usamos FormData directamente, que es más simple y robusto.
            const formData = new FormData(form);
            const response = await fetch("https://formsubmit.co/ajax/contacto@pedroubedasanchez.es", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json'
                },
                body: formData
            });

            const data = await response.json() as { success: string | boolean; message?: string };

            if (data.success === "true" || data.success === true) {
                // Éxito en el envío: ocultar formulario y mostrar mensaje de éxito.
                formWrapper.classList.add('hidden');
                successMessageContainer.classList.remove('hidden');
                successMessageContainer.focus(); // Mover foco al mensaje para accesibilidad
            } else {
                // FormSubmit.co devolvió un error (ej. reCAPTCHA falló)
                throw new Error(data.message || 'Hubo un problema con la validación del formulario.');
            }

        } catch (error) {
            console.error('Error en el envío del formulario:', error);
            if (generalErrorContainer) {
                const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
                generalErrorContainer.textContent = 'Error: ' + errorMessage + ' Por favor, inténtalo de nuevo más tarde.';
            }
            // Reactivar el botón solo si el envío falló.
            if (successMessageContainer.classList.contains('hidden')) {
                submitButton.disabled = false;
                if (buttonText) buttonText.classList.remove('hidden');
                if (spinner) spinner.classList.add('hidden');
            }
        }
    };

    form.addEventListener('submit', handleFormSubmit);

    fields.forEach(field => {
        field.addEventListener('blur', () => validateField(field));
        field.addEventListener('input', () => {
            // Validación proactiva: si el campo tenía un error y el usuario
            // empieza a escribir, se vuelve a validar en tiempo real para
            // que el mensaje de error desaparezca si la entrada ya es válida.
            // Esto mejora la experiencia de usuario.
            if (field.getAttribute('aria-invalid') === 'true') {
                 validateField(field);
            }
        });
    });

    // Lógica para el botón "Enviar otro mensaje"
    const resetButton = document.getElementById('form-reset-button');
    if (resetButton) {
        resetButton.addEventListener('click', () => {
            successMessageContainer.classList.add('hidden');
            form.reset(); // Limpia todos los campos
            formWrapper.classList.remove('hidden');
            fields.forEach(hideError); // Oculta los mensajes de error
            if (generalErrorContainer) generalErrorContainer.textContent = '';
            submitButton.disabled = false;
        });
    }
}

/**
 * Resalta el enlace de navegación correspondiente a la sección actual en la SPA.
 */
function setActiveNavLink(): void {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll<HTMLAnchorElement>('a.nav-link, a.nav-link-mobile');

    navLinks.forEach(link => {
        const linkPath = new URL(link.href).pathname;

        if (linkPath === currentPath) {
            link.setAttribute('aria-current', 'page');
        } else {
            link.removeAttribute('aria-current');
        }
    });
}

const pageCache = new Map<string, PageData>();
let initialContent: string | null = null;
let currentNavIndex: number = 0; // Variable para rastrear el índice de navegación actual

/**
 * =============================================================================
 * EFECTOS VISUALES Y SCRIPTS DE PÁGINA
 * =============================================================================
 */

/**
 * Configura el botón para imprimir el CV directamente desde la SPA.
 * Crea un iframe oculto, carga curriculum.html y abre el diálogo de impresión.
 */
function setupDirectPrint(): void {
    const printCvLink = document.getElementById('print-cv-button');
    if (!printCvLink) return; // Salir si el botón no existe en la página actual

    // Cambiamos el <button> por un <a> para mejorar la semántica.
    printCvLink.setAttribute('href', '/curriculum.html');
    printCvLink.setAttribute('role', 'button');
    printCvLink.addEventListener('click', (e: MouseEvent) => {
        e.preventDefault(); // Prevenir la navegación normal al hacer clic

        let iframe = document.getElementById('print-iframe-cv') as HTMLIFrameElement | null;
        if (!iframe) {
            iframe = document.createElement('iframe');
            iframe.id = 'print-iframe-cv';
            iframe.src = '/curriculum.html';
            iframe.style.display = 'none';
            document.body.appendChild(iframe);
            iframe.onload = () => { // Imprime solo cuando el iframe haya cargado
                iframe!.contentWindow?.focus();
                iframe!.contentWindow?.print();
            };
        } else { // Si ya existe, simplemente imprime
            iframe.contentWindow?.focus();
            iframe.contentWindow?.print();
        }
    });
}

/**
 * =============================================================================
 * ROUTER Y LÓGICA DE CARGA DE PÁGINA
 * =============================================================================
 */

/**
 * Carga componentes HTML reutilizables como el header y el footer.
 * @param {string} selector - El selector CSS del contenedor donde se cargará el componente.
 * @param {string} url - La URL del archivo HTML del componente.
 * @returns {Promise<void>}
 */
async function loadComponent(selector: string, url: string): Promise<void> {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Error al cargar ${url}: ${response.statusText}`);
        const data = await response.text();
        const element = document.querySelector(selector);
        if (element) element.innerHTML = data;
    } catch (error) {
        console.error(`No se pudo cargar el componente desde ${url}:`, error);
    }
}

/**
 * Actualiza una metaetiqueta o enlace en el <head>.
 * @param {string} selector - El selector CSS para encontrar la etiqueta.
 * @param {string} attribute - El atributo a actualizar ('content' o 'href').
 * @param {string} value - El nuevo valor para el atributo.
 */
function updateMetaTag(selector: string, attribute: string, value: string, isLink: boolean = false): void {
    if (typeof value !== 'string' || value.trim() === '') return;
    let element = document.querySelector(selector);
    if (!element) { // Si no existe, la crea
        element = document.createElement(isLink ? 'link' : 'meta');
        // Para selectores complejos, extraemos los atributos para crear el elemento
        const matches = selector.match(/\[(.*?)\]/g);
        if (matches) {
            matches.forEach(attr => {
                const match = attr.slice(1, -1).match(/([^=]+)="?([^"]*) "?/);
                if (match) {
                    const [, key, val] = match;
                    element!.setAttribute(key, val.replace(/"/g, ''));
                }
            });
        }
        document.head.appendChild(element);
    }
    element.setAttribute(attribute, value);
}

/**
 * Muestra un mensaje de error estandarizado en un contenedor.
 * @param {HTMLElement} container - El elemento donde se mostrará el error.
 * @param {string} title - El título del error.
 * @param {string} message - El mensaje descriptivo del error.
 */
function displayError(container: HTMLElement, title: string, message: string): void {
    container.innerHTML = `
        <section class="text-center bg-white py-16 px-4 sm:px-8 rounded-lg shadow-lg">
            <h1 class="text-3xl sm:text-4xl font-bold mb-4 text-red-600">${title}</h1>
            <p class="text-slate-600 mb-8 max-w-lg mx-auto">${message}</p>
            <a class="inline-block bg-orange-700 text-white font-bold py-3 px-6 rounded-lg hover:bg-orange-800 transition-colors duration-300 shadow-lg" href="/">
                Volver a la página principal
            </a>
        </section>
    `;
}

const SKELETONS: Record<string, string> = {
    default: `
        <section class="mb-24" aria-live="polite" aria-busy="true">
            <div class="h-10 w-3/5 mx-auto mb-12 skeleton"></div>
            <div class="relative max-w-4xl mx-auto space-y-8">
                <div class="bg-white p-6 rounded-lg shadow-lg border-l-4 border-gray-200">
                    <div class="h-6 w-3/5 mb-2 skeleton"></div>
                    <div class="h-4 w-1/3 mb-4 skeleton"></div>
                    <div class="space-y-3"><div class="h-4 w-full skeleton"></div><div class="h-4 w-5/6 skeleton"></div></div>
                </div>
                <div class="bg-white p-6 rounded-lg shadow-lg border-l-4 border-gray-200">
                    <div class="h-6 w-1/2 mb-2 skeleton"></div>
                    <div class="h-4 w-1/4 mb-4 skeleton"></div>
                    <div class="space-y-3"><div class="h-4 w-full skeleton"></div></div>
                </div>
            </div>
        </section>
    `,
    twoColumns: `
        <section class="mb-24" aria-live="polite" aria-busy="true">
            <div class="h-10 w-2/5 mx-auto mb-12 skeleton"></div>
            <div class="grid md:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
                <div class="bg-white p-6 rounded-lg shadow-lg">
                    <div class="h-7 w-3/4 mb-6 skeleton"></div>
                    <div class="space-y-4"><div class="h-5 w-full skeleton"></div><div class="h-5 w-5/6 skeleton"></div><div class="h-5 w-full skeleton"></div></div>
                </div>
                <div class="bg-white p-6 rounded-lg shadow-lg">
                    <div class="h-7 w-3/4 mb-6 skeleton"></div>
                    <div class="space-y-4"><div class="h-5 w-full skeleton"></div><div class="h-5 w-5/6 skeleton"></div></div>
                </div>
            </div>
        </section>
    `,
    threeColumns: `
        <section class="mb-24" aria-live="polite" aria-busy="true">
            <div class="h-10 w-1/3 mx-auto mb-12 skeleton"></div>
            <div class="grid md:grid-cols-3 gap-8 md:gap-12 max-w-5xl mx-auto">
                <div class="bg-white p-6 rounded-lg shadow-lg"><div class="h-7 w-3/4 mx-auto mb-4 skeleton"></div><div class="space-y-4"><div class="h-5 w-full skeleton"></div><div class="h-5 w-5/6 skeleton"></div></div></div>
                <div class="bg-white p-6 rounded-lg shadow-lg"><div class="h-7 w-3/4 mx-auto mb-4 skeleton"></div><div class="space-y-4"><div class="h-5 w-full skeleton"></div></div></div>
                <div class="bg-white p-6 rounded-lg shadow-lg"><div class="h-7 w-3/4 mx-auto mb-4 skeleton"></div><div class="space-y-4"><div class="h-5 w-full skeleton"></div><div class="h-5 w-5/6 skeleton"></div></div></div>
            </div>
        </section>
    `,
    contact: `
        <section class="py-12 sm:py-16 md:py-20" aria-live="polite" aria-busy="true">
            <div class="container mx-auto px-4 sm:px-6 lg:px-8">
                <div class="max-w-3xl mx-auto">
                    <div class="h-10 w-1/3 mx-auto mb-4 skeleton"></div>
                    <div class="h-6 w-3/4 mx-auto mb-8 skeleton"></div>
                    <div class="bg-white p-8 rounded-lg shadow-lg">
                        <div class="flex flex-col sm:flex-row sm:justify-between gap-8 mb-8">
                            <div class="h-12 w-1/4 skeleton"></div>
                            <div class="h-12 w-1/4 skeleton"></div>
                            <div class="h-12 w-1/4 skeleton"></div>
                        </div>
                        <div class="max-w-xl mx-auto">
                            <div class="mb-4"><div class="h-6 w-1/4 mb-2 skeleton"></div><div class="h-10 w-full skeleton"></div></div>
                            <div class="mb-4"><div class="h-6 w-1/3 mb-2 skeleton"></div><div class="h-10 w-full skeleton"></div></div>
                            <div class="mb-6"><div class="h-6 w-1/4 mb-2 skeleton"></div><div class="h-24 w-full skeleton"></div></div>
                            <div class="text-center"><div class="h-12 w-48 mx-auto skeleton"></div></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    `
};

const MAIN_CONTENT_SELECTOR = '#main-content';

// --- 1. Funciones de Ayuda para la Carga de Páginas ---

const getPageId = (path: string): string => 
    (path === '/' || path === '/index.html' || path === '') ? 'sobre-mi' : path.substring(1).replace(/\.html$/, '');

/**
 * Carga el contenido de una página en el contenedor principal.
 * @param {string} path - La ruta de la página a cargar (ej. '/experiencia').
 */
async function loadPageContent(path: string): Promise<void> {
    // Función para actualizar el contenido del DOM
    const updateDOM = async (): Promise<void> => {
        const pageId = getPageId(path);
        const mainContent = document.querySelector<HTMLElement>(MAIN_CONTENT_SELECTOR);

        if (!mainContent) return;

        if (pageId === 'sobre-mi') {
            renderHomePage(mainContent);
        } else if (pageCache.has(pageId)) {
            renderFromCache(pageId, mainContent);
        } else {
            await fetchAndRenderPage(pageId, mainContent);
        }

        // Tareas que se ejecutan después de cada cambio de contenido
        postNavigationTasks(path, pageId, mainContent);
    };

    // Determinar la dirección de la navegación
    const nextNavIndex = getNavIndexForPath(path);
    const direction = nextNavIndex > currentNavIndex ? 'forward' : 'backward';

    // Usar la API de View Transitions si está disponible
    if (document.startViewTransition) {
        // Añadir clase de dirección para la animación
        document.documentElement.classList.add(direction === 'forward' ? 'slide-forward' : 'slide-backward');
        
        const transition = document.startViewTransition(updateDOM);
        transition.finished.then(() => {
            // Limpiar la clase después de la animación
            document.documentElement.classList.remove('slide-forward', 'slide-backward');
        });
    } else {
        // Si no, simplemente actualiza el DOM
        await updateDOM();
    }
}

/**
 * Renderiza la página de inicio usando el contenido inicial.
 * @param {HTMLElement} container - El contenedor del contenido principal.
 */
function renderHomePage(container: HTMLElement): void {
    container.innerHTML = initialContent || '';
    const homeMeta = {
        title: 'Pedro Úbeda Sánchez | Técnico en Informática, Aviónica y Administración',
        description: 'Sitio web profesional de Pedro Úbeda Sánchez, técnico especialista con más de 20 años de experiencia en informática, aviónica y administración. Descubre mi trayectoria y habilidades.',
        canonical: 'https://pedroubedasanchez.es/',
        og: {
            title: 'Pedro Úbeda Sánchez | Técnico Especialista',
            description: 'Técnico con más de 20 años de experiencia en informática, aviónica y administración.',
            url: 'https://pedroubedasanchez.es/',
        }
    };
    updateAllMetaTags(homeMeta);
    announcePageLoad('Sobre mí');
}

/**
 * Renderiza una página desde la caché.
 * @param {string} pageId - El ID de la página.
 * @param {HTMLElement} container - El contenedor del contenido principal.
 */
function renderFromCache(pageId: string, container: HTMLElement): void {
    const pageData = pageCache.get(pageId);
    if (!pageData) return;
    container.innerHTML = pageData.content;
    updateAllMetaTags(pageData);
    announcePageLoad(pageData.title);
}

/**
 * Obtiene, parsea, cachea y renderiza una nueva página.
 * @param {string} pageId - El ID de la página.
 * @param {HTMLElement} container - El contenedor del contenido principal.
 */
async function fetchAndRenderPage(pageId: string, container: HTMLElement): Promise<void> {
    showSkeleton(pageId, container);
    try {
        const response = await fetch(`/${pageId}.html`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const html = await response.text();
        const pageData = parsePageFragment(html, pageId);

        pageCache.set(pageId, pageData);
        container.innerHTML = pageData.content;
        updateAllMetaTags(pageData);
        announcePageLoad(pageData.title);

    } catch (error) {
        console.error('Error al cargar la página:', error);
        const status = parseInt(error.message.split(': ')[1], 10);
        if (status === 404) {
            document.title = 'Error 404 - Página no encontrada';
            displayError(container, '🤔 Página no encontrada (Error 404)', 'La página que buscas no existe o ha sido movida.');
        } else {
            document.title = 'Error de conexión';
            displayError(container, '🔌 Error de Conexión', 'No se pudo cargar la página. Por favor, comprueba tu conexión a internet.');
        }
    }
}

/**
 * Muestra el esqueleto de carga apropiado para una página.
 * @param {string} pageId - El ID de la página.
 * @param {HTMLElement} container - El contenedor donde se mostrará el esqueleto.
 */
function showSkeleton(pageId: string, container: HTMLElement): void {
    const skeletonMap: Record<string, string> = {
        'experiencia': SKELETONS.default,
        'habilidades': SKELETONS.twoColumns,
        'formacion': SKELETONS.twoColumns,
        'otros-datos': SKELETONS.threeColumns,
        'contacto': SKELETONS.contact,
    };
    container.innerHTML = skeletonMap[pageId] || SKELETONS.default;
}

/**
 * Parsea un fragmento de HTML y extrae el contenido y los metadatos.
 * @param {string} html - El string de HTML a parsear.
 * @param {string} pageId - El ID de la página para usar como fallback.
 * @returns {object} - Un objeto con el contenido y los metadatos de la página.
 */
function parsePageFragment(html: string, pageId: string): PageData {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    return {
        content: doc.querySelector('section')?.outerHTML || doc.body.innerHTML,
        title: doc.querySelector('title')?.textContent || 'Pedro Úbeda Sánchez',
        description: doc.querySelector('meta[name="description"]')?.getAttribute('content') || '',
        canonical: doc.querySelector('link[rel="canonical"]')?.getAttribute('href') || `https://pedroubedasanchez.es/${pageId}`,
        og: {
            title: doc.querySelector('meta[property="og:title"]')?.getAttribute('content') ?? undefined,
            description: doc.querySelector('meta[property="og:description"]')?.getAttribute('content') ?? undefined,
            url: doc.querySelector('meta[property="og:url"]')?.getAttribute('content') ?? undefined,
            twitterTitle: doc.querySelector('meta[name="twitter:title"]')?.getAttribute('content') ?? undefined,
            twitterDescription: doc.querySelector('meta[name="twitter:description"]')?.getAttribute('content') ?? undefined,
        }
    };
}

function getNavIndexForPath(path: string): number {
    const link = document.querySelector<HTMLElement>(`.nav-link[href="${path}"], .nav-link-mobile[href="${path}"]`);
    if (link?.dataset.navIndex) {
        return parseInt(link.dataset.navIndex, 10);
    }
    return 0; // Por defecto, el índice de la página de inicio
}

/**
 * Anuncia la carga de una página a los lectores de pantalla.
 * @param {string} title - El título de la página cargada.
 */
function announcePageLoad(title: string): void {
    const announcer = document.getElementById('a11y-announcer');
    if (announcer) {
        announcer.textContent = `Se ha cargado la página: ${title}.`;
    }
}

/**
 * Actualiza todas las metaetiquetas relevantes de la página.
 * @param {object} pageData - Objeto con title, description, canonical y og.
 */
function updateAllMetaTags({ title, description, canonical, og }: MetaData): void {
    document.title = title;
    updateMetaTag('meta[name="description"]', 'content', description);
    updateMetaTag('link[rel="canonical"]', 'href', canonical, true);
    updateMetaTag('meta[property="og:title"]', 'content', og.title || title);
    updateMetaTag('meta[property="og:description"]', 'content', og.description || description);
    updateMetaTag('meta[property="og:url"]', 'content', og.url || canonical);
    updateMetaTag('meta[name="twitter:title"]', 'content', og.twitterTitle || og.title || title);
    updateMetaTag('meta[name="twitter:description"]', 'content', og.twitterDescription || og.description || description);
}

/**
 * Ejecuta tareas comunes después de que el contenido de la página ha sido renderizado.
 * @param {string} path - La ruta de la página actual.
 * @param {string} pageId - El ID de la página actual.
 * @param {HTMLElement} mainContent - El contenedor del contenido principal.
 */
function postNavigationTasks(path: string, pageId: string, mainContent: HTMLElement): void {
    window.scrollTo(0, 0);
    setActiveNavLink();
    currentNavIndex = getNavIndexForPath(path);
    initializePageScripts(pageId, mainContent);

    // Gestionar foco para accesibilidad
    const newHeading = mainContent.querySelector('h1');
    if (newHeading) {
        newHeading.setAttribute('tabindex', '-1');
        newHeading.focus();
        newHeading.addEventListener('blur', () => newHeading.removeAttribute('tabindex'), { once: true });
    }

    // Notificar a Google Tag Manager
    if (window.dataLayer) {
        window.dataLayer.push({
            event: 'page_view',
            page_path: path,
            page_title: document.title
        });
    }
}
/**
 * =============================================================================
 * INICIALIZACIÓN
 * =============================================================================
 */

/**
 * Inicializa los scripts específicos de la página después de cargar el contenido.
 * @param {string} pageId - El ID de la página actual.
 * @param {HTMLElement} contentContainer - El contenedor del contenido recién cargado.
 */
function initializePageScripts(pageId: string, contentContainer: HTMLElement): void {
    setupScrollAnimations();

    if (pageId === 'sobre-mi') {
        setupDirectPrint();
    }

    if (pageId === 'contacto') {
        setupFormValidation();
        setupPhoneObfuscation('phone-contact', 'phone-text-contact'); // <-- Movido aquí
    }
}

/**
 * Inicializa el router de la SPA.
 */
function initializeRouter(): void {
    // Intercepta los clics en los enlaces locales
    document.addEventListener('click', (e: MouseEvent) => {
        const link = (e.target as HTMLElement).closest('a');

        // Ignorar si no es un enlace, si tiene target="_blank", es una descarga,
        // un mailto, o un enlace protegido por Cloudflare.
        // También ignorar si el enlace no tiene un atributo href, lo que causa errores de URL.
        if (!link || !link.href) return;

        const href = link.getAttribute('href');
        const isExternal = link.target === '_blank' || link.rel === 'noopener noreferrer';

        if (isExternal || link.hasAttribute('download') || href?.startsWith('mailto:') || href?.includes('/cdn-cgi/l/email-protection')) return;
        const url = new URL(link.href); // Ahora es seguro porque hemos comprobado link.href
        if (url.origin === window.location.origin) {
            // No prevenir si es un enlace a la página de impresión
            if (url.pathname.endsWith('/curriculum.html')) return;
            e.preventDefault(); // Prevenir navegación normal para rutas de la SPA
            // Solo hacer pushState si la ruta es diferente para evitar entradas duplicadas en el historial
            if (window.location.pathname !== url.pathname) history.pushState({}, '', url.pathname);
            loadPageContent(url.pathname);
        }
    });

    // Manejar el evento popstate (botones atrás/adelante del navegador)
    window.addEventListener('popstate', () => {
        loadPageContent(window.location.pathname);
    });

}

/**
 * Punto de entrada principal de la aplicación.
 */
async function main(): Promise<void> {
    // Si no estamos en la página principal de la SPA, solo mostramos el body y salimos.
    if (!document.querySelector(MAIN_CONTENT_SELECTOR)) {
        document.body.style.opacity = '1';
        return;
    }

    // Guardar el contenido inicial de "Sobre Mí" para evitar un fetch innecesario en la primera carga
    const mainContentEl = document.querySelector(MAIN_CONTENT_SELECTOR);
    if (mainContentEl) {
        initialContent = mainContentEl.innerHTML;
    }

    // 1. Iniciar la carga de componentes y el contenido de la página en paralelo.
    const componentsLoaded = Promise.all([
        loadComponent('#header', '/header.html'),
        loadComponent('#footer', '/footer.html')
    ]);

    // 2. Esperar a que los componentes base estén listos para inicializar sus scripts.
    await componentsLoaded;
    initializeMobileMenu();
    initializeDarkMode();

    // 3. Inicializar scripts globales, el router y cargar el contenido inicial.
    setupSkipLink();
    setupBackToTopButton();
    initializeRouter();
    await loadPageContent(window.location.pathname);
    document.body.style.opacity = '1';
}

// Ejecutar la función principal cuando el DOM esté listo.
document.addEventListener('DOMContentLoaded', main);

/**
 * Muestra una notificación al usuario para que actualice a la nueva versión.
 */
function showUpdateNotification(): void {
    const notification = document.createElement('div');
    notification.id = 'update-notification';
    notification.setAttribute('role', 'status');
    notification.setAttribute('aria-live', 'polite');
    notification.style.cssText = 'position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%); background-color: #1e293b; color: white; padding: 12px 20px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.2); z-index: 1000; display: flex; align-items: center; gap: 16px;';
    
    notification.innerHTML = `
        <span>Hay una nueva versión disponible.</span>
        <button id="reload-button" style="background-color: #c2410c; color: white; border: none; padding: 8px 12px; border-radius: 6px; cursor: pointer; font-weight: bold;">Actualizar</button>
    `;
    
    document.body.appendChild(notification);

    document.getElementById('reload-button').addEventListener('click', () => {
        window.location.reload();
    });
}

/**
 * Registra el Service Worker para habilitar capacidades offline y de caché.
 */
window.addEventListener('load', () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js').then(registration => {
            console.log('Service Worker registrado con éxito:', registration);
            
            // Escuchar mensajes del Service Worker
            navigator.serviceWorker.addEventListener('message', event => {
                if (event.data && event.data.type === 'NEW_VERSION_INSTALLED') {
                    showUpdateNotification();
                }
            });
        }).catch(error => console.log('Error en el registro del Service Worker:', error));
    }
});
