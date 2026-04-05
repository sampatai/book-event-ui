import type { ListQueryParams } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { PANDIT_LIST } from "./panditKey";
import { panditApi } from "@/lib/api/pandit";

export function usePandits(query: ListQueryParams) {
  return useQuery({
    queryKey: [PANDIT_LIST, query],
    queryFn: () => panditApi.getAll(query),
    enabled: query.enabled ?? true,
  });
}
