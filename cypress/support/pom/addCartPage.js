class addCartPage {
    elements = {
      addToCart: () => cy.get(':nth-child(3) > .product-item > .details > .add-info > .buttons > .button-2'),
      notification: () => cy.get('#bar-notification'),
      shoppingCart: () => cy.get('.ico-cart > .cart-label'),
      checkBox: ()=>cy.get('.remove-from-cart > input'),
      termsAndCondetion: ()=> cy.get('#termsofservice'),
      checkOut: () => cy.get('#checkout'),
      billingAddress: ()=> cy.get('#billing-buttons-container > .button-1'),
      pickUp:()=>cy.get('#PickUpInStore'),
      shoppingAddress: ()=>cy.get('#shipping-buttons-container > .button-1'),
      creditCard:()=>cy.get('#paymentmethod_2'),
      paymentMethod: ()=>cy.get('#payment-method-buttons-container > .button-1'),
      cardHolderName:()=>cy.get('#CardNumber'),
      paymentInfo:()=>cy.get('#payment-info-buttons-container > .button-1'),

    };
  
    addCart() {
      this.elements.addToCart().should('be.visible').click();
      this.elements.notification().should('be.visible'); // Verifies if notification is shown
      this.elements.shoppingCart().should('be.visible').click(); // Click the cart
      this.elements.checkBox().should('be.visible').click(); // Click the cart
      this.elements.termsAndCondetion().should('be.visible').click(); // Click the cart
      this.elements.checkOut().should('be.visible').click(); // Proceed to checkout
      this.elements.billingAddress().should('be.visible').click();
      this.elements.pickUp().should('be.visible').click();
      this.elements.shoppingAddress().should('be.visible').click();
      this.elements.creditCard().should('be.visible').click();
      this.elements.paymentMethod().should('be.visible').click();
      this.elements.cardHolderName().should('be.visible').type('tanushree');
      this.elements.paymentInfo().should('be.visible').click();
    }
  }
  
  // Export the instance of the class
  export const addCartPageInstance = new addCartPage();
  