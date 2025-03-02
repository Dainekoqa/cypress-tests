class GarageFuelPage {
    get brandDropdown() {
        return cy.get('select#brand');
    }

    get modelDropdown() {
        return cy.get('select#model');
    }

    get mileageInput() {
        return cy.get('input#addCarMileage');
    }

    get addCarButton() {
        return cy.contains('button', 'Add');
    }

    selectBrandAndModel(brand, model) {
        cy.intercept('GET', '**/api/cars/models?carBrandId=*').as('getModels');

        // Select brand and wait for models to load
        this.brandDropdown.should('be.visible').select(brand);
        cy.wait('@getModels'); // Ensure models are loaded
        this.modelDropdown.should('be.visible').select(model);
    }

    enterMileage(mileage) {
        this.mileageInput.should('be.visible').click().clear().type(mileage);
    }

    submitCarForm() {
        this.addCarButton.should('be.visible').click();
    }

    addFuelExpense(distance, liters, price) {
        cy.contains('button', 'Add fuel expense').click();
        cy.get('input#distance').type(distance);
        cy.get('input#liters').type(liters);
        cy.get('input#price').type(price);
        cy.contains('button', 'Save').click();
    }
}

export default new GarageFuelPage();
