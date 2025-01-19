class checkOutPage{
    elements ={
      shoppingCart: () => cy.get('.ico-cart > .cart-label'),
      checkBox1: ()=>cy.get(':nth-child(1) > .remove-from-cart > input'),
      checkBox2: ()=>cy.get(':nth-child(2) > .remove-from-cart > input'),
      termsAndCondetion: ()=> cy.get('#termsofservice'),
      checkOut: () => cy.get('#checkout'),
      billingAddress: ()=> cy.get('#billing-buttons-container > .button-1'),
      pickUp:()=>cy.get('#PickUpInStore'),
      shoppingAddress: ()=>cy.get('#shipping-buttons-container > .button-1'),
      creditCard:()=> cy.get('#paymentmethod_0'),
      paymentMethod: ()=>cy.get('#payment-method-buttons-container > .button-1'),
      paymentInfo:()=>cy.get('#payment-info-buttons-container > .button-1'),
      confirmButton: ()=> cy.get('#confirm-order-buttons-container > .button-1'),
      notification:()=>cy.get('strong')

    };
    checkOut(){
      this.elements.shoppingCart().should('be.visible').click(); // Click the cart
      this.elements.checkBox1().should('be.visible').click(); // Click the cart
      this.elements.checkBox2().should('be.visible').click(); // Click the cart
      this.elements.termsAndCondetion().should('be.visible').click(); // Click the cart
      this.elements.checkOut().should('be.visible').click(); // Proceed to checkout
      this.elements.billingAddress().should('be.visible').click();
      this.elements.pickUp().should('be.visible').click();
      this.elements.shoppingAddress().should('be.visible').click();
      this.elements.creditCard().should('be.visible').click();
      this.elements.paymentMethod().should('be.visible').click();
      this.elements.paymentInfo().should('be.visible').click();
      this.elements.confirmButton().should('be.visible').click();
      this.elements.confirmButton().should('be.visible')


    }
    
}
export const checkOutPageInstance  = new checkOutPage();