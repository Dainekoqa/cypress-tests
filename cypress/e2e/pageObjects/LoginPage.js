class LoginPage {
    get emailInput() {
        return cy.get('#signinEmail');
    }

    get passwordInput() {
        return cy.get('#signinPassword');
    }

    get loginButton() {
        return cy.contains('button', 'Login');
    }

    login(email, password) {
        this.emailInput.type(email);
        this.passwordInput.type(password, { sensitive: true });
        this.loginButton.click();
    }
}

export default new LoginPage();
