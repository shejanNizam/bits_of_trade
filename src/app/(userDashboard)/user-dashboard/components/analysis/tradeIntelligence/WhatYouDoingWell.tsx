import { FiTarget } from "react-icons/fi";

export function WhatYouDoingWell() {
  return (
    <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm transition-colors duration-300 h-full">
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
        {/* Card 1: Confirmation Stats */}
        <div className="bg-emerald-50/40 dark:bg-emerald-500/3 border border-emerald-100 dark:border-emerald-500/20 rounded-2xl p-4 transition-all hover:border-emerald-200 dark:hover:border-emerald-500/40">
          <div className="flex justify-between items-start gap-4">
            <div className="space-y-1">
              <p className="font-bold text-sm text-slate-900 dark:text-slate-100">
                You waited for confirmation 18 out of 22 times
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                21 of 24 surveying trades followed strategy rules
              </p>
            </div>
            <button className="shrink-0 text-[10px] bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white px-3 py-1.5 rounded-lg font-bold transition-all shadow-sm shadow-emerald-500/20">
              View in plan
            </button>
          </div>

          <div className="mt-4 pt-4 border-t border-emerald-100 dark:border-slate-700/50">
            <p className="text-xs text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Your risk-to-reward improved by 1.4x
            </p>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 ml-3.5 mt-0.5 font-medium">
              Average loss of 2.2% vs max trade threshold
            </p>
          </div>
        </div>

        {/* Card 2: Entry Timing */}
        <div className="bg-emerald-50/40 dark:bg-emerald-500/3 border border-emerald-100 dark:border-emerald-500/20 rounded-2xl p-4 flex justify-between items-center transition-all hover:border-emerald-200 dark:hover:border-emerald-500/40">
          <div className="space-y-1">
            <p className="font-bold text-sm text-slate-900 dark:text-slate-100">
              Best entries occur in first 30 mins
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              97% win rate on Entry confirmed by 87% win
            </p>
          </div>
          <button className="shrink-0 text-[10px] bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white px-3 py-1.5 rounded-lg font-bold transition-all shadow-sm shadow-emerald-500/20">
            View in plan
          </button>
        </div>
      </div>
    </div>
  );
}
