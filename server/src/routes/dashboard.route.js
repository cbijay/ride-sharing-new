const express = require("express");
const { userDashboard } = require("../controller/dashboard.controller");

const auth = require("../middleware/auth.middleware");

const routes = express.Router();

routes.get("/stat", auth, userDashboard);

exports.dashboardRoutes = routes;
