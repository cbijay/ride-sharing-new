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
import { IPlace } from "features/booking/types/IPlace";

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

  const handlePickup = (place: IPlace) => {
    pickupRef.current.value = place?.label;
    dispatch(storePickup(place));
    dispatch(setLoading(false));
    dispatch(validatePickup(""));
  };

  const handleDestination = (place: IPlace) => {
    destinationRef.current.value = place?.label;
    dispatch(storeDestination(place));
    dispatch(setLoading(false));
    dispatch(validateDestination(""));
  };

  const handleLoading = () => {
    dispatch(setLoading(true));
  };

  const handleFindRider = async () => {
    if (pickupRef.current.value === "")
      dispatch(validatePickup("Pickup is required"));

    if (destinationRef.current.value === "")
      dispatch(validateDestination("Destination is required"));

    if (pickupRef.current.value !== "" && destinationRef.current.value !== "") {
      riders.length > 0 && dispatch(setActiveStep(1));

      riders.length === 0 &&
        dispatch(addNotification({ type: "Info", message: "No riders found" }));
    }
  };

  useEffect(() => {
    if (startLocation?.address) pickupRef.current.value = startLocation.address;
  }, [startLocation]);

  useEffect(() => {
    if (endLocation?.address)
      destinationRef.current.value = endLocation.address;
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
