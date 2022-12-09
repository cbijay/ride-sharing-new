import classNames from "classnames";
import Avatar from "core/components/avatar/Avatar";
import Card from "core/components/card/Card";
import useRider from "features/booking/hooks/components/rider/useRider";

import { FC } from "react";
import { FaCar } from "react-icons/fa";
import Button from "../buttons/Button";

export type TRider = {
  riderId?: string;
  name: string;
  vehicleName: string;
  profilePic: string;
  className?: string;
};

const RiderCard: FC<TRider> = ({
  riderId,
  name,
  vehicleName,
  profilePic,
  className,
}) => {
  const { handleBooking, isDisabled } = useRider(riderId);

  return (
    <Card
      className={classNames(
        "flex flex-row justify-between items-center p-3",
        className
      )}
      data-testid="rider-card"
    >
      <div className="flex flex-row gap-2 items-start">
        <div className="flex flex-row gap-1">
          {profilePic !== "" ? (
            <img
              src={profilePic}
              alt={`${name} avatar`}
              className="mr-1 p-2 text-xl w-14 h-14 rounded-full"
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
              <h5 className="text-gray-500 mb-1 italic flex flex-row items-center">
                <FaCar className="text-black" fontSize={20} />
                <span className="ml-2">{vehicleName}</span>
              </h5>
            )}
          </div>
        </div>
      </div>
      <Button
        className={`bg-black text-white px-6 ${
          isDisabled === true ? "opacity-40" : ""
        }`}
        onClick={() => isDisabled === false && handleBooking()}
      >
        Book Now
      </Button>
    </Card>
  );
};

export default RiderCard;
