describe("Links spec", () => {
  beforeEach(() => {
    cy.visitTripDetailsPage();
  });

  it("should create link properly", () => {
    cy.getByData("create-link-button").click();
    cy.getByData("link-title-input").type("Link teste");
    cy.getByData("link-url-input").type("https://link.teste");
    cy.getByData("save-link-button").click();
    cy.verifyDialogTextAndClose("Link cadastrado com sucesso!");
  });
});
