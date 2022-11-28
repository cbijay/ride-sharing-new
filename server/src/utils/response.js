const config = require("../config");

const successResponse = (res, data, message) => {
  return res.json({
    success: true,
    data,
    message: message,
  });
};

const authResponse = (res, data, message, isClear) => {
  if (!isClear)
    return res
      .cookie("accessToken", data?.accessToken, {
        httpOnly: true,
        secure: config.app.nodeEnv === "production",
      })
      .json({
        success: true,
        data,
        message: message,
      });

  return res.clearCookie("accessToken").json({
    success: true,
    data,
    message: message,
  });
};

const errorResponse = (res, statusCode, message) => {
  return res(statusCode).json({
    success: false,
    message: message,
  });
};

module.exports = {
  successResponse,
  authResponse,
  errorResponse,
};
