import { MouseEventHandler, ReactNode } from "react";

export type TButton = {
  className?: string;
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: HTMLButtonElement["disabled"];
  type?: "submit" | "button" | "reset";
};
