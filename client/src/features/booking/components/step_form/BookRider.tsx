import Card from "core/components/card/Card";
import { setActiveStep } from "core/store/step/reducer/step.reducer";
import BookingInfo from "features/booking/components/booking_info/BookingInfo";
import RideMap from "features/booking/components/map/RideMap";

import RiderList from "features/booking/components/riders/RiderList";
import { FaArrowCircleLeft } from "react-icons/fa";
import { useDispatch } from "react-redux";

const BookRider = () => {
  const dispatch = useDispatch();

  return (
    <>
      <FaArrowCircleLeft
        fontSize={24}
        onClick={() => dispatch(setActiveStep(0))}
        className="mb-3"
      />
      <Card className="mb-4">
        <BookingInfo />
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-0 xl:grid-cols-2 gap-2">
        <Card className="p-3">
          <RideMap />
        </Card>
        <RiderList />
      </div>
    </>
  );
};

export default BookRider;
