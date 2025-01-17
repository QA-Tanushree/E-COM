describe('E-Com', () => {
    it('Visits the Cypress docs', () => {
      cy.visit('https://www.cypress.io');
      cy.contains('Get Started').click();
      cy.url().should('include', '/docs');
    });
  });
  