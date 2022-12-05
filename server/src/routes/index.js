const express = require("express");
const { authRoutes } = require("./auth.route");
const { bookingRoutes } = require("./booking.route");

const { dashboardRoutes } = require("./dashboard.route");
const { riderRoutes } = require("./rider.route");

const routes = express.Router();

routes.get("/", (req, res) => res.json({ message: "Test api" }));

routes.use("/auth", authRoutes);
routes.use("/rider", riderRoutes);
routes.use("/booking", bookingRoutes);
routes.use("/dashboard", dashboardRoutes);

module.exports = routes;
