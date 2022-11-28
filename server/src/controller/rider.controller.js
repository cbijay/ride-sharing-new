const getRidersByLocation = require("../repository/rider.repository");
const { errorResponse, successResponse } = require("../utils/response");

const searchRider = async (req, res) => {
  try {
    const { lat, long } = req.query;
    const riders = await getRidersByLocation(lat, long);

    const errors = validationResult(req);
    if (!errors.isEmpty()) errorResponse(res, errors.array(), "Errors");

    successResponse(
      res,
      riders,
      riders.length === 0 ? "No riders found" : "Fetched riders successfully!!"
    );
  } catch (error) {
    errorResponse(res, error, "Error fetching riders");
  }
};

module.exports = searchRider;
