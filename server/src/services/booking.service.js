const { findSelectedRider } = require("../repository/rider.repository");
const {
  bookRide,
  validateRequest,
  updateBooking,
  userCurrentBooking,
  userBookingHistory,
} = require("../repository/booking.repository");

const { sendMail } = require("../utils/mail");
const config = require("../config");

exports.bookRides = async (body, userId, userName, riderId) => {
  try {
    const otp = Math.random().toString(5);
    const booking = await bookRide(body, userId, riderId, otp);

    const rider = await findSelectedRider(riderId);
    if (!rider) throw new Error("Error selecting rider");

    sendMail(
      rider.email,
      `Ride request from ${userName}`,
      `${config.client.url}/rider/request?token=${otp}`
    );

    return {
      type: "Success",
      statusCode: 200,
      message: "Booked successfully!!",
      booking,
    };
  } catch (err) {
    return {
      type: "Error",
      statusCode: 500,
      message: err.message,
    };
  }
};

exports.verifyRequest = async (token) => {
  try {
    const validateBooking = validateRequest(token);
    if (!validateBooking) throw new Error("Link has been expired");

    const booking = await updateBooking(booking._id, { otp: null });

    return {
      type: "Success",
      statusCode: 200,
      message: "Successfully verified!!",
      booking,
    };
  } catch (err) {
    return {
      type: "Error",
      statusCode: 500,
      message: err.message,
    };
  }
};

exports.updateStatus = async (bookingId, status, email) => {
  try {
    const updateBooking = await updateBooking(bookingId, { status: status });
    if (!updateBooking) throw new Error("Error updating request");

    sendMail(
      email,
      "Request accepted",
      "Your ride request has been accepted, Enjoy your ride"
    );

    return {
      type: "Success",
      statusCode: 200,
      message: "Booking updated",
      booking: updateBooking,
    };
  } catch {
    return {
      type: "Error",
      statusCode: 500,
      message: err.message,
    };
  }
};

exports.currentBooking = async (userRole, userId) => {
  try {
    const booking = await userCurrentBooking(userRole, userId);
    if (!booking) throw new Error("Error fetching current booking");

    return {
      type: "Success",
      statusCode: 200,
      message: "bookings fetched successfully!!",
      booking,
    };
  } catch (err) {
    return {
      type: "Error",
      statusCode: 500,
      message: err.message,
    };
  }
};

exports.bookings = async (userRole, userId) => {
  try {
    const bookings = await userBookingHistory(userRole, userId);
    if (!bookings) throw new Error(res, 404, "Error fetching bookings");

    return {
      type: "Success",
      statusCode: 200,
      message: "Bookings fetched successfully",
      bookings,
    };
  } catch (err) {
    return {
      type: "Error",
      statusCode: 500,
      message: err.message,
    };
  }
};
