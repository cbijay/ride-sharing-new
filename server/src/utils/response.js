const successResponse = (res, data, message) => {
  return res.json({
    success: true,
    data: data,
    message: message,
  });
};

const errorResponse = (res, data, message) => {
  return res.json({
    success: false,
    errors: data,
    message: message,
  });
};

module.exports = {
  successResponse,
  errorResponse,
};
