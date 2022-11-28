const express = require("express");
const { body, param } = require("express-validator");
const { bookRides } = require("../controller/booking.controller");

const routes = express.Router();

routes.post("/:riderId/book", bookRides);
// routes.post('/ride/select')

const bookingRoutes = routes;
module.exports = bookingRoutes;
