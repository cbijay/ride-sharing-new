const express = require("express");
const { userSignup, userLogin } = require("../controller/auth.controller");

const routes = express.Router();

routes.post("/signup", userSignup);
routes.post("/login", userLogin);

exports.authRoutes = routes;
