/**
 * Gestiona la apertura, cierre y accesibilidad del menú de navegación móvil.
 */
function setupMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (!mobileMenuButton || !mobileMenu) return;

    const closeMenu = () => {
        mobileMenu.classList.add('hidden');
        mobileMenuButton.setAttribute('aria-expanded', 'false');
        mobileMenuButton.focus();
    };

    const openMenu = () => {
        mobileMenu.classList.remove('hidden');
        mobileMenuButton.setAttribute('aria-expanded', 'true');
        mobileMenu.querySelector('a').focus();
    };

    mobileMenuButton.addEventListener('click', () => {
        const isHidden = mobileMenu.classList.contains('hidden');
        if (isHidden) {
            openMenu();
        } else {
            closeMenu();
        }
    });

    mobileMenu.querySelectorAll('.nav-link-mobile').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // UX: Cerrar menú con la tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
            closeMenu();
        }
    });

    // UX: Cerrar menú al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (!mobileMenu.classList.contains('hidden') && !mobileMenu.contains(e.target) && e.target !== mobileMenuButton) {
            closeMenu();
        }
    });
}

/**
 * Resalta el enlace de navegación correspondiente a la página actual.
 */
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link, .nav-link-mobile');

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });
}

/**
 * Añade una animación de "fade-out" al navegar entre páginas internas.
 */
function setupPageTransitions() {
    const currentPageFile = window.location.pathname.split('/').pop() || 'index.html';

    document.querySelectorAll('a[href]').forEach(link => {
        // Ignorar enlaces sin href, anclas, o protocolos externos
        if (!link.href || link.href.includes('#') || !link.href.startsWith(window.location.origin)) {
            return;
        }

        // Ignorar enlaces de descarga o que abren en una nueva pestaña
        if (link.hasAttribute('download') || link.target === '_blank') {
            return;
        }

        const linkPageFile = link.pathname.split('/').pop() || 'index.html';
        if (linkPageFile !== currentPageFile) {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                document.body.classList.add('fade-out');
                setTimeout(() => { window.location.href = this.href; }, 500);
            });
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
    const phoneNumber = ['635', '945', '779'];

    const revealPhone = () => {
        linkElement.href = 'tel:' + phoneNumber.join('');
        textElement.textContent = `${prefix}${phoneNumber.join(' ')}`.trim();
    };

    const hidePhone = () => {
        linkElement.href = '#';
        textElement.textContent = originalText;
    };

    linkElement.addEventListener('mouseover', revealPhone);
    linkElement.addEventListener('focus', revealPhone);
    linkElement.addEventListener('mouseout', hidePhone);
    linkElement.addEventListener('blur', hidePhone);
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
 * Aplica una animación de entrada escalonada a los elementos designados.
 */
function staggerAnimations() {
    document.querySelectorAll('.stagger-item').forEach((item, index) => {
        item.style.animationDelay = `${index * 100}ms`;
    });
}


document.addEventListener('DOMContentLoaded', () => {
    setupMobileMenu();
    setActiveNavLink();
    setupPageTransitions();
    setupPhoneObfuscation('phone-contact', 'phone-text-contact');
    setupPhoneObfuscation('phone-cv', 'phone-text-cv', '📞 ');
    setupPrintButton();
    staggerAnimations();
});
