import { rest } from "msw";

export const placeHandler = () => {
  return rest.get("*/v1/search.php", (req, res, ctx) => {
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
  });
};
