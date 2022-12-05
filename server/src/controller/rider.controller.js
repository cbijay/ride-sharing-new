const { getRiders } = require("../services/rider.service");
const { successResponse } = require("../utils/response");

exports.searchRider = async (req, res, next) => {
  try {
    const { lat, long } = req.query;

    const { type, message, statusCode, riders } = await getRiders(lat, long);

    successResponse(res, statusCode, {
      type,
      message,
      riders,
    });
  } catch (e) {
    next(e);
  }
};
