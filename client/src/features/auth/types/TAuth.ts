import { GsiButtonConfiguration } from "@react-oauth/google";
import { ReactNode } from "react";

export type TAuth = {
  title: string;
  onSuccess: Function;
  text: GsiButtonConfiguration["text"];
  footer?: ReactNode;
};
