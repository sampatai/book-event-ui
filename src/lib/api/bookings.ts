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
    return response.data.data;
  },
  getById: async (id: ApiId): Promise<ApiItemResponse<Booking>> => {
    const response = await apiClient.get<ApiItemResponse<Booking>>(
      `${API_ENDPOINTS.BOOKINGS}/${id}`,
    );
    return response.data;
  },
};
