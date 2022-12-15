const { Types } = require("mongoose");
const { Booking } = require("../models/booking.model");
const { User } = require("../models/user.model");

/**
 * create new booking based on request
 * pickup and destination address
 * user Id and riderId
 * @param {*} body
 * @param {*} userId
 * @param {*} riderId
 * @returns
 */
exports.bookRide = async (body, userId, riderId) => {
  const {
    requestTime,
    pickupCoordinates,
    pickupAddress,
    destinationAddress,
    destinationCoordinates,
    totalDistance,
    estimatedTime,
  } = body;

  return await Booking.create({
    requestTime: requestTime,
    startLocation: {
      coordinates: pickupCoordinates,
      address: pickupAddress,
    },
    endLocation: {
      coordinates: destinationCoordinates,
      address: destinationAddress,
    },
    totalDistance,
    estimatedTime,
    userId: userId,
    riderId: riderId,
  });
};

/**
 * Find booking of specific user
 * based on userId and role
 * @param {*} userId
 * @param {*} role
 * @returns
 */

exports.findBooking = async (userId, role) => {
  let matchQuery;

  if (role !== "user") {
    matchQuery = {
      $match: {
        riderId: Types.ObjectId(userId),
      },
    };
  } else {
    matchQuery = {
      $match: {
        userId: Types.ObjectId(userId),
      },
    };
  }

  return await Booking.aggregate([
    matchQuery,
    {
      $lookup: {
        from: "users",
        localField: "userId",
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
      },
    },
    {
      $sort: {
        requestTime: -1,
      },
    },
  ]);
};

/**
 * Update booking for given booking id
 * and the query that needs to be updated
 * @param {*} bookingId
 * @param {*} query
 * @returns
 */
exports.updateBooking = async (bookingId, query) => {
  return await Booking.updateOne({ _id: bookingId }, { $set: query });
};

/**
 * Fetch user booking history for given user id and role
 * also paginate booking history based on skip and limit
 * @param {*} skip
 * @param {*} limit
 * @param {*} userRole
 * @param {*} userId
 * @returns
 */
exports.userBookingHistory = async (skip, limit, userRole, userId) => {
  return await Booking.aggregate([
    {
      $lookup: {
        from: "users",
        localField: userRole === "rider" ? "riderId" : "userId",
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
    {
      $sort: {
        requestTime: -1,
      },
    },
    {
      $limit: limit,
    },
    {
      $skip: skip,
    },
    {
      $project: {
        user: 0,
      },
    },
  ]);
};

/**
 * Find user that matches given userId
 * @param {*} userId
 * @returns
 */
exports.findUser = async (userId) => {
  return await User.findOne({ _id: Types.ObjectId(userId) });
};

/**
 * Find booking that matches given booking id
 * @param {*} bookingId
 * @returns
 */

exports.bookingById = async (bookingId) => {
  return await Booking.aggregate([
    {
      $match: {
        _id: Types.ObjectId(bookingId),
      },
    },
  ]);
};
