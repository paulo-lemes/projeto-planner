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
  });
});
