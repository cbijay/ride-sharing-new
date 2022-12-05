import { FC } from "react";

export type TAppLogo = {
  className?: string;
};

const AppLogo: FC<TAppLogo> = ({ className }) => {
  return (
    <img
      src="/ride_share_logo.png"
      alt="Ride Share logo"
      width={140}
      height={30}
      className={className}
    />
  );
};

export default AppLogo;
