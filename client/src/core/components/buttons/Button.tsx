import "core/styles/components/button/button.scss";
import { TButton } from "core/types/components/button/TButton";
import { FC } from "react";

const Button: FC<TButton> = ({ children, className, onClick, disabled }) => {
  return (
    <button
      className={`btn ${className} cursor-pointer`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
