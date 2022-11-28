import { model, Schema } from "mongoose";

const bookingSchema = new Schema({
  request_time: {
    type: Date,
    default: Date.now,
  },
  start_location: {
    coordinates: [Number],
    address: {
      type: String,
    },
  },
  end_location: {
    coordinates: [Number],
    address: {
      type: String,
    },
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  rider_id: {
    type: Schema.Types.ObjectId,
    ref: "riders",
  },
  otp: {
    type: Number,
    expires: "15m",
    index: true,
  },
  status: {
    type: String,
    enum: ["accepted", "pending", "cancelled", "rejected"],
    default: "pending",
  },
});

const Booking = model("bookings", bookingSchema);

module.exports = Booking;
