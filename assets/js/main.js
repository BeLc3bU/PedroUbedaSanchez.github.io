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
 */
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    // Se ejecuta en el siguiente ciclo de eventos para asegurar que el header esté cargado
    setTimeout(() => {
        const navLinks = document.querySelectorAll('.nav-link, .nav-link-mobile');

        navLinks.forEach(link => {
            const linkPage = link.getAttribute('href');
            if (linkPage === currentPage) {
                link.setAttribute('aria-current', 'page');
            } else {
                link.removeAttribute('aria-current');
            }
        });
    }, 0);
}

/**
 * Añade una animación de "fade-out" al navegar entre páginas internas.
 */
function setupPageTransitions() {
    const currentPageFile = window.location.pathname.split('/').pop() || 'index.html';

    // Usar delegación de eventos para que funcione con el header cargado dinámicamente
    document.body.addEventListener('click', function(e) {
        const link = e.target.closest('a[href]');

        if (link) {
            // Ignorar enlaces sin href, anclas, o protocolos externos
            if (!link.href || link.href.includes('#') || !link.href.startsWith(window.location.origin)) {
                return;
            }

            // Ignorar enlaces de descarga o que abren en una nueva pestaña
            if (link.hasAttribute('download') || link.target === '_blank') {
                return;
            }

            const linkPageFile = new URL(link.href).pathname.split('/').pop() || 'index.html';
            if (linkPageFile !== currentPageFile) {
                e.preventDefault();
                document.body.classList.add('slide-out');
                setTimeout(() => { window.location.href = link.href; }, 500);
            }
        }
    });
}

/**
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
 * Gestiona el banner de consentimiento de cookies.
 */
function setupCookieConsent() {
    const banner = document.getElementById('cookie-banner');
    const acceptButton = document.getElementById('accept-cookies');

    if (!banner || !acceptButton) return;

    // Si el consentimiento ya fue dado, eliminar el banner del DOM.
    if (localStorage.getItem('cookie_consent') === 'true') {
        banner.remove();
        return;
    }

    // Mostrar el banner después de un breve retraso.
    setTimeout(() => {
        banner.classList.add('is-visible');
    }, 1500);

    // Al hacer clic en aceptar, guardar la preferencia y ocultar el banner.
    acceptButton.addEventListener('click', () => {
        localStorage.setItem('cookie_consent', 'true');
        banner.classList.remove('is-visible');
        banner.addEventListener('transitionend', () => banner.remove(), { once: true });
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

document.addEventListener('DOMContentLoaded', () => {
    // Cargar componentes y luego inicializar los scripts que dependen de ellos
    Promise.all([
        loadComponent('#header', 'header.html'),
        loadComponent('#footer', 'footer.html')
    ]).then(() => {
        // Estos scripts dependen de que el header y el footer estén cargados
        initializeMobileMenu();
        setActiveNavLink();
    });

    // Estos scripts se pueden inicializar de inmediato
    setupSkipLink();
    setupPageTransitions();
    setupPhoneObfuscation('phone-contact', 'phone-text-contact');
    setupPhoneObfuscation('phone-cv', 'phone-text-cv', '📞 ');
    setupPrintButton();
    setupFormValidation();
    setupScrollAnimations();
    setupBackToTopButton();
    setupCookieConsent();
});
