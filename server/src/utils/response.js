const successResponse = (res, statusCode, data) => {
  return res.status(statusCode).json(data);
};

const errorResponse = (res, statusCode, data) => {
  return res.status(statusCode).json(data);
};

module.exports = {
  successResponse,
  errorResponse,
};
