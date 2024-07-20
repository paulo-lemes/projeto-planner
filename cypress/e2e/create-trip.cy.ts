describe("Create trip spec", () => {
  it("should not let continue with destination or date missing", () => {
    cy.visit("/");
    cy.getByData("continue-button").click();
    cy.getByData("dialog-text")
      .should("exist")
      .and(
        "contain.text",
        "Preencha as informações de destino e período para prosseguir"
      );
    cy.getByData("close-dialog-button").click();
    cy.getByData("destination-input").type("São Paulo");
    cy.getByData("continue-button").click();
    cy.getByData("dialog-text")
      .should("exist")
      .and(
        "contain.text",
        "Preencha as informações de destino e período para prosseguir"
      );
    cy.getByData("close-dialog-button").click();
    cy.getByData("destination-input").clear();
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
    cy.getByData("continue-button").click();
    cy.getByData("dialog-text")
      .should("exist")
      .and(
        "contain.text",
        "Preencha as informações de destino e período para prosseguir"
      );
    cy.getByData("close-dialog-button").click();
  });
});
