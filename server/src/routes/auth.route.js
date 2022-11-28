const express = require("express");
const {
  userSignup,
  userLogin,
  userLogOut,
} = require("../controller/auth.controller");
const auth = require("../middleware/auth.middleware");
const { authValidator } = require("../utils/validator/auth.validator");

const routes = express.Router();

routes.post("/signup", authValidator("userSignup"), userSignup);
routes.post("/signin", authValidator("userLogin"), userLogin);
app.get("/logout", auth, userLogOut);

const riderRoutes = routes;
module.exports = riderRoutes;
