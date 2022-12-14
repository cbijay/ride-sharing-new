import { rest } from "msw";

export const dashboardHandler = () => {
  return rest.get("*/dashboard/stat", (req, res, ctx) => {
    return res(
      ctx.json({
        pendingCount: 0,
        cancelledCount: 5,
        completedCount: 10,
      })
    );
  });
};
