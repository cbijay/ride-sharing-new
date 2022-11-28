const { query } = require("express-validator/check");

exports.riderValidator = (method) => {
  switch (method) {
    case "searchRider": {
      return [
        query("lat").exists().isNumeric(),
        query("long").exists().isNumeric(),
      ];
    }
  }
};
