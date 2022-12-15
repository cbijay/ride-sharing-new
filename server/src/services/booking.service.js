const riderRepo = require("../repository/rider.repository");
const bookingRepo = require("../repository/booking.repository");
const mail = require("../utils/mail");

const { config } = require("../config");
const { sign, verify } = require("jsonwebtoken");

/**
 * find selected rider, creates booking
 * send email to the respective rider email
 * @param {*} body
 * @param {*} userId
 * @param {*} userName
 * @param {*} riderId
 * @returns
 */
exports.createBooking = async (body, userId, userName, riderId) => {
  try {
    const rider = await riderRepo.findSelectedRider(riderId);
    if (!riderId) throw new Error("Rider id is required");

    if (!body.pickupAddress) throw new Error("Pickup is required");
    if (!body.destinationAddress) throw new Error("Destination is required");

    const token = sign(
      {
        userId: rider[0]?._id,
        name: rider[0]?.name,
        role: rider[0]?.role,
        email: rider[0]?.email,
      },
      config.jwt.secret,
      {
        expiresIn: "15m",
      }
    );

    const booking = await bookingRepo.bookRide(body, userId, riderId);

    mail.sendMail(
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

/**
 * Verify request based on token query provided from url
 * when user click on link they got from the email for the new ride request
 * @param {*} token
 * @returns
 */

exports.verifyRequest = async (token) => {
  try {
    if (!token) throw new Error("Invalid link");
    const verifyToken = await verify(token, config.jwt.secret);

    const booking = await bookingRepo.findBooking(
      verifyToken?.riderId,
      "rider"
    );

    return {
      type: "Success",
      statusCode: 200,
      message: "Successfully verified!!",
      booking: booking[0],
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
    if (!bookingId) throw new Error("Booking id is required");
    if (!status) throw new Error("Status is required");

    const user = await bookingRepo.findUser(userId);

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

    await bookingRepo.updateBooking(bookingId, {
      status: bookingStatus(),
    });

    const booking = await bookingRepo.findBooking(userId, userRole);

    mail.sendMail(
      config.mail.email,
      user.email,
      "Request accepted",
      `Your ride request has been ${bookingStatus()}.`
    );

    return {
      type: "Success",
      statusCode: 200,
      message: "Booking updated",
      booking: booking[0],
    };
  } catch (err) {
    return {
      type: "Error",
      statusCode: 500,
      message: err.message,
    };
  }
};

exports.history = async (page, perPage, userRole, userId) => {
  try {
    if (!page || !perPage)
      throw new Error("Page and perPage query is required");

    const skip = Number(page) > 1 ? Number(page) - 1 : 0;
    const bookings = await bookingRepo.userBookingHistory(
      Number(skip),
      Number(perPage),
      userRole,
      userId
    );

    return {
      type: "Success",
      statusCode: 200,
      message: "Bookings fetched successfully",
      bookings: bookings,
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
    if (!bookingId) throw new Error("Booking id is required");
    const booking = await bookingRepo.bookingById(bookingId);

    return {
      type: "Success",
      statusCode: 200,
      message: "Booking fetched successfully",
      booking: booking[0],
    };
  } catch (err) {
    return {
      type: "Error",
      statusCode: 500,
      message: err.message,
    };
  }
};
