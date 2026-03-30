/* eslint-disable @typescript-eslint/no-explicit-any */
interface MistakeImpactProps {
  analyticsData?: any;
  isLoading?: boolean;
}

export default function MistakeImpact({
  analyticsData,
  isLoading,
}: MistakeImpactProps) {
  if (isLoading) {
    return (
      <div className="bg-white dark:bg-primary/10 border border-slate-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm h-full">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">
          Mistake Impact
        </h3>
        <div className="flex justify-center py-8">
          <div className="animate-pulse text-slate-500">Loading...</div>
        </div>
      </div>
    );
  }

  const impactData = analyticsData?.impact || {
    trades_with_mistakes: 0,
    trades_with_mistakes_percentage: 0,
    loss_from_mistake_trades: 0,
    clean_trades_count: 0,
    clean_success_rate: 0,
  };

  const totalTrades =
    impactData.trades_with_mistakes + impactData.clean_trades_count;
  const mistakePercentage =
    impactData.trades_with_mistakes_percentage ||
    (totalTrades > 0
      ? ((impactData.trades_with_mistakes / totalTrades) * 100).toFixed(1)
      : 0);

  // Format loss amount (handle negative values)
  const formattedLoss = Math.abs(
    impactData.loss_from_mistake_trades,
  ).toLocaleString("en-IN", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });

  return (
    <div className="bg-white dark:bg-primary/10 border border-slate-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm h-full">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">
        Mistake Impact
      </h3>
      <div className="space-y-4">
        {/* Trades with Mistakes */}
        <div className="bg-red-50/50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 rounded-xl p-4">
          <p className="text-xs font-bold text-red-800 dark:text-red-400 uppercase tracking-tight mb-1">
            Trades with Mistakes
          </p>
          <h4 className="text-3xl font-bold text-red-600 dark:text-red-500 mb-1">
            {impactData.trades_with_mistakes}
          </h4>
          <p className="text-xs text-red-700/70 dark:text-red-300/60 font-medium">
            {mistakePercentage}% of all trades
          </p>
        </div>

        {/* Loss from Mistakes */}
        <div className="bg-red-50/50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 rounded-xl p-4">
          <p className="text-xs font-bold text-red-800 dark:text-red-400 uppercase tracking-tight mb-1">
            Loss from Mistake Trades
          </p>
          <h4 className="text-3xl font-bold text-red-600 dark:text-red-500 mb-1">
            ₹{formattedLoss}
          </h4>
          <p className="text-xs text-red-700/70 dark:text-red-300/60 font-medium">
            Could have been avoided
          </p>
        </div>

        {/* Clean Trades */}
        <div className="bg-emerald-50/50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/20 rounded-xl p-4">
          <p className="text-xs font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-tight mb-1">
            Clean Trades (No Mistakes)
          </p>
          <h4 className="text-3xl font-bold text-emerald-600 dark:text-emerald-500 mb-1">
            {impactData.clean_trades_count}
          </h4>
          <p className="text-xs text-emerald-700/70 dark:text-emerald-300/60 font-medium">
            {impactData.clean_success_rate}% success rate
          </p>
        </div>
      </div>
    </div>
  );
}
