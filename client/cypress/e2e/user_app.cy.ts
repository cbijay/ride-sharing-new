describe("empty spec", () => {
  beforeEach(() => {
    cy.loginByGoogleApi();
  });

  it("passes", () => {
    cy.visit(Cypress.env("baseUrl"));
  });
});
