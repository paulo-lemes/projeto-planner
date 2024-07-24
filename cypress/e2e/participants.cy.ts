describe("Participants spec", () => {
  beforeEach(() => {
    cy.visitTripDetailsPage();
  });

  it("should not edit participant with name empty", () => {
    cy.getByData("edit-name-button").eq(1).click();
    cy.getByData("confirm-name-button").click();
    cy.verifyDialogTextAndClose("Preencha o campo para alterar o nome");
  });
});
