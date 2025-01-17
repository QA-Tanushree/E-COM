//cypress.config.js
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.CYPRESS_ENV === 'live' 
      ? 'https://demowebshop.tricentis.com/login' 
      : 'https://demowebshop.tricentis.com/login',
    
    setupNodeEvents(on, config) {
      on('task', {
        log(message) {
          console.log(message);
          return null;
        },
      });

      config.env.envType = process.env.CYPRESS_ENV || 'test';
      return config;
    },

    env: {
      loginTimeout: 8000, // Timeout for login
    },

    retries: {
      runMode: 2,
      openMode: 0,
    },

    viewportWidth: 1280,
    viewportHeight: 720,
    video: true,
    screenshotsFolder: 'cypress/screenshots',
    videosFolder: 'cypress/videos',
    defaultCommandTimeout: 8000,
    pageLoadTimeout: 120000, // Increased timeout
  },
});
