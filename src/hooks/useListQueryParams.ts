import { useMemo, useState } from "react";
import type { ListQueryParams } from "@/lib/api";

export interface UseListQueryParamsOptions<TQuery extends ListQueryParams> {
  initial?: TQuery;
}

const DEFAULT_QUERY: ListQueryParams = {
  enabled: true,
  pageNumber: 1,
  pageSize: 10,
  search: "",
};

export function useListQueryParams<
  TQuery extends ListQueryParams = ListQueryParams,
>(options?: UseListQueryParamsOptions<TQuery>) {
  const [query, setQuery] = useState<TQuery>({
    ...DEFAULT_QUERY,
    ...options?.initial,
  } as TQuery);

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

  const setFilters = (filters: NonNullable<TQuery["filters"]>) => {
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
