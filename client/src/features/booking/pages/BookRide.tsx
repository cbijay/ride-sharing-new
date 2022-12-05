import AppLayout from "core/layouts/AppLayout";
import { RootState } from "core/store";
import BookRider from "features/booking/components/riders/BookRider";

import FindRider from "features/booking/components/step_form/FindRider";
import { useSelector } from "react-redux";

const BookRide = () => {
  const { activeStep } = useSelector((state: RootState) => state.step);

  return (
    <AppLayout>
      <h3 className="text-md font-medium mb-2">Book Ride</h3>

      {activeStep === 0 && <FindRider />}

      {activeStep === 1 && <BookRider />}
    </AppLayout>
  );
};

export default BookRide;
