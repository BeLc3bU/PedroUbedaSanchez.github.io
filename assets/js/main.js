/**
 * Maneja la redirección para SPAs en GitHub Pages.
 * Este script se ejecuta primero para corregir la URL si venimos de un 404.
 * Lee el parámetro `p` de la URL, lo usa para reescribir la ruta correcta
 * en el historial del navegador, y luego el router de la SPA puede funcionar.
 * Fuente: https://github.com/rafgraph/spa-github-pages
 */
(function() {
    const l = window.location;
    if (l.search) {
        const params = {};
        l.search.slice(1).split('&').forEach(function (part) {
            const item = part.split('=');
            params[item[0]] = decodeURIComponent(item[1]).replace(/~and~/g, '&');
        });
        if (params.p) {
            window.history.replaceState(null, null, params.p + (params.q ? '?' + params.q : '') + l.hash);
        }
    }
}());

/**
 * Gestiona la apertura y cierre del menú de navegación móvil tipo overlay.
 */
function initializeMobileMenu() {
    const openButton = document.getElementById('mobile-menu-button');
    const closeButton = document.getElementById('mobile-menu-close-button');
    const menu = document.getElementById('mobile-menu-overlay');

    if (!openButton || !closeButton || !menu) return;

    const focusableElements = menu.querySelectorAll('a[href], button');
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleFocusTrap = (e) => {
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

    const openMenu = () => {
        menu.classList.remove('hidden');
        menu.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden'; // Evita el scroll del fondo
        closeButton.focus();
        document.addEventListener('keydown', handleFocusTrap);
    };

    const closeMenu = () => {
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
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !menu.classList.contains('hidden')) {
            closeMenu();
        }
    });
}

/**
 * Mejora la accesibilidad del enlace "Saltar al contenido principal".
 */
function setupSkipLink() {
    const skipLink = document.querySelector('a[href="#main-content"]');
    const mainContent = document.getElementById('main-content');

    if (!skipLink || !mainContent) return;

    skipLink.addEventListener('click', (e) => {
        e.preventDefault();
        // Mueve el foco al contenedor principal, haciéndolo enfocable temporalmente.
        mainContent.setAttribute('tabindex', '-1');
        mainContent.focus();
        // Elimina el tabindex después de enfocar para no alterar el orden de tabulación natural.
        mainContent.addEventListener('blur', () => {
            mainContent.removeAttribute('tabindex');
        }, { once: true });
    });
}
/**
 * Resalta el enlace de navegación correspondiente a la página actual.
 * Ofusca un número de teléfono, revelándolo al pasar el ratón o al enfocarlo.
 * @param {string} linkId - El ID del elemento <a> que contendrá el enlace tel:.
 * @param {string} textId - El ID del elemento <span> que mostrará el texto del teléfono.
 * @param {string} [prefix=''] - Un prefijo opcional para añadir antes del número (ej. un emoji).
 */
function setupPhoneObfuscation(linkId, textId, prefix = '') {
    const linkElement = document.getElementById(linkId);
    const textElement = document.getElementById(textId);

    if (!linkElement || !textElement) return;

    const phoneNumber = atob('KzM0IDYzNSA5NDUgNzc5'); // Decodifica a: +34 635 945 779

    linkElement.addEventListener('click', function revealPhone(e) {
        e.preventDefault();
        
        // Cambia el texto y el enlace
        textElement.textContent = `${prefix}${phoneNumber}`.trim();
        linkElement.href = `tel:${phoneNumber.replace(/\s/g, '')}`;
        
        // Elimina el listener para que los siguientes clics funcionen como una llamada normal
        linkElement.removeEventListener('click', revealPhone);
    });
}

/**
 * Configura el botón de impresión y añade un botón para volver al inicio.
 */
function setupPrintButton() {
    const printButton = document.getElementById('print-button');
    if (!printButton) return;

    printButton.addEventListener('click', () => window.print());

    const homeButton = document.createElement('button');
    homeButton.id = 'home-button';
    homeButton.className = 'bg-slate-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-slate-600 transition-colors duration-300 shadow-lg transform hover:scale-105 ml-4';
    homeButton.innerHTML = '🏠 Volver a la página principal';
    homeButton.addEventListener('click', () => window.location.href = '/');
    printButton.insertAdjacentElement('afterend', homeButton);
}

/**
 * Anima los elementos cuando entran en el viewport usando Intersection Observer.
 */
