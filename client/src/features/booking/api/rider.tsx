import api from "core/lib/api";

import { IRiderResponse } from "features/booking/types/IBookingRider";
import { IRiderBookingResponse } from "features/booking/types/IRiderBooking";

export const findRiders = async (lat: number, long: number) => {
  const response: IRiderResponse = await api.get(
    `${process.env.REACT_APP_BASE_URL!}/rider/search?lat=${lat}&long=${long}`
  );

  return response;
};

export const bookingRequest = async (token: string | null) => {
  const response: IRiderBookingResponse = await api.get(
    `${process.env.REACT_APP_BASE_URL!}/booking/request?token=${token}`
  );

  return response;
};
