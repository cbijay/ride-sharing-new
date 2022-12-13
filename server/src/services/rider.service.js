const riderRepo = require("../repository/rider.repository");

exports.getRiders = async (lat, long) => {
  try {
    if (!lat || !long)
      throw new Error("Please provide pickup latitude and longitude");

    const riders = await riderRepo.getRidersByLocation(lat, long);
    console.log(
      "🚀 ~ file: rider.service.js:9 ~ exports.getRiders= ~ riders",
      riders
    );

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
