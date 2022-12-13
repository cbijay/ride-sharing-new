const express = require("express");
const { authRoutes } = require("./auth.route");
const { bookingRoutes } = require("./booking.route");

const { dashboardRoutes } = require("./dashboard.route");
const { riderRoutes } = require("./rider.route");

const swaggerUi = require("swagger-ui-express");
const { swaggerDocument } = require("../docs/swagger");

const routes = express.Router();

routes.get("/", (req, res) => res.json({ message: "Test api" }));

routes.use("/auth", authRoutes);
routes.use("/rider", riderRoutes);
routes.use("/booking", bookingRoutes);
routes.use("/dashboard", dashboardRoutes);
routes.use(
  "/doc",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
    explorer: true,
    oauth: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      appName: "Ride Sharing",
    },
  })
);

module.exports = routes;
