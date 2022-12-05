import { IResponse } from "core/types/global/IResponse";
import { IBooking } from "features/booking/types/IBooking";
import { IUser } from "./IUser";

export interface IRiderBooking extends IBooking {
  user: IUser;
}

export interface IRiderBookingResponse extends IResponse {
  booking: IRiderBooking;
}
