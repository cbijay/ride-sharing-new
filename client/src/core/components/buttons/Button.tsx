import "core/styles/components/button/button.scss";
import { TButton } from "core/types/components/button/TButton";
import { FC } from "react";

const Button: FC<TButton> = ({
  children,
  className,
  onClick,
  disabled,
  type,
}) => {
  return (
    <button
      className={`btn ${className} cursor-pointer`}
      onClick={onClick}
      disabled={disabled}
      type={type ? type : "button"}
    >
      {children}
    </button>
  );
};

export default Button;
