import { RootState } from "core/store";
import {
  setError,
  storeBookingId,
  storeDestination,
  storePickup,
  updateStatus,
} from "core/store/booking/reducer/booking.reducer";
import { IPlace } from "features/booking/types/IPlace";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router";
import { useGetBookingById } from "../api/useFetchBookingDetail";

const useBookingDetail = () => {
  const { userId, role } = useSelector((state: RootState) => state.user);
  const { id } = useParams();
  const { search } = useLocation();

  const token = new URLSearchParams(search).get("token");
  const { data, error: requestError } = useGetBookingById(id);

  const {
    booking: { status },
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

  useEffect(() => {
    if (data) {
      loadStartLocation();
      loadEndLocation();
      loadBooking();
    }
    requestError && dispatch(setError(requestError));
  }, [data, requestError]);

  return { userId, role, id, token, status, isDisabled };
};

export default useBookingDetail;
