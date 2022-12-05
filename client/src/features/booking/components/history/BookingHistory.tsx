import BookingCard from "features/booking/components/card/BookingCard";
import useBookingHistory from "features/booking/hooks/components/booking/useBookingHistory";
import { IBooking } from "features/booking/types/IBooking";

import moment from "moment";
import { FC } from "react";
import { Link } from "react-router-dom";

export type TBookingHistory = {
  isViewLink?: boolean;
};

const BookingHistory: FC<TBookingHistory> = ({ isViewLink }) => {
  const { bookings } = useBookingHistory();

  return (
    <>
      <div className="flex flex-row justify-between mb-3">
        <h3 className="text-md font-medium mb-2">Booking History</h3>
        {isViewLink && (
          <Link to="/history" className="text-success font-medium">
            View All
          </Link>
        )}
      </div>
      {bookings &&
        bookings.map(
          (
            { _id, requestTime, startLocation, endLocation }: IBooking,
            index: number
          ) => (
            <Link to={`/bookings/${_id}`} key={index}>
              <BookingCard
                key={index}
                date={moment(requestTime).format("YYYY/M/DD")}
                startLocation={startLocation.address}
                endLocation={endLocation?.address}
              />
            </Link>
          )
        )}
    </>
  );
};

export default BookingHistory;
