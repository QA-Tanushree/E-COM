class addCartPage {
    elements = {
      addToCart: () => cy.get(':nth-child(3) > .product-item > .details > .add-info > .buttons > .button-2'),
      addProduct: ()=>cy.get(':nth-child(4) > .product-item > .details > .add-info > .buttons > .button-2'),
      secondProdectAdd:()=>cy.get('#add-to-cart-button-72'),
      notification: () => cy.get('#bar-notification'),
    };
  
    addCart() {
      this.elements.addToCart().should('be.visible').click();
      this.elements.notification().should('be.visible'); // Verifies if notification is shown
      this.elements.addProduct().should('be.visible').click();
      this.elements.secondProdectAdd().should('be.visible').click();
      this.elements.notification().should('be.visible'); // Verifies if notification is shown

    }
  }
  // Export the instance of the class
  export const addCartPageInstance = new addCartPage();
  