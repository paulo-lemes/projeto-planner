describe("Update trip spec", () => {
  beforeEach(() => {
    cy.visitTripDetailsPage();
  });

  it("should update trip details", () => {
    cy.getByData("update-trip-details-button").click();
    cy.getByData("destination-input").clear();
    cy.getByData("destination-input").type("Los Angeles - CA");
    cy.getByData("confirm-change-trip-details-button").click();
    cy.verifyDialogTextAndClose("Informações alteradas com sucesso!");
  });

  it("should not update trip details with destination empty or short", () => {
    cy.getByData("update-trip-details-button").click();
    cy.getByData("destination-input").clear();
    cy.getByData("confirm-change-trip-details-button").click();
    cy.verifyDialogTextAndClose(
      "Erro ao processar a alteração: informação de destino deve conter pelo menos 4 caracteres"
    );
    cy.getByData("destination-input").type("123");
    cy.getByData("confirm-change-trip-details-button").click();
    cy.verifyDialogTextAndClose(
      "Erro ao processar a alteração: informação de destino deve conter pelo menos 4 caracteres"
    );
  });

  it("should not update trip details with dates empty", () => {
    cy.getByData("update-trip-details-button").click();
    cy.getByData("date-button").click();
    cy.getByData("clear-dates-button").click();
    cy.getByData("confirm-dates-button").click();
    cy.getByData("confirm-change-trip-details-button").click();
    cy.verifyDialogTextAndClose(
      "Erro ao processar a alteração: informação de período deve conter data de início e fim da viagem"
    );
  });
});
