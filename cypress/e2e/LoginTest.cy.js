import HomePage from '../../support/pages/HomePage';
import StudentLoginMenu from '../../support/pages/StudentLoginMenu';
import LoginPage from '../../support/pages/LoginPage';

describe('WiseAdmit Login Tests (POM)', () => {

  const VALID_EMAIL = Cypress.env('TEST_EMAIL');
  const VALID_PASSWORD = Cypress.env('TEST_PASSWORD');

  before(() => {
    if (!VALID_EMAIL || !VALID_PASSWORD) {
      throw new Error('TEST_EMAIL and TEST_PASSWORD must be set');
    }
  });

  beforeEach(() => {
    cy.viewport(1920, 1080);

    HomePage.open();

    cy.on('uncaught:exception', () => false);

    // Navigate login flow
    HomePage.clickAreYouStudent();
    HomePage.clickLogin();
    StudentLoginMenu.clickLoginAsStudent();
  });

  it('should successfully login with valid credentials', () => {
    LoginPage.enterEmail(VALID_EMAIL);
    LoginPage.clickLoginBtn();

    LoginPage.enterPassword(VALID_PASSWORD);
    LoginPage.clickLoginBtn();

    LoginPage.verifyDashboard();
  });

  it('should fail login with invalid email', () => {
    LoginPage.enterEmail('invalid@email.com');
    LoginPage.clickLoginBtn();

    cy.contains('Failed to get student', { timeout: 5000 }).should('be.visible');
  });

  it('should fail login with valid email but wrong password', () => {
    LoginPage.enterEmail(VALID_EMAIL);
    LoginPage.clickLoginBtn();

    LoginPage.enterPassword('WrongPassword123');
    LoginPage.clickLoginBtn();

    LoginPage.verifyInvalidCredentials();
  });

  it('should validate invalid email formats', () => {
    const invalidEmails = [
      'notanemail',
      'missing@domain',
      '@nodomain.com',
      'spaces in@email.com',
      'double@@domain.com'
    ];

    invalidEmails.forEach((email) => {
      LoginPage.enterEmail(email);
      LoginPage.clickLoginBtn();
      LoginPage.verifyEmailError();
    });
  });

  it('should validate empty password field', () => {
    LoginPage.enterEmail(VALID_EMAIL);
    LoginPage.clickLoginBtn();
    LoginPage.verifyMissingPassword();
  });

  afterEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

});
