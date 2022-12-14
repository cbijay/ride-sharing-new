import { rest } from "msw";

export const bookingHandler = () => {
  return rest.get("*/booking/history", (req, res, ctx) => {
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
  });
};
