const express = require("express");
const { searchRider } = require("../controller/rider.controller");
const auth = require("../middleware/auth.middleware");

const routes = express.Router();

routes.get("/search", auth, searchRider);

exports.riderRoutes = routes;
