const express = require("express");
const {
  bookRides,
  rideRequest,
  acceptOrRejectRequest,
} = require("../controller/booking.controller");
const auth = require("../middleware/auth.middleware");
const { bookingValidator } = require("../utils/validator/booking.validator");

const routes = express.Router();

routes.post("/:riderId/book", [auth, bookingValidator("bookRides")], bookRides);
routes.get("/request", [auth, bookingValidator("rideRequest")], rideRequest);
routes.put(
  "/:bookingId/:status",
  [auth, bookingValidator("acceptOrRejectRequest")],
  acceptOrRejectRequest
);
routes.get(
  "current",
  [auth, bookingValidator("currentBooking")],
  currentBooking
);
routes.get(
  "history",
  [auth, bookingValidator("bookingHistory")],
  bookingHistory
);

const bookingRoutes = routes;
module.exports = bookingRoutes;
