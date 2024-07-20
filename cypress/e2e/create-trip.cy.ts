describe("Create trip spec", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.getByData("location-dates-section").should("exist");
  });

  it("should not let continue with destination or date missing", () => {
    cy.getByData("continue-button").click();
    cy.verifyDialogTextAndClose(
      "Preencha as informações de destino e período para prosseguir"
    );
    cy.getByData("destination-input").type("São Paulo");
    cy.getByData("continue-button").click();
    cy.verifyDialogTextAndClose(
      "Preencha as informações de destino e período para prosseguir"
    );
    cy.getByData("destination-input").clear();
    cy.getByData("date-button")
      .should("exist")
      .and("contain.text", "Quando?")
      .click();
    cy.get(".rdp-nav_button_next").click();
    cy.get(":nth-child(2) > :nth-child(1) > .rdp-button_reset").click();
    cy.get(":nth-child(2) > :nth-child(7) > .rdp-button_reset").click();
    cy.getByData("confirm-dates-button").click();
    cy.getByData("date-button")
      .should("exist")
      .and("not.contain.text", "Quando?");
    cy.getByData("continue-button").click();
    cy.verifyDialogTextAndClose(
      "Preencha as informações de destino e período para prosseguir"
    );
  });

  it("should open invite/confirm trip section", () => {
    cy.getByData("invite-confirm-trip-section").should("not.exist");
    cy.getByData("destination-input").type("São Paulo");
    cy.selectDates();
    cy.getByData("continue-button").click();
    cy.getByData("invite-confirm-trip-section").should("exist");
    cy.getByData("continue-button").should("not.exist");
    cy.getByData("change-trip-details-button").should("exist");
  });

  it("should open invite guests modal, add and delete email", () => {
    cy.getByData("destination-input").type("São Paulo");
    cy.selectDates();
    cy.getByData("continue-button").click();
    cy.getByData("open-invite-guests-modal-button")
      .should("exist")
      .and("contain.text", "Quem estará na viagem?")
      .click();
    cy.getByData("invite-guests-div").should("exist");
    cy.getByData("email-input").type("teste@email.com");
    cy.getByData("invite-button").click();
    cy.getByData("email")
      .should("exist")
      .and("contain.text", "teste@email.com");
    cy.getByData("close-modal-button").click();
    cy.getByData("open-invite-guests-modal-button")
      .should("exist")
      .and("contain.text", "1 pessoa(s) convidada(s)")
      .click();
    cy.getByData("delete-email-button").click();
    cy.getByData("email").should("not.exist");
    cy.getByData("close-modal-button").click();
  });

  it("should not let create trip with owner name or email missing", () => {
    cy.getByData("destination-input").type("São Paulo");
    cy.selectDates();
    cy.getByData("continue-button").click();
    cy.getByData("confirm-trip-button").click();
    cy.getByData("owner-name-input").should("exist").type("Paulo");
    cy.getByData("create-trip-button").click();
    cy.verifyDialogTextAndClose("Preencha os campos para criar a viagem");
    cy.getByData("owner-name-input").clear();
    cy.getByData("owner-email-input").should("exist").type("paulo@email.com");
    cy.getByData("create-trip-button").click();
    cy.verifyDialogTextAndClose("Preencha os campos para criar a viagem");
  });

  it("should create trip and redirect to sent email", () => {
    cy.getByData("destination-input").type("São Paulo");
    cy.selectDates();
    cy.getByData("continue-button").click();
    cy.getByData("confirm-trip-button").click();
    cy.getByData("owner-name-input").type("Paulo");
    cy.getByData("owner-email-input").type("paulo@email.com");
    cy.getByData("create-trip-button").click();
    cy.wait(5000);
    cy.verifyDialogTextAndClose(
      "Viagem criada com sucesso! Você será redirecionado para realizar a confirmação por e-mail"
    );
  });
});
