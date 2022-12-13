import DashboardCard from "features/dashboard/components/card/DashboardCard";
import useDashboardStat from "features/dashboard/hooks/components/useDashboardStat";

const DashboardStat = () => {
  const { cancelledCount, completedCount, pendingCount } = useDashboardStat();

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
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
  );
};

export default DashboardStat;
