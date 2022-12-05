import BookingCard from "features/booking/components/card/BookingCard";
import { FC } from "react";

export type TCurrentBooking = {
  className?: string;
};

const CurrentBooking: FC<TCurrentBooking> = ({ className }) => {
  return (
    <div className={className}>
      <h3 className="text-md font-medium mb-3">Current Ride</h3>
      <BookingCard
        date="2022/11/24 2:00 PM"
        startLocation="Asan Bazar, Kathmandu"
        endLocation="Kalanki Chowk, Kathmandu"
      />
    </div>
  );
};

export default CurrentBooking;
