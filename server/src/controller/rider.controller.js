const { getRiders } = require("../services/rider.service");
const { successResponse } = require("../utils/response");

exports.searchRider = async (req, res) => {
  try {
    const { lat, long } = req.query;
    const { type, message, statusCode, accessToken } = getRiders(lat, long);

    successResponse(res, statusCode, {
      type,
      message,
      accessToken,
    });
  } catch (error) {
    next(e);
  }
};
