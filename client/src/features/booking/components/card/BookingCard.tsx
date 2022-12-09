import Avatar from "core/components/avatar/Avatar";
import Card from "core/components/card/Card";
import { TBookingCard } from "core/types/components/card/TBookingCard";

import { FC } from "react";
import { AiTwotoneStop } from "react-icons/ai";

const BookingCard: FC<TBookingCard> = ({
  date,
  startLocation,
  endLocation,
  user,
}) => {
  return (
    <Card className="flex flex-row justify-between items-center">
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
      {user && <Avatar>{user[0]}</Avatar>}
    </Card>
  );
};

export default BookingCard;
