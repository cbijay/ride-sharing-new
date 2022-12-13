const { User } = require("../models/user.model");

exports.findUser = async (email) => {
  return await User.findOne({ email: email });
};

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
