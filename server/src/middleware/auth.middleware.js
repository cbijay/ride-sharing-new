const { errorResponse } = require("../utils/response");
const { verify } = require("jsonwebtoken");
const config = require("../config");

const auth = (req, res, next) => {
  try {
    const { accessToken } = req.cookies;
    if (!token) return errorResponse(res, 422, "Unauthorized!!");

    const data = verify(accessToken, config.jwt.secret);
    req.userId = data.id;
    req.userRole = data.role;
    req.userName = data.name;
    req.userEmail = data.email;

    return next();
  } catch (error) {
    errorResponse(res, 403, error?.message || error);
  }
};

module.exports = auth;
