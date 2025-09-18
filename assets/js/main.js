document.addEventListener('DOMContentLoaded', function () {
    // Lógica para el menú móvil
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            const isHidden = mobileMenu.classList.toggle('hidden');
            mobileMenuButton.setAttribute('aria-expanded', !isHidden);

            // Gestionar el foco
            if (!isHidden) {
                // Si el menú se muestra, mover el foco al primer enlace
                mobileMenu.querySelector('a').focus();
            }
        });
    }

    const mobileLinks = document.querySelectorAll('.nav-link-mobile');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu) {
                mobileMenu.classList.add('hidden');
                mobileMenuButton.setAttribute('aria-expanded', 'false');
                mobileMenuButton.focus(); // Devolver el foco al botón del menú
            }
        });
    });

    // Lógica para el enlace de navegación activo
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-link, .nav-link-mobile');

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        // Comprueba si el href del enlace coincide con la página actual.
        // También maneja el caso de la página de inicio (index.html) cuando la ruta está vacía.
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });

    // Lógica para la transición entre páginas
    const currentPageFile = window.location.pathname.split('/').pop();

    document.querySelectorAll('a[href]').forEach(link => {
        const linkHref = link.getAttribute('href');

        // Ignorar enlaces sin href, anclas, o protocolos externos
        if (!linkHref || linkHref.startsWith('#') || linkHref.startsWith('mailto:') || linkHref.startsWith('tel:')) {
            return;
        }

        // Ignorar enlaces externos, de descarga, o que abren en una nueva pestaña
        if (link.hostname !== window.location.hostname || link.hasAttribute('download') || link.target === '_blank') {
            return;
        }

        // Comprobar si el enlace apunta a la página actual para evitar el efecto de recarga
        const linkPageFile = linkHref.split('/').pop();
        const isSamePage = linkPageFile === currentPageFile || (currentPageFile === '' && (linkPageFile === 'index.html' || linkPageFile === ''));

        if (!isSamePage) {
            link.addEventListener('click', function (e) {
                const destination = this.href;
                e.preventDefault();
                document.body.classList.add('fade-out');
                setTimeout(() => { window.location.href = destination; }, 500);
            });
        }
    });

    /**
     * Función reutilizable para ofuscar y mostrar un número de teléfono al pasar el ratón.
     * @param {string} linkId - El ID del elemento <a> que contendrá el enlace tel:.
     * @param {string} textId - El ID del elemento <span> que mostrará el texto del teléfono.
     * @param {string} [prefix=''] - Un prefijo opcional para añadir antes del número (ej. un emoji).
     */
    const setupPhoneObfuscation = (linkId, textId, prefix = '') => {
        const linkElement = document.getElementById(linkId);
        const textElement = document.getElementById(textId);

        if (!linkElement || !textElement) return; // No hacer nada si los elementos no existen en la página

        const originalText = textElement.textContent;

        linkElement.addEventListener('mouseover', function() {
            const part1 = '635';
            const part2 = '945';
            const part3 = '779';
            this.href = 'tel:' + part1 + part2 + part3;
            textElement.textContent = `${prefix}${part1} ${part2} ${part3}`.trim();
        });

        linkElement.addEventListener('mouseout', function() {
            this.href = '#';
            textElement.textContent = originalText;
        });
    };

    // Inicializar la ofuscación para los diferentes elementos
    setupPhoneObfuscation('phone-contact', 'phone-text-contact');
    setupPhoneObfuscation('phone-cv', 'phone-text-cv', '📞 ');

    // Lógica para el botón de imprimir en curriculum.html
    const printButton = document.getElementById('print-button');
    if (printButton) {
        printButton.addEventListener('click', () => window.print());

        // Crear y añadir el botón de "Volver" usando buenas prácticas
        const homeButton = document.createElement('button');
        homeButton.id = 'home-button';
        homeButton.className = 'bg-gray-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors duration-300 shadow-lg transform hover:scale-105 ml-4';
        homeButton.innerHTML = '🏠 Volver a la página principal';
        homeButton.addEventListener('click', () => window.location.href = 'index.html');
        printButton.insertAdjacentElement('afterend', homeButton);
    }
});
