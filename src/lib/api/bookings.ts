import apiClient from "../axios";
import { API_ENDPOINTS } from "../constants";
import {
  toListRequestParams,
  type ApiId,
  type ApiItemResponse,
  type ApiListResponse,
  type ListBase,
  type ListQueryParams,
} from "./types";

export interface Booking {
  id: ApiId;
  userId: ApiId;
  eventId: ApiId;
  status: string;
}

export const bookingsApi = {
  getAll: async (params?: ListQueryParams): Promise<ListBase<Booking>> => {
    const response = await apiClient.get<ApiListResponse<Booking>>(
      API_ENDPOINTS.BOOKINGS,
      { params: toListRequestParams(params) },
    );
    if (!response.data.value) {
      throw new Error("Bookings list response is missing value payload");
    }
    return response.data.value;
  },
  getById: async (id: ApiId): Promise<Booking> => {
    const response = await apiClient.get<ApiItemResponse<Booking>>(
      `${API_ENDPOINTS.BOOKINGS}/${id}`,
    );
    if (!response.data.value) {
      throw new Error("Booking response is missing value payload");
    }
    return response.data.value;
  },
};
