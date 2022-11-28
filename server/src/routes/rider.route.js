const express = require("express");
const searchRider = require("../controller/rider.controller");
const { check } = require("express-validator");

const routes = express.Router();

routes.get(
  "/search",
  [check.query("lat").not().isEmpty(), check.query("long").not().isEmpty()],
  searchRider
);

const riderRoutes = routes;
module.exports = riderRoutes;
