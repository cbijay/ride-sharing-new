const { errorResponse } = require("../utils/response");
const { verify } = require("jsonwebtoken");
const { config } = require("../config");

/**
 * Auth middleware checks the authorization headers
 * allow user to get response of given api endpoints
 * if token is valid else it will unauthorized user
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
const auth = (req, res, next) => {
  try {
    const bearerHeader = req.headers["authorization"];
    if (!bearerHeader) return errorResponse(res, 401, "Unauthorized!!");

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
