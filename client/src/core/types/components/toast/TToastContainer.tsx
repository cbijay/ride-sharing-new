import { VARIANTS } from "core/components/toast/container/ToastContainer";

export type TToastContainer = {
  variant?: keyof typeof VARIANTS;
};
