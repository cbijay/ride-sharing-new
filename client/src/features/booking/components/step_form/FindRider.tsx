import Card from "core/components/card/Card";
import BookingForm from "features/booking/components/form/BookingForm";
import RideMap from "features/booking/components/map/RideMap";

const FindRider = () => {
  return (
    <Card className="p-3 relative">
      <RideMap style={{ height: "70vh" }} />
      <BookingForm />
    </Card>
  );
};

export default FindRider;
