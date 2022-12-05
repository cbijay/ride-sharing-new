import "core/styles/components/card/card.scss";
import { TCard } from "core/types/components/card/TCard";
import { FC } from "react";

const Card: FC<TCard> = ({ className, children, onClick }) => {
  return (
    <div className={`card ${className ?? ""}`} onClick={onClick}>
      {children}
    </div>
  );
};

export default Card;
