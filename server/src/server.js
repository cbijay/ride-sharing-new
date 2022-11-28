const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const expressValidator = require("express-validator");
const app = express();

// const config = require("./config");
const connectDb = require("./db/connection");
const routes = require("./routes");
const { config } = require("./config");

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser());
// app.use(expressValidator);
app.use("api", routes);

module.exports = app.listen(config.app.port, () => {
  console.log(`App is running on http://127.0.0.1:${config.app.port}`);
  connectDb();
});
