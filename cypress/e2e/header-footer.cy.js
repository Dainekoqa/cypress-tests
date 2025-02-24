describe("Header and Footer Tests", () => {
    beforeEach(() => {
        cy.visit('https://qauto.forstudy.space', {
            auth: {
                username: 'guest',
                password: 'welcome2qauto',
            },
        });
    });

    it("Check presence and correctness of social media links", () => {
        cy.get('.socials_link[href*="facebook.com"]')
            .should('be.visible')
            .invoke('attr', 'href').should('include', 'facebook.com');

        cy.get('.socials_link[href*="t.me"]')
            .should('be.visible')
            .invoke('attr', 'href').should('include', 't.me/ithillel');
    });

    it("Check presence and correctness of ithillel.ua link", () => {
        cy.get('.contacts_link.display-4')
            .should('be.visible')
            .invoke('attr', 'href').should('include', 'ithillel.ua');
    });

    it("Check opening of the Sign Up modal window", () => {
        cy.get('.hero-descriptor_btn.btn.btn-primary')
            .should('be.visible')
            .click();

        cy.get('.modal-content')
            .should('be.visible');

        cy.get('.modal-content input[name="name"]').should('be.visible');
        cy.get('.modal-content input[name="lastName"]').should('be.visible');
        cy.get('.modal-content input[name="email"]').should('be.visible');
        cy.get('.modal-content input[name="password"]').should('be.visible');
        cy.get('.modal-content input[name="repeatPassword"]').should('be.visible');
        cy.get('.modal-content button').contains('Register').should('be.visible');
    });
});
