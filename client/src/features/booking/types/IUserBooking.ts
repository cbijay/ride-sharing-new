import { IBooking } from "features/booking/types/IBooking";
import { IBookingRider } from "features/booking/types/IBookingRider";

export interface IUserBookingRequest {
  riderId?: string;
  pickupCoordinates: Number[];
  pickupAddress?: String;
  destinationAddress?: String;
  destinationCoordinates: Number[];
  totalDistance: Number;
  estimatedTime: Number;
}

export interface IUserBooking extends IBooking {
  rider: IBookingRider;
}
