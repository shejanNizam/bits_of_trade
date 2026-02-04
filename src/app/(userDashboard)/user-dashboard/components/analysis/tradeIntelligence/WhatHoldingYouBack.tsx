import { FiAlertTriangle } from "react-icons/fi";

export function WhatHoldingYouBack() {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <FiAlertTriangle className="text-rose-500" size={20} />
        <h2 className="font-bold text-lg">{"What's"} Holding You Back</h2>
      </div>

      <div className="space-y-3">
        <div className="bg-rose-50/40 dark:bg-rose-900/10 border border-rose-100 dark:border-rose-900/20 rounded-xl p-4">
          <p className="font-semibold text-sm flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-slate-900 dark:bg-white" />{" "}
            FOMO entries (reversal) 40% after a loss
          </p>
          <p className="text-xs text-rose-600 mt-1 font-bold">
            This pattern lead you to FOMO in 36 out of 38 days
          </p>
          <p className="text-[10px] text-slate-400 mt-1">
            Avg session PnL is -1.4% after this occurs
          </p>
        </div>

        <div className="bg-rose-50/40 dark:bg-rose-900/10 border border-rose-100 dark:border-rose-900/20 rounded-xl p-4">
          <p className="font-semibold text-sm flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-slate-900 dark:bg-white" />{" "}
            Risk analysis closer after 2 losses
          </p>
          <p className="text-xs text-rose-600 mt-1 font-bold">
            Your declines scale more than 80-3% after losing streaks
          </p>
          <p className="text-[10px] text-slate-400 mt-1">
            Before hit ignoring position size rules
          </p>
        </div>

        <div className="bg-amber-50/40 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/20 rounded-xl p-4">
          <p className="font-semibold text-sm flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-slate-900 dark:bg-white" />{" "}
            Exit sessions using 37% trade closer
          </p>
          <p className="text-xs text-amber-600 mt-1 font-bold">
            This causes an average of 4% left on trade per loss
          </p>
        </div>
      </div>
    </div>
  );
}
