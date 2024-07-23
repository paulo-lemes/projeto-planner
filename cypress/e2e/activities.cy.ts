describe("Activities spec", () => {
  beforeEach(() => {
    cy.visitTripDetailsPage();
  });

  it("should not create activity with title empty or short", () => {
    cy.getByData("create-activity-button").click();
    cy.getByData("activity-title-input").type("123");
    cy.getByData("save-activity-button").click();
    cy.verifyDialogTextAndClose("Preencha os campos para criar a atividade");
    cy.getByData("activity-title-input").clear();
    cy.getByData("save-activity-button").click();
    cy.verifyDialogTextAndClose("Preencha os campos para criar a atividade");
  });

  it("should not create activity without datetime", () => {
    cy.getByData("create-activity-button").click();
    cy.getByData("activity-title-input").type("Atividade teste");
    cy.getByData("save-activity-button").click();
    cy.verifyDialogTextAndClose("Preencha os campos para criar a atividade");
  });

  it("should create activity properly", () => {
    cy.getByData("create-activity-button").click();
    cy.getByData("activity-title-input").type("Atividade teste");
    cy.getByData("datetime-input").type("2024-10-01T00:00");
    cy.getByData("save-activity-button").click();
    cy.verifyDialogTextAndClose("Atividade cadastrada com sucesso!");
  });

  it("should delete activity properly", () => {
    cy.getByData("activity-title")
      .should("exist")
      .and("contain.text", "Atividade teste");
    cy.getByData("delete-activity-button").click();
    cy.verifyDialogTextAndClose("Atividade deletada com sucesso");
  });
});
