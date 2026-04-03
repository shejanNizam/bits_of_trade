import { useGetAllPerfomanceQuery } from "@/redux/features/reports/reportsApi";
import CapitalUsage from "./CapitalUsage";
import DurationInsights from "./DurationInsights";
import HoldTimeWinRate from "./HoldTimeWinRate";
import MarketSessionBreakdown from "./MarketSessionBreakdown";
import NetDailyPL from "./NetDailyPL";
import NetPL from "./NetPL";
import PerformanceOverview from "./PerfomanceOverview";
import PerformanceBreakdown from "./PerformanceBreakdown";
import QuantityAnalysis from "./QuantityAnalysis";
import StrategyEffectiveness from "./StrategyEffectiveness";
import SymbolFrequency from "./SymbolFrequency";
import TimeMetrics from "./TimeMetrics";

export default function PerformanceTab() {
  const { data, isLoading } = useGetAllPerfomanceQuery({});

  const performanceData = data?.performance || null;
  const netPnlCumulative = data?.net_pnl_cumulative || [];
  const netDailyPnl = data?.net_daily_pnl || [];
  const performanceBreakdown = data?.performance_breakdown || null;
  const timeMetrics = data?.time_metrics || null;
  const durationInsights = data?.duration_insights || null;
  // const holdTimeVsWinRate = data?.hold_time_vs_win_rate || [];
  const marketSessionBreakdown = data?.market_session_breakdown || [];
  const strategyEffectiveness = data?.strategy_effectiveness || [];
  const symbolFrequency = data?.symbol_frequency || null;
  const capitalUsage = data?.capital_usage || null;
  const quantityAnalysis = data?.quantity_analysis || null;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 dark:text-gray-400">
          Loading performance data...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <PerformanceOverview performanceData={performanceData} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <NetPL netPnlCumulative={netPnlCumulative} />
        <NetDailyPL netDailyPnl={netDailyPnl} />
      </div>

      <PerformanceBreakdown performanceBreakdown={performanceBreakdown} />

      <TimeMetrics timeMetrics={timeMetrics} />

      <DurationInsights durationInsights={durationInsights} />

      {/* <HoldTimeWinRate holdTimeVsWinRate={holdTimeVsWinRate} /> */}
      <HoldTimeWinRate />

      <MarketSessionBreakdown marketSessionBreakdown={marketSessionBreakdown} />

      <StrategyEffectiveness strategyEffectiveness={strategyEffectiveness} />

      <SymbolFrequency symbolFrequency={symbolFrequency} />

      <CapitalUsage capitalUsage={capitalUsage} />

      <QuantityAnalysis quantityAnalysis={quantityAnalysis} />
    </div>
  );
}
