import Card from "core/components/card/Card";
import useBookingForm from "features/booking/hooks/components/form/useBookingForm";

import Button from "core/components/buttons/Button";
import Autocomplete from "features/booking/components/autocomplete/Autocomplete";
import DistanceTime from "features/booking/components/distance_time/DistanceTime";

const BookingForm = () => {
  const {
    pickupRef,
    destinationRef,
    handlePickup,
    handleDestination,
    handleFindRider,
    handleLoading,
    error,
  } = useBookingForm();

  return (
    <Card className="w-full absolute z-[1000] bottom-[-50px] left-0 right-0 p-4">
      <div className="grid items-top flex-1 md:grid-flow-col gap-y-2 md:gap-2 mb-3">
        <Autocomplete
          name="pickup"
          inputRef={pickupRef}
          placeholder="Pickup"
          handlePlace={handlePickup}
          handleChange={handleLoading}
          className="col-span-10"
          error={error}
        />

        <Autocomplete
          name="destination"
          inputRef={destinationRef}
          placeholder="Destination"
          handlePlace={handleDestination}
          handleChange={handleLoading}
          className="col-span-10"
          error={error}
        />

        <Button
          className="bg-black text-white py-2 rounded-xl text-md w-full self-start"
          onClick={handleFindRider}
          type="button"
        >
          Find Rider
        </Button>
      </div>
      <DistanceTime />
    </Card>
  );
};

export default BookingForm;
