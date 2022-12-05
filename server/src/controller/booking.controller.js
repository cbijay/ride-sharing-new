const { successResponse } = require("../utils/response");
const {
  bookRides,
  updateStatus,
  verifyRequest,
  userCurrentBooking,
  history,
  getBookingDetail,
} = require("../services/booking.service");

exports.bookRides = async (req, res, next) => {
  try {
    const {
      body,
      user: { userId, name },
      params: { riderId },
    } = req;

    const { type, message, statusCode, booking } = await bookRides(
      body,
      userId,
      name,
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

exports.rideRequest = async (req, res, next) => {
  try {
    const { token } = req.query;

    const { type, message, statusCode, booking } = await verifyRequest(token);

    successResponse(res, statusCode, {
      type,
      message,
      booking,
    });
  } catch (e) {
    next(e);
  }
};

exports.bookingDetail = async (req, res, next) => {
  try {
    const {
      params: { bookingId },
    } = req;

    const { type, message, statusCode, booking } = await getBookingDetail(
      bookingId
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

exports.updateBookingStatus = async (req, res, next) => {
  try {
    const {
      params: { bookingId, status },
      body: { userId, role },
    } = req;

    const { type, message, statusCode, booking } = await updateStatus(
      bookingId,
      Number(status),
      userId,
      role
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

exports.bookingHistory = async (req, res, next) => {
  try {
    const {
      user: { role, userId },
    } = req;

    const { type, message, statusCode, bookings } = await history(role, userId);

    successResponse(res, statusCode, {
      type,
      message,
      bookings,
    });
  } catch (e) {
    next(e);
  }
};
