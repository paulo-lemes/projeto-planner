/* eslint-disable @typescript-eslint/no-namespace */
/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    getByData(selector: string): Chainable;
    verifyDialogTextAndClose(text: string): Chainable;
    selectDates(): Chainable;
    visitTripDetailsPage(): Chainable;
  }
}

Cypress.Commands.add("getByData", (selector) =>
  cy.get(`[data-test=${selector}]`)
);

Cypress.Commands.add("verifyDialogTextAndClose", (text) => {
  cy.getByData("dialog-text").should("exist").and("contain.text", text);
  cy.getByData("close-dialog-button").click();
});

Cypress.Commands.add("selectDates", () => {
  cy.getByData("date-button")
    .should("exist")
    .and("contain.text", "Quando?")
    .click();
  cy.get(".rdp-nav_button_next").click();
  cy.get(":nth-child(2) > :nth-child(1) > .rdp-button_reset").click();
  cy.get(":nth-child(2) > :nth-child(7) > .rdp-button_reset").click();
  cy.getByData("confirm-dates-button").click();
  cy.getByData("date-button")
    .should("exist")
    .and("not.contain.text", "Quando?");
});

Cypress.Commands.add("visitTripDetailsPage", () => {
  cy.visit(`/trips/${Cypress.env("tripId")}`);
  cy.getByData("trip-details-section").should("exist");
  cy.wait(1000);
});
