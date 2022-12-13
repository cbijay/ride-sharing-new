describe("user app", () => {
  beforeEach(function () {});

  it("passes", () => {
    cy.visit(Cypress.env("baseUrl"));

    cy.get("S9gUrf-YoZ4jf").click();
  });
});
