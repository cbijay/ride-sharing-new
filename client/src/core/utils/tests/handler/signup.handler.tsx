import { rest } from "msw";

export const signupHandler = () => {
  return rest.post("*/auth/signup", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        type: "Success",
        message: "Successfully signedup",
        accessToken: "token",
      })
    );
  });
};
