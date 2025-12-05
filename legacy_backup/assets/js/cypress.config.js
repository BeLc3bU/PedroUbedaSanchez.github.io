const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    // La URL base de tu servidor de desarrollo.
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});