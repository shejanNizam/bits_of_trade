import DrawdownCurve from "./DrawdownCurve";
import MonthlyAverageLoss from "./MonthlyAverageLoss";
import RiskDrawdownTabOverview from "./RiskDrawdownTabOverview";
import RiskExposureAnalysis from "./RiskExposureAnalysis";
import RiskStatistics from "./RiskStatistics";

export default function RiskDrawdownTab() {
  return (
    <div>
      <RiskDrawdownTabOverview />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <DrawdownCurve />
        <MonthlyAverageLoss />
      </div>

      <RiskStatistics />

      <RiskExposureAnalysis />
    </div>
  );
}
