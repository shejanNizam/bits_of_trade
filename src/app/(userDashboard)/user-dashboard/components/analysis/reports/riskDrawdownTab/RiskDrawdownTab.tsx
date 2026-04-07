// import { useGetAllRiskQuery } from "@/redux/features/reports/reportsApi";
// import DrawdownCurve from "./DrawdownCurve";
// import MonthlyAverageLoss from "./MonthlyAverageLoss";
// import RiskDrawdownTabOverview from "./RiskDrawdownTabOverview";
// import RiskExposureAnalysis from "./RiskExposureAnalysis";
// import RiskStatistics from "./RiskStatistics";

// export default function RiskDrawdownTab() {
//   const { data } = useGetAllRiskQuery({});
//   console.log(data);

//   return (
//     <div>
//       <RiskDrawdownTabOverview />

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
//         <DrawdownCurve />
//         <MonthlyAverageLoss />
//       </div>

//       <RiskStatistics />

//       <RiskExposureAnalysis />
//     </div>
//   );
// }

import { useGetAllRiskQuery } from "@/redux/features/reports/reportsApi";
import DrawdownCurve from "./DrawdownCurve";
import MonthlyAverageLoss from "./MonthlyAverageLoss";
import RiskDrawdownTabOverview from "./RiskDrawdownTabOverview";
import RiskExposureAnalysis from "./RiskExposureAnalysis";
import RiskStatistics from "./RiskStatistics";

export default function RiskDrawdownTab() {
  const { data, isLoading } = useGetAllRiskQuery({});

  // Extract the relevant data from the API response
  const riskData = data || {};
  const maxDrawdown = riskData.max_drawdown || {};
  const averageDrawdown = riskData.average_drawdown || {};
  const riskStatistics = riskData.risk_statistics || {};
  const riskExposure = riskData.risk_exposure_analysis || {};

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  return (
    <div>
      <RiskDrawdownTabOverview
        maxDrawdown={maxDrawdown}
        averageDrawdown={averageDrawdown}
        worstLosingDay={riskData.worst_losing_day}
        recoveryTime={riskData.recovery_time}
        returnVolatility={riskData.return_volatility}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <DrawdownCurve drawdownCurveData={riskData.drawdown_curve || []} />
        <MonthlyAverageLoss
          monthlyLossData={riskData.monthly_average_loss || []}
        />
      </div>

      <RiskStatistics riskStatistics={riskStatistics} />

      <RiskExposureAnalysis riskExposure={riskExposure} />
    </div>
  );
}
