describe("user app", () => {
  // beforeEach(() => {
  //   cy.loginByGoogleApi();
  // });

  it("passes", () => {
    cy.visit(Cypress.env("baseUrl"));

    cy.wait(3000);

    cy.loginByGoogleApi();
  });
});