function setupScrollAnimations() {
    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');

    if (!elementsToAnimate.length) return;

    const observer = new IntersectionObserver((entries, observer) => {
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
function setupFormValidation() {
    const form = document.querySelector('form[action*="formsubmit.co"]');
    if (!form) return;

    const fields = form.querySelectorAll('input[required], textarea[required]');
    const submitButton = form.querySelector('button[type="submit"]');
    const generalErrorContainer = document.getElementById('form-general-error');
    const originalButtonText = submitButton ? submitButton.innerHTML : '';

    const showError = (field, message) => {
        const errorContainer = document.getElementById(`${field.id}-error`);
        if (errorContainer) {
            errorContainer.textContent = message;
        }
        field.setAttribute('aria-invalid', 'true');
        field.classList.add('input-error');
    };

    const hideError = (field) => {
        const errorContainer = document.getElementById(`${field.id}-error`);
        if (errorContainer) {
            errorContainer.textContent = '';
        }
        field.setAttribute('aria-invalid', 'false');
        field.classList.remove('input-error');
    };

    const validateField = (field) => {
        if (field.validity.valueMissing) {
            showError(field, 'Este campo es obligatorio.');
            return false;
        }
        if (field.validity.typeMismatch && field.type === 'email') {
            showError(field, 'Por favor, introduce una dirección de correo válida.');
            return false;
        }
        hideError(field);
        return true;
    };

    form.addEventListener('submit', function(e) {
        // 1. Prevenir siempre el envío inicial del formulario
        e.preventDefault();
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.innerHTML = 'Enviando...';
        }
        if (generalErrorContainer) generalErrorContainer.textContent = '';

        // 2. Validar todos los campos del formulario
        let isFormValid = true;
        fields.forEach(field => {
            if (!validateField(field)) {
                isFormValid = false;
            }
        });
        
        // 3. Si el formulario no es válido, detener el proceso
        if (!isFormValid) {
            console.log('Formulario no válido. No se enviará.');
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.innerHTML = originalButtonText;
            }
            return;
        }

        // 4. Si el formulario es válido, ejecutar reCAPTCHA v3
        grecaptcha.ready(function() {
            grecaptcha.execute('6LcfUs8rAAAAAErA7-oGbid2aiEL8_iBy7jZ-WYl', {action: 'submit'})
            .then(function(token) {
                // 5. Añadir el token al formulario y enviarlo
                // --- PUNTO DE VERIFICACIÓN ---
                console.log('Token de reCAPTCHA generado:', token);
                document.getElementById('recaptcha-response').value = token;
                form.submit();
            })
            .catch(function(error) {
                console.error('Error de reCAPTCHA:', error);
                if (generalErrorContainer) generalErrorContainer.textContent = 'No se pudo verificar el reCAPTCHA. Por favor, inténtalo de nuevo.';
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.innerHTML = originalButtonText;
                }
            });
        });
    });

    fields.forEach(field => {
        field.addEventListener('blur', (e) => validateField(e.target));
        field.addEventListener('input', (e) => {
            if (e.target.getAttribute('aria-invalid') === 'true') {
                validateField(e.target);
            }
        });
    });
}

/**
 * Gestiona la visibilidad y funcionalidad del botón "Volver Arriba".
 */
function setupBackToTopButton() {
    const backToTopButton = document.getElementById('back-to-top');
    if (!backToTopButton) return;

    // Mostrar/ocultar el botón al hacer scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('is-visible');
        } else {
            backToTopButton.classList.remove('is-visible');
        }
    });

    // Scroll suave hacia arriba al hacer clic
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Carga componentes HTML reutilizables como el header y el footer.
 * @param {string} selector - El selector CSS del contenedor donde se cargará el componente.
 * @param {string} url - La URL del archivo HTML del componente.
 * @returns {Promise<void>}
 */
