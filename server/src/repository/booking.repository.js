const { Booking } = require("../models/booking.model");

exports.selectRide = async (body, userId, riderId, otp) => {
  return await Booking.create({
    request_time: body.request_time,
    start_location: {
      coordinates: body.pickup_coordinates,
      address: body.pickup_address,
    },
    end_location: {
      coordinates: body.destination_coordinates,
      address: body.destination_address,
    },
    user_id: userId,
    rider_id: riderId,
  });
};

exports.validateRequest = async (otp) => {
  return await Booking.findOne({ otp: otp });
};

exports.updateBooking = async (bookingId, query) => {
  return await Booking.update({ _id: bookingId }, { $set: query });
};

exports.userCurrentBooking = async (userRole, userId) => {
  return await Booking.aggregate([
    { $unwind: "$users" },
    {
      $lookup: {
        from: "users",
        localId: userRole === "user" ? "user_id" : "rider_id",
        foreignId: "_id",
        as: userRole === "user" ? "user" : "rider",
      },
    },
    {
      $match: {
        "users._id": userId,
      },
    },
  ])[0];
};

exports.userBookingHistory = async (userRole, userId) => {
  return await Booking.aggregate([
    { $unwind: "$users" },
    {
      $lookup: {
        from: "users",
        localId: userRole === "user" ? "user_id" : "rider_id",
        foreignId: "_id",
        as: userRole === "user" ? "user" : "rider",
      },
    },
    {
      $match: {
        "users._id": userId,
      },
    },
  ]);
};
