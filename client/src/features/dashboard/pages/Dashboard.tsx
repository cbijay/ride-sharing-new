import AppLayout from "core/layouts/AppLayout";
import BookingHistory from "features/booking/components/history/BookingHistory";

import DashboardCard from "features/dashboard/components/DashboardCard";
import useDashboard from "features/dashboard/hooks/components/useDashboard";

const Dashboard = () => {
  const { cancelledCount, completedCount, pendingCount, name } = useDashboard();

  return (
    <AppLayout>
      {name && <h3 className="text-lg font-medium mb-4">Welcome {name}!!</h3>}

      <div className="flex flex-row gap-4 mb-6">
        <DashboardCard
          className="bg-success text-white w-full px-6"
          count={completedCount}
          status="Completed"
        />

        <DashboardCard
          className="bg-primary w-full px-6"
          count={pendingCount}
          status="Pending"
        />

        <DashboardCard
          className="bg-danger text-white w-full px-6"
          count={cancelledCount}
          status="Cancelled"
        />
      </div>
      <BookingHistory isViewLink={true} perPage={5} />
    </AppLayout>
  );
};

export default Dashboard;
