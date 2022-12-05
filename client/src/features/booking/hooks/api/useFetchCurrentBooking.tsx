import { useQuery } from "@tanstack/react-query";
import { currentBooking } from "features/booking/api/booking";
import { IBookingResponse } from "features/booking/types/IBooking";

export const useFetchCurrentBooking = () => {
  return useQuery<IBookingResponse, Error>(["currentBooking"], () =>
    currentBooking()
  );
};
