import { IResponse } from "core/types/global/IResponse";
import { IUser } from "features/booking/types/IUser";

export interface IBookingRider extends IUser {
  vehicle: {
    color: string;
    model: string;
    number: string;
  };
}

export interface IRiderResponse extends IResponse {
  riders: IBookingRider[];
}
