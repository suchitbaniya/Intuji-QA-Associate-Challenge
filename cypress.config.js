const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://automationexercise.com",
    specPattern: "cypress/e2e/**/*.cy.js",
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      return config;
    },
    viewportWidth: 1366,
    viewportHeight: 768,
    // Retries for flaky tests
    retries: {
      runMode: 2,
      openMode: 0
    }
  },
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    charts: true,
    reportPageTitle: "cypresss",
    embeddedScreenshots: true,
    inlineAssets: true
  },
  video: true,
  screenshotOnRunFailure: true
});
