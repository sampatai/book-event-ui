import { useQuery } from "@tanstack/react-query";
import { fetchNavigation, defaultMenu } from "@/lib/api";

/**
 * Hook to fetch navigation menu using TanStack Query.
 * Handles caching, refetching, loading, and error states automatically.
 *
 * @returns The result of the useQuery hook.
 */
export function useNavigation() {
  return useQuery({
    queryKey: ["navigation"],
    queryFn: fetchNavigation,
    staleTime: 1000 * 60 * 5, // 5 minutes
    placeholderData: defaultMenu,
    select: (data) => data.data.navMain,
  });
}
