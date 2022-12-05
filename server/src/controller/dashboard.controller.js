const { dashboardStats } = require("../services/dashboard.service");
const { successResponse } = require("../utils/response");

exports.userDashboard = async (req, res, next) => {
  try {
    const {
      user: { role, userId },
    } = req;

    const {
      type,
      message,
      statusCode,
      pendingCount,
      completedCount,
      cancelledCount,
    } = await dashboardStats(role, userId);

    successResponse(res, statusCode, {
      type,
      message,
      completedCount,
      pendingCount,
      cancelledCount,
    });
  } catch (e) {
    next(e);
  }
};
