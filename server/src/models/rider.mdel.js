const { Schema, model } = require("mongoose");

const riderSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  vehicle: {
    color: {
      type: String,
      required: false,
    },
    model: {
      type: String,
      required: false,
    },
    number: {
      type: String,
      required: false,
    },
  },
});

exports.Rider = model("riders", riderSchema);
