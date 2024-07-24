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

  it("should not invite with email list empty", () => {
    cy.getByData("open-invite-modal-button").click();
    cy.getByData("send-invite-button").should("not.exist");
    cy.getByData("invite-button").click();
    cy.verifyDialogTextAndClose("Digite um e-mail válido");
  });

  it.only("should invite properly", () => {
    cy.getByData("open-invite-modal-button").click();
    cy.getByData("send-invite-button").should("not.exist");
    cy.getByData("email-input").type("ciclano@email.com");
    cy.getByData("invite-button").click();
    cy.getByData("send-invite-button").should("exist").click();
    cy.wait(5000);
    cy.verifyDialogTextAndClose(
      "Convite(s) enviado(s) por e-mail com sucesso!"
    );
    cy.getByData("participant-email")
      .last()
      .should("contain.text", "ciclano@email.com");
  });
});
