import BehavioralScoringSystem from "../components/analysis/insights/BehavioralScoringSystem";
import InsightsCards from "../components/analysis/insights/InsightsCards";
import InsightsOverview from "../components/analysis/insights/InsightsOverview";
import StrategyHealth from "../components/analysis/insights/StrategyHealth";
import TradeScorecard from "../components/analysis/insights/TradeScorecard";

export default function InsightsPage() {
  return (
    <div className="space-y-4">
      <BehavioralScoringSystem />
      <TradeScorecard />
      <InsightsCards />
      <InsightsOverview />
      <StrategyHealth />
    </div>
  );
}
