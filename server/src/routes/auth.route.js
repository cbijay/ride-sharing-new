const express = require("express");
const {
  userSignup,
  userLogin,
  userLogOut,
} = require("../controller/auth.controller");
const auth = require("../middleware/auth.middleware");
const { authValidator } = require("../utils/validator/auth.validator");

const routes = express.Router();

routes.post("/signup", userSignup);
routes.post("/signin", userLogin);
routes.get("/logout", auth, userLogOut);

exports.authRoutes = routes;
