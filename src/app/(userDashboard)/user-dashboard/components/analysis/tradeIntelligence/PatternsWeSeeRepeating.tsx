// import { FiRefreshCcw } from "react-icons/fi";
// import { HiSparkles } from "react-icons/hi";

// export function PatternsWeSeeRepeating() {
//   const patterns = [
//     {
//       title: "Revenge trading appears within 15 minutes of a loss",
//       detail: "4 consecutive losses in the last 30 days",
//       link: "1% in your journal",
//     },
//     {
//       title: "Emotional confidence drops before risk violations",
//       detail: '"Nervous" is self-described in 100% of instances',
//       link: "emotional clarity hits in 41 straight trades",
//     },
//     {
//       title: "Overtrading skipped on RED days -> discipline strong",
//       detail: "0 out of 4 red days had no revenge entries",
//       link: "Discipline made improved by 11% instantly",
//     },
//   ];

//   return (
//     <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
//       <div className="flex items-center gap-2 mb-6">
//         <FiRefreshCcw className="text-blue-500" size={18} />
//         <h2 className="font-bold text-lg">Patterns We See Repeating</h2>
//       </div>

//       <div className="space-y-3">
//         {patterns.map((p, i) => (
//           <div
//             key={i}
//             className="bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 rounded-xl p-4"
//           >
//             <div className="flex items-start gap-3">
//               <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-400 shrink-0" />
//               <div>
//                 <p className="text-sm font-semibold">{p.title}</p>
//                 <div className="flex flex-wrap items-center gap-1 text-[11px] text-slate-500 mt-1">
//                   {p.detail}
//                   <span className="text-blue-500 font-medium cursor-pointer flex items-center gap-1 ml-1">
//                     {p.link} <HiSparkles size={12} />
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

import { FiRefreshCcw } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi";

interface RepeatingPattern {
  id: string;
  label: string;
  value: number;
  out_of: number | null;
  description: string;
  stat: string;
  journal_mention_pct?: number;
}

interface PatternsWeSeeRepeatingProps {
  repeatingPatterns: RepeatingPattern[];
  totalTrades: number;
}

export function PatternsWeSeeRepeating({
  repeatingPatterns,
  // totalTrades,
}: PatternsWeSeeRepeatingProps) {
  if (!repeatingPatterns || repeatingPatterns.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <FiRefreshCcw className="text-blue-500" size={18} />
          <h2 className="font-bold text-lg">Patterns We See Repeating</h2>
        </div>
        <p className="text-center text-gray-500 dark:text-gray-400 py-8">
          No recurring patterns detected yet.
        </p>
      </div>
    );
  }

  const getPatternIcon = (id: string) => {
    if (id === "revenge_trading") return "🔥";
    if (id === "consecutive_losses") return "📉";
    if (id === "emotional_clarity") return "🧘";
    return "🔄";
  };

  return (
    <div className="bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <FiRefreshCcw className="text-blue-500" size={18} />
        <h2 className="font-bold text-lg">Patterns We See Repeating</h2>
      </div>

      <div className="space-y-3">
        {repeatingPatterns.map((pattern) => (
          <div
            key={pattern.id}
            className="bg-slate-50 dark:bg-gray-700/40 border border-slate-100 dark:border-gray-600 rounded-xl p-4"
          >
            <div className="flex items-start gap-3">
              <div className="text-lg">{getPatternIcon(pattern.id)}</div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  {pattern.label}
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                  {pattern.description}
                </p>
                <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 mt-2">
                  <span className="font-medium">{pattern.stat}</span>
                  {pattern.journal_mention_pct !== undefined && (
                    <span className="text-blue-500 font-medium flex items-center gap-1">
                      {pattern.journal_mention_pct}% in journal
                      <HiSparkles size={12} />
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
