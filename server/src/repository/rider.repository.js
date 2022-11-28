exports.getRidersByLocation = async (lat, long) => {
  return await User.find({
    location: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: coordinates,
        },
        $maxDistance: maxDistance,
      },
    },
  });
};

exports.findSelectedRider = async (riderId) => {
  return await User.aggregate([
    { $unwind: "$riders" },
    {
      $lookup: {
        from: "riders",
        localField: "user_id",
        foreignField: "_id",
        as: "rider",
      },
    },
    {
      $match: {
        "rider._id": riderId,
      },
    },
  ])[0];
};
