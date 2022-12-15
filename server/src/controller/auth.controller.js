const authService = require("../services/auth.service");
const response = require("../utils/response");

/**
 * User Signup
 * @param {*} req
 * @param {*} res
 * @returns
 */

exports.userSignup = async (req, res) => {
  try {
    const {
      body: { credential, lat, long },
    } = req;

    const { type, message, statusCode, accessToken } = await authService.signup(
      credential,
      lat,
      long
    );

    return response.successResponse(res, statusCode, {
      type,
      message,
      accessToken,
    });
  } catch (error) {
    next(e);
  }
};

/**
 * User Login
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
exports.userLogin = async (req, res, next) => {
  try {
    const {
      body: { credential },
    } = req;

    const { type, message, statusCode, accessToken } = await authService.login(
      credential
    );

    return response.successResponse(res, statusCode, {
      type,
      message,
      accessToken,
    });
  } catch (e) {
    next(e);
  }
};
