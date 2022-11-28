const express = require("express");
const { searchRider } = require("../controller/rider.controller");
const auth = require("../middleware/auth.middleware");
const { riderValidator } = require("../utils/validator/rider.validator");

const routes = express.Router();

routes.get("/search", [auth, riderValidator("searchRider")], searchRider);

const riderRoutes = routes;
module.exports = riderRoutes;
