const response = require("../utils/response");
const bookingService = require("../services/booking.service");

/**
 * Book Ride
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
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

/**
 * Ride Request to riders on new booking
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */

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

/**
 * Booking Detail
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */

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

/**
 * Update Booking Status
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
exports.updateBookingStatus = async (req, res, next) => {
  try {
    const {
      params: { bookingId, status },
      user: { userId, role },
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

/**
 * Booking History
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */

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
