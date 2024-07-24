describe("Participants spec", () => {
  beforeEach(() => {
    cy.visitTripDetailsPage();
  });

  it("should not edit participant with name empty", () => {
    cy.getByData("edit-name-button").eq(1).click();
    cy.getByData("confirm-name-button").click();
    cy.verifyDialogTextAndClose("Preencha o campo para alterar o nome");
  });

  it("should edit participant name properly", () => {
    cy.getByData("edit-name-button").eq(1).click();
    cy.getByData("edit-name-participant-input").type("Fulano");
    cy.getByData("confirm-name-button").click();
    cy.verifyDialogTextAndClose("Nome alterado com sucesso!");
    cy.getByData("participant-name").eq(1).should("contain.text", "Fulano");
  });
});
