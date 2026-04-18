// hooks/useReportFilters.ts
import { useFilters } from "@/contexts/FilterContext";
import { useEffect } from "react";

export function useReportFilters(refetch: () => void) {
  const { filters } = useFilters();

  useEffect(() => {
    refetch();
  }, [filters, refetch]);

  return { filters };
}
