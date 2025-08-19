// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import { faker } from '@faker-js/faker';

Cypress.Commands.add('dataQa', (value) => cy.get(`[data-qa="${value}"]`));

// Save and restore session using cookies + localStorage snapshot
Cypress.Commands.add('preserveSession', () => {
  Cypress.Cookies.preserveOnce('session', 'PHPSESSID', 'csrftoken');
});

Cypress.Commands.add('saveLocalStorage', () => {
  cy.wrap(Object.keys(localStorage)).each((key) => {
    cy.wrap(localStorage.getItem(key)).as(`ls_${key}`);
  });
});

Cypress.Commands.add('restoreLocalStorage', () => {
  cy.get('@currentAliases').then(() => {});
});


Cypress.Commands.add('registerUser', () => {
  const user = {
    name: faker.person.fullName(),
    email: faker.internet.email({ provider: 'example.com' }),
    password: "Test@1234",
    address: {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      company: faker.company.name(),
      address1: faker.location.streetAddress(),
      address2: faker.location.secondaryAddress(),
      country: "India",
      state: faker.location.state(),
      city: faker.location.city(),
      zipcode: faker.location.zipCode(),
      mobile: faker.phone.number()
    }
  };

  cy.visit('/login');
  cy.dataQa('signup-name').type(user.name);
  cy.dataQa('signup-email').type(user.email);
  cy.dataQa('signup-button').click();

  // Minimal required fields on the site
  cy.get('#id_gender1').check({ force: true });
  cy.dataQa('name').should('have.value', user.name);
  cy.dataQa('password').type(user.password);
  cy.dataQa('days').select('10');
  cy.dataQa('months').select('May');
  cy.dataQa('years').select('1996');

  cy.get('#newsletter').check({ force: true });
  cy.get('#optin').check({ force: true });

  cy.dataQa('first_name').type(user.address.firstName);
  cy.dataQa('last_name').type(user.address.lastName);
  cy.dataQa('company').type(user.address.company);
  cy.dataQa('address').type(user.address.address1);
  cy.dataQa('address2').type(user.address.address2);
  cy.dataQa('country').select(user.address.country);
  cy.dataQa('state').type(user.address.state);
  cy.dataQa('city').type(user.address.city);
  cy.dataQa('zipcode').type(user.address.zipcode);
  cy.dataQa('mobile_number').type(user.address.mobile);

  cy.dataQa('create-account').click();
  cy.contains('Account Created!').should('be.visible');
  cy.dataQa('continue-button').click();

  // Verify we’re logged in
  cy.contains('Logged in as').should('be.visible');

  // Save creds
  cy.writeFile('cypress/fixtures/userData.json', user);

  // Store session for reuse
  cy.session([user.email, user.password], () => {
    cy.visit('/login');
    cy.dataQa('login-email').type(user.email);
    cy.dataQa('login-password').type(user.password);
    cy.dataQa('login-button').click();
    cy.contains('Logged in as').should('be.visible');
  });

  return cy.wrap(user);
});

Cypress.Commands.add('login', (email, password) => {
  cy.visit('/login');
  cy.dataQa('login-email').type(email);
  cy.dataQa('login-password').type(password);
  cy.dataQa('login-button').click();
  cy.contains('Logged in as').should('be.visible');
});

Cypress.Commands.add('logout', () => {
  cy.contains('Logout').click();
  cy.contains('Login to your account').should('be.visible');
});

//Product & Cart commands
Cypress.Commands.add('addToCartByName', (name) => {
  cy.visit('/products');
  cy.contains('.productinfo', name, { matchCase: false })
    .scrollIntoView()
    .within(() => {
      cy.contains('Add to cart').click({ force: true });
    });
  cy.contains('Continue Shopping').click({ timeout: 10000 });
});

Cypress.Commands.add('verifyCartHasAtLeast', (n) => {
  cy.visit('/view_cart');
  cy.get('.cart_description').should('have.length.at.least', n);
});

// APi intercept
Cypress.Commands.add('interceptProducts', () => {
  cy.intercept('GET', '**/api/**products**').as('getProducts');
});
