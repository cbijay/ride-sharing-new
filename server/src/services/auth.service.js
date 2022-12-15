const authRepo = require("../repository/auth.repository");
const google = require("../utils/google");

/**
 * Login using credential from google auth
 * @param {*} credential
 * @returns
 */

exports.login = async (credential) => {
  try {
    if (!credential) throw new Error("Invalid Credential");
    const payload = await google.verifyGoogleToken(credential);
    const profile = payload;

    const userExists = await authRepo.findUser(profile?.email);
    if (!userExists) throw new Error("User doesn't exist");

    const accessToken = await google.generateToken(userExists);

    return {
      type: "Success",
      statusCode: 200,
      message: "Successfully loggedin!!",
      accessToken,
    };
  } catch (err) {
    return {
      type: "Error",
      statusCode: 500,
      message: err.message,
    };
  }
};

/**
 * Signup using google auth credential, latitude and longitude
 * @param {*} credential
 * @param {*} lat
 * @param {*} long
 * @returns
 */
exports.signup = async (credential, lat, long) => {
  try {
    if (!credential) throw new Error("Invalid Credential");
    const payload = await google.verifyGoogleToken(credential);
    const profile = payload;

    const userExists = await authRepo.findUser(profile?.email);
    if (userExists) throw new Error("You have already signedup!!");

    const user = await authRepo.createUser(profile, lat, long);
    const accessToken = await google.generateToken(user);

    return {
      type: "Success",
      statusCode: 200,
      message: "Successfully Signup!!",
      accessToken,
    };
  } catch (err) {
    return {
      type: "Error",
      statusCode: 500,
      message: err.message,
    };
  }
};
