const { body } = require("express-validator/check");

exports.authValidator = (method) => {
  switch (method) {
    case "userSignup" || "userLogin": {
      return body("credential")
        .exists()
        .withMessage("Error with google, Please try agian");
    }
  }
};
