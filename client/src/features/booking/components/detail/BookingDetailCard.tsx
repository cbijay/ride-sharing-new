import Card from "core/components/card/Card";
import BookingInfo from "features/booking/components/booking_info/BookingInfo";

import RideMap from "features/booking/components/map/RideMap";
import { FC, ReactNode } from "react";

export type TBookingDetailCard = {
  buttons: ReactNode;
};
const BookingDetailCard: FC<TBookingDetailCard> = ({ buttons }) => {
  return (
    <Card className="p-3">
      <RideMap style={{ height: "40vh" }} />
      <BookingInfo isCol={true} className="mt-4" />
      {buttons}
    </Card>
  );
};

export default BookingDetailCard;
