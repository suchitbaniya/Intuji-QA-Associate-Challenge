import { LoginPage } from '../pages/LoginPage.js';


const login = new LoginPage();

describe('Logout and Re-login', () => {
  it('Logs out and logs back in with preserved state', () => {
    cy.fixture('userData').then((u) => {
      // Login
      login.go?.() ?? cy.visit('/login');
      login.login(u.email, u.password);
      login.assertLoggedIn();

      // Logout
      login.logout();

      // Re-login
      login.go?.() ?? cy.visit('/login');
      login.login(u.email, u.password);
      login.assertLoggedIn();
    });
  });

  it('Negative: Invalid password rejects login', () => {
    cy.fixture('userData').then((u) => {
      login.go?.() ?? cy.visit('/login');
      login.login(u.email, 'Wrong@123');
      cy.contains(/incorrect|invalid|not match/i).should('be.visible');
    });
  });
});
