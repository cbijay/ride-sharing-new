const { cookie, param } = require("express-validator");

exports.bookingValidator = (method) => {
  switch (method) {
    case "bookRides": {
      return [
        cookie("userId").exists(),
        cookie("userName").exists(),
        param("riderId").exists(),
      ];
    }

    case "rideRequest": {
      return [query("token").exists().withMessage("Invalid url")];
    }

    case "acceptOrRejectRequest": {
      return [
        param("bookingId").exists(),
        param("status").exists(),
        cookie("userEmail").exists(),
      ];
    }

    case "currentBooking": {
      return [cookie("userRole").exists(), cookie("userId").exists()];
    }

    case "bookingHistory": {
      return [cookie("userRole").exists(), cookie("userId").exists()];
    }
  }
};
