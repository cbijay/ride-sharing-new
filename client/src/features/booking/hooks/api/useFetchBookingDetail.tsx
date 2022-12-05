import { useQuery } from "@tanstack/react-query";
import { bookingById } from "features/booking/api/booking";
import { IBookingResponse } from "features/booking/types/IBooking";

export const useGetBookingById = (id?: string) => {
  return useQuery<IBookingResponse, Error>(["bookingById", id], () =>
    bookingById(id)
  );
};
