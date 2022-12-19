import { UseMutationResult } from "@tanstack/react-query";
import { RootState } from "core/store";
import { setButtonDisable } from "core/store/booking/reducer/booking.reducer";
import { addNotification } from "core/store/toast/reducer/toast.reducer";
import { IBookingResponse } from "features/booking/types/IBooking";

import { useBookRider } from "features/booking/hooks/api/useBookRider";
import { IUserBookingRequest } from "features/booking/types/IUserBooking";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

const useRider = (riderId?: string) => {
  const {
    mutate,
    data,
    error,
  }: UseMutationResult<IBookingResponse, Error, IUserBookingRequest> =
    useBookRider({});

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    booking: { totalDistance, estimatedTime, startLocation, endLocation },
    disabled,
  } = useSelector((state: RootState) => state.booking);

  const handleBooking = () => {
    const formValues = {
      riderId,
      pickupCoordinates: startLocation.coordinates,
      destinationCoordinates: endLocation.coordinates,
      pickupAddress: startLocation.address,
      destinationAddress: endLocation.address,
      totalDistance,
      estimatedTime,
    };

    dispatch(setButtonDisable(0));

    mutate(formValues);
  };

  useEffect(() => {
    if (data) {
      dispatch(addNotification({ type: "Success", message: data?.message }));
      navigate("/user/bookings");
      dispatch(setButtonDisable(0));
    }

    error &&
      dispatch(addNotification({ type: "Error", message: error?.message }));
  }, [data]);

  return { handleBooking, disabled };
};

export default useRider;
