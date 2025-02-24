const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://qauto.forstudy.space/",
    defaultCommandTimeout: 8000,
    viewportWidth: 1280,
    viewportHeight: 720,
    env: {
      username: "guest",
      password: "welcome2qauto",
    },
  },
});

