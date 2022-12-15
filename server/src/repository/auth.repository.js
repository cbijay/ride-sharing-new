const { User } = require("../models/user.model");

/**
 * Find user based on email
 * @param {*} email
 * @returns
 */
exports.findUser = async (email) => {
  return await User.findOne({ email: email });
};

/**
 * Create new user based on profile,
 * user current location latitude and longitude
 * @param {*} profile
 * @param {*} lat
 * @param {*} long
 * @returns
 */
exports.createUser = async (profile, lat, long) => {
  return await User.create({
    name: profile?.name,
    email: profile?.email,
    profilePic: profile?.picture,
    location: {
      coordinates: [long, lat],
    },
  });
};
