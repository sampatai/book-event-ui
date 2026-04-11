import type { ListQueryParams } from "@/lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PANDIT_LIST, PANDIT_DETAIL } from "./panditKey";
import { panditApi } from "@/lib/api/pandit";
import type { IPanditCreateUpdate } from "@/lib/interface/IPandit";

export function usePandits(query: ListQueryParams) {
  return useQuery({
    queryKey: [PANDIT_LIST, query],
    queryFn: () => panditApi.getAll(query),
    enabled: query.enabled ?? true,
  });
}

export function usePandit(id: string) {
  return useQuery({
    queryKey: [PANDIT_DETAIL, id],
    queryFn: () => panditApi.getById(id),
    enabled: !!id,
  });
}

export function useCreatePandit() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: IPanditCreateUpdate) => panditApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PANDIT_LIST] });
    },
  });
}

export function useUpdatePandit() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: IPanditCreateUpdate }) =>
      panditApi.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: [PANDIT_LIST] });
      queryClient.invalidateQueries({ queryKey: [PANDIT_DETAIL, id] });
    },
  });
}
