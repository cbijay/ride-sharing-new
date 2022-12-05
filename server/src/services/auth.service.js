const { createUser, findUser } = require("../repository/auth.repository");
const { verifyGoogleToken, generateToken } = require("../utils/login/google");

exports.login = async (credential) => {
  try {
    const payload = await verifyGoogleToken(credential);

    const profile = payload;
    const userExists = await findUser(profile?.email);

    if (!userExists) throw new Error("User doesn't exist");
    const accessToken = generateToken(userExists);

    return {
      type: "Success",
      statusCode: 200,
      message: "Users login successfully",
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

exports.signup = async (credential, lat, long) => {
  try {
    const payload = await verifyGoogleToken(credential);
    const profile = payload;

    const userExists = await findUser(profile?.email);
    if (userExists) throw new Error("You have already signedup!!");

    const user = await createUser(profile, lat, long);
    const accessToken = generateToken(user);

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
