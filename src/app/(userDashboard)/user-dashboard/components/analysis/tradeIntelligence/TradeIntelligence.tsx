import { MdTimeline } from "react-icons/md";

export default function TradeIntelligence() {
  return (
    <div className="w-full transition-colors duration-300">
      <div className="mx-auto space-y-6">
        {/* Header Section */}
        <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
          {/* Title and Button Row */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div className="space-y-1">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                Trade Intelligence
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                AI-powered insights based on your trading behavior, discipline,
                and performance.
              </p>
            </div>

            <button className="bg-[#8B5CF6] hover:bg-[#7C3AED] active:scale-95 text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-all w-full md:w-auto shadow-lg shadow-purple-500/20">
              Generate Trade Intelligence
            </button>
          </div>

          {/* Summary Box */}
          <div className="bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-700/50 rounded-2xl p-6 relative overflow-hidden">
            {/* Subtle Gradient Accent for Dark Mode */}
            <div className="absolute top-0 left-0 w-1 h-full bg-[#8B5CF6]" />

            <div className="flex items-center gap-2 mb-4 text-[#a78bfa] dark:text-[#c4b5fd]">
              <MdTimeline size={24} className="drop-shadow-sm" />
              <span className="font-bold text-[11px] uppercase tracking-[0.15em]">
                Intelligence Trading Summary
              </span>
            </div>

            <p className="text-[15px] leading-relaxed text-slate-600 dark:text-slate-300 font-medium">
              Over the last 30 days, your performance is positive, but
              discipline consistency is unstable. Most profits came from
              trend-following trades executed during{" "}
              <span className="text-emerald-600 dark:text-emerald-400 font-black bg-emerald-100/50 dark:bg-emerald-500/10 px-1.5 py-0.5 rounded">
                GREEN
              </span>{" "}
              sessions. Losses cluster during{" "}
              <span className="text-amber-600 dark:text-amber-400 font-black bg-amber-100/50 dark:bg-amber-500/10 px-1.5 py-0.5 rounded">
                YELLOW
              </span>{" "}
              sessions driven by FOMO and early entries.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
