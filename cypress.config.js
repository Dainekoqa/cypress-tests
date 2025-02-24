const { defineConfig } = require('cypress');

module.exports = defineConfig({
    e2e: {
        baseUrl: 'https://qauto.forstudy.space/',
        defaultCommandTimeout: 8000,
        viewportWidth: 1280,
        viewportHeight: 720,
        auth: {
            username: 'guest',
            password: 'welcome2qauto'
        },
        setupNodeEvents(on, config) {
            require('cypress-mochawesome-reporter/plugin')(on);
        }
    },
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
        reportDir: 'cypress/reports',
        overwrite: false,
        html: true,
        json: true,
        charts: true
    }
});
