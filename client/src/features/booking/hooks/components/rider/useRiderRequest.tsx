import { RootState } from "core/store";

import {
  setError,
  storeBookingId,
  storeBookingUser,
  storeDestination,
  storePickup,
  updateStatus,
} from "core/store/booking/reducer/booking.reducer";

import { useBookingRequest } from "features/booking/hooks/api/useBookingRequest";

import { IPlace } from "features/booking/types/IPlace";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";

const useRiderRequest = () => {
  const { search } = useLocation();
  const token = new URLSearchParams(search).get("token");

  const { data, error: requestError } = useBookingRequest(token);
  console.log(
    "🚀 ~ file: useRiderRequest.tsx:25 ~ useRiderRequest ~ data",
    data
  );

  const {
    booking: { _id: status },
    isLoading,
    error,
    isDisabled,
  } = useSelector((state: RootState) => state.booking);

  const dispatch = useDispatch();

  const loadStartLocation = () => {
    if (data) {
      const startLoaction: IPlace = {
        label: data?.booking.startLocation.address,
        raw: {
          lat: data?.booking?.startLocation?.coordinates[0],
          lon: data?.booking?.startLocation?.coordinates[1],
        },
      };

      dispatch(storePickup(startLoaction));
    }
  };

  const loadEndLocation = () => {
    if (data) {
      const endLoaction: IPlace = {
        label: data?.booking.endLocation.address,
        raw: {
          lat: data?.booking?.endLocation?.coordinates[0],
          lon: data?.booking?.endLocation?.coordinates[1],
        },
      };

      dispatch(storeDestination(endLoaction));
    }
  };

  const loadBooking = () => {
    dispatch(storeBookingId(data?.booking._id));
    data && dispatch(updateStatus(data?.booking.status));
  };

  const loadBookingUser = () => {
    data && dispatch(storeBookingUser(data?.booking?.user));
  };

  useEffect(() => {
    if (data) {
      loadStartLocation();
      loadEndLocation();
      loadBooking();
      loadBookingUser();
    }
    requestError && dispatch(setError(requestError));
  }, [data, requestError]);

  return { status, token, isLoading, error, isDisabled };
};

export default useRiderRequest;
