const { getRidersByLocation } = require("../repository/rider.repository");

exports.getRiders = async (lat, long) => {
  try {
    const riders = await getRidersByLocation(lat, long);
    if (!riders) throw new Error("Error fetching riders");

    return {
      type: "Success",
      statusCode: 200,
      message: "Users login successfully",
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
