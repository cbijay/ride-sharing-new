import { rest } from "msw";

export const bookingDetailHandler = () => {
  return rest.get("*/booking/:id", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        booking: {
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
      })
    );
  });
};
