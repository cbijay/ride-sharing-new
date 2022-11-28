const { errorResponse, successResponse } = require("../utils/response");
import bookingSelectedRides from "../services/booking.service";

const bookRides = (req, res) => {
  try {
    const {
      body,
      cookies: { userId, email },
      params: { riderId },
    } = req;

    const booking = bookingSelectedRides(body, userId, email, riderId);

    successResponse(res, booking, "Booking created successfully!!");
  } catch (error) {
    errorResponse(res, error, "Error booking ride");
  }
};

module.exports = {
  bookRides,
};
