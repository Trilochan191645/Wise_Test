describe('WiseAdmit Login Tests', () => {

  const VALID_EMAIL = Cypress.env('TEST_EMAIL');
  const VALID_PASSWORD = Cypress.env('TEST_PASSWORD');

  // Validate that credentials are provided
  before(() => {
    if (!VALID_EMAIL || !VALID_PASSWORD) {
      throw new Error('TEST_EMAIL and TEST_PASSWORD environment variables must be set');
    }
  });

  beforeEach(() => {
    // Set viewport
    cy.viewport(1920, 1080);
    
    // Navigate to login page 
    cy.visit('/');
    
    // Handle any uncaught exceptions
    cy.on('uncaught:exception', (err, runnable) => {
      // Return false to prevent the test from failing
      return false;
    });
    
    // Navigate through login flow
    cy.contains('button', 'Are you a student?').should('be.visible').click();
    cy.contains('button', 'Login').should('be.visible').click();
    cy.contains('[role="menuitem"]', 'Login as a Student').should('be.visible').click();
  });

  it('should successfully login with valid credentials', () => {
    // Enter email
    cy.get('input[type="text"]')
      .type(VALID_EMAIL);
    
    // Click first login button
    cy.contains('button', 'Log in').should('be.visible').click();
    
    // Wait for password field and enter password
    cy.get('input[name="password"]', { timeout: 10000 })
      .should('be.visible')
      .clear()
      .type(VALID_PASSWORD);
    
    // Click final login button
    cy.contains('button', 'Log in').should('be.visible').click();
    
    // Verify successful login
    cy.contains('a', 'Dashboard', { timeout: 10000 })
      .should('be.visible');
    
    cy.contains('Nishan Kafle', { timeout: 10000 })
      .should('be.visible');
  });

  it('should fail login with invalid email and valid password', () => {
    // Enter invalid email
    cy.get('input[type="text"]')
      .first()
      .should('be.visible')
      .clear()
      .type('invalid@email.com');
    
    // Click login button
    cy.contains('button', 'Log in').should('be.visible').click();
    
    // Verify error message
    cy.contains('Failed to get student', { timeout: 5000 })
      .should('be.visible');
  });

  it('should fail login with valid email and incorrect password', () => {
    // Enter valid email
    cy.get('input[type="text"]')
      .first()
      .should('be.visible')
      .clear()
      .type(VALID_EMAIL);
    
    // Click first login button
    cy.contains('button', 'Log in').should('be.visible').click();
    
    // Enter incorrect password
    cy.get('input[name="password"]', { timeout: 10000 })
      .should('be.visible')
      .clear()
      .type('WrongPassword123');
    
    // Click final login button
    cy.contains('button', 'Log in').should('be.visible').click();
    
    // Verify error message
    cy.contains('Invalid Credentials', { timeout: 5000 })
      .should('be.visible');
  });

  it('should validate email format', () => {
    const invalidEmails = [
      'notanemail',
      'missing@domain',
      '@nodomain.com',
      'spaces in@email.com',
      'double@@domain.com'
    ];

    invalidEmails.forEach((email) => {
      // Enter invalid email
      cy.get('input[type="text"]')
        .first()
        .should('be.visible')
        .clear()
        .type(email);
      
      // Click login button
      cy.contains('button', 'Log in').should('be.visible').click();
      
      // Verify validation error
      cy.contains('Invalid Email', { timeout: 3000 })
        .should('be.visible');
      
      // Clear the field for next iteration
      cy.get('input[type="text"]')
        .first()
        .clear();
    });
  });

  it('should validate empty password field', () => {
    // Enter valid email
    cy.get('input[type="text"]')
      .should('be.visible')
      .clear()
      .type(VALID_EMAIL);
    
    // Click login button without entering password
    cy.contains('button', 'Log in').should('be.visible').click();
    
    // Verify required field validation
    cy.contains('Required', { timeout: 3000 })
      .should('be.visible');
  });

  afterEach(() => {
    // Clear cookies and local storage after each test
    cy.clearCookies();
    cy.clearLocalStorage();
  });
});