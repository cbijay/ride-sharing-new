const { findUser } = require("../repository/auth.repository");
const {
  verifyGoogleToken,
  createNewUser,
  userToken,
} = require("../services/auth.service");
const { errorResponse, authResponse } = require("../utils/response");

exports.userSignup = async (req, res) => {
  try {
    const {
      body: { credential },
    } = req;

    const { error: payloadError, payload } = await verifyGoogleToken(
      credential
    );
    if (payloadError) errorResponse(res, 404, payloadError);
    const profile = payload;

    const userExists = await findUser(profile?.email);
    if (userExists) errorResponse(res, 403, "You have already signedup!!");

    const { token, error: userError } = await createNewUser(profile);
    if (userError) errorResponse(res, 403, userError);

    authResponse(res, token, "Successfully signup!!", false);
  } catch (error) {
    errorResponse(res, 500, "Error signing up new user");
  }
};

exports.userLogin = async (req, res) => {
  try {
    const {
      body: { credential },
    } = req;

    const { error: payloadError, payload } = await verifyGoogleToken(
      credential
    );

    if (payloadError) errorResponse(res, 404, error);

    const profile = payload;
    const userExists = await findUser(profile?.email);

    if (!userExists)
      errorResponse(res, 403, "You are not registered. Please sign up");
    const accessToken = userToken(userExists);

    authResponse(res, { accessToken }, "Succesfully logged in!!", false);
  } catch (error) {
    errorResponse(res, 500, error?.message || error);
  }
};

exports.userLogOut = (req, res) => {
  return authResponse(res, {}, "Successfully logged out", true);
};
