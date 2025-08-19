export class CheckoutPage {
  get el() {
    return {
      proceedToCheckout: () => cy.contains('Proceed To Checkout'),
      commentBox: () => cy.get('[name="message"]'),
      placeOrder: () => cy.contains('Place Order'),
      nameOnCard: () => cy.get('[name="name_on_card"]'),
      cardNumber: () => cy.get('[name="card_number"]'),
      cvc: () => cy.get('[name="cvc"]'),
      expMonth: () => cy.get('[name="expiry_month"]'),
      expYear: () => cy.get('[name="expiry_year"]'),
      payBtn: () => cy.get('[data-qa="pay-button"]'),
      // Updated success message selectors based on your screenshot
      successContainer: () => cy.contains(/order placed/i).parent(),
      successMessage: () => cy.contains('Congratulations! Your order has been confirmed!'),
      downloadInvoice: () => cy.contains('Download Invoice'),
      continueButton: () => cy.contains('Continue')
    };
  }

  start() {
    cy.contains('Cart').click({ force: true });
    this.el.proceedToCheckout().click({ force: true });
  }

  confirmOrder() {
    // Fill order details
    this.el.commentBox().type('Test order via Cypress');
    this.el.placeOrder().click({ force: true });

    // Fill payment details
    this.el.nameOnCard().type('Test User');
    this.el.cardNumber().type('4111111111111111');
    this.el.cvc().type('123');
    this.el.expMonth().type('12');
    this.el.expYear().type('2030');
    
    // Submit payment
    this.el.payBtn().click({ force: true });
    
    // Verify success page - updated assertions
    cy.url().should('include', '/payment_done');
    this.el.successContainer().should('be.visible');
    this.el.successMessage().should('be.visible');
    this.el.downloadInvoice().should('be.visible');
    
    // Optional debugging
    cy.screenshot('order-confirmation');
  }
}