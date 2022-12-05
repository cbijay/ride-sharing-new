import Card from "core/components/card/Card";
import RiderCard from "core/components/card/RiderCard";
import { RootState } from "core/store";

import { IBookingRider } from "features/booking/types/IBookingRider";
import { useSelector } from "react-redux";

const RiderList = () => {
  const { riders } = useSelector((state: RootState) => state.rider);

  return (
    <div>
      {riders.length > 0 ? (
        riders.map(
          (
            {
              _id,
              name,
              vehicle: { color, model, number },
              profilePic,
            }: IBookingRider,
            index
          ) => (
            <RiderCard
              key={index}
              riderId={_id}
              name={name}
              vehicleName={`${color} ${model} ${number}`}
              profilePic={profilePic}
              className="mb-2"
            />
          )
        )
      ) : (
        <Card>
          <h2>No riders found</h2>
        </Card>
      )}
    </div>
  );
};

export default RiderList;
