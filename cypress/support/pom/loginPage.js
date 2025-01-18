class LoginPage {
    elements = {
      usernameField: () => cy.get('#Email'),
      passwordField: () => cy.get('#Password'),
      capture: () => cy.get('#RememberMe'),
      loginButton: () => cy.get('form > .buttons > .button-1'),
      verifyLogin: () => cy.get('.header-logo > a > img'),
    };
  
    login(username, password) {
      this.elements.usernameField().should('be.visible').type(username);
      this.elements.passwordField().should('be.visible').type(password);
      this.elements.capture().should('be.enabled').click();
      this.elements.loginButton().should('be.enabled').click();
      this.elements.verifyLogin().should('be.visible');
    }
  
    loginValidationTest(username, password, expectedErrorMessage) {
      // Handle the username input
      if (username === '') {
        this.elements.usernameField().should('be.visible').clear(); // Clear without typing
      } else {
        this.elements.usernameField().should('be.visible').clear().type(username); // Type username if provided
      }
  
      // Handle the password input
      if (password === '') {
        this.elements.passwordField().should('be.visible').clear(); // Clear without typing
      } else {
        this.elements.passwordField().should('be.visible').clear().type(password); // Type password if provided
      }
  
      // Optionally interact with the checkbox
      this.elements.capture().should('be.enabled').click();
  
      // Click the login button
      this.elements.loginButton().should('be.enabled').click();
  
      // Check for error message using a switch-case-like structure
      cy.get('body').then(($body) => {
        let errorSelector;
  
        switch (true) {
          case $body.find('.field-validation-error > span').length > 0:
            errorSelector = '.field-validation-error > span';
            break;
          case $body.find('.validation-summary-errors > ul > li').length > 0:
            errorSelector = '.validation-summary-errors > ul > li';
            break;
          default:
            throw new Error('No error message element found!');
        }
  
        // Validate the error message
        cy.get(errorSelector)
          .should('be.visible')
          .and('contain.text', expectedErrorMessage);
      });
    }
  }
  
  export const loginPage = new LoginPage();
  