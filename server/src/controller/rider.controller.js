const riderService = require("../services/rider.service");
const response = require("../utils/response");

/**
 * Search Rider
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */

exports.searchRider = async (req, res, next) => {
  try {
    const { lat, long } = req.query;

    const { type, message, statusCode, riders } = await riderService.getRiders(
      lat,
      long
    );

    return response.successResponse(res, statusCode, {
      type,
      message,
      riders,
    });
  } catch (e) {
    next(e);
  }
};
