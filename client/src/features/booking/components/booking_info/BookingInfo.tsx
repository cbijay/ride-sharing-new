import { RootState } from "core/store";
import { AiTwotoneStop } from "react-icons/ai";

import classNames from "classnames";
import DistanceTime from "features/booking/components/distance_time/DistanceTime";
import { FC } from "react";
import { useSelector } from "react-redux";

export type TBookingInfo = {
  isCol?: boolean;
  className?: string;
};

const BookingInfo: FC<TBookingInfo> = ({ isCol, className }) => {
  const {
    booking: { startLocation, endLocation },
  } = useSelector((state: RootState) => state.booking);

  return (
    <div className={classNames("grid grid-cols-1 gap-2 mb-4", className)}>
      {startLocation.address ? (
        <h4
          className={`text-gray-500 mb-1 italic flex ${
            isCol ? "md:flex-col" : "flex-col md:flex-row md:items-center"
          }`}
        >
          {isCol ? (
            <>
              <h3 className="flex flex-row gap-1 items-center text-black">
                <AiTwotoneStop className="mr-1" /> Pickup:
              </h3>

              <span className="flex font-medium mr-2 flex-row items-center">
                {startLocation.address}
              </span>
            </>
          ) : (
            <>
              <span className="font-medium text-black mr-2 flex-row flex items-center">
                <AiTwotoneStop className="mr-1" /> Pickup:
              </span>
              {startLocation.address}
            </>
          )}
        </h4>
      ) : (
        <></>
      )}

      {endLocation.address ? (
        <h4
          className={`text-gray-500 mb-1 italic flex flex-row ${
            isCol
              ? "flex-col"
              : "flex-col items-start md:flex-row md:items-center"
          }`}
        >
          {isCol ? (
            <>
              <h3 className="flex flex-row gap-1 items-center text-black flex-1">
                <AiTwotoneStop className="mr-1" color="orange" /> Destination:
              </h3>

              <span className="flex font-medium mr-2 flex-row items-center">
                {endLocation.address}
              </span>
            </>
          ) : (
            <>
              <span className="font-medium text-black mr-2 flex-row flex items-center">
                <AiTwotoneStop className="mr-1" color="orange" /> Destination:
              </span>
              {endLocation.address}
            </>
          )}
        </h4>
      ) : (
        <></>
      )}
      <DistanceTime />
    </div>
  );
};

export default BookingInfo;
