import { Booking } from "../models/booking.model";

const selectRide = async (body, userId, riderId) => {
  return await Booking.create({
    request_time: body.request_time,
    start_location: {
      coordinates: body.pickup_coordinates,
      address: body.pickup_address,
    },
    end_location: {
      coordinates: body.destination_coordinates,
      address: body.destination_address,
    },
    user_id: userId,
    rider_id: riderId,
  });
};

module.exports = { selectRide };
