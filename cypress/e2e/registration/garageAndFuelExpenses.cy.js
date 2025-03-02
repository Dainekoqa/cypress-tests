/// <reference types="cypress" />

import RegistrationPage from '../pageObjects/RegistrationPage';
import LoginPage from '../pageObjects/LoginPage';
import GarageFuelPage from '../pageObjects/GarageFuelPage';

describe('Registers a new user, logs in, adds a car and logs fuel expenses', () => {
    const baseUrl = 'https://qauto.forstudy.space/';
    const email = `testuser+${Date.now()}@example.com`;
    const password = 'Test1234';

    beforeEach(() => {
        cy.visit(baseUrl, {
            auth: {
                username: 'guest',
                password: 'welcome2qauto',
            },
        });
    });

    it('Registers a new user, logs out, logs in, adds a car and logs fuel expenses', () => {
        // Open Sign Up form
        cy.contains('button', 'Sign up').click();

        // Fill registration form
        RegistrationPage.fillRegistrationForm('Test', 'User', email, password, password);

        // Submit registration form
        cy.intercept('POST', '**/api/auth/signup').as('signupRequest');
        cy.contains('button', 'Register').click();
        cy.wait('@signupRequest');

        // Verify redirect to garage
        cy.url().should('include', '/panel/garage');

        // Log out
        cy.contains('a', 'Log out').click();
        cy.url().should('eq', baseUrl);

        // Log in
        cy.contains('button', 'Sign In').click();
        LoginPage.login(email, password);

        // Verify successful login
        cy.url().should('include', '/panel/garage');

       // Intercept request but don't fail if it doesn't happen
cy.intercept('GET', '**/api/cars/brands*').as('getBrands');

// Open the "Add Car" modal
cy.contains('button', 'Add car').click();

// Ensure that the mileage field is visible
cy.get('input[formcontrolname="mileage"]').should('be.visible');

// Enter mileage
cy.get('input[formcontrolname="mileage"]').type('1000');

// Click "Add" button
cy.get('button.btn.btn-primary').contains('Add').click({ force: true });

// Verify the car was added (assuming it appears in the garage)
cy.contains('.car-item', 'Audi TT').should('be.visible');

// Log fuel expenses
cy.contains('button', 'Fuel expenses').click();
cy.get('input[name="fuelAmount"]').type('350');
cy.get('input[name="fuelPrice"]').type('30');
cy.get('input[name="odometer"]').type('60');
cy.contains('button', 'Save').click();

// Verify fuel expense was added
cy.contains('.fuel-expense-entry', '350 km').should('be.visible');

    });
});
