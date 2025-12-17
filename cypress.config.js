const { defineConfig } = require("cypress");

module.exports = defineConfig({
  retries: {
    runMode: 2,
    openMode: 0,
  },
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/results",
    overwrite: false,
    html: false,
    json: true,
  },
  e2e: {
    baseUrl: "https://front.serverest.dev",
    env: {
      baseApiUrl: "https://serverest.dev",
    },
    setupNodeEvents(on, config) {
      return config;
    },
  },
});
