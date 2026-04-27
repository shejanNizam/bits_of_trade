// import { useGetAllStrategiesQuery } from "@/redux/features/reports/reportsApi";
// import Recommendations from "./Recommendations";
// import StrategyComparison from "./StrategyComparison";
// import StrategyEvolution from "./StrategyEvolution";
// import StrategyTabOverview from "./StrategyTabOverview";

// export default function StrategyTab() {
//   const { data, isLoading, error } = useGetAllStrategiesQuery({});

//   if (isLoading) {
//     return (
//       <div className="flex justify-center py-12">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="text-center py-12 text-red-500">
//         Failed to load strategy data. Please try again.
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-4">
//       <StrategyTabOverview strategies={data?.strategies || []} />

//       <StrategyComparison comparison={data?.comparison} radar={data?.radar} />

//       <StrategyEvolution evolution={data?.evolution || []} />

//       <Recommendations strategies={data?.strategies || []} />
//     </div>
//   );
// }

// StrategyTab.tsx
import { useFilters } from "@/contexts/FilterContext";
import { useReportFilters } from "@/hooks/useReportFilters";
import { useGetAllStrategiesQuery } from "@/redux/features/reports/reportsApi";
import Recommendations from "./Recommendations";
import StrategyComparison from "./StrategyComparison";
import StrategyEvolution from "./StrategyEvolution";
import StrategyTabOverview from "./StrategyTabOverview";

export default function StrategyTab() {
  const { filters } = useFilters();
  const { data, isLoading, error, refetch } = useGetAllStrategiesQuery(filters);

  // Refetch when filters change
  useReportFilters(refetch);

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-500">
        Failed to load strategy data. Please try again.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <StrategyTabOverview strategies={data?.strategies || []} />

      <StrategyComparison comparison={data?.comparison} radar={data?.radar} />

      <StrategyEvolution evolution={data?.evolution || []} />

      <Recommendations strategies={data?.strategies || []} />
    </div>
  );
}
