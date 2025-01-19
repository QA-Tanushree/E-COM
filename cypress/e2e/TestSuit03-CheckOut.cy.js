import { checkOutPageInstance } from "../support/pom/checkOutPage";

describe('Test Checkout',()=>{
    beforeEach(()=>{
        cy.login();
    })

    it('Checkout should successful with valid info ',()=>{
        checkOutPageInstance.checkOut();
    })

    
})