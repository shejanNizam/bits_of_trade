// import { FiTarget } from "react-icons/fi";

// export function WhatYouDoingWell() {
//   return (
//     <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm transition-colors duration-300 h-full">
//       {/* Header */}
//       <div className="flex items-center gap-2 mb-6">
//         <div className="p-2 bg-emerald-100 dark:bg-emerald-500/10 rounded-lg">
//           <FiTarget
//             className="text-emerald-600 dark:text-emerald-400"
//             size={20}
//           />
//         </div>
//         <h2 className="font-bold text-lg text-slate-900 dark:text-white tracking-tight">
//           What {"You're"} Doing Well
//         </h2>
//       </div>

//       <div className="space-y-4">
//         {/* Card 1: Confirmation Stats */}
//         <div className="bg-emerald-50/40 dark:bg-emerald-500/3 border border-emerald-100 dark:border-emerald-500/20 rounded-2xl p-4 transition-all hover:border-emerald-200 dark:hover:border-emerald-500/40">
//           <div className="flex justify-between items-start gap-4">
//             <div className="space-y-1">
//               <p className="font-bold text-sm text-slate-900 dark:text-slate-100">
//                 You waited for confirmation 18 out of 22 times
//               </p>
//               <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
//                 21 of 24 surveying trades followed strategy rules
//               </p>
//             </div>
//             <button className="shrink-0 text-[10px] bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white px-3 py-1.5 rounded-lg font-bold transition-all shadow-sm shadow-emerald-500/20">
//               View in plan
//             </button>
//           </div>

//           <div className="mt-4 pt-4 border-t border-emerald-100 dark:border-slate-700/50">
//             <p className="text-xs text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-2">
//               <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
//               Your risk-to-reward improved by 1.4x
//             </p>
//             <p className="text-[10px] text-slate-400 dark:text-slate-500 ml-3.5 mt-0.5 font-medium">
//               Average loss of 2.2% vs max trade threshold
//             </p>
//           </div>
//         </div>

//         {/* Card 2: Entry Timing */}
//         <div className="bg-emerald-50/40 dark:bg-emerald-500/3 border border-emerald-100 dark:border-emerald-500/20 rounded-2xl p-4 flex justify-between items-center transition-all hover:border-emerald-200 dark:hover:border-emerald-500/40">
//           <div className="space-y-1">
//             <p className="font-bold text-sm text-slate-900 dark:text-slate-100">
//               Best entries occur in first 30 mins
//             </p>
//             <p className="text-xs text-slate-500 dark:text-slate-400">
//               97% win rate on Entry confirmed by 87% win
//             </p>
//           </div>
//           <button className="shrink-0 text-[10px] bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white px-3 py-1.5 rounded-lg font-bold transition-all shadow-sm shadow-emerald-500/20">
//             View in plan
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

import Link from "next/link";
import { FiTarget } from "react-icons/fi";

interface DoingWellItem {
  id: string;
  label: string;
  value: number;
  out_of: number | null;
  pct: number | null;
  description: string;
  view_in_plan: boolean;
}

interface WhatYouDoingWellProps {
  doingWell: DoingWellItem[];
}

export function WhatYouDoingWell({ doingWell }: WhatYouDoingWellProps) {
  if (!doingWell || doingWell.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <div className="p-2 bg-emerald-100 dark:bg-emerald-500/10 rounded-lg">
            <FiTarget
              className="text-emerald-600 dark:text-emerald-400"
              size={20}
            />
          </div>
          <h2 className="font-bold text-lg text-slate-900 dark:text-white tracking-tight">
            What {"You're"} Doing Well
          </h2>
        </div>
        <p className="text-center text-gray-500 dark:text-gray-400 py-8">
          No positive behavior metrics available yet. Keep trading to generate
          insights!
        </p>
      </div>
    );
  }

  const getMetricValue = (item: DoingWellItem) => {
    if (item.id === "rr_improvement") {
      const value = item.value;
      const isPositive = value > 0;
      return {
        text: `${isPositive ? "+" : ""}${value.toFixed(2)}x`,
        isPositive,
      };
    }
    if (item.out_of && item.out_of > 0) {
      return {
        text: `${item.value} out of ${item.out_of} times`,
        isPositive: true,
      };
    }
    if (item.pct !== null) {
      return {
        text: `${item.pct.toFixed(1)}%`,
        isPositive: item.pct > 50,
      };
    }
    return { text: `${item.value}`, isPositive: true };
  };

  return (
    <div className="bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm transition-colors duration-300 h-full">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 bg-emerald-100 dark:bg-emerald-500/10 rounded-lg">
          <FiTarget
            className="text-emerald-600 dark:text-emerald-400"
            size={20}
          />
        </div>
        <h2 className="font-bold text-lg text-slate-900 dark:text-white tracking-tight">
          What {"You're"} Doing Well
        </h2>
      </div>

      <div className="space-y-4">
        {doingWell.map((item) => {
          const metricValue = getMetricValue(item);
          return (
            <div
              key={item.id}
              className="bg-emerald-50/40 dark:bg-emerald-500/3 border border-emerald-100 dark:border-emerald-500/20 rounded-2xl p-4 transition-all hover:border-emerald-200 dark:hover:border-emerald-500/40"
            >
              <div className="flex justify-between items-start gap-4">
                <div className="space-y-1 flex-1">
                  <p className="font-bold text-sm text-slate-900 dark:text-slate-100">
                    {item.description}
                  </p>
                  <div className="flex items-center gap-2">
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {metricValue.text}
                    </p>
                    {item.view_in_plan && (
                      <Link href="/user-dashboard/strategy-library">
                        <button className="text-[10px] bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white px-2 py-1 rounded-lg font-bold transition-all">
                          View in plan
                        </button>
                      </Link>
                    )}
                  </div>
                </div>
                {item.id === "rr_improvement" && metricValue.isPositive && (
                  <div className="shrink-0">
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full">
                      Improving
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
