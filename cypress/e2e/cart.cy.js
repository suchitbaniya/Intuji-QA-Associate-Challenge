import { CartPage } from '../pages/CartPage';
import { ProductPage } from '../pages/ProductPage';

const cart = new CartPage();
const prod = new ProductPage();

describe('Cart and Quantity Management', () => {
  before(() => {
    // Login session reuse
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
    cart.go();

    cy.get('body').then(($b) => {
      if ($b.find('.cart_description').length === 0) {
        // Add two products if cart is empty
        cy.addToCartByName('Blue Top');
        cy.addToCartByName('Men Tshirt');
        cart.go();
      }
    });

    // Wait until at least one row is present
    cy.get('.cart_description', { timeout: 10000 }).should('exist');
  });

  it('Adds multiple items from different categories', () => {
    // Add again just to verify workflow
    cy.addToCartByName('Blue Top');   // Women
    cy.addToCartByName('Men Tshirt'); // Men
    cart.go();
    cart.assertAtLeast(2);
  });

  it('Updates quantity to 3 and verifies totals', () => {
    cart.go();

    cy.get('.cart_description', { timeout: 10000 })
      .should('have.length.greaterThan', 0)
      .then(($rows) => {
        const beforeCount = $rows.length;

        cart.updateFirstQtyTo(3);
        cart.verifyTotalForFirstEqualsQtyTimesUnit(3);

        // ensure item count unchanged
        cy.get('.cart_description').should('have.length', beforeCount);
      });
  });

  it('Removes one product and verifies cart updates', () => {
    cart.go();

    cy.get('.cart_description', { timeout: 10000 })
      .should('have.length.greaterThan', 0)
      .then(($rows) => {
        const prev = $rows.length;
        cart.removeFirstAndVerifyDecrement(prev);
      });
  });
});
