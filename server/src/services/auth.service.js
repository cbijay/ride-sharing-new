// const config = require("../config");
const { config } = require("../config");
const { OAuth2Client } = require("google-auth-library");

const { createUser } = require("../repository/auth.repository");
const { sign } = require("jsonwebtoken");

const GOOGLE_CLIENT_ID = config.google.client;
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

exports.verifyGoogleToken = async (credential) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: GOOGLE_CLIENT_ID,
    });
    return { payload: ticket.getPayload() };
  } catch {
    return { error: "Invalid user detected. Please try again" };
  }
};

exports.createNewUser = async (profile) => {
  try {
    const user = await createUser(profile);
    const token = userToken(user);

    return { token };
  } catch {
    return { error: "Error creating new user" };
  }
};

exports.userToken = (user) => {
  return sign(
    {
      name: user?.name,
      email: user?.email,
      role: user?.role,
      profile_pic: user?.profile_pic,
    },
    config.jwt.secret,
    {
      expiresIn: "3d",
    }
  );
};
