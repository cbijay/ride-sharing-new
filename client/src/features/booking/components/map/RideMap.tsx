import classNames from "classnames";
import LoadingSpinner from "core/components/loading/LoadingSpinner";
import {
  calculateDistance,
  calculateTime,
} from "core/store/booking/reducer/booking.reducer";
import useRideMap from "features/booking/hooks/components/map/useRideMap";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { CSSProperties, FC } from "react";

import { MapContainer, Marker, TileLayer } from "react-leaflet";
import MapRoute from "./MapRoute";

const markerIcon = L.icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
});

export type TRideMap = {
  style?: CSSProperties;
  className?: string;
};

const RideMap: FC<TRideMap> = ({ style, className }) => {
  const {
    latitude,
    longitude,
    isLoading,
    startLocation,
    endLocation,
    dispatch,
  } = useRideMap();

  if (isLoading) return <LoadingSpinner />;

  return (
    <MapContainer
      center={L.latLng(
        startLocation.coordinates.includes(0) === false
          ? startLocation.coordinates[0]
          : latitude,
        startLocation.coordinates.includes(0) === false
          ? startLocation.coordinates[1]
          : longitude
      )}
      zoom={18}
      className={classNames("w-full h-[50vh] xl:h-full", className)}
      zoomControl={false}
      scrollWheelZoom={false}
      style={style}
    >
      <TileLayer
        url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
        subdomains={["mt0", "mt1", "mt2", "mt3"]}
      />

      {startLocation.coordinates.includes(0) === false &&
      endLocation.coordinates.includes(0) === false ? (
        <MapRoute
          pickupCoordinates={startLocation.coordinates}
          destinationCoordinates={endLocation.coordinates}
          mapIcon={markerIcon}
          handleDistance={(value: number) => dispatch(calculateDistance(value))}
          handleEstimatedTime={(value: number) =>
            dispatch(calculateTime(value))
          }
        />
      ) : (
        <Marker position={L.latLng(latitude, longitude)} icon={markerIcon} />
      )}
    </MapContainer>
  );
};

export default RideMap;
