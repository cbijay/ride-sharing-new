import { rest } from "msw";

export const handlers = [
  rest.get("*/booking/history", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        bookings: [
          {
            _id: 123,
            requestTime: "2022-12-08T16:02:41.999Z",
            startLocation: {
              coordinates: [27.69339, 85.281978],
              address: "Maitidevi",
            },
            endLocation: {
              coordinates: [27.7033823, 85.3116357],
              address: "Singh Durbar",
            },
            totalDistance: 3,
            estimatedTime: 10,
            status: "Pending",
          },
        ],
      })
    );
  }),

  rest.get("*/dashboard/stat", (req, res, ctx) => {
    return res(
      ctx.json({
        pendingCount: 0,
        cancelledCount: 5,
        completedCount: 10,
      })
    );
  }),

  rest.get("*/rider/search", (req, res, ctx) => {
    return res(
      ctx.json({
        name: "user 1",
        profilePic: "",
        role: "user",
        vehicle: {
          color: "violet",
          model: "bmw",
          number: "aw1021w",
        },
      })
    );
  }),

  rest.get("*/v1/search.php", (req, res, ctx) => {
    return res(
      ctx.json([
        {
          place_id: "47644726",
          licence: "https://locationiq.com/attribution",
          osm_type: "node",
          osm_id: "4104361391",
          boundingbox: ["27.7073345", "27.7074345", "85.3273036", "85.3274036"],
          lat: "27.7073845",
          lon: "85.3273536",
          display_name: "Dillibazar, Kathmandu, Bagmati Pradesh, 46000, Nepal",
          class: "office",
          type: "educational_institution",
        },
      ])
    );
  }),
];
