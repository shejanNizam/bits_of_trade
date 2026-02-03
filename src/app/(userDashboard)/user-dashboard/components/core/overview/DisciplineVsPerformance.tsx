import { TbActivity } from "react-icons/tb";

export default function DisciplineVsPerformance() {
  // This data will come from backend later
  const data = {
    disciplined: {
      winRate: 68,
      avgReturn: 1.4,
      drawdown: -4,
    },
    undisciplined: {
      winRate: 32,
      avgReturn: 0.6,
      drawdown: -18,
    },
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl lg:rounded-2xl p-5 sm:p-6 border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="flex items-start justify-between mb-6 sm:mb-8">
        <div className="flex-1">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-1 sm:mb-2">
            Discipline vs Performance
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            Does your edge exist, or is behavior the problem?
          </p>
        </div>

        {/* Activity Icon */}
        <TbActivity className="text-gray-400 dark:text-gray-500 text-2xl sm:text-3xl shrink-0" />
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        {/* When Disciplined */}
        <div className="bg-green-50 dark:bg-green-950/30 rounded-xl p-4 sm:p-5 border border-green-100 dark:border-green-900/50">
          {/* Header */}
          <div className="flex items-center gap-2 mb-4 sm:mb-5">
            <div className="w-2 h-2 rounded-full bg-green-600 dark:bg-green-400"></div>
            <h4 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-gray-100">
              When Disciplined
            </h4>
          </div>

          {/* Metrics */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-green-800 dark:text-green-300">
                Win Rate
              </span>
              <span className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100">
                {data.disciplined.winRate}%
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-green-800 dark:text-green-300">
                Avg Return
              </span>
              <span className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100">
                {data.disciplined.avgReturn}R
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-green-800 dark:text-green-300">
                Drawdown
              </span>
              <span className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100">
                {data.disciplined.drawdown}%
              </span>
            </div>
          </div>
        </div>

        {/* When Undisciplined */}
        <div className="bg-red-50 dark:bg-red-950/30 rounded-xl p-4 sm:p-5 border border-red-100 dark:border-red-900/50">
          {/* Header */}
          <div className="flex items-center gap-2 mb-4 sm:mb-5">
            <div className="w-2 h-2 rounded-full bg-red-600 dark:bg-red-400"></div>
            <h4 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-gray-100">
              When Undisciplined
            </h4>
          </div>

          {/* Metrics */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-red-800 dark:text-red-300">
                Win Rate
              </span>
              <span className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100">
                {data.undisciplined.winRate}%
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-red-800 dark:text-red-300">
                Avg Return
              </span>
              <span className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100">
                {data.undisciplined.avgReturn}R
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-red-800 dark:text-red-300">
                Drawdown
              </span>
              <span className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100">
                {data.undisciplined.drawdown}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
