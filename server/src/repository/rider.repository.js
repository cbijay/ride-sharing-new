const getRidersByLocation = async (lat, long) => {
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

const findSelectedRider = async (riderId) => {
  return await User.aggregate([
    { $unwind: "$riders" },
    {
      $lookup: {
        from: "riders",
        localField: "riders",
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

module.exports = { getRidersByLocation, findSelectedRider };
