const { mongoose } = require("mongoose");
const { config } = require("../config");
const { Logger } = require("../logs/logger");

const connectDb = async () => {
  try {
    //Database Connect
    // const connection = await mongoose.connect(config.db.uri, () => {
    //   Logger.info("Database Connected");
    // });

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
