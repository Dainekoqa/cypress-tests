class RegistrationPage {
  get nameInput() {
      return cy.get('#signupName');
  }

  get lastNameInput() {
      return cy.get('#signupLastName');
  }

  get emailInput() {
      return cy.get('#signupEmail');
  }

  get passwordInput() {
      return cy.get('#signupPassword');
  }

  get repeatPasswordInput() {
      return cy.get('#signupRepeatPassword');
  }

  get registerButton() {
      return cy.contains('button', 'Register');
  }

  fillRegistrationForm(name, lastName, email, password, repeatPassword) {
      this.nameInput.type(name);
      this.lastNameInput.type(lastName);
      this.emailInput.type(email);
      this.passwordInput.type(password);
      this.repeatPasswordInput.type(repeatPassword);
  }

  submit() {
      this.registerButton.click();
  }
}

export default new RegistrationPage();
