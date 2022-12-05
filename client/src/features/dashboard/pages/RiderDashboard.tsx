import AppLayout from "core/layouts/AppLayout";
import CurrentBooking from "features/booking/components/current/CurrentBooking";
import BookingHistory from "features/booking/components/history/BookingHistory";
import DashboardCard from "features/dashboard/components/DashboardCard";

const RiderDashboard = () => {
  return (
    <AppLayout>
      <h3 className="text-lg font-medium mb-4">Welcome John Doe!!</h3>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex flex-row gap-4 mb-4">
          <DashboardCard
            className="bg-success text-white w-full px-6"
            count={10}
            status="Completed"
          />
          <DashboardCard
            className="bg-primary  w-full px-6"
            count={1}
            status="Pending"
          />
          <DashboardCard
            className="bg-danger text-white w-full px-6"
            count={2}
            status="Cancelled"
          />
        </div>
      </div>
      <CurrentBooking className="mb-4" />
      <BookingHistory />
    </AppLayout>
  );
};

export default RiderDashboard;
