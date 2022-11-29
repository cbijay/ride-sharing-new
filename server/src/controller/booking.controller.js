const { successResponse } = require("../utils/response");
const {
  bookRides,
  updateStatus,
  verifyRequest,
} = require("../services/booking.service");
const { currentBooking } = require("../repository/booking.repository");

exports.bookRides = (req, res, next) => {
  try {
    const {
      body,
      cookies: { userId, userName },
      params: { riderId },
    } = req;

    const { type, message, statusCode, booking } = bookRides(
      body,
      userId,
      userName,
      riderId
    );

    successResponse(res, statusCode, {
      type,
      message,
      booking,
    });
  } catch (e) {
    next(e);
  }
};

exports.rideRequest = async (req, res) => {
  try {
    const { token } = req.query;

    const { type, message, statusCode, accessToken } = verifyRequest(token);

    successResponse(res, statusCode, {
      type,
      message,
      accessToken,
    });
  } catch (e) {
    next(e);
  }
};

exports.acceptOrRejectRequest = async (req, res) => {
  try {
    const {
      params: { bookingId, status },
      cookies: { userEmail },
    } = req;

    const { type, message, statusCode, booking } = await updateStatus(
      bookingId,
      status,
      userEmail
    );

    successResponse(res, statusCode, {
      type,
      message,
      booking,
    });
  } catch (e) {
    next(e);
  }
};

exports.currentBooking = async (req, res) => {
  try {
    const {
      cookies: { userRole, userId },
    } = req;

    const { type, message, statusCode, booking } = await currentBooking(
      userRole,
      userId
    );

    successResponse(res, statusCode, {
      type,
      message,
      booking,
    });
  } catch (e) {
    next(e);
  }
};

exports.bookingHistory = async (req, res) => {
  try {
    const {
      cookies: { userRole, userId },
    } = req;

    const { type, message, statusCode, bookings } = bookings(userRole, userId);

    successResponse(res, statusCode, {
      type,
      message,
      bookings,
    });
  } catch (e) {
    next(e);
  }
};
