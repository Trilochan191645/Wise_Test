class LoginPage {

  emailInput() {
    return cy.get('input[type="text"]').first();
  }

  passwordInput() {
    return cy.get('input[name="password"]');
  }

  clickLoginBtn() {
    return cy.contains('button', 'Log in').should('be.visible').click();
  }

  enterEmail(email) {
    this.emailInput().clear().type(email);
  }

  enterPassword(password) {
    this.passwordInput().should('be.visible').clear().type(password);
  }

  verifyDashboard() {
    cy.contains('a', 'Dashboard', { timeout: 10000 }).should('be.visible');
    cy.contains('Nishan Kafle', { timeout: 10000 }).should('be.visible');
  }

  verifyEmailError() {
    cy.contains('Invalid Email', { timeout: 3000 }).should('be.visible');
  }

  verifyInvalidCredentials() {
    cy.contains('Invalid Credentials', { timeout: 5000 }).should('be.visible');
  }

  verifyMissingPassword() {
    cy.contains('Required', { timeout: 3000 }).should('be.visible');
  }

}

export default new LoginPage();
