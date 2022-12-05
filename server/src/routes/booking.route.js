const express = require("express");
const {
  bookRides,
  rideRequest,
  updateBookingStatus,
  bookingHistory,
  bookingDetail,
} = require("../controller/booking.controller");
const auth = require("../middleware/auth.middleware");

const routes = express.Router();

routes.get("/history", auth, bookingHistory);

routes.post("/:riderId/book", auth, bookRides);
routes.get("/request", rideRequest);
routes.get("/:bookingId", bookingDetail);
routes.put("/:bookingId/:status", updateBookingStatus);

exports.bookingRoutes = routes;
