const { config } = require("../config");
const { login, signup } = require("../services/auth.service");

exports.userSignup = async (req, res) => {
  try {
    const {
      body: { credential },
    } = req;

    const { type, message, statusCode, accessToken } = await signup(credential);

    return res
      .status(statusCode)
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: config.app.nodeEnv === "production",
        expires: "3d",
      })
      .json({
        type,
        message,
        accessToken,
      });
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

    return res
      .status(statusCode)
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: config.app.nodeEnv === "production",
        expires: "3d",
      })
      .json({
        type,
        message,
        accessToken,
      });
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
