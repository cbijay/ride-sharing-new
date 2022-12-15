import classNames from "classnames";
import { TAvatar } from "core/types/components/avatar/TAvatar";
import { FC } from "react";

const Avatar: FC<TAvatar> = ({ children, className, onClick }) => {
  return (
    <div
      className={classNames(
        "w-8 h-8 relative flex justify-center items-center rounded-full bg-primary text-sm uppercase p-4 font-medium",
        className
      )}
      onClick={() => onClick && onClick()}
    >
      {children}
    </div>
  );
};

export default Avatar;
