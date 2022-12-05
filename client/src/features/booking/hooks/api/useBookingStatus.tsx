import { useMutation } from "@tanstack/react-query";
import { updateBookingStatus } from "features/booking/api/booking";
import {
  IBookingResponse,
  IBookingStatus,
} from "features/booking/types/IBooking";

export const useUpdateBookingStatus = ({ onSuccess, onError }: any) => {
  return useMutation<IBookingResponse, Error, IBookingStatus>(
    ["bookRider"],
    (data) => updateBookingStatus(data),
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
