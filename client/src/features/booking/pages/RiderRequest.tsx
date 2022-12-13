import Button from "core/components/buttons/Button";
import ErrorData from "core/components/error/ErrorData";
import LoadingSpinner from "core/components/loading/LoadingSpinner";
import AppLogo from "core/components/logo/AppLogo";

import useRiderRequest from "features/booking/hooks/components/rider/useRiderRequest";
import { FaTimesCircle } from "react-icons/fa";
import BookingDetailCard from "../components/detail/BookingDetailCard";
import useUpdateStatus from "../hooks/components/rider/useUpdateStatus";

const RiderRequest = () => {
  const { status, token, isLoading, error, isDisabled } = useRiderRequest();
  const { handleStatus } = useUpdateStatus({ token });

  if (isLoading) return <LoadingSpinner />;

  if (error?.message !== "")
    return (
      <ErrorData
        icon={
          <FaTimesCircle fontSize={44} className="mx-auto mb-3 text-danger" />
        }
        title="Link Invalid or Expired"
        message={`It looks like your link ${
          error?.message === "jwt expired"
            ? "has already been expired"
            : "is invalid"
        }`}
      />
    );

  return (
    <div className="max-w-3xl w-full mx-auto">
      <AppLogo className="mt-16 mx-auto" />
      <h3 className="my-4 font-light text-lg">New Ride Request</h3>

      <BookingDetailCard
        buttons={
          status && (
            <div className="flex flex-row items-center gap-2">
              <>
                {status === "Pending" && (
                  <>
                    <Button
                      className={`bg-success px-4 text-white ${isDisabled} ? "opacity-50" : ""`}
                      onClick={() => !isDisabled && handleStatus(1)}
                      disabled={isDisabled}
                    >
                      Accept
                    </Button>

                    <Button
                      className={`bg-danger px-5 text-white ${isDisabled} ? "opacity-50" : ""`}
                      onClick={() => !isDisabled && handleStatus(2)}
                      disabled={isDisabled}
                    >
                      Reject
                    </Button>
                  </>
                )}

                {status === "Accepted" && (
                  <Button
                    className={`bg-success px-4 text-white ${isDisabled} ? "opacity-50" : ""`}
                    onClick={() => !isDisabled && handleStatus(3)}
                    disabled={isDisabled}
                  >
                    Complete
                  </Button>
                )}
              </>
            </div>
          )
        }
      />
    </div>
  );
};

export default RiderRequest;
