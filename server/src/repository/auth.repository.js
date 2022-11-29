const { User } = require("../models/user.model");

exports.findUser = async (email) => {
  return await User.findOne({ email: email });
};

exports.createUser = async (profile) => {
  return await User.create({
    name: profile?.name,
    email: profile?.email,
    profile_pic: profile?.picture,
  });
};
