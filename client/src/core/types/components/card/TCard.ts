import { MouseEventHandler, ReactNode } from "react";

export type TCard = {
  className?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
  children: ReactNode;
};
