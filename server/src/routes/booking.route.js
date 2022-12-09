const express = require("express");
const {
  rideRequest,
  updateBookingStatus,
  bookingHistory,
  bookingDetail,
  bookRide,
} = require("../controller/booking.controller");
const auth = require("../middleware/auth.middleware");

const routes = express.Router();

routes.get("/history", auth, bookingHistory);

routes.post("/:riderId/book", auth, bookRide);
routes.get("/request", auth, rideRequest);
routes.get("/:bookingId", auth, bookingDetail);
routes.put("/:bookingId/:status", auth, updateBookingStatus);

exports.bookingRoutes = routes;
