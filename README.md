
## Automation user flow on https://automationexercise.com:
- Registration & session handling (faker data, session reuse)
- Product browsing & filtering (Women Dress)
- Cart & quantity management (multiple items, update qty=3, remove)
- Check out with fake payment
- Logout & Re-login
- Negative tests (duplicate email, invalid login)

## Tech stack
- Cypress 13.17.0 (e2e testing framework)
- @faker-js/faker (to randomly generate fake data)
- cypress-mochawesome-reporter (plugin used to generate HTML and JSON test  reports) 

## Setup

- Node.js installation
- npm install cypress --save-dev (for cypress installation)
