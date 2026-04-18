// import { useGetAllBehaviorQuery } from "@/redux/features/reports/reportsApi";
// import BehaviorTabOverview from "./BehaviorTabOverview";
// import MistakeHeatmap from "./MistakeHeatmap";
// import RuleAdherenceByCategory from "./RuleAdherenceByCategory";
// import TopRecurringMistakes from "./TopRecurringMistakes";
// import ViolationsTimeline from "./ViolationsTimeline";

// export default function BehaviorTab() {
//   const { data } = useGetAllBehaviorQuery({});
//   console.log(data);

//   // Extract data from API response
//   const kpis = data?.kpis || {};
//   const violationsTimeline = data?.violations_timeline || [];
//   const mistakeHeatmap = data?.mistake_heatmap || [];
//   const topRecurringMistakes = data?.top_recurring_mistakes || [];
//   const ruleAdherence = data?.rule_adherence || {};
//   const behaviorInsight = data?.behavior_insight || "";

//   return (
//     <div className="space-y-4">
//       <BehaviorTabOverview kpis={kpis} />

//       <ViolationsTimeline violationsTimeline={violationsTimeline} />

//       <MistakeHeatmap mistakeHeatmap={mistakeHeatmap} />

//       <TopRecurringMistakes
//         topRecurringMistakes={topRecurringMistakes}
//         behaviorInsight={behaviorInsight}
//       />

//       <RuleAdherenceByCategory ruleAdherence={ruleAdherence} />
//     </div>
//   );
// }

// BehaviorTab.tsx
import { useFilters } from "@/contexts/FilterContext";
import { useReportFilters } from "@/hooks/useReportFilters";
import { useGetAllBehaviorQuery } from "@/redux/features/reports/reportsApi";
import BehaviorTabOverview from "./BehaviorTabOverview";
import MistakeHeatmap from "./MistakeHeatmap";
import RuleAdherenceByCategory from "./RuleAdherenceByCategory";
import TopRecurringMistakes from "./TopRecurringMistakes";
import ViolationsTimeline from "./ViolationsTimeline";

export default function BehaviorTab() {
  const { filters } = useFilters();
  const { data, isLoading, refetch } = useGetAllBehaviorQuery(filters);

  // Refetch when filters change
  useReportFilters(refetch);

  console.log(data);

  // Extract data from API response
  const kpis = data?.kpis || {};
  const violationsTimeline = data?.violations_timeline || [];
  const mistakeHeatmap = data?.mistake_heatmap || [];
  const topRecurringMistakes = data?.top_recurring_mistakes || [];
  const ruleAdherence = data?.rule_adherence || {};
  const behaviorInsight = data?.behavior_insight || "";

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <BehaviorTabOverview kpis={kpis} />

      <ViolationsTimeline violationsTimeline={violationsTimeline} />

      <MistakeHeatmap mistakeHeatmap={mistakeHeatmap} />

      <TopRecurringMistakes
        topRecurringMistakes={topRecurringMistakes}
        behaviorInsight={behaviorInsight}
      />

      <RuleAdherenceByCategory ruleAdherence={ruleAdherence} />
    </div>
  );
}
