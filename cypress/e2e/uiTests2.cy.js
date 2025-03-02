/// <reference types="cypress" />

describe('Intercept Profile Data and Verify UI Change', () => {
    const baseUrl = 'https://qauto.forstudy.space/';
    const email = 'irene@gmail.com';
    const password = 'Qwerty123';

    beforeEach(() => {
        // Visit the login page with guest authentication
        cy.visit(baseUrl, {
            auth: {
                username: 'guest',
                password: 'welcome2qauto'
            }
        });

        // Click the "Sign In" button
        cy.get('button.header_signin').click();

        // Enter email and password
        cy.get('#signinEmail').type(email);
        cy.get('#signinPassword').type(password);

        // Click the "Login" button
        cy.contains('button', 'Login').click();

        // Verify successful login and redirection to the garage page
        cy.url().should('include', '/panel/garage');
    });

    it('Should verify that profile name is updated in the UI', () => {
        // Intercept the profile request and modify the user name
        cy.intercept('GET', '**/api/users/profile', (req) => {
            req.reply((res) => {
                res.body.data.name = 'Polar';
                res.body.data.lastname = 'Bear';
            });
        }).as('profileData');

        // Open the profile dropdown menu
        cy.get('nav.user-nav_menu').click({ force: true });

        // Wait to ensure the menu is opened
        cy.wait(500);

        // Navigate to the profile page
        cy.contains('a', 'Profile').click({ force: true });

        // Wait for the intercepted request
        cy.wait('@profileData');

        // Verify that the modified name is displayed in the UI
        cy.contains('.profile-name', 'Polar Bear').should('be.visible');

        // Additional verification: check if the specific element contains the updated name
        cy.get('.profile_name.display-4').should('contain.text', 'Polar Bear');
    });
});
