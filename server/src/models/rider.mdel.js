import { model, Schema } from "mongoose";

export const riderSchema = new Schema({
  user_id: {
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

const Rider = model("riders", riderSchema);
module.exports = Rider;
