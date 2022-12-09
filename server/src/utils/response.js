exports.successResponse = (res, statusCode, data) => {
  return res.status(statusCode).json(data);
};

exports.errorResponse = (res, statusCode, data) => {
  return res.status(statusCode).json(data);
};
