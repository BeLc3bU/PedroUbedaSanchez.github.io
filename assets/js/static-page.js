/**
 * Script para páginas estáticas (no SPA) como curriculum.html y gracias.html.
 * Contiene solo las funcionalidades necesarias para estas páginas.
 */

/**
 * Ofusca un número de teléfono, revelándolo al hacer clic.
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
        textElement.textContent = `${prefix}${phoneNumber}`.trim();
        linkElement.href = `tel:${phoneNumber.replace(/\s/g, '')}`;
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

    // Prevenir la creación duplicada del botón
    if (document.getElementById('home-button')) return;

    const homeButton = document.createElement('button');
    homeButton.id = 'home-button';
    homeButton.className = 'bg-slate-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-slate-600 transition-colors duration-300 shadow-lg transform hover:scale-105 ml-4';
    homeButton.innerHTML = '🏠 Volver a la página principal';
    homeButton.addEventListener('click', () => window.location.href = '/');
    printButton.insertAdjacentElement('afterend', homeButton);
}

/**
 * Gestiona la visibilidad y funcionalidad del botón "Volver Arriba".
 */
function setupBackToTopButton() {
    const backToTopButton = document.getElementById('back-to-top');
    if (!backToTopButton) return;

    window.addEventListener('scroll', () => {
        backToTopButton.classList.toggle('is-visible', window.scrollY > 300);
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Muestra el cuerpo de la página para evitar FOUC
    document.body.style.opacity = '1';

    // Inicializa los scripts específicos para las páginas estáticas
    setupPhoneObfuscation('phone-cv', 'phone-text-cv', '📞 ');
    setupPrintButton();
    setupBackToTopButton();
});