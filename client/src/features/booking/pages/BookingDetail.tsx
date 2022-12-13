import Button from "core/components/buttons/Button";
import AppLayout from "core/layouts/AppLayout";
import BookingDetailCard from "features/booking/components/detail/BookingDetailCard";

import useUpdateStatus from "features/booking/hooks/components/rider/useUpdateStatus";
import useBookingDetail from "features/booking/hooks/pages/useBookingDetail";

const BookingDetail = () => {
  const { id, status, role, isDisabled } = useBookingDetail();
  const { handleStatus } = useUpdateStatus({ bookingId: id });

  return (
    <AppLayout>
      <BookingDetailCard
        buttons={
          status &&
          role === "user" && (
            <div className="flex flex-row items-center gap-2">
              <>
                {status !== "Cancelled" && (
                  <Button
                    className={`bg-danger px-4 text-white ${isDisabled} ? "opacity-50" : ""`}
                    onClick={() => !isDisabled && handleStatus(2)}
                    disabled={isDisabled}
                  >
                    Cancel
                  </Button>
                )}
              </>
            </div>
          )
        }
      />
    </AppLayout>
  );
};

export default BookingDetail;
