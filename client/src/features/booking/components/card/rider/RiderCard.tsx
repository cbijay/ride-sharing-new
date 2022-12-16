import classNames from "classnames";
import { FC } from "react";

import Avatar from "core/components/avatar/Avatar";
import Card from "core/components/card/Card";

import Button from "core/components/buttons/Button";
import useRider from "features/booking/hooks/components/rider/useRider";

export type TRider = {
  riderId?: string;
  name: string;
  vehicleName: string;
  profilePic: string;
  className?: string;
  index: number;
};

const RiderCard: FC<TRider> = ({
  riderId,
  name,
  vehicleName,
  profilePic,
  className,
  index,
}) => {
  const { handleBooking, disabled } = useRider(riderId);

  return (
    <Card
      className={classNames(
        "flex  flex-col justify-start items-start gap-3 p-3 sm:flex-row sm:justify-between sm:items-center ",
        className
      )}
      data-testid="rider-card"
    >
      <div className="flex sm:flex-row gap-2 items-start flex-wrap">
        <div className="flex sm:flex-row gap-1 mb-1 md:mb-0">
          {profilePic ? (
            <img
              src={profilePic}
              alt={`${name} avatar`}
              className="mr-1 md:p-2 text-xl w-16 h-16 md:w-14 md:h-14 rounded-full"
            />
          ) : (
            <Avatar className="mr-1 p-2 text-xl w-14 h-14">{name[0]}</Avatar>
          )}
          <div className="flex flex-col">
            {name && (
              <h3 className="text-md mb-0.5 text-gray-700 italic font-medium">
                {name}
              </h3>
            )}

            {vehicleName && (
              <h5 className="text-gray-500 mb-1 italic flex flex-row items-center text-sm sm:text-md break-words">
                <span className="ml-0">{vehicleName}</span>
              </h5>
            )}
          </div>
        </div>
      </div>
      <Button
        className={`bg-black text-white px-4 text-sm self-start max-w-full sm:max-w-[120px] w-full sm:self-center ${
          disabled.includes(index) === true ? "opacity-40" : ""
        }`}
        onClick={() => disabled.includes(index) === false && handleBooking()}
      >
        Book Now
      </Button>
    </Card>
  );
};

export default RiderCard;
