/// <reference types="cypress" />

describe('Profile Page Intercept Test', () => {
  beforeEach(() => {
      cy.login(); // Perform authentication if you have a separate login command
  });

  it('Should change displayed username using intercept', () => {
      cy.intercept('GET', '**/api/profile', {
          statusCode: 200,
          body: {
              status: "ok",
              data: {
                  firstName: "TestName",
                  lastName: "TestLastName",
                  email: "test@example.com"
              }
          }
      }).as('getProfile');

      cy.visit('/panel/profile');
      cy.wait('@getProfile');

      // Verify that the name has changed
      cy.get('input[placeholder="First Name"]').should('have.value', 'TestName');
      cy.get('input[placeholder="Last Name"]').should('have.value', 'TestLastName');
  });
});
