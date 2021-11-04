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
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

declare namespace Cypress {
  interface Chainable<Subject> {
    shouldBeVisible(): void;
    shouldHaveAttribute(key: string, value: any): void;
    getInFixedContainer(selector: string): Chainable<Subject>;
  }
}

Cypress.Commands.add('shouldBeVisible', {prevSubject: 'element'}, (subject) => {
  cy.wrap(subject).should('be.visible');
});

Cypress.Commands.add('shouldHaveAttribute', {prevSubject: 'element'}, (subject, attribute, value) => {
  cy.wrap(subject).should('have.attr', attribute, value);
});

Cypress.Commands.add('getInFixedContainer', (selector) => {
  cy.get(selector).as('target');

  return cy
    .get('@target')
    .invoke('innerHeight')
    .then((height) => {
      return cy.get('@target').scrollIntoView({offset: {top: (height as number) / 2, left: 0}});
    });
});
