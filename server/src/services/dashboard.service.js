const dashboardRepo = require("../repository/dashboard.repository");

/**
 * display user booking count on dashboard
 * based on their riding history
 * like pending, completed, cancelled count
 * @param {*} role
 * @param {*} userId
 * @returns
 */

exports.dashboardStats = async (role, userId) => {
  try {
    const pendingStat = await dashboardRepo.userBookingStat(
      role,
      userId,
      "Pending"
    );

    const completedStat = await dashboardRepo.userBookingStat(
      role,
      userId,
      "Completed"
    );

    const cancelledStat = await dashboardRepo.userBookingStat(
      role,
      userId,
      "Cancelled"
    );

    return {
      type: "Success",
      statusCode: 200,
      message: "Stats fetched successfully",
      pendingCount: pendingStat.length > 0 ? pendingStat[0].count : 0,
      cancelledCount: cancelledStat.length > 0 ? cancelledStat[0].count : 0,
      completedCount: completedStat.length > 0 ? completedStat[0].count : 0,
    };
  } catch (err) {
    return {
      type: "Error",
      statusCode: 500,
      message: err.message,
    };
  }
};
