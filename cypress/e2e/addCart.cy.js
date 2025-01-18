import { addCartPageInstance } from "../support/pom/addCartPage"; // Correct the import

describe('Test Add Cart', () => {

  beforeEach(() => {
    cy.login(); // Make sure the login works before each test
  });

  it('should add item to cart and proceed to checkout', () => {
    addCartPageInstance.addCart(); // Use the correct instance here
  });

});
