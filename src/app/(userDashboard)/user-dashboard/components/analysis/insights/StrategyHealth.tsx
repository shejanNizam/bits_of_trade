/* eslint-disable @typescript-eslint/no-explicit-any */
// export default function StrategyHealth() {
//   return (
//     <div className="w-full mx-auto">
//       <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-4xl p-8 shadow-sm">
//         <div className="mb-6">
//           <h3 className="text-lg font-bold text-slate-900 dark:text-white">
//             Strategy Health (SMI)
//           </h3>
//           <p className="text-xs text-slate-400">
//             Strategy Maturity Index for each approach
//           </p>
//         </div>

//         <div className="bg-slate-50/50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//           <div className="space-y-1">
//             <h4 className="font-semibold text-slate-800 dark:text-slate-200">
//               Momentum Breakout
//             </h4>
//             <p className="text-xs text-slate-400">12 trades</p>
//             <p className="text-xs text-slate-500 mt-4">Maturity</p>
//           </div>

//           <div className="flex flex-col items-end gap-2">
//             <span className="text-5xl font-bold text-slate-900 dark:text-white">
//               68
//             </span>
//             <span className="bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 text-[10px] font-bold px-3 py-1 rounded-lg">
//               Developing
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

interface ScorecardItem {
  code: string;
  label: string;
  value: number | null;
  unit: string;
  data_state: string;
  status: string;
  trend: string;
  what_it_means: string;
  evidence: string;
}

interface StrategyHealthProps {
  strategyHealth: any[];
  scorecard: ScorecardItem[];
}

export default function StrategyHealth({ scorecard }: StrategyHealthProps) {
  // Get SMI metric from scorecard
  const smiMetric = scorecard.find((m) => m.code === "SMI");

  if (!smiMetric || smiMetric.value === null) {
    return (
      <div className="w-full mx-auto">
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-4xl p-8 shadow-sm">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Strategy Health (SMI)
            </h3>
            <p className="text-xs text-slate-400">
              Strategy Maturity Index for each approach
            </p>
          </div>
          <div className="bg-slate-50/50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 text-center">
            <p className="text-slate-500 dark:text-slate-400">
              No strategy data available yet. Tag your trades with strategies to
              unlock SMI.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const getMaturityLevel = (score: number) => {
    if (score >= 80)
      return {
        label: "Mature",
        color:
          "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400",
      };
    if (score >= 60)
      return {
        label: "Developing",
        color:
          "bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400",
      };
    if (score >= 40)
      return {
        label: "Emerging",
        color:
          "bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400",
      };
    return {
      label: "Early Stage",
      color: "bg-gray-100 dark:bg-gray-900/40 text-gray-600 dark:text-gray-400",
    };
  };

  const maturity = getMaturityLevel(smiMetric.value);

  return (
    <div className="w-full mx-auto">
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-4xl p-8 shadow-sm">
        <div className="mb-6">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Strategy Health (SMI)
          </h3>
          <p className="text-xs text-slate-400">
            Strategy Maturity Index - {smiMetric.what_it_means}
          </p>
        </div>

        <div className="bg-slate-50/50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1">
            <h4 className="font-semibold text-slate-800 dark:text-slate-200">
              Overall Strategy Maturity
            </h4>
            <p className="text-xs text-slate-400">{smiMetric.evidence}</p>
          </div>

          <div className="flex flex-col items-end gap-2">
            <span className="text-5xl font-bold text-slate-900 dark:text-white">
              {smiMetric.value}
            </span>
            <span
              className={`text-[10px] font-bold px-3 py-1 rounded-lg ${maturity.color}`}
            >
              {maturity.label}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
