# E-COM
Testing an e-commerce application demands a robust testing framework to ensure seamless user experience across features like login, product browsing, cart management, and checkout.

# Why Use Cypress for E-Commerce Testing?

Testing an e-commerce application demands a robust testing framework to ensure seamless user experience across features like login, product browsing, cart management, and checkout.
Cypress is ideal for this due to:

Real-time Test Execution:View tests as they run in an interactive browser.

Automatic Waiting: Cypress waits for elements to load, removing flaky tests caused by timing issues.

Powerful Debugging: Captures screenshots and detailed logs of every step.

CI/CD Integration: Easily integrates with CI/CD pipelines for automated testing.

# Project Structure

For our Cypress testing suite, we’ll structure the project as follows:


Fixtures:To store test data and reusable input.

Integration (E2E):Contains feature-specific test scripts like login, add-to-cart, and checkout tests.

Support: Houses custom commands and Page Object Models (POM).

Reports: Holds Mochawesome test reports.

![image](https://github.com/user-attachments/assets/6e270aa2-4828-4557-902a-98de8f902ea4)

# Implementation

Setting Up the Project
Initialize the project using:

bash

npm init -y  
npm install cypress --save-dev


Add the Cypress configuration file cypress.config.js to define base URLs, timeouts, and reporters.

# Cypress Configuration
In the cypress.config.js file, we define settings like base URLs, timeouts, and retry options:

javascript



module.exports = defineConfig({

  e2e: {
  
    baseUrl: process.env.CYPRESS_ENV === 'live' 
    
      ? 'https://ecommerce.com/live' 
      
      : 'https://ecommerce.com/test',
      
    retries: { runMode: 2, openMode: 0 },
    
    defaultCommandTimeout: 8000,
    
    pageLoadTimeout: 120000,
    
    video: true,
    
    screenshotsFolder: 'cypress/screenshots',
    
  },
  
  reporter: 'mochawesome',
  
  reporterOptions: {
  
    reportDir: 'cypress/reports',
    
    overwrite: false,
    
    html: false,
    
    json: true,
    
  },
  
});

# Page Object Model Implementation

I implement the Page Object Model (POM) for reusable and maintainable code. For example, the login page:

javascript



class LoginPage {

  elements = {
  
    usernameField: () => cy.get('#Email'),
    
    passwordField: () => cy.get('#Password'),
    
    loginButton: () => cy.get('form > .buttons > .button-1'),
    
  };

  login(username, password) {
  
    this.elements.usernameField().type(username);
    
    this.elements.passwordField().type(password);
    
    this.elements.loginButton().click();
    
  }
  
}

export const loginPage = new LoginPage();


# Test Scripts
Example test for validating login functionality:

javascript

describe('Login Tests', () => {
  before(() => {
    cy.fixture('testData').then((data) => {
      environmentData = data['test'];
    });
  });

  it('should login successfully with valid credentials', () => {
    cy.visit('/');
    loginPage.login(environmentData.username, environmentData.password);
  });

  it('should display error for invalid credentials', () => {
    loginPage.login('invalidUser', 'invalidPassword');
    cy.contains('Invalid username or password.').should('be.visible');
  });
});



# CI/CD Integration
Cypress can be integrated into a CI/CD pipeline using GitHub Actions. Below is an example of the nodejs-ci.yml configuration:

yaml

name: Node.js CI

on:
  push:
    branches:
      - main

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '16'

      - name: Install dependencies
        run: npm install

      - name: Run Cypress Tests
        run: npx cypress run
# Mochawesome Reports

Cypress integrates seamlessly with Mochawesome for generating visually appealing test reports. Reports are generated using the following script:

bash

npx mochawesome-merge cypress/reports/*.json -o merged.json  
npx mochawesome-report-generator merged.json


![image](https://github.com/user-attachments/assets/39d58d5c-cb2b-4554-a101-e812696a55fb)

npm install --save-dev mochawesome mochawesome-merge mochawesome-report-generator
npm install fs path


Directory Creation: Ensures both versioned and deployment directories are created if they don't already exist.

Version Increment: Correctly reads, increments, and saves the version in version.json.

Report Path Management: Ensures paths to the merged JSON, versioned report, and final deployment report are correctly handled.

File Cleanup: Deletes unnecessary files from reportDir while keeping versioned and deployment reports safe.

Error Handling: Adds checks and logs for potential errors during file operations and command execution.

# Conclusion

In this article, we showcased how Cypress can be leveraged to build a robust E2E testing framework for an e-commerce application. By following best practices like using POM, configuring retries, and integrating with CI/CD, you can ensure high-quality software delivery with minimal manual intervention.
