"use client";

import { createContext, ReactNode, useContext, useState } from "react";

export type MarketType = "indian_market" | "forex" | "crypto" | "options";
export type Direction = "long" | "short";
export type Outcome = "win" | "loss" | "open";
export type FilterType = "wins" | "losses" | "disciplined" | "violations";
export type EmotionalState =
  | "calm"
  | "anxious"
  | "confident"
  | "fearful"
  | "fomo"
  | "angry"
  | "overconfident"
  | "uncertain";
export type DisciplineStatus = "disciplined" | "violations";
export type ReviewStatus = "tagged" | "untagged";
export type DateRange = "today" | "this_week" | "this_month" | "custom";

export interface FilterParams {
  date_range?: DateRange;
  date_from?: string;
  date_to?: string;
  broker?: string;
  market_type?: MarketType;
  direction?: Direction;
  strategy?: string;
  outcome?: Outcome;
  filter?: FilterType;
  pnl_min?: number;
  pnl_max?: number;
  emotional_state?: EmotionalState;
  discipline_status?: DisciplineStatus;
  review_status?: ReviewStatus;
  rule_breach?: string;
  mistakes?: string;
  tags?: string;
  search?: string;
  page?: number;
  limit?: number;
}

interface FilterContextType {
  filters: FilterParams;
  updateFilters: (newFilters: Partial<FilterParams>) => void;
  resetFilters: () => void;
  activeFilterCount: number;
}

const defaultFilters: FilterParams = {
  page: 1,
  limit: 10,
};

const IGNORED_KEYS = new Set(["page", "limit"]);

const countActiveFilters = (filters: FilterParams): number =>
  (Object.keys(filters) as (keyof FilterParams)[]).filter((key) => {
    if (IGNORED_KEYS.has(key)) return false;
    const value = filters[key];
    if (value === undefined || value === null || value === "") return false;
    if (Array.isArray(value)) return value.length > 0;
    if (key in defaultFilters) return value !== defaultFilters[key];
    return true;
  }).length;

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function FilterProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<FilterParams>({ ...defaultFilters });

  const updateFilters = (newFilters: Partial<FilterParams>) => {
    setFilters((prev) => ({ ...prev, ...newFilters, page: 1 }));
  };

  const resetFilters = () => {
    setFilters({ ...defaultFilters });
  };

  return (
    <FilterContext.Provider
      value={{
        filters,
        updateFilters,
        resetFilters,
        activeFilterCount: countActiveFilters(filters),
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useFilters() {
  const context = useContext(FilterContext);
  if (!context)
    throw new Error("useFilters must be used within a FilterProvider");
  return context;
}
