import { RootState } from "core/store";
import { fetchBookings } from "core/store/booking/reducer/booking.reducer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFetchBookingHistory } from "../../api/useFetchBookingHistory";

const useBookingHistory = () => {
  const { data } = useFetchBookingHistory();

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
