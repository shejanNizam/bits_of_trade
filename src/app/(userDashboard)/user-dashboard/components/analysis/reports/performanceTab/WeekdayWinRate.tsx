import { Minus, TrendingDown, TrendingUp } from "lucide-react";

// Type definition for the component props
interface WeekdayData {
  day: string;
  win_rate: number;
  trades: number;
}

interface WeekdayWinRateProps {
  weekdayWinRate: WeekdayData[];
}

export default function WeekdayWinRate({
  weekdayWinRate,
}: WeekdayWinRateProps) {
  // Find max win rate for relative bar sizing
  const maxWinRate = Math.max(...weekdayWinRate.map((item) => item.win_rate));

  // Helper function to get trend icon based on win rate
  const getTrendIcon = (winRate: number) => {
    if (winRate >= 55) return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (winRate >= 45) return <Minus className="w-4 h-4 text-yellow-500" />;
    return <TrendingDown className="w-4 h-4 text-red-500" />;
  };

  // Helper function to get color based on win rate
  const getWinRateColor = (winRate: number) => {
    if (winRate >= 55) return "text-green-600 dark:text-green-400";
    if (winRate >= 45) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  };

  // Helper function to get progress bar color
  const getProgressBarColor = (winRate: number) => {
    if (winRate >= 55) return "bg-green-500";
    if (winRate >= 45) return "bg-yellow-500";
    return "bg-red-500";
  };

  // Calculate average win rate
  const avgWinRate = (
    weekdayWinRate.reduce((sum, item) => sum + item.win_rate, 0) /
    weekdayWinRate.length
  ).toFixed(1);

  // Find best day
  const bestDay = weekdayWinRate.reduce((best, current) =>
    current.win_rate > best.win_rate ? current : best,
  );

  // Find worst day
  const worstDay = weekdayWinRate.reduce((worst, current) =>
    current.win_rate < worst.win_rate ? current : worst,
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-300">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          Weekday Win Rate Analysis
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Your trading performance breakdown by day of the week
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-linear-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg p-4">
          <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Average Win Rate
          </p>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {avgWinRate}%
          </p>
        </div>

        <div className="bg-linear-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg p-4">
          <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Best Day
          </p>
          <p className="text-xl font-bold text-green-600 dark:text-green-400">
            {bestDay.day}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {bestDay.win_rate}% win rate ({bestDay.trades} trades)
          </p>
        </div>

        <div className="bg-linear-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-lg p-4">
          <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Day to Improve
          </p>
          <p className="text-xl font-bold text-red-600 dark:text-red-400">
            {worstDay.day}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {worstDay.win_rate}% win rate ({worstDay.trades} trades)
          </p>
        </div>
      </div>

      {/* Main Chart/List View */}
      <div className="space-y-4">
        {weekdayWinRate.map((item) => (
          <div key={item.day} className="group">
            {/* Day and Win Rate Header */}
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-700 dark:text-gray-300">
                  {item.day}
                </span>
                {getTrendIcon(item.win_rate)}
              </div>
              <div className="flex items-center gap-3">
                <span className={`font-bold ${getWinRateColor(item.win_rate)}`}>
                  {item.win_rate}%
                </span>
                <span className="text-xs text-gray-400">
                  {item.trades} trades
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="relative">
              <div className="overflow-hidden h-2 text-xs flex rounded-full bg-gray-200 dark:bg-gray-700">
                <div
                  style={{ width: `${(item.win_rate / maxWinRate) * 100}%` }}
                  className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${getProgressBarColor(
                    item.win_rate,
                  )} transition-all duration-500`}
                />
              </div>
            </div>

            {/* Benchmark Indicator */}
            {item.win_rate < 50 && (
              <div className="mt-1 text-right">
                <span className="text-xs text-red-400">
                  Below 50% benchmark
                </span>
              </div>
            )}
            {item.win_rate >= 50 && item.win_rate < 55 && (
              <div className="mt-1 text-right">
                <span className="text-xs text-yellow-400">At benchmark</span>
              </div>
            )}
            {item.win_rate >= 55 && (
              <div className="mt-1 text-right">
                <span className="text-xs text-green-400">
                  Above average performance
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Insights Section */}
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Key Insights
        </h4>
        <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
          {avgWinRate >= "50.0" ? (
            <li className="flex items-start gap-2">
              <span className="text-green-500">✓</span>
              <span>Overall win rate is above 50% -保持良好的交易策略</span>
            </li>
          ) : (
            <li className="flex items-start gap-2">
              <span>
                Overall win rate below 50% - Consider reviewing your strategy
              </span>
            </li>
          )}

          {bestDay.win_rate - worstDay.win_rate > 20 && (
            <li className="flex items-start gap-2">
              <span className="text-blue-500">📊</span>
              <span>
                Significant performance variation between {bestDay.day} (
                {bestDay.win_rate}%) and {worstDay.day} ({worstDay.win_rate}%)
              </span>
            </li>
          )}

          <li className="flex items-start gap-2">
            <span>
              Most active trading day:{" "}
              {
                weekdayWinRate.reduce((most, curr) =>
                  curr.trades > most.trades ? curr : most,
                ).day
              }
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
