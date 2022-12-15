import AppLayout from "core/layouts/AppLayout";
import BookRider from "features/booking/components/step_form/BookRider";

import FindRider from "features/booking/components/step_form/FindRider";
import useBookRide from "features/booking/hooks/pages/useBookRide";

const BookRide = () => {
  const { activeStep } = useBookRide();

  return (
    <AppLayout>
      <h3 className="text-md font-medium mb-2">Book Ride</h3>

      {activeStep === 0 && <FindRider />}

      {activeStep === 1 && <BookRider />}
    </AppLayout>
  );
};

export default BookRide;
