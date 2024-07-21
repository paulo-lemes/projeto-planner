describe("Update trip spec", () => {
  beforeEach(() => {
    cy.visitTripDetailsPage();
  });

  it("should update trip details", () => {
    cy.getByData("update-trip-details-button").click();
    cy.getByData("destination-input").type("Los Angeles - CA");
    cy.getByData("confirm-change-trip-details-button").click();
    cy.verifyDialogTextAndClose("Informações alteradas com sucesso!");
  });
});
