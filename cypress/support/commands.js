// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
// cypress/support/commands.js
import { loginPage } from './pom/loginPage';

Cypress.Commands.add('login', (environment = 'test') => {
  cy.fixture('testData').then((data) => {
    cy.visit('/');
    // Get the correct user credentials based on the environment
    const username = data[environment].username;
    const password = data[environment].password;

    // Use the username and password to log in
    loginPage.login(username, password);
  });
});
