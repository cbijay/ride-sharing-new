const dashboardService = require("../services/dashboard.service");
const response = require("../utils/response");

/**
 * User Dashboard
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
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
    } = await dashboardService.dashboardStats(role, userId);

    return response.successResponse(res, statusCode, {
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
