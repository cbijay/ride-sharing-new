import { rest } from "msw";

export const riderHandler = () => {
  return rest.get("*/rider/search", (req, res, ctx) => {
    return res(
      ctx.json({
        riders: [
          {
            name: "Rider 1",
            profilePic: "",
            role: "rider",
            vehicle: {
              color: "violet",
              model: "bmw",
              number: "aw1021w",
            },
          },
        ],
      })
    );
  });
};
