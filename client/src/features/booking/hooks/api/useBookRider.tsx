import { useMutation } from "@tanstack/react-query";
import { bookRider } from "features/booking/api/booking";

import { IBookingResponse } from "features/booking/types/IBooking";
import { IUserBookingRequest } from "features/booking/types/IUserBooking";

export const useBookRider = ({ onSuccess, onError }: any) => {
  return useMutation<IBookingResponse, Error, IUserBookingRequest>(
    ["bookRider"],
    (data) => bookRider(data),
    {
      onSuccess: (data, variables) => {
        onSuccess && onSuccess(data, variables);
      },
      onError: (error: Error, _variables, _context) => {
        onError && onError(error);
      },
    }
  );
};
