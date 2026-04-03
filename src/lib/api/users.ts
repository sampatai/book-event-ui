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

export interface User {
  id: ApiId;
  name: string;
  email: string;
}

export const usersApi = {
  getAll: async (params?: ListQueryParams): Promise<ListBase<User>> => {
    const response = await apiClient.get<ApiListResponse<User>>(
      API_ENDPOINTS.USERS,
      { params: toListRequestParams(params) },
    );
    return response.data.data;
  },
  getById: async (id: ApiId): Promise<ApiItemResponse<User>> => {
    const response = await apiClient.get<ApiItemResponse<User>>(
      `${API_ENDPOINTS.USERS}/${id}`,
    );
    return response.data;
  },
};
