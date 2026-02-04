import CapitalUsage from "./CapitalUsage";
import DurationInsights from "./DurationInsights";
import HoldTimeWinRate from "./HoldTimeWinRate";
import MarketSessionBreakdown from "./MarketSessionBreakdown";
import NetDailyPL from "./NetDailyPL";
import NetPL from "./NetPL";
import PerfomanceOverview from "./PerfomanceOverview";
import PerformanceBreakdown from "./PerformanceBreakdown";
import QuantityAnalysis from "./QuantityAnalysis";
import StrategyEffectiveness from "./StrategyEffectiveness";
import SymbolFrequency from "./SymbolFrequency";
import TimeMetrics from "./TimeMetrics";

export default function PerformanceTab() {
  return (
    <div className="space-y-4">
      <PerfomanceOverview />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <NetPL />
        <NetDailyPL />
      </div>

      <PerformanceBreakdown />

      <TimeMetrics />

      <DurationInsights />

      <HoldTimeWinRate />

      <MarketSessionBreakdown />

      <StrategyEffectiveness />

      <SymbolFrequency />

      <CapitalUsage />

      <QuantityAnalysis />
    </div>
  );
}
