import classNames from "classnames";
import EmptyCard from "core/components/card/EmptyCard";
import BookingCard from "features/booking/components/card/booking/BookingCard";
import useBookingHistory from "features/booking/hooks/components/booking/useBookingHistory";
import { IBooking } from "features/booking/types/IBooking";

import moment from "moment";
import { FC } from "react";
import { Link } from "react-router-dom";

export type TBookingHistory = {
  isViewLink?: boolean;
  perPage: number;
};

const BookingHistory: FC<TBookingHistory> = ({ isViewLink, perPage }) => {
  const { bookings, role } = useBookingHistory(1, perPage);

  return (
    <>
      <div className="flex flex-row justify-between mb-3">
        <h3 className="text-md font-medium mb-2">Booking History</h3>
        {isViewLink && (
          <Link to={`/${role}/bookings`} className="text-success font-medium">
            View All
          </Link>
        )}
      </div>
      {bookings.length > 0 ? (
        bookings.map(
          (
            { _id, requestTime, startLocation, endLocation, status }: IBooking,
            index: number
          ) => (
            <Link
              to={`/bookings/${_id}`}
              key={index}
              className={classNames(
                "flex w-full flex-col",
                index !== bookings.length - 1 ? "mb-3" : ""
              )}
            >
              <BookingCard
                key={index}
                date={moment(requestTime).format("YYYY/M/DD")}
                startLocation={startLocation.address}
                endLocation={endLocation?.address}
                status={status}
              />
            </Link>
          )
        )
      ) : (
        <EmptyCard message="No booking exists!!" />
      )}
    </>
  );
};

export default BookingHistory;
