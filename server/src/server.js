const express = require("express");
const morgan = require("morgan");

const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

const connectDb = require("./db/connection");
const routes = require("./routes");
const { config } = require("./config");

const corsOptions = {
  origin: config.client.url,
  optionsSuccessStatus: 200,
  credentials: true,
};
app.use(cors(corsOptions));

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser());
app.use("/api", routes);

module.exports = app.listen(config.app.port, () => {
  console.log(`App is running on http://127.0.0.1:${config.app.port}`);
  connectDb();
});
