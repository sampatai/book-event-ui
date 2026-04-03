import { useMemo, useState } from "react";
import type { ListQueryParams } from "@/lib/api";

export interface UseListQueryParamsOptions {
  initial?: ListQueryParams;
}

const DEFAULT_QUERY: ListQueryParams = {
  enabled: true,
  pageNumber: 1,
  pageSize: 10,
  search: "",
};

export function useListQueryParams(options?: UseListQueryParamsOptions) {
  const [query, setQuery] = useState<ListQueryParams>({
    ...DEFAULT_QUERY,
    ...options?.initial,
  });

  const queryEnabled = query.enabled ?? true;

  const queryOptions = useMemo(
    () => ({
      enabled: queryEnabled,
    }),
    [queryEnabled],
  );

  const setPageNumber = (pageNumber: number) => {
    setQuery((prev) => ({ ...prev, pageNumber }));
  };

  const setPageSize = (pageSize: number) => {
    setQuery((prev) => ({ ...prev, pageSize, pageNumber: 1 }));
  };

  const setSearch = (search: string) => {
    setQuery((prev) => ({ ...prev, search, pageNumber: 1 }));
  };

  const setSort = (sortBy?: string, sortDirection?: "asc" | "desc") => {
    setQuery((prev) => ({ ...prev, sortBy, sortDirection, pageNumber: 1 }));
  };

  const setEnabled = (enabled: boolean) => {
    setQuery((prev) => ({ ...prev, enabled }));
  };

  const setFilters = (
    filters: Record<string, string | number | boolean | null | undefined>,
  ) => {
    setQuery((prev) => ({ ...prev, filters, pageNumber: 1 }));
  };

  return {
    query,
    setQuery,
    queryOptions,
    setPageNumber,
    setPageSize,
    setSearch,
    setSort,
    setEnabled,
    setFilters,
  };
}
