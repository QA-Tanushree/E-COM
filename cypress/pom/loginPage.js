class LoginPage {
    open() {
        const environment = Cypress.env('ENV') || 'test';

        cy.fixture('environment').then((envConfig) => {
            const url = envConfig[environment].url;
            cy.visit(url);
        });
    }
    elements = {
        usernameField: () => cy.get('#Email'),
        passwordField: () => cy.get('#Password'),
        capture:() => cy.get('#RememberMe'),
        loginButton: () => cy.get('form > .buttons > .button-1'),
    };
    

    login(username, password) {
        this.elements.usernameField().should('be.visible').type(username);
        this.elements.passwordField().should('be.visible').type(password);
        this.elements.capture().should('be.enabled').click();
        this.elements.loginButton().should('be.enabled').click();
    }
}

export const loginPage = new LoginPage();
