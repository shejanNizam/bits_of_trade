export default function StrategyHealth() {
  return (
    <div className="w-full mx-auto">
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-4xl p-8 shadow-sm">
        <div className="mb-6">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Strategy Health (SMI)
          </h3>
          <p className="text-xs text-slate-400">
            Strategy Maturity Index for each approach
          </p>
        </div>

        <div className="bg-slate-50/50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1">
            <h4 className="font-semibold text-slate-800 dark:text-slate-200">
              Momentum Breakout
            </h4>
            <p className="text-xs text-slate-400">12 trades</p>
            <p className="text-xs text-slate-500 mt-4">Maturity</p>
          </div>

          <div className="flex flex-col items-end gap-2">
            <span className="text-5xl font-bold text-slate-900 dark:text-white">
              68
            </span>
            <span className="bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 text-[10px] font-bold px-3 py-1 rounded-lg">
              Developing
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
