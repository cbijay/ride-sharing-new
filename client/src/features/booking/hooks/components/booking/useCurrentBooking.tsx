import { useFetchCurrentBooking } from "features/booking/hooks/api/useFetchCurrentBooking";
import { useEffect } from "react";

const useCurrentBooking = () => {
  const { data } = useFetchCurrentBooking();

  useEffect(() => {});

  return {};
};

export default useCurrentBooking;
