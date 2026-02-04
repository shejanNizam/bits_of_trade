import BehaviorTabOverview from "./BehaviorTabOverview";
import MistakeHeatmap from "./MistakeHeatmap";
import RuleAdherenceByCategory from "./RuleAdherenceByCategory";
import TopRecurringMistakes from "./TopRecurringMistakes";
import ViolationsTimeline from "./ViolationsTimeline";

export default function BehaviorTab() {
  return (
    <div className="space-y-4">
      <BehaviorTabOverview />

      <ViolationsTimeline />

      <MistakeHeatmap />

      <TopRecurringMistakes />

      <RuleAdherenceByCategory />
    </div>
  );
}
