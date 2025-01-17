import { loginPage } from "../pom/loginPage";

describe('Login Tests', () => {

  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/')

  });



  it('Fails to log in with a locked-out user', () => {
    cy.get('.error-message')
      .should('contain', 'User is locked out');
  });
});
