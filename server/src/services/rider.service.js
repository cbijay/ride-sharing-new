const { getRidersByLocation } = require("../repository/rider.repository");

const getRiders = async (lat, long) => {
  try {
    if (!lat || !long)
      throw new Error("Please provide pickup latitude and longitude");

    const riders = await getRidersByLocation(lat, long);
    if (!riders) throw new Error("Error fetching riders");
    console.log("service riders", riders);

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

module.exports = { getRiders };
