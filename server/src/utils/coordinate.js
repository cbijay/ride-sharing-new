const earth = 6378.137;
const pi = Math.PI;
const cos = Math.cos;
const metreInDegree = 1 / (((2 * pi) / 360) * earth) / 1000;

exports.calculateLongitude = (latitude, longitude) => {
  return longitude + (5000 * metreInDegree) / cos(latitude * (pi / 180));
};
