/* eslint-disable @typescript-eslint/no-unused-vars */
// import BehavioralScoringSystem from "../components/analysis/insights/BehavioralScoringSystem";
// import InsightsCards from "../components/analysis/insights/InsightsCards";
// import InsightsOverview from "../components/analysis/insights/InsightsOverview";
// import StrategyHealth from "../components/analysis/insights/StrategyHealth";
// import TradeScorecard from "../components/analysis/insights/TradeScorecard";

// export default function InsightsPage() {
//   return (
//     <div className="space-y-4">
//       <BehavioralScoringSystem />
//       <TradeScorecard />
//       <InsightsCards />
//       <InsightsOverview />
//       <StrategyHealth />
//     </div>
//   );
// }

"use client";

import { useGetAllInsightsMetricsQuery } from "@/redux/features/insights/insightsApi";
import BehavioralScoringSystem from "../components/analysis/insights/BehavioralScoringSystem";
import InsightsCards from "../components/analysis/insights/InsightsCards";
import InsightsOverview from "../components/analysis/insights/InsightsOverview";
import StrategyHealth from "../components/analysis/insights/StrategyHealth";
import TradeScorecard from "../components/analysis/insights/TradeScorecard";

export default function InsightsPage() {
  const { data, isLoading, error } = useGetAllInsightsMetricsQuery({
    page: 1,
    limit: 100,
  });

  // Extract data from API response
  const scorecard = data?.scorecard || [];
  const categories = data?.categories || [];
  const strategyHealth = data?.strategy_health || [];
  const meta = data?.meta || {};

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-96">
        <p className="text-red-500">
          Error loading insights data. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <BehavioralScoringSystem scorecard={scorecard} />
      <TradeScorecard scorecard={scorecard} />
      <InsightsCards scorecard={scorecard} />
      <InsightsOverview categories={categories} />
      <StrategyHealth strategyHealth={strategyHealth} scorecard={scorecard} />
    </div>
  );
}
