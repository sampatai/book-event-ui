export type ApiId = string | number;

export interface ListBase<T> {
  records: T[];
  totalRecords: number;
}

export interface ApiError {
  code: string;
  description: string;
  type: number;
}

export interface ListQueryParams {
  // Controls TanStack Query execution on the frontend only.
  // This value is not sent to backend APIs.
  enabled?: boolean;
  pageNumber?: number;
  pageSize?: number;
  search?: string;
  sortBy?: string;
  sortDirection?: "asc" | "desc";
  // Generic field filters, e.g. { status: "active", role: "admin" }
  filters?: Record<string, string | number | boolean | null | undefined>;
}

export interface ApiResponseBase {
  isSuccess: boolean;
  isFailure: boolean;
  error: ApiError | null;
}

export interface ApiResponse<T> extends ApiResponseBase {
  value?: T;
}

export type ApiListResponse<T> = ApiResponse<ListBase<T>>;
export type ApiItemResponse<T> = ApiResponse<T>;
export type ApiActionResponse = ApiResponseBase;

export function toListRequestParams(
  params?: ListQueryParams,
): Record<string, string | number | boolean> | undefined {
  if (!params) {
    return undefined;
  }

  const query: Record<string, string | number | boolean> = {};

  if (typeof params.pageNumber === "number") {
    query.pageNumber = params.pageNumber;
  }
  if (typeof params.pageSize === "number") {
    query.pageSize = params.pageSize;
  }
  if (params.search) {
    query.search = params.search;
  }
  if (params.sortBy) {
    query.sortBy = params.sortBy;
  }
  if (params.sortDirection) {
    query.sortDirection = params.sortDirection;
  }

  if (params.filters) {
    Object.entries(params.filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        query[key] = value;
      }
    });
  }

  return Object.keys(query).length > 0 ? query : undefined;
}
