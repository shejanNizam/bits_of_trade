// hooks/useFilteredQuery.ts
import { useFilters } from "@/contexts/FilterContext";
import { useEffect } from "react";

export function useFilteredQuery(refetch: () => void) {
  const { filters } = useFilters();

  useEffect(() => {
    refetch();
  }, [filters, refetch]);

  return { filters };
}
