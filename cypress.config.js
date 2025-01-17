const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.CYPRESS_ENV === 'live'
      ? 'https://www.saucedemo.com/'  // Live environment URL
      : 'https://dev.saucedemo.com/',  // Development environment URL
    setupNodeEvents(on, config) {
      // Here, you can add event listeners or other configurations as needed
    },
  },
});
