// import { useGetAllBehaviorQuery } from "@/redux/features/reports/reportsApi";
// import BehaviorTabOverview from "./BehaviorTabOverview";
// import MistakeHeatmap from "./MistakeHeatmap";
// import RuleAdherenceByCategory from "./RuleAdherenceByCategory";
// import TopRecurringMistakes from "./TopRecurringMistakes";
// import ViolationsTimeline from "./ViolationsTimeline";

// export default function BehaviorTab() {
//   const { data } = useGetAllBehaviorQuery({});
//   console.log(data);

//   return (
//     <div className="space-y-4">
//       <BehaviorTabOverview />

//       <ViolationsTimeline />

//       <MistakeHeatmap />

//       <TopRecurringMistakes />

//       <RuleAdherenceByCategory />
//     </div>
//   );
// }

import { useGetAllBehaviorQuery } from "@/redux/features/reports/reportsApi";
import BehaviorTabOverview from "./BehaviorTabOverview";
import MistakeHeatmap from "./MistakeHeatmap";
import RuleAdherenceByCategory from "./RuleAdherenceByCategory";
import TopRecurringMistakes from "./TopRecurringMistakes";
import ViolationsTimeline from "./ViolationsTimeline";

export default function BehaviorTab() {
  const { data } = useGetAllBehaviorQuery({});

  // Extract data from API response
  const kpis = data?.kpis || {};
  const snapshot = data?.snapshot || {};
  const violationsTimeline = data?.violations_timeline || [];
  const mistakeHeatmap = data?.mistake_heatmap || [];
  const topRecurringMistakes = data?.top_recurring_mistakes || [];
  const behaviorInsight =
    data?.behavior_insight || "No behavior insights available.";
  const ruleAdherence = data?.rule_adherence || {};

  return (
    <div className="space-y-4">
      <BehaviorTabOverview kpis={kpis} snapshot={snapshot} />

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
