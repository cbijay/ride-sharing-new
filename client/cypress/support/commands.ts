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

    // cy.request({
    //   method: "GET",
    //   url: "https://www.googleapis.com/oauth2/v3/userinfo",
    //   headers: { Authorization: `Bearer ${access_token}` },
    // }).then(({ body }) => {
    //   cy.log(body);
    //   const userItem = {
    //     token: id_token,
    //     user: {
    //       googleId: body.sub,
    //       email: body.email,
    //       givenName: body.given_name,
    //       familyName: body.family_name,
    //       imageUrl: body.picture,
    //     },
    //   };

    //   cy.setCookie("ride_sharing", id_token);
    //   // window.localStorage.setItem("googleCypress", JSON.stringify(userItem));
    //   cy.visit("http://localhost:3000/user/dashboard");
    // });
  });
});
