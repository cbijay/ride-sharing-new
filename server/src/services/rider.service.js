const riderRepo = require("../repository/rider.repository");

/**
 * Get riders based on pickup address latitude and longitude
 * @param {*} lat
 * @param {*} long
 * @returns
 */
exports.getRiders = async (lat, long) => {
  try {
    if (!lat || !long)
      throw new Error("Please provide pickup latitude and longitude");

    const riders = await riderRepo.getRidersByLocation(lat, long);

    return {
      type: "Success",
      statusCode: 200,
      message: riders.length === 0 ? "No riders found!!" : "Riders found!!",
      riders,
    };
  } catch (err) {
    return {
      type: "Error",
      statusCode: 500,
      message: err.message,
    };
  }
};
