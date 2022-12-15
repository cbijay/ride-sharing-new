import classNames from "classnames";
import Card from "core/components/card/Card";
import { TBookingCard } from "core/types/components/card/TBookingCard";

import { FC } from "react";
import { AiTwotoneStop } from "react-icons/ai";

const BookingCard: FC<TBookingCard> = ({
  date,
  startLocation,
  endLocation,
  status,
  className,
}) => {
  return (
    <Card
      className={classNames(
        "flex flex-row justify-between items-center shadow-lg",
        className
      )}
    >
      <div data-testid="booking-card">
        {date && (
          <h3 className="text-md mb-1 text-gray-700 italic font-medium">
            {date}
          </h3>
        )}

        {startLocation && (
          <h4 className="text-gray-500 mb-1 italic flex flex-row items-center">
            <AiTwotoneStop className="mr-1" />
            {startLocation}
          </h4>
        )}
        {endLocation && (
          <h5 className="text-gray-500 italic flex flex-row items-center">
            <AiTwotoneStop className="mr-1" color="#f1b600" />
            {endLocation}
          </h5>
        )}
      </div>
      {status && (
        <p
          className={
            status === "Pending"
              ? "text-blue-400"
              : status === "Completed"
              ? "text-success"
              : "text-red-500"
          }
        >
          {status}
        </p>
      )}
    </Card>
  );
};

export default BookingCard;
