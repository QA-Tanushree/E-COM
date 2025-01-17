import { loginPage } from "../pom/loginPage";

describe('Login Tests', () => {
  let environmentData;
  const environment = Cypress.env('envType') || 'test';
  before(() => {
    cy.fixture('testData').then((data) => {
      environmentData = data[environment];
    });
  });
  beforeEach(() => {
    cy.visit('/');
  });
  it('Logs in with valid credentials', () => {
    loginPage.login(environmentData.username, environmentData.password);
  });
});
