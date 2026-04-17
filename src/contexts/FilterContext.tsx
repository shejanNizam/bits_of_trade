// // contexts/FilterContext.tsx
// "use client";

// import { createContext, ReactNode, useContext, useState } from "react";

// export interface FilterParams {
//   // Date Range
//   date_range?: "today" | "this_week" | "this_month" | "custom";
//   date_from?: string;
//   date_to?: string;

//   // Instrument & Account
//   broker?: string;
//   market_type?: "indian_market" | "forex" | "crypto" | "options";
//   direction?: "long" | "short";
//   strategy?: string;

//   // Outcome & P&L
//   outcome?: "win" | "loss" | "open";
//   filter?: "wins" | "losses" | "disciplined" | "violations";
//   pnl_min?: number;
//   pnl_max?: number;

//   // Psychology & Discipline
//   emotional_state?:
//     | "calm"
//     | "anxious"
//     | "confident"
//     | "fearful"
//     | "fomo"
//     | "angry"
//     | "overconfident"
//     | "uncertain";
//   discipline_status?: "disciplined" | "violations";
//   review_status?: "tagged" | "untagged";

//   // JSON Array Fields
//   rule_breach?: string; // comma-separated
//   mistakes?: string; // comma-separated
//   tags?: string; // comma-separated

//   // Free-Text Search
//   search?: string;

//   // Pagination
//   page?: number;
//   limit?: number;
// }

// interface FilterContextType {
//   filters: FilterParams;
//   updateFilters: (newFilters: Partial<FilterParams>) => void;
//   resetFilters: () => void;
//   activeFilterCount: number;
// }

// const defaultFilters: FilterParams = {
//   date_range: "this_month",
//   broker: "all",
//   market_type: undefined,
//   direction: undefined,
//   page: 1,
//   limit: 10,
// };

// const FilterContext = createContext<FilterContextType | undefined>(undefined);

// export function FilterProvider({ children }: { children: ReactNode }) {
//   const [filters, setFilters] = useState<FilterParams>(defaultFilters);

//   const updateFilters = (newFilters: Partial<FilterParams>) => {
//     setFilters((prev) => ({ ...prev, ...newFilters, page: 1 })); // Reset page on filter change
//   };

//   const resetFilters = () => {
//     setFilters(defaultFilters);
//   };

//   const activeFilterCount = Object.keys(filters).filter((key) => {
//     const value = filters[key as keyof FilterParams];
//     const defaultValue = defaultFilters[key as keyof FilterParams];

//     // Don't count pagination
//     if (key === "page" || key === "limit") return false;

//     // Check if value is different from default
//     if (Array.isArray(value)) return value.length > 0;
//     if (typeof value === "object") return Object.keys(value || {}).length > 0;
//     return value !== undefined && value !== defaultValue && value !== "";
//   }).length;

//   return (
//     <FilterContext.Provider
//       value={{ filters, updateFilters, resetFilters, activeFilterCount }}
//     >
//       {children}
//     </FilterContext.Provider>
//   );
// }

// export function useFilters() {
//   const context = useContext(FilterContext);
//   if (!context) {
//     throw new Error("useFilters must be used within a FilterProvider");
//   }
//   return context;
// }

// contexts/FilterContext.tsx
// contexts/FilterContext.tsx
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
  // Date Range
  date_range?: DateRange;
  date_from?: string;
  date_to?: string;

  // Instrument & Account
  broker?: string;
  market_type?: MarketType;
  direction?: Direction;
  strategy?: string;

  // Outcome & P&L
  outcome?: Outcome;
  filter?: FilterType;
  pnl_min?: number;
  pnl_max?: number;

  // Psychology & Discipline
  emotional_state?: EmotionalState;
  discipline_status?: DisciplineStatus;
  review_status?: ReviewStatus;

  // JSON Array Fields
  rule_breach?: string;
  mistakes?: string;
  tags?: string;

  // Free-Text Search
  search?: string;

  // Pagination
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
  date_range: "this_month",
  broker: undefined,
  market_type: undefined,
  direction: undefined,
  page: 1,
  limit: 10,
};

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function FilterProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<FilterParams>(defaultFilters);

  const updateFilters = (newFilters: Partial<FilterParams>) => {
    setFilters((prev) => ({ ...prev, ...newFilters, page: 1 }));
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
  };

  const activeFilterCount = Object.keys(filters).filter((key) => {
    const value = filters[key as keyof FilterParams];
    const defaultValue = defaultFilters[key as keyof FilterParams];

    if (key === "page" || key === "limit") return false;
    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === "object") return Object.keys(value || {}).length > 0;
    return value !== undefined && value !== defaultValue && value !== "";
  }).length;

  return (
    <FilterContext.Provider
      value={{ filters, updateFilters, resetFilters, activeFilterCount }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useFilters() {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilters must be used within a FilterProvider");
  }
  return context;
}
