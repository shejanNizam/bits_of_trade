/* eslint-disable @typescript-eslint/no-explicit-any */

import { useGetTradeDistributionQuery } from "@/redux/features/overview/overviewApi";
import { PiChartPieSliceFill } from "react-icons/pi";

export default function TradeDistribution() {
  const { data } = useGetTradeDistributionQuery({});

  // Extract data from API response
  const bySegmentData = data?.by_segment || [];
  const byDirectionData = data?.by_direction || {
    long: { trade_count: 0, total_pnl: 0, percentage: 0 },
    short: { trade_count: 0, total_pnl: 0, percentage: 0 },
  };

  // Calculate total trades across all segments
  const totalTrades = data?.total_trades || 0;

  // Map segment colors
  const getSegmentColor = (marketType: string) => {
    const colors: Record<string, string> = {
      indian_market: "bg-blue-500",
      forex: "bg-green-500",
      crypto: "bg-orange-500",
      options: "bg-purple-500",
    };
    return colors[marketType] || "bg-gray-500";
  };

  // Prepare distribution data for segments
  const segments = bySegmentData.map((segment: any) => ({
    name: segment.label,
    value: segment.percentage || 0,
    tradeCount: segment.trade_count,
    pnl: segment.total_pnl,
    color: getSegmentColor(segment.market_type),
  }));

  // Prepare direction data
  const directions = [
    {
      name: "Long",
      tradeCount: byDirectionData.long?.trade_count || 0,
      pnl: byDirectionData.long?.total_pnl || 0,
      percentage: byDirectionData.long?.percentage || 0,
      color: "bg-green-500",
    },
    {
      name: "Short",
      tradeCount: byDirectionData.short?.trade_count || 0,
      pnl: byDirectionData.short?.total_pnl || 0,
      percentage: byDirectionData.short?.percentage || 0,
      color: "bg-blue-500",
    },
  ];

  // Top strategies - you might want to fetch this from a different API endpoint
  // For now, keeping as placeholder or showing message when no trades
  const topStrategies =
    totalTrades === 0
      ? ["No trades executed yet"]
      : ["Momentum Breakout", "Trend Following", "Scalping"];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl lg:rounded-2xl p-5 sm:p-6 border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6 sm:mb-8">
        <PiChartPieSliceFill className="text-green-600 dark:text-green-400 text-xl sm:text-2xl" />
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100">
          Trade Distribution
        </h3>
        {totalTrades === 0 && (
          <span className="ml-2 text-xs bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 px-2 py-1 rounded">
            No Trades
          </span>
        )}
      </div>

      {/* By Segment */}
      <div className="mb-6 sm:mb-8">
        <h4 className="text-sm sm:text-base font-semibold text-gray-700 dark:text-gray-300 mb-4">
          By Segment
        </h4>
        {totalTrades === 0 ? (
          <div className="text-center py-6 text-gray-500 dark:text-gray-400 text-sm">
            No segment data available
          </div>
        ) : (
          <div className="space-y-4">
            {segments.map((segment: any, index: number) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    {segment.name}
                  </span>
                  <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                    {segment.value.toFixed(1)}% ({segment.tradeCount} trades)
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className={`${segment.color} h-2 rounded-full transition-all`}
                    style={{ width: `${segment.value}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* By Direction */}
      <div className="mb-6 sm:mb-8">
        <h4 className="text-sm sm:text-base font-semibold text-gray-700 dark:text-gray-300 mb-4">
          By Direction
        </h4>
        {totalTrades === 0 ? (
          <div className="text-center py-6 text-gray-500 dark:text-gray-400 text-sm">
            No direction data available
          </div>
        ) : (
          <div className="space-y-3">
            {directions.map((direction: any, index: number) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 ${direction.color} rounded`}></div>
                    <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                      {direction.name}
                    </span>
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                    {direction.percentage.toFixed(1)}% ({direction.tradeCount}{" "}
                    trades)
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className={`${direction.color} h-2 rounded-full transition-all`}
                    style={{ width: `${direction.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Top Strategies */}
      <div>
        <h4 className="text-sm sm:text-base font-semibold text-gray-700 dark:text-gray-300 mb-4">
          Top Strategies
        </h4>
        <div className="space-y-2">
          {topStrategies.map((strategy: string, index: number) => (
            <div
              key={index}
              className="text-xs sm:text-sm text-gray-600 dark:text-gray-400"
            >
              {strategy}
            </div>
          ))}
        </div>
        {totalTrades === 0 && (
          <div className="mt-3 text-xs text-gray-400 dark:text-gray-500 italic">
            Start trading to see strategy insights
          </div>
        )}
      </div>
    </div>
  );
}
