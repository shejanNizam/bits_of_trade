import { FiRefreshCcw } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi";

export function PatternsWeSeeRepeating() {
  const patterns = [
    {
      title: "Revenge trading appears within 15 minutes of a loss",
      detail: "4 consecutive losses in the last 30 days",
      link: "1% in your journal",
    },
    {
      title: "Emotional confidence drops before risk violations",
      detail: '"Nervous" is self-described in 100% of instances',
      link: "emotional clarity hits in 41 straight trades",
    },
    {
      title: "Overtrading skipped on RED days -> discipline strong",
      detail: "0 out of 4 red days had no revenge entries",
      link: "Discipline made improved by 11% instantly",
    },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <FiRefreshCcw className="text-blue-500" size={18} />
        <h2 className="font-bold text-lg">Patterns We See Repeating</h2>
      </div>

      <div className="space-y-3">
        {patterns.map((p, i) => (
          <div
            key={i}
            className="bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 rounded-xl p-4"
          >
            <div className="flex items-start gap-3">
              <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-400 shrink-0" />
              <div>
                <p className="text-sm font-semibold">{p.title}</p>
                <div className="flex flex-wrap items-center gap-1 text-[11px] text-slate-500 mt-1">
                  {p.detail}
                  <span className="text-blue-500 font-medium cursor-pointer flex items-center gap-1 ml-1">
                    {p.link} <HiSparkles size={12} />
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
