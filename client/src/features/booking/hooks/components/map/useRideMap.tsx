import { RootState } from "core/store";
import { useDispatch, useSelector } from "react-redux";

const useRideMap = () => {
  const { latitude, longitude } = useSelector(
    (state: RootState) => state.location
  );
  const dispatch = useDispatch();

  const {
    booking: { startLocation, endLocation },
    isLoading,
  } = useSelector((state: RootState) => state.booking);

  return {
    isLoading,
    dispatch,
    latitude,
    longitude,
    startLocation,
    endLocation,
  };
};

export default useRideMap;
