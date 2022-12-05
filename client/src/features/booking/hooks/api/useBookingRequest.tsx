import { useQuery } from "@tanstack/react-query";
import { bookingRequest } from "features/booking/api/rider";
import { IRiderBookingResponse } from "features/booking/types/IRiderBooking";

export const useBookingRequest = (id: string | null, token: string | null) => {
  return useQuery<IRiderBookingResponse, Error>(
    ["bookingRequest", id, token],
    () => bookingRequest(id, token)
  );
};
