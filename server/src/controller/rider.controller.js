const { getRidersByLocation } = require("../repository/rider.repository");
const { errorResponse, successResponse } = require("../utils/response");

exports.searchRider = async (req, res) => {
  try {
    const { lat, long } = req.query;
    const riders = await getRidersByLocation(lat, long);
    if (!riders) errorResponse(res, 404, "Error fetching riders");

    successResponse(
      res,
      { data: riders },
      riders.length === 0 ? "No riders found" : "Fetched riders successfully!!"
    );
  } catch (error) {
    errorResponse(res, 500, "Error fetching riders");
  }
};
