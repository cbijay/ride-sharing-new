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
};

const RideMap: FC<TRideMap> = ({ style }) => {
  const { isLoading, startLocation, endLocation, dispatch } = useRideMap();

  if (isLoading) return <LoadingSpinner />;

  return (
    <MapContainer
      center={L.latLng(
        startLocation.coordinates[0],
        startLocation.coordinates[1]
      )}
      zoom={18}
      className="w-full"
      zoomControl={false}
      scrollWheelZoom={false}
      style={style ?? { height: "70vh" }}
    >
      <TileLayer
        url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
        subdomains={["mt0", "mt1", "mt2", "mt3"]}
      />

      {startLocation.coordinates[0] !== 0 &&
      startLocation.coordinates[1] !== 0 &&
      endLocation.coordinates[0] !== 0 &&
      endLocation.coordinates[1] !== 0 ? (
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
        <Marker
          position={L.latLng(
            startLocation.coordinates[0],
            startLocation.coordinates[1]
          )}
          icon={markerIcon}
        />
      )}
    </MapContainer>
  );
};

export default RideMap;
