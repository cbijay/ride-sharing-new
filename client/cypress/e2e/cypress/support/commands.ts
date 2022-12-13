// cypress/support/commands.js
declare namespace Cypress {
  interface Chainable<Subject> {
    googleLogin(...options: any): Chainable<HTMLElement>;
  }
}

Cypress.Commands.add("googleLogin", () => {
  cy.log("Logging in to Google");
  cy.request({
    method: "POST",
    url: "https://www.googleapis.com/oauth2/v4/token",
    body: {
      grant_type: "",
      client_id: Cypress.env("googleClientId"),
    },
  }).then(({ body }) => {
    cy.log("token", body);
    const { access_token, id_token } = body;

    cy.request({
      method: "GET",
      url: "https://www.googleapis.com/oauth2/v3/userinfo",
      headers: { Authorization: `Bearer ${access_token}` },
    }).then(({ body }) => {
      cy.log("google login", body);

      const userItem = {
        token: id_token,
        user: {
          googleId: body.sub,
          email: body.email,
          givenName: body.given_name,
          familyName: body.family_name,
          profile_pic: body.picture,
        },
      };

      cy.visit("/user/dashboard");
    });
  });
});
