import { ProductPage } from '../pages/ProductPage';

const prod = new ProductPage();

describe('Product Browsing & Filtering', () => {
  let user;

  before(() => {
    cy.fixture('userData').then((u) => {
      user = u;
      cy.session([u.email, u.password], () => {
        cy.visit('/login');
        cy.get('[data-qa="login-email"]').type(u.email);
        cy.get('[data-qa="login-password"]').type(u.password);
        cy.get('[data-qa="login-button"]').click();
        cy.contains('Logged in as', { timeout: 10000 }).should('be.visible');
      });
    });
  });

  beforeEach(() => {
    cy.visit('/');
  });

  it('Filters Women > Dress and verifies list contains Dress', () => {
    prod.go();
    prod.filterWomenDress();
    
    // Verify at least one dress product exists
    cy.get('.productinfo p').should('contain.text', 'Dress');
  });

  it('Opens first product and verifies detail info', { retries: 2 }, () => {
    prod.go();
    
    // Debug: Log how many products are found
    cy.get('.productinfo').then(($products) => {
      cy.log(`Found ${$products.length} products`);
    });
    
    prod.openFirstProductAndVerify();
    
    // Additional detailed verifications
    cy.get('.product-information').within(() => {
      cy.get('h2').should('be.visible').and('not.be.empty');
      cy.get('.product-price').should('be.visible');
      cy.contains('Availability:').should('be.visible');
      cy.contains('Condition:').should('be.visible');
      cy.contains('Brand:').should('be.visible');
    });
    
    // Take screenshot for verification
    cy.screenshot('product-details-page');
  });
});