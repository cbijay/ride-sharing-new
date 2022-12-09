import { RootState } from "core/store";
import {
  locationError,
  storeCurrentLocation,
} from "core/store/location/reducer/location.reducer";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGeoLocation = () => {
  const dispatch = useDispatch();
  const { latitude, longitude, error } = useSelector(
    (state: RootState) => state.location
  );

  const getUserLocation = () => {
    const geolocationAPI = navigator.geolocation;
    if (!geolocationAPI)
      dispatch(
        locationError("Geolocation API is not available in your browser!")
      );

    if (geolocationAPI)
      geolocationAPI.getCurrentPosition(
        (position) => {
          const { coords } = position;

          dispatch(storeCurrentLocation(coords));
        },
        (error) => {
          dispatch(locationError(error?.message));
        }
      );
  };

  useEffect(() => {
    if (!latitude || !longitude) getUserLocation();

    return () => getUserLocation();
  }, []);

  return { latitude, longitude, error };
};

export default useGeoLocation;
