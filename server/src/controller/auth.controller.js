const { config } = require("../config");
const { login, signup } = require("../services/auth.service");
const { successResponse } = require("../utils/response");

exports.userSignup = async (req, res) => {
  try {
    const {
      body: { credential, lat, long },
    } = req;

    const { type, message, statusCode, accessToken } = await signup(
      credential,
      lat,
      long
    );

    successResponse(res, statusCode, { type, message, accessToken });
  } catch (error) {
    next(e);
  }
};

exports.userLogin = async (req, res, next) => {
  try {
    const {
      body: { credential },
    } = req;

    const { type, message, statusCode, accessToken } = await login(credential);

    successResponse(res, statusCode, { type, message, accessToken });
  } catch (e) {
    next(e);
  }
};

exports.userLogOut = (req, res) => {
  return res.clearCookie("accessToken").json({
    success: true,
    message: "Successfully logged out",
  });
};
