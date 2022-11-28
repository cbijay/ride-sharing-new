const { findSelectedRider } = require("../repository/rider.repository");
const { selectRide } = require("../repository/booking.repository");

const { sendMail } = require("../utils/mail");
const config = require("../config");

exports.bookingSelectedRides = async (body, userId, userName, riderId) => {
  try {
    const otp = Math.random().toString(5);
    const booking = await selectRide(body, userId, riderId, otp);

    const rider = await findSelectedRider(riderId);

    if (booking)
      sendMail(
        rider.email,
        `Ride request from ${userName}`,
        `${config.client.url}/rider/request?token=${otp}`
      );

    return { booking };
  } catch {
    return { error: "Error booking your ride" };
  }
};

exports.updateBookingRequest = async (bookingId, status, email) => {
  try {
    const updateBooking = await updateBooking(bookingId, { status: status });
    if (updateBooking)
      sendMail(
        email,
        "Request accepted",
        "Your ride request has been accepted, Enjoy your ride"
      );

    return { booking: updateBooking };
  } catch {
    return { error: "Error accepting or rejecting your ride" };
  }
};
