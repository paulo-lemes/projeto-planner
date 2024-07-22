describe("Activities spec", () => {
  beforeEach(() => {
    cy.visitTripDetailsPage();
  });

  it("should create activity", () => {
    cy.getByData("create-activity-button").click();
    cy.getByData("activity-title-input").type("Atividade teste");
    cy.getByData("datetime-input").type("2024-10-01T00:00");
    cy.getByData("save-activity-button").click();
  });
});
