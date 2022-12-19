/// <reference types="cypress" />

Cypress.Commands.add("loginByGoogleApi", () => {
  cy.log("Logging in to Google");
  cy.log(Cypress.env("googleClientId"));
  cy.log(Cypress.env("googleClientSecret"));
  cy.log(Cypress.env("googleRefreshToken"));
  cy.request({
    method: "POST",
    url: "https://www.googleapis.com/oauth2/v4/token",
    body: {
      grant_type: "refresh_token",
      client_id: Cypress.env("googleClientId"),
      client_secret: Cypress.env("googleClientSecret"),
      refresh_token: Cypress.env("googleRefreshToken"),
    },
  }).then(({ body }) => {
    const { access_token, id_token } = body;

    cy.request({
      method: "POST",
      url: `${Cypress.env("baseUrl")}/auth/login`,
      body: {
        credential: id_token,
      },
    }).then(({ body }) => {
      const { accessToken } = body;

      cy.log(body);
      cy.log(accessToken);
      cy.setCookie("ride_sharing", accessToken);
    });
  });
});
