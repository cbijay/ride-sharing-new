import Card from "core/components/card/Card";
import { FC } from "react";

export type TDashboardCard = {
  count: number;
  status: string;
  className?: string;
};

const DashboardCard: FC<TDashboardCard> = ({ count, status, className }) => {
  return (
    <Card className={className} data-testid="dashboard-card">
      <h3 className="text-2xl">{count}</h3>
      <h4 className="uppercase text-lg font-semibold">
        <small className="flex text-md font-normal">Ride</small>
        {status}
      </h4>
    </Card>
  );
};

export default DashboardCard;
