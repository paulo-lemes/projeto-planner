describe("Links spec", () => {
  beforeEach(() => {
    cy.visitTripDetailsPage();
  });

  it("should not create activity with title empty or short", () => {
    cy.getByData("create-link-button").click();
    cy.getByData("save-link-button").click();
    cy.verifyDialogTextAndClose("É necessário um título para criar o link");
    cy.getByData("link-title-input").type("123");
    cy.getByData("save-link-button").click();
    cy.verifyDialogTextAndClose(
      "O título deve possuir pelo menos 4 caracteres"
    );
  });

  it("should not create activity with url empty or invalid", () => {
    cy.getByData("create-link-button").click();
    cy.getByData("link-title-input").type("Link teste");
    cy.getByData("save-link-button").click();
    cy.verifyDialogTextAndClose("É necessário uma URL para criar o link");
    cy.getByData("link-url-input").type("linkteste");
    cy.getByData("save-link-button").click();
    cy.verifyDialogTextAndClose("Ocorreu um erro ao cadastrar o link");
  });

  it("should create link properly", () => {
    cy.getByData("create-link-button").click();
    cy.getByData("link-title-input").type("Link teste");
    cy.getByData("link-url-input").type("https://link.teste");
    cy.getByData("save-link-button").click();
    cy.verifyDialogTextAndClose("Link cadastrado com sucesso!");
  });

  it("should delete link properly", () => {
    cy.getByData("link-title")
      .should("exist")
      .and("contain.text", "Link teste");
    cy.getByData("delete-link-button").click();
    cy.verifyDialogTextAndClose("Link deletado com sucesso");
  });
});
