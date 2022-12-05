const { findSelectedRider } = require("../repository/rider.repository");
const {
  bookRide,
  findBooking,
  currentUserBooking,
  userBookingHistory,
  findUser,
  updateBooking,
  bookingById,
} = require("../repository/booking.repository");

const { sendMail } = require("../utils/mail");
const { config } = require("../config");
const { sign, verify } = require("jsonwebtoken");

exports.bookRides = async (body, userId, userName, riderId) => {
  try {
    const rider = await findSelectedRider(riderId);
    if (!rider) throw new Error("Error selecting rider");

    const token = sign(
      {
        riderId: rider?._id,
        email: rider?.email,
      },
      config.jwt.secret,
      {
        expiresIn: "15m",
      }
    );
    const booking = await bookRide(body, userId, riderId);

    sendMail(
      config.mail.email,
      rider.email,
      `New Ride request from ${userName}`,
      `You have got new ride request`,
      `<h1>Email Confirmation</h1>
        <h2>Hello ${rider.name}</h2>
        <p>You have got new request from ${userName}. 
        Please go to the below link to accept or reject your ride request</p>
        <a href=${config.client.url}/booking/request?token=${token}>Click Here</a>
        </div>`
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
    const verifyToken = await verify(token, config.jwt.secret);

    const booking = await findBooking(verifyToken?.riderId, "rider");
    if (!booking) throw new Error("Booking doesn't exist");

    return {
      type: "Success",
      statusCode: 200,
      message: "Successfully verified!!",
      booking: booking,
    };
  } catch (err) {
    return {
      type: "Error",
      statusCode: 500,
      message: err.message,
    };
  }
};

exports.updateStatus = async (bookingId, status, userId, userRole) => {
  try {
    if (!userId && !role) throw new Error("User id and role is required");

    const user = await findUser(userId);
    if (!user) throw new Error("Error selecting user");

    const bookingStatus = () => {
      switch (status) {
        case 1:
          return "Accepted";

        case 2:
          return "Cancelled";

        case 3:
          return "Completed";
        default:
          return "Pending";
      }
    };

    const updateBookingStatus = await updateBooking(bookingId, {
      status: bookingStatus(),
    });
    if (!updateBookingStatus) throw new Error("Error updating status");

    const booking = await findBooking(userId, userRole);
    if (!booking) throw new Error("Error fetching booking");

    sendMail(
      config.mail.email,
      user.email,
      "Request accepted",
      `Your ride request has been ${bookingStatus()}.`
    );

    return {
      type: "Success",
      statusCode: 200,
      message: "Booking updated",
      booking: booking,
    };
  } catch (err) {
    return {
      type: "Error",
      statusCode: 500,
      message: err.message,
    };
  }
};

exports.history = async (userRole, userId) => {
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

exports.getBookingDetail = async (bookingId) => {
  try {
    const booking = await bookingById(bookingId);

    return {
      type: "Success",
      statusCode: 200,
      message: "Booking fetched successfully",
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
