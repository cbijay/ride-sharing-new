import { UseMutationResult } from "@tanstack/react-query";
import {
  setDisabled,
  updateStatus,
} from "core/store/booking/reducer/booking.reducer";
import { addNotification } from "core/store/toast/reducer/toast.reducer";
import { useUpdateBookingStatus } from "features/booking/hooks/api/useBookingStatus";

import {
  IBookingResponse,
  IBookingStatus,
} from "features/booking/types/IBooking";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useUpdateStatus = ({
  token,
  bookingId,
}: {
  token?: string | null;
  bookingId?: string | undefined;
}) => {
  const {
    mutate,
    data: updatedBooking,
  }: UseMutationResult<IBookingResponse, Error, IBookingStatus> =
    useUpdateBookingStatus({});

  const dispatch = useDispatch();

  const handleStatus = (value: number) => {
    let formValues;
    if (token) {
      formValues = {
        id: bookingId,
        token: token,
        status: value,
      };
    }

    formValues = {
      id: bookingId,
      status: value,
    };

    dispatch(setDisabled(true));
    mutate(formValues);
  };

  useEffect(() => {
    if (updatedBooking) {
      dispatch(updateStatus(updatedBooking?.booking.status));
      dispatch(
        addNotification({ type: "Success", message: updatedBooking?.message })
      );

      setDisabled(false);
    }
  }, [updatedBooking]);

  return { handleStatus };
};

export default useUpdateStatus;
