import Recommendations from "./Recommendations";
import StrategyComparison from "./StrategyComparison";
import StrategyEvolution from "./StrategyEvolution";
import StrategyTabOverview from "./StrategyTabOverview";

export default function StrategyTab() {
  return (
    <div className="space-y-4">
      <StrategyTabOverview />

      <StrategyComparison />

      <StrategyEvolution />

      <Recommendations />
    </div>
  );
}
