const { config } = require("../config");
const { OAuth2Client } = require("google-auth-library");
const { sign } = require("jsonwebtoken");

const GOOGLE_CLIENT_ID = config.google.client;
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

exports.verifyGoogleToken = async (credential) => {
  const ticket = await client.verifyIdToken({
    idToken: credential,
    audience: GOOGLE_CLIENT_ID,
  });
  return ticket.getPayload();
};

exports.generateToken = (user) => {
  return sign(
    {
      userId: user?._id,
      name: user?.name,
      email: user?.email,
      role: user?.role,
      profilePic: user?.profile_pic,
    },
    config.jwt.secret,
    {
      expiresIn: "3d",
    }
  );
};
