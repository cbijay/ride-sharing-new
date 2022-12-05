const { userBookingStat } = require("../repository/dashboard.repository");

exports.dashboardStats = async (role, userId) => {
  try {
    const pendingStat = await userBookingStat(role, userId, "Pending");
    const completedStat = await userBookingStat(role, userId, "Completed");
    const cancelledStat = await userBookingStat(role, userId, "Cancelled");

    return {
      type: "Success",
      statusCode: 200,
      message: "Stats fetched successfully",
      pendingCount: pendingStat ? pendingStat?.count : 0,
      cancelledCount: cancelledStat ? cancelledStat?.count : 0,
      completedCount: completedStat ? completedStat?.count : 0,
    };
  } catch (err) {
    return {
      type: "Error",
      statusCode: 500,
      message: err.message,
    };
  }
};
