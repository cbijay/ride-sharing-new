describe("empty spec", () => {
  beforeEach(() => {
    cy.loginByGoogleApi();
  });

  it("passes", () => {
    cy.visit(Cypress.env("clientUrl"));

    //visit book ride
    cy.visit(`${Cypress.env("clientUrl")}/user/book-ride`);

    //search and find rider
    Cypress.on("uncaught:exception", (err, runnable) => {
      return false;
    });

    cy.get('input[name="pickup"]')
      .type("leapfrog technology")
      .get('[data-testid="place-pickup"]')
      .click();

    cy.get('input[name="destination"]')
      .type("maitidevi ")
      .get('[data-testid="place-destination"]')
      .eq(0)
      .click({ force: true });

    cy.get("button.bg-black").eq(0).click();

    //select rider and book ride
    cy.get("button.bg-black").eq(0).click();

    //redirect to booking history after successful booking
    cy.visit(`${Cypress.env("clientUrl")}/user/bookings`);
  });
});
