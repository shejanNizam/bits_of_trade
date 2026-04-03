"use client";

const holdTimeData = [
  { range: "0–1 Hour", winRate: 72, tradeCount: 12 },
  { range: "1–2 Hours", winRate: 68, tradeCount: 18 },
  { range: "2–3 Hours", winRate: 65, tradeCount: 10 },
  { range: "3–4 Hours", winRate: 60, tradeCount: 5 },
  { range: "4–5 Hours", winRate: 55, tradeCount: 3 },
];

export default function HoldTimeWinRate() {
  return (
    <div className="w-full bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl p-6 shadow-sm">
      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-6">
        Hold Time vs Win Rate
      </h3>
      <div className="space-y-5">
        {holdTimeData.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4"
          >
            <span className="w-24 text-sm font-medium text-gray-500 dark:text-gray-400">
              {item.range}
            </span>
            <div className="flex-1 bg-gray-100 dark:bg-gray-700 h-8 rounded-full overflow-hidden relative">
              <div
                className="h-full bg-[#14b8a6] rounded-full transition-all duration-500 flex items-center justify-end px-4"
                style={{ width: `${item.winRate}%` }}
              >
                <span className="text-white text-xs font-bold">
                  {item.winRate}%
                </span>
              </div>
            </div>
            <span className="w-20 text-xs text-gray-400 dark:text-gray-500 text-right leading-tight">
              {item.tradeCount} trades
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// "use client";

// interface HoldTimeWinRateProps {
//   holdTimeVsWinRate: Array<{
//     range?: string;
//     winRate?: number;
//     tradeCount?: number;
//   }>;
// }

// export default function HoldTimeWinRate({
//   holdTimeVsWinRate,
// }: HoldTimeWinRateProps) {
//   // This component is ready for when the API provides hold_time_vs_win_rate data
//   // Currently the API returns an empty array

//   if (!holdTimeVsWinRate || holdTimeVsWinRate.length === 0) {
//     return (
//       <div className="w-full bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl p-6 shadow-sm">
//         <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-6">
//           Hold Time vs Win Rate
//         </h3>
//         <div className="text-center py-8">
//           <p className="text-gray-500 dark:text-gray-400">
//             Hold time data will appear here once available.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl p-6 shadow-sm">
//       <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-6">
//         Hold Time vs Win Rate
//       </h3>
//       <div className="space-y-5">
//         {holdTimeVsWinRate.map((item, idx) => (
//           <div
//             key={idx}
//             className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4"
//           >
//             <span className="w-24 text-sm font-medium text-gray-500 dark:text-gray-400">
//               {item.range || "N/A"}
//             </span>
//             <div className="flex-1 bg-gray-100 dark:bg-gray-700 h-8 rounded-full overflow-hidden relative">
//               <div
//                 className="h-full bg-[#14b8a6] rounded-full transition-all duration-500 flex items-center justify-end px-4"
//                 style={{ width: `${item.winRate || 0}%` }}
//               >
//                 <span className="text-white text-xs font-bold">
//                   {item.winRate || 0}%
//                 </span>
//               </div>
//             </div>
//             <span className="w-20 text-xs text-gray-400 dark:text-gray-500 text-right leading-tight">
//               {item.tradeCount || 0} trades
//             </span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
