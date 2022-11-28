const { body } = require("express-validator");

exports.authValidator = (method) => {
  switch (method) {
    case "userSignup": {
      return body("credential")
        .exists()
        .withMessage("Error with google, Please try agian");
    }

    case "userLogin": {
      return body("credential")
        .exists()
        .withMessage("Error with google, Please try agian");
    }
  }
};
