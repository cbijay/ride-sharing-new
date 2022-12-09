const response = require("../utils/response");
const bookingService = require("../services/booking.service");

exports.bookRide = async (req, res, next) => {
  try {
    const {
      body,
      user: { userId, name },
      params: { riderId },
    } = req;

    const { type, message, statusCode, booking } =
      await bookingService.createBooking(body, userId, name, riderId);

    return response.successResponse(res, statusCode, {
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

    const { type, message, statusCode, booking } =
      await bookingService.verifyRequest(token);

    return response.successResponse(res, statusCode, {
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

    const { type, message, statusCode, booking } =
      await bookingService.getBookingDetail(bookingId);

    return response.successResponse(res, statusCode, {
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
      user: { userId, role },
      // body: { userId, role },
    } = req;

    const { type, message, statusCode, booking } =
      await bookingService.updateStatus(
        bookingId,
        Number(status),
        userId,
        role
      );

    return response.successResponse(res, statusCode, {
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
      query: { page, perPage },
    } = req;

    const { type, message, statusCode, bookings } =
      await bookingService.history(page, perPage, role, userId);

    return response.successResponse(res, statusCode, {
      type,
      message,
      bookings,
    });
  } catch (e) {
    next(e);
  }
};
