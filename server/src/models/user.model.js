const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  profilePic: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    enum: ["user", "rider"],
    default: "user",
    required: true,
  },
  location: {
    type: {
      type: String,
      default: "Point",
      required: false,
    },
    coordinates: { type: [Number], required: false },
  },
});

userSchema.index({ location: "2dsphere" });

exports.User = model("users", userSchema);
