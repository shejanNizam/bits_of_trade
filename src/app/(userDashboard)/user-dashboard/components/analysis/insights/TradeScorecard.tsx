// const metrics = [
//   {
//     id: "DIS**",
//     val: "76.5%",
//     label: "Discipline Integrity",
//     color:
//       "bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-950/20 dark:border-emerald-900",
//   },
//   {
//     id: "VMI",
//     val: "24",
//     label: "Violation Momentum",
//     color:
//       "bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-950/20 dark:border-amber-900",
//   },
//   {
//     id: "DRT",
//     val: "3.2",
//     label: "Recovery Time",
//     color:
//       "bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-950/20 dark:border-blue-900",
//   },
//   {
//     id: "TPR",
//     val: "38%",
//     label: "Permission Rate",
//     color:
//       "bg-purple-50 text-purple-600 border-purple-100 dark:bg-purple-950/20 dark:border-purple-900",
//   },
//   {
//     id: "FIE",
//     val: "₹42.6k",
//     label: "Formal Marking",
//     color:
//       "bg-cyan-50 text-cyan-600 border-cyan-100 dark:bg-cyan-950/20 dark:border-cyan-900",
//   },
//   {
//     id: "Override",
//     val: "8.5",
//     label: "Resistance Score",
//     color:
//       "bg-orange-50 text-orange-600 border-orange-100 dark:bg-orange-950/20 dark:border-orange-900",
//   },
//   {
//     id: "ECI",
//     val: "-₹14.8k",
//     label: "Emotion Cost",
//     color:
//       "bg-red-50 text-red-600 border-red-100 dark:bg-red-950/20 dark:border-red-900",
//   },
//   {
//     id: "CAS",
//     val: "62%",
//     label: "Confidence Accuracy",
//     color:
//       "bg-green-50 text-green-600 border-green-100 dark:bg-green-950/20 dark:border-green-900",
//   },
//   {
//     id: "DAE",
//     val: "₹2,450",
//     label: "Disciplined Expectancy",
//     color:
//       "bg-indigo-50 text-indigo-600 border-indigo-100 dark:bg-indigo-950/20 dark:border-indigo-900",
//   },
//   {
//     id: "SMI",
//     val: "72",
//     label: "Strategy Maturity",
//     color:
//       "bg-fuchsia-50 text-fuchsia-600 border-fuchsia-100 dark:bg-fuchsia-950/20 dark:border-fuchsia-900",
//   },
//   {
//     id: "DDR",
//     val: "78%",
//     label: "Discipline Dependency",
//     color:
//       "bg-violet-50 text-violet-600 border-violet-100 dark:bg-violet-950/20 dark:border-violet-900",
//   },
//   {
//     id: "CPI",
//     val: "31%",
//     label: "Capital Protection",
//     color:
//       "bg-sky-50 text-sky-600 border-sky-100 dark:bg-sky-950/20 dark:border-sky-900",
//   },
// ];

// export default function TradeScorecard() {
//   return (
//     <div className="w-full mx-auto">
//       <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
//         {/* Header Row */}
//         <div className="flex justify-between items-center mb-8">
//           <div>
//             <h3 className="text-xl font-bold text-slate-900 dark:text-white">
//               Complete Bloc/Trade Scorecard
//             </h3>
//             <p className="text-sm text-slate-500">
//               All 12 exclusive metrics in one view
//             </p>
//           </div>
//           <span className="bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 text-xs font-bold px-3 py-1 rounded-full">
//             12 Metrics
//           </span>
//         </div>

//         {/* Metrics Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
//           {metrics.map((m, index) => (
//             <div
//               key={index}
//               className={`${m.color} border p-4 rounded-2xl flex flex-col justify-between min-h-27.5 transition-transform hover:scale-[1.02]`}
//             >
//               <span className="text-[10px] font-bold uppercase tracking-wider opacity-80">
//                 {m.id}
//               </span>
//               <div className="my-1">
//                 <span className="text-2xl font-black block text-slate-900 dark:text-white">
//                   {m.val}
//                 </span>
//                 <span className="text-[11px] font-medium leading-tight block text-slate-600 dark:text-slate-400">
//                   {m.label}
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { IoIosWarning } from "react-icons/io";

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
  cta?: {
    label: string;
    type: string;
  };
}

interface TradeScorecardProps {
  scorecard: ScorecardItem[];
}

// Default metrics to show if API doesn't provide all
const DEFAULT_METRICS = [
  { code: "DIS", label: "Discipline Integrity Score", defaultVal: "N/A" },
  { code: "VMI", label: "Violation Momentum Index", defaultVal: "N/A" },
  { code: "DRT", label: "Discipline Recovery Time", defaultVal: "N/A" },
  { code: "TPR", label: "Trading Permission Ratio", defaultVal: "N/A" },
  { code: "FIE", label: "Forced Inactivity Effectiveness", defaultVal: "N/A" },
  { code: "OVR", label: "Override Resistance Score", defaultVal: "N/A" },
  { code: "ECI", label: "Emotion Cost Index", defaultVal: "N/A" },
  { code: "CAS", label: "Confidence Accuracy Score", defaultVal: "N/A" },
  { code: "DAE", label: "Discipline-Adjusted Expectancy", defaultVal: "N/A" },
  { code: "SMI", label: "Strategy Maturity Index", defaultVal: "N/A" },
  { code: "DDR", label: "Discipline Dependency Ratio", defaultVal: "N/A" },
  { code: "CPI", label: "Capital Protection Index", defaultVal: "N/A" },
];

