const { errorResponse } = require("../utils/response");
const { verify } = require("jsonwebtoken");
const { config } = require("../config");

const auth = (req, res, next) => {
  try {
    const bearerHeader = req.headers["authorization"];

    const token = bearerHeader.split(" ")[1];
    if (!token) return errorResponse(res, 401, "Unauthorized!!");

    const data = verify(token, config.jwt.secret);
    req.user = data;

    return next();
  } catch (error) {
    errorResponse(res, 403, error?.message || error);
  }
};

module.exports = auth;
