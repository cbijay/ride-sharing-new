import AppLayout from "core/layouts/AppLayout";
import { RootState } from "core/store";

import BookingHistory from "features/booking/components/history/BookingHistory";
import DashboardStat from "features/dashboard/components/stat/DashboardStat";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const { name } = useSelector((state: RootState) => state.user);

  return (
    <AppLayout>
      {name && <h3 className="text-lg font-medium mb-4">Welcome {name}!!</h3>}

      <DashboardStat />
      <BookingHistory isViewLink={true} perPage={5} />
    </AppLayout>
  );
};

export default Dashboard;
