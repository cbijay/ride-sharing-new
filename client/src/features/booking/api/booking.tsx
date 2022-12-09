import api from "core/lib/api";
import {
  IBookingHistory,
  IBookingResponse,
  IBookingStatus,
} from "features/booking/types/IBooking";
import { IUserBookingRequest } from "features/booking/types/IUserBooking";

export const bookRider = async (data: IUserBookingRequest) => {
  const {
    riderId,
    pickupCoordinates,
    pickupAddress,
    destinationAddress,
    destinationCoordinates,
    totalDistance,
    estimatedTime,
  } = data;

  const response: IBookingResponse = await api.post(
    `${process.env.REACT_APP_BASE_URL!}/booking/${riderId}/book`,
    {
      pickupCoordinates,
      pickupAddress,
      destinationAddress,
      destinationCoordinates,
      totalDistance,
      estimatedTime,
    }
  );

  return response;
};

export const updateBookingStatus = async (data: IBookingStatus) => {
  const { id, status, token } = data;

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const response: IBookingResponse = await api.put(
    `${process.env.REACT_APP_BASE_URL!}/booking/${id}/${status}`,
    config
  );

  return response;
};

export const currentBooking = async () => {
  const response: IBookingResponse = await api.get(
    `${process.env.REACT_APP_BASE_URL!}/booking/current`
  );

  return response;
};

export const bookingHistory = async (page: number, perPage: number) => {
  const response: IBookingHistory = await api.get(
    `${process.env
      .REACT_APP_BASE_URL!}/booking/history?page=${page}&perPage=${perPage}`
  );

  return response;
};

export const bookingById = async (id?: string) => {
  const response: IBookingResponse = await api.get(
    `${process.env.REACT_APP_BASE_URL!}/booking/${id}`
  );

  return response;
};
