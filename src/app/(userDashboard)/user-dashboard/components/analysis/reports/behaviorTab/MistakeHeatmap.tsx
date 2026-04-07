"use client";

const mistakes = [
  "Premature Exit",
  "Overtrading",
  "FOMO Entry",
  "Missed Stop Loss",
  "Revenge Trading",
];
const days = [
  "Jan 1",
  "Jan 2",
  "Jan 3",
  "Jan 4",
  "Jan 5",
  "Jan 6",
  "Jan 7",
  "Jan 8",
  "Jan 9",
  "Jan 10",
];

// Mock data: 0 = none, 1 = minor (yellow), 2 = major (red)
const heatmapData: Record<string, number[]> = {
  "Premature Exit": [0, 1, 0, 2, 0, 0, 1, 0, 0, 0],
  Overtrading: [0, 0, 0, 1, 1, 0, 0, 0, 1, 0],
  "FOMO Entry": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  "Missed Stop Loss": [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  "Revenge Trading": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
};

export default function MistakeHeatmap() {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl p-6 shadow-sm w-full overflow-hidden">
      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-6">
        Mistake Heatmap
      </h3>

      <div className="overflow-x-auto">
        <div className="min-w-200">
          {/* Header Row */}
          <div className="grid grid-cols-[180px_repeat(10,1fr)] mb-4">
            <span className="text-xs font-medium text-gray-400">
              Mistake Type
            </span>
            {days.map((day) => (
              <span
                key={day}
                className="text-xs font-medium text-gray-400 text-center"
              >
                {day}
              </span>
            ))}
          </div>

          {/* Data Rows */}
          <div className="space-y-3">
            {mistakes.map((type) => (
              <div
                key={type}
                className="grid grid-cols-[180px_repeat(10,1fr)] items-center"
              >
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {type}
                </span>
                {heatmapData[type].map((val, idx) => (
                  <div key={idx} className="flex justify-center">
                    <div
                      className={`w-8 h-8 rounded-lg transition-colors ${
                        val === 2
                          ? "bg-rose-500"
                          : val === 1
                            ? "bg-amber-300"
                            : "bg-gray-100 dark:bg-gray-700/50"
                      }`}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// "use client";

// interface MistakeHeatmapProps {
//   mistakeHeatmap: Array<{
//     date?: string;
//     mistake_type?: string;
//     severity?: number;
//     [key: string]: any;
//   }>;
// }

// export default function MistakeHeatmap({
//   mistakeHeatmap,
// }: MistakeHeatmapProps) {
//    If no data, show empty state
//   if (!mistakeHeatmap || mistakeHeatmap.length === 0) {
//     return (
//       <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl p-6 shadow-sm w-full overflow-hidden">
//         <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-6">
//           Mistake Heatmap
//         </h3>
//         <div className="h-75 w-full flex items-center justify-center">
//           <p className="text-gray-400 dark:text-gray-500">
//             No mistake heatmap data available
//           </p>
//         </div>
//       </div>
//     );
//   }

//    Process heatmap data - group by mistake type and date
//   const mistakeTypes = [
//     ...new Set(mistakeHeatmap.map((item) => item.mistake_type || "Unknown")),
//   ];
//   const dates = [
//     ...new Set(mistakeHeatmap.map((item) => item.date || "Unknown")),
//   ];

//    Create a map for quick lookup
//   const heatmapMap = new Map();
//   mistakeHeatmap.forEach((item) => {
//     const key = `${item.mistake_type}|${item.date}`;
//     heatmapMap.set(key, item.severity || 1);
//   });

//    Get severity color (0 = none, 1 = minor/yellow, 2 = major/red)
//   const getSeverityColor = (severity: number) => {
//     if (severity === 2) return "bg-rose-500";
//     if (severity === 1) return "bg-amber-300 dark:bg-amber-400";
//     return "bg-gray-100 dark:bg-gray-700/50";
//   };

//   return (
//     <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl p-6 shadow-sm w-full overflow-hidden">
//       <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-6">
//         Mistake Heatmap
//       </h3>

//       <div className="overflow-x-auto">
//         <div className="min-w-200">
//           {/* Header Row */}
//           <div className="grid grid-cols-[180px_repeat(auto-fit,minmax(80px,1fr))] mb-4">
//             <span className="text-xs font-medium text-gray-400">
//               Mistake Type
//             </span>
//             {dates.map((date) => (
//               <span
//                 key={date}
//                 className="text-xs font-medium text-gray-400 text-center"
//               >
//                 {date}
//               </span>
//             ))}
//           </div>

//           {/* Data Rows */}
//           <div className="space-y-3">
//             {mistakeTypes.map((type) => (
//               <div
//                 key={type}
//                 className="grid grid-cols-[180px_repeat(auto-fit,minmax(80px,1fr))] items-center"
//               >
//                 <span className="text-sm text-gray-600 dark:text-gray-300">
//                   {type}
//                 </span>
//                 {dates.map((date) => {
//                   const severity = heatmapMap.get(`${type}|${date}`) || 0;
//                   return (
//                     <div key={date} className="flex justify-center">
//                       <div
//                         className={`w-8 h-8 rounded-lg transition-colors ${getSeverityColor(severity)}`}
//                         title={`${type} on ${date}: ${severity === 2 ? "Major" : severity === 1 ? "Minor" : "None"}`}
//                       />
//                     </div>
//                   );
//                 })}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
