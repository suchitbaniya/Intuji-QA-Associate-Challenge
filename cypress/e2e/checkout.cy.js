import { CheckoutPage } from '../pages/CheckoutPage';

const checkout = new CheckoutPage();

describe('Checkout Flow with Fake Payment', () => {
  before(() => {
    cy.fixture('userData').then((u) => {
      cy.session([u.email, u.password], () => {
        cy.visit('/login');
        cy.get('[data-qa="login-email"]').type(u.email);
        cy.get('[data-qa="login-password"]').type(u.password);
        cy.get('[data-qa="login-button"]').click();
        cy.contains('Logged in as').should('be.visible');
      });
    });
  });

  beforeEach(() => {
    cy.visit('/view_cart'); // ensure cart page entry point
  });

  it('Proceeds to checkout and completes fake payment', () => {
    // If cart is empty, add one product quickly:
    cy.get('body').then(($b) => {
      if ($b.find('.cart_description').length === 0) {
        cy.addToCartByName('Blue Top');
        cy.visit('/view_cart');
      }
    });

    checkout.start();
    checkout.confirmOrder();
  });
});
