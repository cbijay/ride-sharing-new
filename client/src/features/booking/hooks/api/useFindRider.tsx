import { useQuery } from "@tanstack/react-query";
import { findRiders } from "features/booking/api/rider";
import { IRiderResponse } from "features/booking/types/IBookingRider";

export const useFindRiders = (lat: number, long: number) => {
  return useQuery<IRiderResponse, ErrorConstructor>(["riders", lat, long], () =>
    findRiders(lat, long)
  );
};
