import { useQuery } from "@tanstack/react-query";
import { fetchNavigation } from "@/lib/api";
import { USER_NAVIGATION_MENU } from "./navigationKey";
import type { IMenuResponse } from "@/lib/interface/INavItem";
import { useEffect } from "react";
import { toast } from "sonner";

export function useNavigation() {
  const { data, isLoading, isError, error } = useQuery<IMenuResponse, Error>({
    queryKey: [USER_NAVIGATION_MENU],
    queryFn: fetchNavigation,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  useEffect(() => {
    if (isError) {
      toast.error(`Error loading navigation: ${error.message}`);
    }
  }, [isError, error]);

  return { data, isLoading, isError, error };
}
