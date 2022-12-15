import { RootState } from "core/store";
import {
  calculateDistance,
  calculateTime,
  storeDestination,
  storePickup,
} from "core/store/booking/reducer/booking.reducer";
import { setActiveStep } from "core/store/step/reducer/step.reducer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useBookRide = () => {
  const { activeStep } = useSelector((state: RootState) => state.step);
  const dispatch = useDispatch();

  const defaultPlace = {
    label: "",
    raw: {
      lat: 0,
      lon: 0,
    },
  };

  useEffect(() => {
    dispatch(storePickup(defaultPlace));
    dispatch(storeDestination(defaultPlace));
    dispatch(calculateDistance(0));
    dispatch(calculateTime(0));
    dispatch(setActiveStep(0));
  }, []);

  return {
    activeStep,
  };
};

export default useBookRide;
