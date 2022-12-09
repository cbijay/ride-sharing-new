import { RootState } from "core/store";
import { fetchBookings } from "core/store/booking/reducer/booking.reducer";
import { useFetchBookingHistory } from "features/booking/hooks/api/useFetchBookingHistory";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useBookingHistory = (page: number, perPage: number) => {
  const { data } = useFetchBookingHistory(page, perPage);

  const { role } = useSelector((state: RootState) => state.user);
  const { bookings } = useSelector((state: RootState) => state.booking);
  const dispatch = useDispatch();

  useEffect(() => {
    data && dispatch(fetchBookings(data.bookings));
  }, [data]);

  return {
    bookings,
    role,
  };
};

export default useBookingHistory;
