const { errorResponse, successResponse } = require("../utils/response");
const {
  bookingSelectedRides,
  updateBookingRequest,
} = require("../services/booking.service");
const {
  validateRequest,
  updateBooking,
  userCurrentBooking,
  userBookingHistory,
} = require("../repository/booking.repository");

exports.bookRides = (req, res) => {
  try {
    const {
      body,
      cookies: { userId, userName },
      params: { riderId },
    } = req;

    const { booking, error } = bookingSelectedRides(
      body,
      userId,
      userName,
      riderId
    );

    if (error) errorResponse(res, 403, error);

    successResponse(res, { data: booking }, "Booking created successfully!!");
  } catch (error) {
    errorResponse(res, 500, "Error booking ride");
  }
};

exports.rideRequest = async (req, res) => {
  try {
    const { token } = req.query;

    const booking = validateRequest(token);
    if (!booking) errorResponse(res, 404, "Link has been expired");

    const { error } = await updateBooking(booking._id, { otp: null });
    if (error) errorResponse(res, 403, error);

    successResponse(res, { data: booking }, "Successfully verified!!");
  } catch (error) {
    errorResponse(res, 500, "Error fetching riders");
  }
};

exports.acceptOrRejectRequest = async (req, res) => {
  try {
    const {
      params: { bookingId, status },
      cookies: { userEmail },
    } = req;

    const updateBooking = await updateBookingRequest(
      bookingId,
      status,
      userEmail
    );
    if (!updateBooking)
      errorResponse(res, 403, "Error accepting or rejecting request");

    successResponse(res, { data: updateBooking }, "Booking updated");
  } catch (error) {
    errorResponse(res, 500, "Error fetching riders");
  }
};

exports.currentBooking = async (req, res) => {
  try {
    const {
      cookies: { userRole, userId },
    } = req;
    const booking = await userCurrentBooking(userRole, userId);
    if (!booking) errorResponse(res, 404, "Error fetching booking");

    successResponse(res, { data: booking }, "Fetched bookings successfully!!");
  } catch (error) {
    errorResponse(res, 500, "Error fetching riders");
  }
};

exports.bookingHistory = async (req, res) => {
  try {
    const {
      cookies: { userRole, userId },
    } = req;
    const bookings = await userBookingHistory(userRole, userId);
    if (!bookings) errorResponse(res, 404, "Error fetching booking");

    successResponse(res, { data: bookings }, "Fetched bookings successfully!!");
  } catch (error) {
    errorResponse(res, 500, "Error fetching riders");
  }
};
