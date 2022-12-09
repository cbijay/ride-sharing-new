import "core/styles/components/card/card.scss";
import { TCard } from "core/types/components/card/TCard";
import { FC } from "react";

const Card: FC<TCard> = ({ className, children, onClick, ...props }) => {
  return (
    <div className={`card ${className ?? ""}`} onClick={onClick} {...props}>
      {children}
    </div>
  );
};

export default Card;
