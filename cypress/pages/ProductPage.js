export class ProductPage {
  get el() {
    return {
      productCards: () => cy.get('.productinfo'),
      // Corrected selector for the "View Product" link
      firstProductLink: () => cy.get('.choose a').first(),
      // Product details section
      productInfo: () => cy.get('.product-information'),
      productName: () => cy.get('.product-information h2'),
      productPrice: () => cy.get('.product-information span span'),
      addToCartBtn: () => cy.get('.cart'),
      addToCartBtnFor: (name) =>
        cy.contains('.productinfo', new RegExp(name, 'i'))
          .parents('.product-image-wrapper')
          .find('a:contains("Add to cart")'),
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
    // Click the "View Product" link for first product
    this.el.firstProductLink().should('be.visible').click();

    // Verify product details page loads
    cy.url().should('include', '/product_details/');

    // Wait for product information to be visible
    this.el.productInfo().should('be.visible', { timeout: 10000 });
    this.el.productName().should('be.visible');
    this.el.productPrice().should('be.visible');

    return this;
  }
}
