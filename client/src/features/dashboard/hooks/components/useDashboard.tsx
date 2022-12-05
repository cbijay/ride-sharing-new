import { RootState } from "core/store";
import { fetchStat } from "core/store/stat/reducer/stat.reducer";
import { useFetchDashboardStat } from "features/dashboard/hooks/api/useDashboardStat";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useDashboard = () => {
  const { data } = useFetchDashboardStat();
  const dispatch = useDispatch();

  const { completedCount, pendingCount, cancelledCount } = useSelector(
    (state: RootState) => state.stat
  );

  const { name } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    data &&
      dispatch(
        fetchStat({
          pendingCount: data.pendingCount,
          completedCount: data.completedCount,
          cancelledCount: data.cancelledCount,
        })
      );
  }, [data]);

  return { cancelledCount, completedCount, pendingCount, name };
};

export default useDashboard;
