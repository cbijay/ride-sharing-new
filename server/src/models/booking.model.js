const { Schema, model } = require("mongoose");

const bookingSchema = new Schema({
  requestTime: {
    type: Date,
    default: Date.now,
  },
  startLocation: {
    coordinates: [Number],
    address: {
      type: String,
    },
  },
  endLocation: {
    coordinates: [Number],
    address: {
      type: String,
    },
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  riderId: {
    type: Schema.Types.ObjectId,
    ref: "riders",
  },
  token: {
    type: String,
    expires: "15m",
    index: true,
  },
  totalDistance: {
    type: Number,
    require: false,
  },
  estimatedTime: {
    type: Number,
    require: false,
  },
  status: {
    type: String,
    enum: ["Accepted", "Rejected", "Cancelled", "Completed", "Pending"],
    default: "Pending",
  },
});

exports.Booking = model("bookings", bookingSchema);
