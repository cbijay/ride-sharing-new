import EmptyCard from "core/components/card/EmptyCard";
import { RootState } from "core/store";
import RiderCard from "features/booking/components/card/rider/RiderCard";

import { IBookingRider } from "features/booking/types/IBookingRider";
import { useSelector } from "react-redux";

const RiderList = () => {
  const { riders } = useSelector((state: RootState) => state.rider);

  return (
    <div>
      {riders && riders.length > 0 ? (
        riders.map(
          (
            {
              _id,
              name,
              vehicle: { color, model, number },
              profilePic,
            }: IBookingRider,
            index
          ) => {
            const cardIndex = index + 1;
            return (
              <RiderCard
                key={cardIndex}
                riderId={_id}
                index={cardIndex}
                name={name}
                vehicleName={`${color} ${model} ${number}`}
                profilePic={profilePic}
                className="mb-2"
              />
            );
          }
        )
      ) : (
        <EmptyCard message="No booking exists" />
      )}
    </div>
  );
};

export default RiderList;
