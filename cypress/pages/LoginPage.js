export class LoginPage {
  go() {
    cy.visit('/login');
  }
  get el() {
    return {
      email: () => cy.get('[data-qa="login-email"]'),
      password: () => cy.get('[data-qa="login-password"]'),
      loginBtn: () => cy.get('[data-qa="login-button"]'),
      error: () => cy.contains(/incorrect|invalid|not match/i),
      loggedInBanner: () => cy.contains('Logged in as'),
      logout: () => cy.contains('Logout')
    };
  }
  login(email, password) {
    this.el.email().type(email);
    this.el.password().type(password);
    this.el.loginBtn().click();
  }
  assertLoggedIn() {
    this.el.loggedInBanner().should('be.visible');
  }
  logout() {
    this.el.logout().click();
    cy.contains('Login to your account').should('be.visible');
  }
}
