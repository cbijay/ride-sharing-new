const express = require("express");
const riderRoutes = require("./rider.route");

const routes = express.Router();

routes.get("/", (req, res) => res.json({ message: "Test api" }));

// routes.use("/auth", authRoutes);
routes.use("/rider", riderRoutes);
routes.use("/bookings", bookingRoutes);

module.exports = routes;
