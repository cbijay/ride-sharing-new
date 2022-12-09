import Card from "core/components/card/Card";
import { FC } from "react";

export type TEmptyCard = {
  message: string;
};

const EmptyCard: FC<TEmptyCard> = ({ message }) => {
  return (
    <Card>
      <p>{message}</p>
    </Card>
  );
};

export default EmptyCard;
