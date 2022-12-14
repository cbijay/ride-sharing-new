import classNames from "classnames";
import { RootState } from "core/store";

import { FC } from "react";
import { useSelector } from "react-redux";

export type TDistanceTime = {
  className?: string;
};

const DistanceTime: FC<TDistanceTime> = ({ className }) => {
  const {
    booking: { totalDistance, estimatedTime },
  } = useSelector((state: RootState) => state.booking);

  return (
    <div className={classNames("grid md:grid-cols-4 gap-2", className)}>
      {totalDistance ? (
        <h5 className="flex">
          Distance:{" "}
          <span className="text-success ml-2">{`${totalDistance} km`}</span>
        </h5>
      ) : (
        <></>
      )}
      {estimatedTime ? (
        <h5 className="flex">
          Estimated Time:
          <span className="text-success ml-2">{`${estimatedTime} min`}</span>
        </h5>
      ) : (
        <></>
      )}
    </div>
  );
};

export default DistanceTime;
