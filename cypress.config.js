const { defineConfig } = require("cypress");

module.exports = defineConfig({
  retries: {
    runMode: 2,
    openMode: 0,
  },
  e2e: {
    baseUrl: "https://front.serverest.dev",
    env: {
      baseApiUrl: "https://serverest.dev",
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
