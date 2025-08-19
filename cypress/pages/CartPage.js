export class CartPage {
  go() {
    cy.visit('/view_cart');
  }
  get el() {
    return {
      cartRows: () => cy.get('.cart_description'),
      qtyInputFirst: () =>
        cy.get('.cart_description').first().find('input.cart_quantity_input'),
      updateBtn: () => cy.contains(/Update|Save/i),
      totalPriceFirst: () => cy.get('.cart_total_price').first(),
      deleteFirst: () => cy.get('.cart_delete a').first(),
      unitPriceFirst: () => cy.get('tr').first().find('.cart_price')
    };
  }
  assertAtLeast(n) {
    this.el.cartRows().should('have.length.at.least', n);
  }
  updateFirstQtyTo(qty) {
    this.el.qtyInputFirst().clear().type(String(qty));
    this.el.updateBtn().click({ force: true });
    this.el.totalPriceFirst().should('be.visible');
  }
  verifyTotalForFirstEqualsQtyTimesUnit(qty) {
    const parseMoney = (txt) => Number(txt.replace(/[^\d]/g, ''));
    this.el.unitPriceFirst().invoke('text').then((u) => {
      const unit = parseMoney(u);
      this.el.totalPriceFirst().invoke('text').then((t) => {
        const total = parseMoney(t);
        expect(total).to.eq(unit * qty);
      });
    });
  }
  removeFirstAndVerifyDecrement(prevCount) {
    this.el.deleteFirst().click({ force: true });
    this.el.cartRows().should('have.length.lessThan', prevCount);
  }
}
