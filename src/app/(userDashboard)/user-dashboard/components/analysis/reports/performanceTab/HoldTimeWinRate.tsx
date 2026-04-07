"use client";

interface HoldTimeWinRateProps {
  holdTimeVsWinRate: Array<{
    duration_range: string; // Changed from 'range'
    win_rate: number; // Changed from 'winRate'
    trades: number; // Changed from 'tradeCount'
  }>;
}

export default function HoldTimeWinRate({
  holdTimeVsWinRate,
}: HoldTimeWinRateProps) {
  console.log(holdTimeVsWinRate);

  if (!holdTimeVsWinRate || holdTimeVsWinRate.length === 0) {
    return (
      <div className="w-full bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-6">
          Hold Time vs Win Rate
        </h3>
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400">
            Hold time data will appear here once available.
          </p>
        </div>
      </div>
    );
  }

  // Filter out entries with 0 trades or 0% win rate for better visualization
  const filteredData = holdTimeVsWinRate.filter(
    (item) => item.trades > 0 || item.win_rate > 0,
  );

  return (
    <div className="w-full bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl p-6 shadow-sm">
      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-6">
        Hold Time vs Win Rate
      </h3>
      <div className="space-y-5">
        {filteredData.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4"
          >
            <span className="w-24 text-sm font-medium text-gray-500 dark:text-gray-400">
              {item.duration_range}
            </span>
            <div className="flex-1 bg-gray-100 dark:bg-gray-700 h-8 rounded-full overflow-hidden relative">
              <div
                className="h-full bg-[#14b8a6] rounded-full transition-all duration-500 flex items-center justify-end px-4"
                style={{ width: `${item.win_rate}%` }}
              >
                <span className="text-white text-xs font-bold">
                  {item.win_rate.toFixed(2)}%
                </span>
              </div>
            </div>
            <span className="w-20 text-xs text-gray-400 dark:text-gray-500 text-right leading-tight">
              {item.trades} {item.trades === 1 ? "trade" : "trades"}
            </span>
          </div>
        ))}
      </div>

      {/* Optional: Show summary statistics */}
      {filteredData.length > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500 dark:text-gray-400">
                Best Win Rate:
              </span>
              <span className="ml-2 font-semibold text-gray-900 dark:text-gray-100">
                {Math.max(...filteredData.map((d) => d.win_rate)).toFixed(2)}%
              </span>
            </div>
            <div>
              <span className="text-gray-500 dark:text-gray-400">
                Most Trades:
              </span>
              <span className="ml-2 font-semibold text-gray-900 dark:text-gray-100">
                {Math.max(...filteredData.map((d) => d.trades))} trades
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
