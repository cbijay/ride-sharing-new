import { RootState } from "core/store";
import {
  setLoading,
  storeDestination,
  storePickup,
} from "core/store/booking/reducer/booking.reducer";
import {
  validateDestination,
  validatePickup,
} from "core/store/form/reducer/form.reducer";
import { getRiders } from "core/store/rider/reducer/rider.reducer";
import { setActiveStep } from "core/store/step/reducer/step.reducer";
import { addNotification } from "core/store/toast/reducer/toast.reducer";
import { useFindRiders } from "features/booking/hooks/api/useFindRider";

import { MutableRefObject, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

const useBookingForm = () => {
  const pickupRef = useRef() as MutableRefObject<HTMLInputElement>;
  const destinationRef = useRef() as MutableRefObject<HTMLInputElement>;

  const dispatch = useDispatch();
  const {
    booking: { startLocation, endLocation },
  } = useSelector((state: RootState) => state.booking);

  const { error } = useSelector((state: RootState) => state.form);
  const { riders } = useSelector((state: RootState) => state.rider);

  const { data } = useFindRiders(
    startLocation.coordinates[0],
    startLocation.coordinates[1]
  );

  useEffect(() => {
    data && dispatch(getRiders(data?.riders));
  }, [data]);

  useEffect(() => {
    if (pickupRef.current.value === "")
      dispatch(validatePickup("Pickup is required"));
  }, [pickupRef]);

  useEffect(() => {
    if (destinationRef.current.value === "")
      dispatch(validateDestination("Destination is required"));
  }, [destinationRef]);

  const handlePickup = (place: any) => {
    pickupRef.current.value = place?.label;
    dispatch(storePickup(place));
    dispatch(setLoading(false));
    dispatch(validatePickup(""));
  };

  const handleDestination = (place: any) => {
    destinationRef.current.value = place?.label;
    dispatch(storeDestination(place));
    dispatch(setLoading(false));
    dispatch(validateDestination(""));
  };

  const handleLoading = () => {
    dispatch(setLoading(true));
  };

  const handleFindRider = async () => {
    riders.length === 0 &&
      dispatch(addNotification({ type: "Info", message: "No riders found" }));

    const errors = Object.values(error).filter((value) => value !== "").length;
    errors === 0 && dispatch(setActiveStep(1));
  };

  useEffect(() => {
    if (startLocation) pickupRef.current.value = startLocation.address;
  }, [startLocation]);

  useEffect(() => {
    if (endLocation) destinationRef.current.value = endLocation.address;
  }, [endLocation]);

  return {
    dispatch,
    pickupRef,
    destinationRef,
    handlePickup,
    handleDestination,
    handleFindRider,
    handleLoading,
    error,
  };
};

export default useBookingForm;
