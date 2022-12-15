const { Types } = require("mongoose");
const { User } = require("../models/user.model");

/**
 * Get riders that matches given latitude and longitude
 * return riders along with their vehicle detail
 * @param {*} lat
 * @param {*} long
 * @returns
 */
exports.getRidersByLocation = async (lat, long) => {
  return await User.aggregate([
    {
      $geoNear: {
        near: {
          type: "Point",
          coordinates: [parseFloat(long), parseFloat(lat)],
        },
        query: { role: "rider" },
        key: "location",
        spherical: true,
        distanceField: "distance",
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

/**
 * Find selected rider that matches given rider id
 * @param {*} riderId
 * @returns
 */

exports.findSelectedRider = async (riderId) => {
  return await User.aggregate([
    {
      $match: {
        _id: Types.ObjectId(riderId),
      },
    },
  ]);
};
