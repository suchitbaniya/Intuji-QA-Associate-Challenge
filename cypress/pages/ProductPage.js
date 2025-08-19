export class ProductPage {
  get el() {
    return {
      productCards: () => cy.get('.productinfo'),
      firstProductLink: () => cy.get('.productinfo a').first(),
      // Updated selector for product information section
      productInfo: () => cy.get('.product-details').should('exist'),
      productName: () => cy.get('.product-information h2'),
      productPrice: () => cy.get('.product-information span span'),
      addToCartBtn: () => cy.get('.cart'),
      addToCartBtnFor: (name) => 
        cy.contains('.productinfo', new RegExp(name, 'i')).find('a:contains("Add to cart")'),
      continueShopping: () => cy.contains('Continue Shopping')
    };
  }

  go() {
    cy.visit('/products');
    return this;
  }

  filterWomenDress() {
    cy.get('a[href="#Women"]').click();
    cy.get('a[href="/category_products/1"]').contains('Dress').click();
    return this;
  }

  openFirstProductAndVerify() {
    // Click first product with retry and force options
    this.el.firstProductLink().click({ force: true });
    
    // Verify product details page loads
    cy.url().should('include', '/product_details/');
    
    // Wait for product information to be visible
    this.el.productInfo().should('be.visible', { timeout: 10000 });
    this.el.productName().should('be.visible');
    this.el.productPrice().should('be.visible');
    
    return this;
  }
}