import { RegistrationPage } from "../pages/RegistrationPage";
import { faker } from '@faker-js/faker';

const reg = new RegistrationPage();




describe('User Registration & Session Handling', () => {
  it('Registers a new user with unique email, logs in, and stores session', () => {
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
    reg.go();
    reg.startSignup(user.name, user.email);
    reg.fillForm({ ...user, name: user.name });
    reg.submitAndVerify();

    cy.writeFile('cypress/fixtures/userData.json', user);

    cy.session([user.email, user.password], () => {
      cy.visit('/login');
      cy.get('[data-qa="login-email"]').type(user.email);
      cy.get('[data-qa="login-password"]').type(user.password);
      cy.get('[data-qa="login-button"]').click();
      cy.contains('Logged in as').should('be.visible');
  });
  });

  it('Negative: Shows error for already registered email', () => {
    cy.fixture('userData').then((u) => {
      cy.visit('/login');
      cy.get('[data-qa="signup-name"]').type(u.name);
      cy.get('[data-qa="signup-email"]').type(u.email);
      cy.get('[data-qa="signup-button"]').click();
      cy.contains(/Email Address already exist|already registered/i).should('be.visible');
    });
  
  });
});