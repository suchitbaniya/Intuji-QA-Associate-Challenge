export class RegistrationPage {
  go() {
    cy.visit('/login');
  }
  get el() {
    return {
      signupName: () => cy.get('[data-qa="signup-name"]'),
      signupEmail: () => cy.get('[data-qa="signup-email"]'),
      signupBtn: () => cy.get('[data-qa="signup-button"]'),
      titleMr: () => cy.get('#id_gender1'),
      name: () => cy.get('[data-qa="name"]'),
      password: () => cy.get('[data-qa="password"]'),
      day: () => cy.get('[data-qa="days"]'),
      month: () => cy.get('[data-qa="months"]'),
      year: () => cy.get('[data-qa="years"]'),
      newsletter: () => cy.get('#newsletter'),
      offers: () => cy.get('#optin'),
      firstName: () => cy.get('[data-qa="first_name"]'),
      lastName: () => cy.get('[data-qa="last_name"]'),
      company: () => cy.get('[data-qa="company"]'),
      address1: () => cy.get('[data-qa="address"]'),
      address2: () => cy.get('[data-qa="address2"]'),
      country: () => cy.get('[data-qa="country"]'),
      state: () => cy.get('[data-qa="state"]'),
      city: () => cy.get('[data-qa="city"]'),
      zipcode: () => cy.get('[data-qa="zipcode"]'),
      mobile: () => cy.get('[data-qa="mobile_number"]'),
      createAccountBtn: () => cy.get('[data-qa="create-account"]'),
      continueBtn: () => cy.get('[data-qa="continue-button"]'),
      successMsg: () => cy.contains('Account Created!')
    };
  }
  startSignup(name, email) {
    this.el.signupName().type(name);
    this.el.signupEmail().type(email);
    this.el.signupBtn().click();
  }
  fillForm(user) {
    this.el.titleMr().check({ force: true });
    this.el.name().should('have.value', user.name);
    this.el.password().type(user.password);
    this.el.day().select('10');
    this.el.month().select('May');
    this.el.year().select('1996');
    this.el.newsletter().check({ force: true });
    this.el.offers().check({ force: true });
    this.el.firstName().type(user.address.firstName);
    this.el.lastName().type(user.address.lastName);
    this.el.company().type(user.address.company);
    this.el.address1().type(user.address.address1);
    this.el.address2().type(user.address.address2);
    this.el.country().select(user.address.country);
    this.el.state().type(user.address.state);
    this.el.city().type(user.address.city);
    this.el.zipcode().type(user.address.zipcode);
    this.el.mobile().type(user.address.mobile);
  }
  submitAndVerify() {
    this.el.createAccountBtn().click();
    this.el.successMsg().should('be.visible');
    this.el.continueBtn().click();
    cy.contains('Logged in as').should('be.visible');
  }
}
