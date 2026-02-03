export default function Overview() {
  // This data will come from backend later
  const metrics = [
    {
      label: "Net P&L",
      value: "₹12,400",
      subtext: "+6.2% vs last month",
      subtextColor: "green",
    },
    {
      label: "Trade Win %",
      value: "68.5%",
      subtext: "+2.3% improvement",
      subtextColor: "green",
    },
    {
      label: "Profit Factor",
      value: "1.8",
      subtext: "Healthy ratio",
      subtextColor: "gray",
    },
    {
      label: "Day Win %",
      value: "72.4%",
      subtext: "+5.1% this week",
      subtextColor: "green",
    },
    {
      label: "Avg Win / Avg Loss",
      value: "2.3",
      subtext: "₹850 / ₹370",
      subtextColor: "gray",
    },
  ];

  return (
    <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl lg:rounded-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
        <div className="flex-1">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1 sm:mb-2">
            Overview
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            Your trading system at a glance. Process first, outcomes later.
          </p>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-5 border border-gray-200 dark:border-gray-700 hover:shadow-md dark:hover:shadow-gray-900/50 transition-shadow"
          >
            {/* Label */}
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-2 sm:mb-3">
              {metric.label}
            </p>

            {/* Main Value */}
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1 sm:mb-2">
              {metric.value}
            </h3>

            {/* Subtext */}
            <p
              className={`text-xs sm:text-sm font-medium ${
                metric.subtextColor === "green"
                  ? "text-green-600 dark:text-green-400"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              {metric.subtext}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
