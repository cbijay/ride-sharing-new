const { mongoose } = require("mongoose");
const { config } = require("../config");
const { Logger } = require("../logs/logger");

const connectDb = async () => {
  try {
    mongoose
      .connect(config.db.uri)
      .then(() => {
        Logger.info("Connected to database");
      })
      .catch((err) => {
        Logger.error("Failed to connect to database");
      });
  } catch (error) {
    Logger.log("Database error:", error);
  }
};

module.exports = connectDb;
