import { createControlComponent } from "@react-leaflet/core";
import L from "leaflet";
import "leaflet-routing-machine";

const createRoutineMachineLayer = ({
  mapIcon,
  pickupCoordinates,
  destinationCoordinates,
  handleDistance,
  handleEstimatedTime,
  ...props
}: any) => {
  const instance = L.Routing.control({
    waypoints: [pickupCoordinates, destinationCoordinates],
    lineOptions: {
      styles: [
        {
          color: "blue",
          opacity: 0.6,
          weight: 4,
        },
      ],
      extendToWaypoints: true,
      missingRouteTolerance: 1,
    },
    createMarker: function (_i: number, waypoint: any, _n: number) {
      const marker = L.marker(waypoint.latLng, {
        draggable: true,
        icon: mapIcon,
      });
      return marker;
    },
    show: false,
    fitSelectedRoutes: true,
    addWaypoints: false,
    showAlternatives: false,
    routeWhileDragging: true,
    ...props,
  }).on("routesfound", function (e) {
    var routes = e.routes;
    var summary = routes[0].summary;

    const totalDistance: number = Number(
      Number(summary?.totalDistance / 1000).toFixed(2)
    );

    const totalTime = Math.round((summary.totalTime % 3600) / 60);

    handleDistance(totalDistance);
    handleEstimatedTime(totalTime);
  });

  return instance;
};

const MapRoute = createControlComponent(createRoutineMachineLayer);

export default MapRoute;
