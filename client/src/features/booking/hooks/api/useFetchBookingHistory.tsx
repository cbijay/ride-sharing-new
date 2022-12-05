import { useQuery } from "@tanstack/react-query";
import { bookingHistory } from "features/booking/api/booking";
import { IBookingHistory } from "features/booking/types/IBooking";

export const useFetchBookingHistory = () => {
  return useQuery<IBookingHistory, Error>(["bookingHistory"], () =>
    bookingHistory()
  );
};
