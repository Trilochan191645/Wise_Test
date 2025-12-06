class HomePage {
  open() {
    cy.visit('/');
  }

  clickAreYouStudent() {
    return cy.contains('button', 'Are you a student?').should('be.visible').click();
  }

  clickLogin() {
    return cy.contains('button', 'Login').should('be.visible').click();
  }

   clickLoginAsStudent() {
    return cy.contains('[role="menuitem"]', 'Login as a Student')
      .should('be.visible')
      .click();
  }
}

export default new HomePage();
