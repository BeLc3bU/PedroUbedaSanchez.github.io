describe('Pruebas de Navegación y Funcionalidad de la SPA', () => {
  
  beforeEach(() => {
    // Antes de cada prueba, visita la página principal.
    // Asegúrate de tener tu servidor local corriendo con `npm run serve`.
    cy.visit('/');
  });

  it('debería cargar la página principal correctamente', () => {
    cy.title().should('eq', 'Pedro Úbeda Sánchez | Técnico en Informática, Aviónica y Administración');
    cy.get('h1').should('contain.text', 'Técnico especialista en informática, aviónica y administración');
  });

  it('debería navegar a la página de Experiencia y mostrar el contenido correcto', () => {
    // Usar el selector de datos para mayor resiliencia
    cy.get('[data-cy=nav-link-experiencia]').click();

    // Verificar que la URL ha cambiado
    cy.url().should('include', '/experiencia');

    // Verificar que el nuevo contenido se ha cargado en el main
    cy.get('#main-content h1').should('contain.text', 'Experiencia Profesional');
    cy.title().should('include', 'Experiencia Profesional');
  });

  it('debería navegar a la página de Contacto y mostrar el formulario', () => {
    cy.get('[data-cy=nav-link-contacto]').click();
    cy.url().should('include', '/contacto');
    cy.get('#main-content h1').should('contain.text', 'Contacto');
    
    // Verificar que los campos del formulario existen
    cy.get('form #name').should('be.visible');
    cy.get('form #email').should('be.visible');
    cy.get('form #message').should('be.visible');
    cy.get('form button[type="submit"]').should('be.visible');
  });

  it('debería mostrar errores de validación en el formulario de contacto si se envía vacío', () => {
    cy.visit('/contacto');
    
    cy.get('form button[type="submit"]').click();

    cy.get('#name-error').should('contain.text', 'Este campo es obligatorio.');
    cy.get('#email-error').should('contain.text', 'Este campo es obligatorio.');
    cy.get('#message-error').should('contain.text', 'Este campo es obligatorio.');
  });
});