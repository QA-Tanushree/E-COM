import { loginPage } from "../support/pom/loginPage";

describe('Login Tests', () => {
  let environmentData;
  let messages;
  const environment = Cypress.env('envType') || 'test';

  before(() => {
    // Load environment-specific test data
    cy.fixture('testData').then((data) => {
      environmentData = data[environment];
    });

    // Load validation messages
    cy.fixture('messages').then((msg) => {
      messages = msg;
    });
  });

  beforeEach(() => {
    cy.visit('/');
  });

  it('Neg: User Name should mandatory', () => {
    loginPage.loginValidationTest('', environmentData.password, messages.login.usernameRequired);
  });

  it('Neg: Password should mandatory', () => {
    loginPage.loginValidationTest(environmentData.username, '', messages.login.passwordRequired);
  });

  it('Neg: Invalid user should not login', () => {
    loginPage.loginValidationTest(environmentData.invalidUsername, environmentData.password, messages.login.invalidUsername);
  });

  it('Neg: Invalid Password should not work', () => {
    loginPage.loginValidationTest(environmentData.username, environmentData.invalidPassword, messages.login.invalidPassword);
  });

  it('Positive: Login should succeed with valid credentials', () => {
    loginPage.login(environmentData.username, environmentData.password);
  });
});
