/* eslint-disable @typescript-eslint/no-namespace */
/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    getByData(selector: string): Chainable;
    verifyDialogTextAndClose(text: string): Chainable;
  }
}

Cypress.Commands.add("getByData", (selector) =>
  cy.get(`[data-test=${selector}]`)
);

Cypress.Commands.add("verifyDialogTextAndClose", (text) => {
  cy.getByData("dialog-text").should("exist").and("contain.text", text);
  cy.getByData("close-dialog-button").click();
});
