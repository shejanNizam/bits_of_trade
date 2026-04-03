// "use client";

// const adherenceData = [
//   { category: "Risk Management", score: 92 },
//   { category: "Entry Rules", score: 85 },
//   { category: "Exit Rules", score: 78 },
//   { category: "Position Sizing", score: 95 },
//   { category: "Time Management", score: 88 },
// ];

// export default function RuleAdherenceByCategory() {
//   return (
//     <div className="w-full bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl p-6 shadow-sm">
//       <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-6">
//         Rule Adherence by Category
//       </h3>

//       <div className="space-y-6">
//         {adherenceData.map((item, idx) => (
//           <div key={idx} className="space-y-2">
//             <div className="flex justify-between items-center px-1">
//               <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
//                 {item.category}
//               </span>
//               <span className="text-xs font-bold text-[#14b8a6]">
//                 {item.score}%
//               </span>
//             </div>
//             <div className="w-full bg-gray-100 dark:bg-gray-700/50 h-2.5 rounded-full overflow-hidden">
//               <div
//                 className="h-full bg-[#14b8a6] rounded-full transition-all duration-1000 ease-out shadow-[0_0_8px_rgba(20,184,166,0.2)]"
//                 style={{ width: `${item.score}%` }}
//               />
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

"use client";

interface RuleAdherenceByCategoryProps {
  ruleAdherence: {
    "Risk Management"?: number;
    "Entry Rules"?: number;
    "Exit Rules"?: number;
    "Position Sizing"?: number;
    "Time Management"?: number;
    [key: string]: number | undefined;
  };
}

export default function RuleAdherenceByCategory({
  ruleAdherence,
}: RuleAdherenceByCategoryProps) {
  // Convert object to array format
  const adherenceData = Object.entries(ruleAdherence)
    .map(([category, score]) => ({
      category,
      score: typeof score === "number" ? score : 0,
    }))
    .sort((a, b) => b.score - a.score);

  // If no data, show empty state
  if (adherenceData.length === 0) {
    return (
      <div className="w-full bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-6">
          Rule Adherence by Category
        </h3>
        <div className="h-40 w-full flex items-center justify-center">
          <p className="text-gray-400 dark:text-gray-500">
            No rule adherence data available
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl p-6 shadow-sm">
      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-6">
        Rule Adherence by Category
      </h3>

      <div className="space-y-6">
        {adherenceData.map((item, idx) => (
          <div key={idx} className="space-y-2">
            <div className="flex justify-between items-center px-1">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {item.category}
              </span>
              <span className="text-xs font-bold text-[#14b8a6]">
                {item.score.toFixed(1)}%
              </span>
            </div>
            <div className="w-full bg-gray-100 dark:bg-gray-700/50 h-2.5 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#14b8a6] rounded-full transition-all duration-1000 ease-out shadow-[0_0_8px_rgba(20,184,166,0.2)]"
                style={{ width: `${item.score}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
