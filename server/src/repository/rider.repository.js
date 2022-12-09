const { User } = require("../models/user.model");

exports.getRidersByLocation = async (lat, long) => {
  return await User.aggregate([
    {
      $geoNear: {
        near: {
          type: "Point",
          coordinates: [Number(lat), Number(long)],
        },
        query: { role: "rider" },
        distanceField: "distance",
        maxDistance: 150 * 1609.34,
        spherical: true,
      },
    },
    {
      $lookup: {
        from: "riders",
        localField: "_id",
        foreignField: "userId",
        as: "riders",
      },
    },
    {
      $unwind: "$riders",
    },
    {
      $replaceRoot: {
        newRoot: {
          _id: "$_id",
          name: "$name",
          profilePic: "$profilePic",
          role: "$role",
          vehicle: "$riders.vehicle",
        },
      },
    },
  ]);
};

exports.findSelectedRider = async (riderId) => {
  return await User.aggregate([
    {
      $match: {
        _id: riderId,
      },
    },
  ]);
};
