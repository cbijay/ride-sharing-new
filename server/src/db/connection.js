const { mongoose } = require("mongoose");
const { config } = require("../config");

const connectDb = async () => {
  try {
    //Database Connect
    mongoose
      .connect(config.db.uri)
      .then(() => {
        console.log("Connected to database");
      })
      .catch((err) => {
        console.log("Failed to connect to database");
      });
  } catch (error) {
    console.log("Database error:", error);
  }
};

module.exports = connectDb;
