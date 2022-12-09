const { Types } = require("mongoose");
const { Booking } = require("../models/booking.model");
const { User } = require("../models/user.model");

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

exports.updateBooking = async (bookingId, query) => {
  return await Booking.updateOne({ _id: bookingId }, { $set: query });
};

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

exports.findUser = async (userId) => {
  return await User.findOne({ _id: Types.ObjectId(userId) });
};

exports.bookingById = async (bookingId) => {
  return await Booking.aggregate([
    {
      $match: {
        _id: Types.ObjectId(bookingId),
      },
    },
  ]);
};
