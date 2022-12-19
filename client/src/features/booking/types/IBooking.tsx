import { IResponse } from "core/types/global/IResponse";

export interface IBooking {
  _id?: string;
  requestTime?: Date;
  startLocation: {
    coordinates: number[];
    address: string;
  };
  endLocation: {
    coordinates: number[];
    address: string;
  };
  totalDistance: number;
  estimatedTime: number;
  status: string;
}

export interface IBookingResponse extends IResponse {
  booking: IBooking;
}

export interface IBookingHistory extends IResponse {
  bookings: IBooking[];
}

export interface IBookingStatus {
  id?: string;
  status: number;
  token?: string;
}
