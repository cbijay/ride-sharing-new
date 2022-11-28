const { findSelectedRider } = require("../repository/rider.repository");
const { selectRide } = require("../repository/booking.repository");
const { sendMail } = require("../utils/mail");

const bookingSelectedRides = async (body, userId, userEmail, riderId) => {
  const booking = await selectRide(body, userId, riderId);
  const rider = await findSelectedRider(riderId);

  if (booking) sendMail(rider.email, `Ride request ${userEmail}`);
  return booking;
};

module.exports = bookingSelectedRides;
