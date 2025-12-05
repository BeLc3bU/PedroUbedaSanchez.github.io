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

    const originalText = textElement.textContent;
    // Simple "obfuscation"
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
    homeButton.addEventListener('click', () => window.location.href = 'index.html');
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
    const form = document.getElementById('contact-form');
    if (!form) return;

    const formWrapper = document.getElementById('contact-form-wrapper');
    const successMessage = document.getElementById('form-success-message');
    const resetButton = document.getElementById('form-reset-button');

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

    form.addEventListener('submit', async function(e) {
        // 1. Prevenir siempre el envío inicial del formulario
        e.preventDefault();
        const buttonTextSpan = submitButton.querySelector('.button-text');
        const spinner = submitButton.querySelector('.button-spinner');
        if (submitButton) {
            submitButton.disabled = true;
            buttonTextSpan.textContent = 'Enviando...';
            spinner.classList.remove('hidden');
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
                buttonTextSpan.textContent = 'Enviar mensaje';
                spinner.classList.add('hidden');
            }
            return;
        }

        // 4. Si el formulario es válido, ejecutar reCAPTCHA v3
        try {
            const token = await grecaptcha.execute('6LcfUs8rAAAAAErA7-oGbid2aiEL8_iBy7jZ-WYl', { action: 'submit' });
            document.getElementById('recaptcha-response').value = token;

            // 5. Enviar el formulario vía AJAX con fetch
            const formData = new FormData(form);
            const endpointInput = form.querySelector('input[name="_formsubmit_endpoint"]');
            const endpoint = endpointInput ? endpointInput.value : 'https://formsubmit.co/ajax/contacto@pedroubedasanchez.es';

            const response = await fetch(endpoint, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            const data = await response.json();

            if (data.success === "true" || data.success === true) {
                formWrapper.classList.add('hidden');
                successMessage.classList.remove('hidden');
            } else {
                throw new Error(data.message || 'Hubo un error al enviar el formulario.');
            }

        } catch (error) {
            console.error('Error en el envío del formulario:', error);
            if (generalErrorContainer) {
                generalErrorContainer.textContent = 'Error al enviar el mensaje. Por favor, inténtalo de nuevo más tarde.';
            }
        } finally {
            // Restaurar el botón en caso de error
            if (submitButton && !successMessage.classList.contains('hidden')) {
                 // No hacer nada si ya se muestra el mensaje de éxito
            } else if (submitButton) {
                submitButton.disabled = false;
                buttonTextSpan.textContent = 'Enviar mensaje';
                spinner.classList.add('hidden');
            }
        }
    });

    if (resetButton) {
        resetButton.addEventListener('click', () => {
            successMessage.classList.add('hidden');
            formWrapper.classList.remove('hidden');
            form.reset();
            fields.forEach(hideError);
            if (submitButton) submitButton.disabled = false;
        });
    }

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
    const currentHash = window.location.hash || '#sobre-mi';
    const navLinks = document.querySelectorAll('.nav-link, .nav-link-mobile');

    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        // Considerar que 'index.html' es la ruta base para '#sobre-mi'
        const linkHash = linkHref.includes('#') ? linkHref.substring(linkHref.indexOf('#')) : '#sobre-mi';

        if (linkHash === currentHash) {
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
 * @param {string} pageId - El identificador de la página a cargar (ej. 'experiencia').
 */
async function loadPageContent(pageId) {
    const mainContent = document.getElementById('main-content');
    if (!mainContent) return;

    // Guardar el contenido inicial de "Sobre Mí" la primera vez
    if (!initialContent) {
        initialContent = mainContent.innerHTML;
    }

    // Si es la página de inicio (o el hash está vacío), restaurar desde la variable
    if (pageId === 'sobre-mi' || pageId === '') {
        mainContent.innerHTML = initialContent;
        document.title = 'Pedro Úbeda Sánchez | Técnico en Informática, Aviónica y Administración';
        setActiveNavLink();
        setupScrollAnimations(); // Re-inicializar animaciones para el contenido restaurado
        window.scrollTo(0, 0);
        return;
    }

    // Usar caché para no volver a solicitar archivos ya cargados
    if (pageCache.has(pageId)) {
        const { content, title } = pageCache.get(pageId);
        mainContent.innerHTML = content;
        document.title = title;
    } else {
        mainContent.innerHTML = '<div class="text-center p-12">Cargando...</div>';
        try {
            const response = await fetch(`${pageId}.html`);
            if (!response.ok) throw new Error(`Página no encontrada: ${pageId}.html`);
            
            const html = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            
            const newContent = doc.getElementById('main-content').innerHTML;
            const newTitle = doc.querySelector('title').textContent;

            pageCache.set(pageId, { content: newContent, title: newTitle });
            mainContent.innerHTML = newContent;
            document.title = newTitle;
        } catch (error) {
            console.error(error);
            mainContent.innerHTML = '<div class="text-center p-12">Error al cargar el contenido.</div>';
        }
    }

    window.scrollTo(0, 0);
    setActiveNavLink();
    // Re-inicializar scripts que dependen del nuevo contenido
    setupScrollAnimations();
    if (pageId === 'contacto') {
        setupFormValidation();
    }
}

/**
 * Inicializa el router de la SPA.
 */
function initializeRouter() {
    window.addEventListener('hashchange', () => loadPageContent(window.location.hash.substring(1)));
    // Cargar contenido inicial basado en el hash al cargar la página
    loadPageContent(window.location.hash ? window.location.hash.substring(1) : 'sobre-mi');
}

document.addEventListener('DOMContentLoaded', () => {
    // Muestra el cuerpo de la página una vez que el DOM está listo.
    document.body.style.opacity = '1';

    // Cargar componentes y luego inicializar los scripts que dependen de ellos
    Promise.all([
        loadComponent('#header', 'header.html'),
        loadComponent('#footer', 'footer.html')
    ]).then(() => {
        // Estos scripts dependen de que el header y el footer estén cargados
        initializeMobileMenu();
        initializeRouter(); // El router ahora se encarga de llamar a setActiveNavLink
    });

    // Estos scripts se pueden inicializar de inmediato
    setupSkipLink();
    setupPhoneObfuscation('phone-contact', 'phone-text-contact');
    setupPhoneObfuscation('phone-cv', 'phone-text-cv', '📞 ');
    setupPrintButton();
    // La validación del formulario y las animaciones se llamarán después de cargar cada página
    setupBackToTopButton();
});
