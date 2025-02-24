Cypress.Commands.add('login', (email, password) => {
    cy.visit('/', {
        auth: {
            username: Cypress.env('username'),
            password: Cypress.env('password'),
        },
    });
    cy.get('.btn-outline-white.header_signin').click();
    cy.get('#signinEmail').type(email);
    cy.get('#signinPassword').type(password, { sensitive: true });
    cy.get('button.btn-primary').click();
});
