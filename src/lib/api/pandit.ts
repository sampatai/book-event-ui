import apiClient from "../axios";
import { API_ENDPOINTS } from "../constants";
import type {
  IListPanditResponse,
  IPanditCreateUpdate,
  IPanditResponse,
} from "../interface/IPandit";
import {
  toListRequestParams,
  type ApiActionResponse,
  type ApiListResponse,
  type ListQueryParams,
} from "./types";

export const panditApi = {
  async getAll(
    params?: ListQueryParams,
  ): Promise<ApiListResponse<IListPanditResponse>> {
    const response = await apiClient.get<ApiListResponse<IListPanditResponse>>(
      API_ENDPOINTS.PANDITS,
      { params: toListRequestParams(params) },
    );
    if (response.data.isFailure) {
      throw new Error("faild to load the list");
    }
    return response.data;
  },
  async getById(id: string): Promise<IPanditResponse> {
    const response = await apiClient.get<IPanditResponse>(
      `${API_ENDPOINTS.PANDITS}/${id}`,
    );
    return response.data;
  },
  async create(pandit: IPanditCreateUpdate): Promise<ApiActionResponse> {
    const response = await apiClient.post<ApiActionResponse>(
      API_ENDPOINTS.PANDITS,
      pandit,
    );
    return response.data;
  },
  async update(
    id: string,

    pandit: IPanditCreateUpdate,
  ): Promise<ApiActionResponse> {
    const response = await apiClient.put<ApiActionResponse>(
      `${API_ENDPOINTS.PANDITS}/${id}`,
      pandit,
    );
    return response.data;
  },
};
