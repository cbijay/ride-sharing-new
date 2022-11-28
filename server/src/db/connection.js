const config = require("../config");
const { connect } = require("mongoose");

const connectDb = async () => {
  try {
    //Database Connect
    await connect(
      config.db.uri,
      {
        dbName: config.db.dbName,
        user: config.db.dbUser,
        pass: config.db.dbPassword,
      },
      () => {
        console.log("Database Connected");
      }
    );
  } catch (error) {
    console.log("Database error:", error);
  }
};

module.exports = connectDb;