const getColorForMetric = (code: string) => {
  const colors: Record<string, string> = {
    DIS: "bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-950/20 dark:border-emerald-900",
    VMI: "bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-950/20 dark:border-amber-900",
    DRT: "bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-950/20 dark:border-blue-900",
    TPR: "bg-purple-50 text-purple-600 border-purple-100 dark:bg-purple-950/20 dark:border-purple-900",
    FIE: "bg-cyan-50 text-cyan-600 border-cyan-100 dark:bg-cyan-950/20 dark:border-cyan-900",
    OVR: "bg-orange-50 text-orange-600 border-orange-100 dark:bg-orange-950/20 dark:border-orange-900",
    ECI: "bg-red-50 text-red-600 border-red-100 dark:bg-red-950/20 dark:border-red-900",
    CAS: "bg-green-50 text-green-600 border-green-100 dark:bg-green-950/20 dark:border-green-900",
    DAE: "bg-indigo-50 text-indigo-600 border-indigo-100 dark:bg-indigo-950/20 dark:border-indigo-900",
    SMI: "bg-fuchsia-50 text-fuchsia-600 border-fuchsia-100 dark:bg-fuchsia-950/20 dark:border-fuchsia-900",
    DDR: "bg-violet-50 text-violet-600 border-violet-100 dark:bg-violet-950/20 dark:border-violet-900",
    CPI: "bg-sky-50 text-sky-600 border-sky-100 dark:bg-sky-950/20 dark:border-sky-900",
  };
  return (
    colors[code] ||
    "bg-gray-50 text-gray-600 border-gray-100 dark:bg-gray-950/20 dark:border-gray-900"
  );
};

const formatValue = (item: ScorecardItem, isDefault = false) => {
  if (isDefault || item.value === null || item.value === undefined) {
    return "N/A";
  }

  if (item.code === "FIE") {
    return `₹${(item.value / 1000).toFixed(1)}k`;
  }

  if (item.code === "ECI" && item.value < 0) {
    return `-₹${Math.abs(item.value / 1000).toFixed(1)}k`;
  }

  if (
    item.unit === "%" ||
    item.code === "CPI" ||
    item.code === "DDR" ||
    item.code === "CAS"
  ) {
    return `${item.value}%`;
  }

  if (item.code === "OVR") {
    return `${item.value}/10`;
  }

  if (item.code === "DRT" && item.value) {
    return `${item.value} ${item.unit || "sessions"}`;
  }

  if (item.code === "DAE") {
    return `₹${item.value.toLocaleString("en-IN")}`;
  }

  return item.value.toString();
};

const getShortLabel = (label: string) => {
  const shortLabels: Record<string, string> = {
    "Discipline Integrity Score": "Discipline Integrity",
    "Violation Momentum Index": "Violation Momentum",
    "Discipline Recovery Time": "Recovery Time",
    "Trading Permission Ratio": "Permission Rate",
    "Forced Inactivity Effectiveness": "Forced Inactivity",
    "Override Resistance Score": "Resistance Score",
    "Emotion Cost Index": "Emotion Cost",
    "Confidence Accuracy Score": "Confidence Accuracy",
    "Discipline-Adjusted Expectancy": "Disciplined Expectancy",
    "Strategy Maturity Index": "Strategy Maturity",
    "Discipline Dependency Ratio": "Discipline Dependency",
    "Capital Protection Index": "Capital Protection",
  };
  return shortLabels[label] || label;
};

export default function TradeScorecard({ scorecard }: TradeScorecardProps) {
  // Create a map for quick lookup
  const metricMap = new Map(scorecard.map((m) => [m.code, m]));

  // Create array of 12 metrics using API data if available, otherwise default
  const allMetrics = DEFAULT_METRICS.map((defaultMetric) => {
    const apiMetric = metricMap.get(defaultMetric.code);
    return {
      ...defaultMetric,
      ...apiMetric,
      isDefault: !apiMetric || apiMetric.value === null,
    };
  });

  const activeCount = allMetrics.filter((m) => !m.isDefault).length;

  return (
    <div className="w-full mx-auto">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Complete BitsOfTrade Scorecard
            </h3>
            <p className="text-sm text-slate-500">
              All 12 exclusive metrics in one view
            </p>
          </div>
          <span className="bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 text-xs font-bold px-3 py-1 rounded-full">
            {activeCount}/12 Active
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {allMetrics.map((metric, index) => (
            <div
              key={index}
              className={`${getColorForMetric(metric.code)} ${metric.isDefault ? "opacity-60" : ""} border p-4 rounded-2xl flex flex-col justify-between min-h-27.5 transition-transform hover:scale-[1.02]`}
              title={
                metric.isDefault
                  ? "Insufficient data - tag more trades to unlock this metric"
                  : ""
              }
            >
              <span className="flex text-[10px] font-bold uppercase tracking-wider opacity-80">
                {metric.code}
                {metric.isDefault && (
                  <span className="ml-1 text-amber-500">
                    <IoIosWarning size={12} />
                  </span>
                )}
              </span>
              <div className="my-1">
                <span className="text-2xl font-black block text-slate-900 dark:text-white">
                  {formatValue(metric as ScorecardItem, metric.isDefault)}
                </span>
                <span className="text-[11px] font-medium leading-tight block text-slate-600 dark:text-slate-400">
                  {getShortLabel(metric.label)}
                </span>
                {metric.isDefault && (
                  <span className="text-[8px] text-amber-500 dark:text-amber-400 block mt-1">
                    Needs more data
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
