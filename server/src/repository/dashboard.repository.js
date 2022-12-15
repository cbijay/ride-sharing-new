const { Types } = require("mongoose");
const { Booking } = require("../models/booking.model");

/**
 * Display user booking stat like pending, completed, cancelled count
 * for given user id, role and status
 * @param {*} role
 * @param {*} userId
 * @param {*} status
 * @returns
 */

exports.userBookingStat = async (role, userId, status) => {
  return await Booking.aggregate([
    {
      $match: {
        status: status,
      },
    },
    {
      $lookup: {
        from: "users",
        localField: role === "rider" ? "riderId" : "userId",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $project: {
        _id: 1,
        requestTime: 1,
        startLocation: 1,
        endLocation: 1,
        totalDistance: 1,
        estimatedTime: 1,
        status: 1,
        user: {
          $arrayElemAt: ["$user", 0],
        },
      },
    },
    {
      $match: {
        "user._id": Types.ObjectId(userId),
      },
    },
    { $group: { _id: null, count: { $sum: 1 } } },
    {
      $project: {
        _id: 0,
        count: 1,
      },
    },
  ]);
};