async function loadComponent(selector, url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error al cargar ${url}: ${response.statusText}`);
        }
        const data = await response.text();
        const element = document.querySelector(selector);
        if (element) {
            element.innerHTML = data;
        }
    } catch (error) {
        console.error(`No se pudo cargar el componente desde ${url}:`, error);
    }
}

/**
 * Resalta el enlace de navegación correspondiente a la sección actual en la SPA.
 */
function setActiveNavLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link, .nav-link-mobile');

    navLinks.forEach(link => {
        const linkPath = new URL(link.href).pathname;

        if (linkPath === currentPath) {
            link.setAttribute('aria-current', 'page');
        } else {
            link.removeAttribute('aria-current');
        }
    });
}

const pageCache = new Map();
let initialContent = null;

/**
 * Carga el contenido de una página en el contenedor principal.
 * @param {string} path - La ruta de la página a cargar (ej. '/experiencia').
 */
async function loadPageContent(path) {
    const mainContent = document.getElementById('main-content');
    if (!mainContent) return;

    // 1. Iniciar la animación de fade-out
    mainContent.classList.add('content-fade-out');

    // 2. Esperar a que la animación termine antes de cambiar el contenido
    await new Promise(resolve => setTimeout(resolve, 300));

    // Guardar el contenido inicial de "Sobre Mí" la primera vez
    if (!initialContent) {
        initialContent = mainContent.innerHTML;
    }

    // Normaliza la ruta para obtener el ID de la página (ej. '/experiencia' -> 'experiencia')
    const pageId = (path === '/') ? 'sobre-mi' : path.substring(1);

    // 3. Cargar el contenido nuevo usando una estructura if/else if/else
    if (pageId === 'sobre-mi') {
        // Restaurar el contenido inicial
        mainContent.innerHTML = initialContent;
        document.title = 'Pedro Úbeda Sánchez | Técnico en Informática, Aviónica y Administración';
        updateMetaTags('description', 'Sitio web profesional de Pedro Úbeda Sánchez, técnico especialista con más de 20 años de experiencia en informática, aviónica y administración. Descubre mi trayectoria y habilidades.');
        updateMetaTags('canonical', 'https://pedroubedasanchez.es/');
    } else if (pageCache.has(pageId)) {
        // Cargar desde la caché
        const { content, title, description, canonical } = pageCache.get(pageId);
        mainContent.innerHTML = content;
        document.title = title;
        updateMetaTags('description', description);
        updateMetaTags('canonical', canonical);
    } else {
        // Cargar desde el archivo HTML
        mainContent.innerHTML = '<div class="text-center p-12">Cargando...</div>';
        try {
            const response = await fetch(`/${pageId}.html`);
            if (!response.ok) throw new Error(`Página no encontrada: ${pageId}.html`);
            
            const html = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            
            const section = doc.querySelector('section');
            const newContent = section ? section.outerHTML : '<div class="text-center p-12">Error: No se encontró contenido en la página cargada.</div>';
            const newTitle = doc.querySelector('title')?.textContent || 'Pedro Úbeda Sánchez';
            const newDescription = doc.querySelector('meta[name="description"]')?.getAttribute('content') || '';
            const newCanonical = doc.querySelector('link[rel="canonical"]')?.getAttribute('href') || `https://pedroubedasanchez.es/${pageId}`;

            pageCache.set(pageId, { content: newContent, title: newTitle, description: newDescription, canonical: newCanonical });
            mainContent.innerHTML = newContent;
            document.title = newTitle;
            updateMetaTags('description', newDescription);
            updateMetaTags('canonical', newCanonical);
        } catch (error) {
            console.error(error);
            mainContent.innerHTML = '<div class="text-center p-12">Error al cargar el contenido.</div>';
            document.title = 'Error - Página no encontrada';
        }
    }

    // 4. Re-inicializar scripts que dependen del nuevo contenido
    window.scrollTo(0, 0);
    setActiveNavLink();
    setupScrollAnimations();
    if (pageId === 'contacto') {
        setupFormValidation();
    }

    // 5. Iniciar la animación de fade-in eliminando la clase
    mainContent.classList.remove('content-fade-out');
}

/**
 * Actualiza las metaetiquetas SEO importantes.
 * @param {string} type - 'description' o 'canonical'.
 * @param {string} value - El nuevo valor para la etiqueta.
 */
function updateMetaTags(type, value) {
    let element;
    if (type === 'description') {
        element = document.querySelector('meta[name="description"]');
    } else if (type === 'canonical') {
        element = document.querySelector('link[rel="canonical"]');
    }

    if (element) {
        element.setAttribute(type === 'canonical' ? 'href' : 'content', value);
    }
}

/**
 * Inicializa el router de la SPA.
 */
function initializeRouter() {
    // Intercepta los clics en los enlaces locales
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (!link || link.target === '_blank' || link.hasAttribute('download') || link.href.includes('mailto:')) {
            return;
        }

        const url = new URL(link.href);
        if (url.origin === window.location.origin) {
            e.preventDefault();
            history.pushState({}, '', url.pathname);
            loadPageContent(url.pathname);
        }
    });

    window.addEventListener('popstate', () => loadPageContent(window.location.pathname));
    loadPageContent(window.location.pathname);
}

document.addEventListener('DOMContentLoaded', () => {
    // Muestra el cuerpo de la página una vez que el DOM está listo.
    document.body.style.opacity = '1';

    // Inicializa el router inmediatamente para que intercepte los clics desde el principio.
    initializeRouter();

    // Cargar componentes de la página
    Promise.all([
        loadComponent('#header', 'header.html'),
        loadComponent('#footer', 'footer.html')
    ]).then(() => {
        // Una vez que el header y el footer están cargados,
        // podemos inicializar los scripts que dependen de ellos, como el menú móvil.
        initializeMobileMenu();
    });

    // Estos scripts se pueden inicializar de inmediato
    setupSkipLink();
    setupBackToTopButton();
});
