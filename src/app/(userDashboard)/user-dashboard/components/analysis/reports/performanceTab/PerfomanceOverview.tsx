interface PerformanceOverviewProps {
  performanceData: {
    total_pnl: number;
    win_rate: number;
    profit_factor: number;
    trade_expectancy: number;
    avg_trade_pnl: number;
    total_trades: number;
    total_positive_trades: number;
    total_negative_trades: number;
  } | null;
}

export default function PerformanceOverview({
  performanceData,
}: PerformanceOverviewProps) {
  if (!performanceData) return null;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  // Helper function to get text color based on value
  const getValueColor = (value: number, higherIsBetter: boolean = true) => {
    if (higherIsBetter) {
      return value >= 0
        ? "text-emerald-600 dark:text-emerald-400"
        : "text-rose-600 dark:text-rose-400";
    }
    return value >= 0
      ? "text-emerald-600 dark:text-emerald-400"
      : "text-rose-600 dark:text-rose-400";
  };

  const stats = [
    {
      label: "Net P&L",
      value: formatCurrency(performanceData.total_pnl),
      rawValue: performanceData.total_pnl,
      trend: performanceData.total_pnl >= 0 ? "up" : "down",
    },
    {
      label: "Win Rate",
      value: formatPercentage(performanceData.win_rate),
      rawValue: performanceData.win_rate,
      trend: performanceData.win_rate >= 50 ? "up" : "down",
    },
    {
      label: "Profit Factor",
      value: performanceData.profit_factor.toFixed(2),
      rawValue: performanceData.profit_factor,
      trend: performanceData.profit_factor >= 1 ? "up" : "down",
    },
    {
      label: "Trade Expectancy",
      value: formatCurrency(performanceData.trade_expectancy),
      rawValue: performanceData.trade_expectancy,
      trend: performanceData.trade_expectancy >= 0 ? "up" : "down",
    },
    {
      label: "Avg Trade P&L",
      value: formatCurrency(performanceData.avg_trade_pnl),
      rawValue: performanceData.avg_trade_pnl,
      trend: performanceData.avg_trade_pnl >= 0 ? "up" : "down",
    },
    {
      label: "Total Trades",
      value: performanceData.total_trades.toString(),
      rawValue: performanceData.total_trades,
      trend: "neutral",
    },
  ];

  return (
    <div className="w-full py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-5 shadow-sm transition-all hover:shadow-md"
          >
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              {item.label}
            </p>
            <h3
              className={`text-2xl font-bold mb-2 ${getValueColor(item.rawValue)}`}
            >
              {item.value}
            </h3>
          </div>
        ))}
      </div>

      {/* Additional Stats Row for Positive/Negative Trades */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-5 shadow-sm transition-all hover:shadow-md">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
            Positive Trades
          </p>
          <h3 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
            {performanceData.total_positive_trades}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {(
              (performanceData.total_positive_trades /
                performanceData.total_trades) *
              100
            ).toFixed(1)}
            % of total trades
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-5 shadow-sm transition-all hover:shadow-md">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
            Negative Trades
          </p>
          <h3 className="text-2xl font-bold text-rose-600 dark:text-rose-400 mb-2">
            {performanceData.total_negative_trades}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {(
              (performanceData.total_negative_trades /
                performanceData.total_trades) *
              100
            ).toFixed(1)}
            % of total trades
          </p>
        </div>
      </div>
    </div>
  );
}
