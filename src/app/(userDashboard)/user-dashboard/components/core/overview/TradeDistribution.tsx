import { PiChartPieSliceFill } from "react-icons/pi";

export default function TradeDistribution() {
  // This data will come from backend later
  const distributionData = {
    bySegment: [
      { name: "Indian Stocks", value: 60, color: "bg-blue-500" },
      { name: "Forex", value: 35, color: "bg-green-500" },
      { name: "Crypto", value: 15, color: "bg-orange-500" },
    ],
    byDirection: [
      { name: "Long", color: "bg-green-500" },
      { name: "Short", color: "bg-blue-500" },
    ],
    topStrategies: ["Momentum Breakout", "Trend Following", "Scalping"],
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl lg:rounded-2xl p-5 sm:p-6 border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6 sm:mb-8">
        <PiChartPieSliceFill className="text-green-600 dark:text-green-400 text-xl sm:text-2xl" />
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100">
          Trade Distribution
        </h3>
      </div>

      {/* By Segment */}
      <div className="mb-6 sm:mb-8">
        <h4 className="text-sm sm:text-base font-semibold text-gray-700 dark:text-gray-300 mb-4">
          By Segment
        </h4>
        <div className="space-y-4">
          {distributionData.bySegment.map((segment, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  {segment.name}
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
      </div>

      {/* By Direction */}
      <div className="mb-6 sm:mb-8">
        <h4 className="text-sm sm:text-base font-semibold text-gray-700 dark:text-gray-300 mb-4">
          By Direction
        </h4>
        <div className="flex items-center gap-6">
          {distributionData.byDirection.map((direction, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className={`w-4 h-4 ${direction.color} rounded`}></div>
              <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                {direction.name}:
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Top Strategies */}
      <div>
        <h4 className="text-sm sm:text-base font-semibold text-gray-700 dark:text-gray-300 mb-4">
          Top Strategies
        </h4>
        <div className="space-y-2">
          {distributionData.topStrategies.map((strategy, index) => (
            <div
              key={index}
              className="text-xs sm:text-sm text-gray-600 dark:text-gray-400"
            >
              {strategy}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
