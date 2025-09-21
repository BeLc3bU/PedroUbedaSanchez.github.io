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
        backToTopButton.classList.toggle('is-visible', window.scrollY > 300);
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

/**
 * Inicializa los scripts específicos de una página después de que su contenido se haya cargado.
 * @param {string} pageId - El ID de la página cargada (ej. 'contacto').
 */
function initializePageSpecificScripts(pageId) {
    /**
     * Ofusca un número de teléfono, revelándolo al hacer clic.
     * @param {string} linkId - El ID del elemento <a>.
     * @param {string} textId - El ID del elemento <span>.
     */
    function setupPhoneObfuscation(linkId, textId) {
        const linkElement = document.getElementById(linkId);
        const textElement = document.getElementById(textId);

        if (!linkElement || !textElement) return;

        const phoneNumber = atob('KzM0IDYzNSA5NDUgNzc5'); // +34 635 945 779

        linkElement.addEventListener('click', function revealPhone(e) {
            e.preventDefault();
            textElement.textContent = phoneNumber;
            linkElement.href = `tel:${phoneNumber.replace(/\s/g, '')}`;
            linkElement.removeEventListener('click', revealPhone);
        }, { once: true }); // El listener se ejecuta solo una vez
    }
    // Scripts que se deben ejecutar en CADA carga de página
    setupScrollAnimations();

    // Scripts para páginas específicas
    if (pageId === 'contacto') {
        setupFormValidation();
        // La ofuscación del teléfono también es específica de la página de contacto
        setupPhoneObfuscation('phone-contact', 'phone-text-contact', '📞 ');
    }
    // Aquí se podrían añadir más inicializaciones para otras páginas si fuera necesario
}

const pageCache = new Map();

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

    // Normaliza la ruta para obtener el ID de la página (ej. '/experiencia' -> 'experiencia')
    // Si la ruta es '/', la página a cargar es 'sobre-mi'.
    const pageId = (path === '/' || path === '/index.html') ? 'sobre-mi' : path.substring(1);

    // 3. Cargar el contenido nuevo
    if (pageCache.has(pageId)) {
        // Cargar desde la caché
        const { content, title, description, canonical } = pageCache.get(pageId);
        mainContent.innerHTML = content;
        document.title = title;
        updateMetaTag('description', description);
        updateMetaTag('canonical', canonical, 'link', 'href');
    } else {
        // Cargar desde el archivo HTML si no está en caché
        mainContent.innerHTML = '<div class="text-center p-12">Cargando...</div>';
        try {
            const response = await fetch(`/${pageId}.html`);
            if (!response.ok) throw new Error(`Página no encontrada: ${pageId}.html`);

            const html = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            // Extraer el contenido del body, el título y las metaetiquetas del archivo parcial
            const newContent = doc.body.innerHTML;
            const newTitle = doc.querySelector('title')?.textContent || 'Pedro Úbeda Sánchez';
            const newDescription = doc.querySelector('meta[name="description"]')?.getAttribute('content') || '';
            const newCanonical = doc.querySelector('link[rel="canonical"]')?.getAttribute('href') || `https://pedroubedasanchez.es/${pageId}`;

            pageCache.set(pageId, { content: newContent, title: newTitle, description: newDescription, canonical: newCanonical });

            mainContent.innerHTML = newContent;
            document.title = newTitle;
            updateMetaTag('description', newDescription);
            updateMetaTag('canonical', newCanonical, 'link', 'href');
        } catch (error) {
            console.error(error);
            mainContent.innerHTML = '<div class="text-center p-12">Error al cargar el contenido.</div>';
            document.title = 'Error - Página no encontrada';
        }
    }

    // 4. Re-inicializar scripts que dependen del nuevo contenido
    window.scrollTo(0, 0);
    setActiveNavLink();
    initializePageSpecificScripts(pageId);

    // 5. Iniciar la animación de fade-in eliminando la clase
    mainContent.classList.remove('content-fade-out');
}

/**
 * Actualiza las metaetiquetas SEO importantes.
 * @param {string} name - El valor del atributo 'name' o 'rel' de la etiqueta.
 * @param {string} value - El nuevo valor para la etiqueta.
 * @param {string} [tag='meta'] - El tipo de etiqueta ('meta' o 'link').
 * @param {string} [attr='content'] - El atributo a actualizar ('content' o 'href').
 */
function updateMetaTag(name, value, tag = 'meta', attr = 'content') {
    const selector = tag === 'link' ? `link[rel="${name}"]` : `meta[name="${name}"]`;
    let element = document.querySelector(selector);

    if (element) {
        element.setAttribute(attr, value);
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

    // Maneja los botones de avance y retroceso del navegador
    window.addEventListener('popstate', () => loadPageContent(window.location.pathname));

    // El router ya no se encarga de la carga inicial.
    // Se moverá al final del DOMContentLoaded para asegurar que todo esté listo.
}

document.addEventListener('DOMContentLoaded', () => {
    // 1. Saneamiento de la URL (lógica de redirección de 404.html)
    // Esto se ejecuta primero para asegurar que la URL es la correcta antes de que el router actúe.
    const l = window.location;
    if (l.search) {
        const params = {};
        l.search.slice(1).split('&').forEach(function (part) {
            const item = part.split('=');
            params[item[0]] = decodeURIComponent(item[1]).replace(/~and~/g, '&');
        });
        if (params.p) {
            // Reemplaza la URL en el historial para que sea limpia (ej. /experiencia)
            window.history.replaceState(null, null, params.p + (params.q ? '?' + params.q : '') + l.hash);
        }
    }

    // 2. Hacer visible la página para evitar FOUC (Flash of Unstyled Content)
    document.body.style.opacity = '1';

    // 3. Inicializar componentes de la UI que son independientes del contenido
    initializeMobileMenu();
    setupSkipLink();
    setupBackToTopButton();

    // 4. Inicializar el router para que escuche los clics y los eventos de popstate.
    // IMPORTANTE: Ya no llama a loadPageContent() internamente.
    initializeRouter();

    // 5. Cargar el contenido de la página inicial (o la que corresponda según la URL ya saneada).
    // Esta es ahora la única fuente de verdad para la carga inicial.
    loadPageContent(window.location.pathname);
});
