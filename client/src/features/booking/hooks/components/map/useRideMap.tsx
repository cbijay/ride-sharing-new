import { RootState } from "core/store";
import { useDispatch, useSelector } from "react-redux";

const useRideMap = () => {
  const dispatch = useDispatch();

  const {
    booking: { startLocation, endLocation },
    isLoading,
  } = useSelector((state: RootState) => state.booking);

  return {
    isLoading,
    dispatch,
    startLocation,
    endLocation,
  };
};

export default useRideMap;
