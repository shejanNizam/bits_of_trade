export default function TradeLogFooter() {
  // This data will come from backend later
  const stats = [
    {
      value: "3",
      label: "Clean Trades",
      sublabel: "60% of total",
      color: "text-green-600 dark:text-green-400",
    },
    {
      value: "2",
      label: "Violations",
      sublabel: "40% of total",
      color: "text-orange-600 dark:text-orange-400",
    },
    {
      value: "1",
      label: "Rule Breaches",
      sublabel: "20% [max]",
      color: "text-red-600 dark:text-red-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md dark:hover:shadow-gray-900/50 transition-shadow"
        >
          <h3 className={`text-4xl sm:text-5xl font-bold mb-2 ${stat.color}`}>
            {stat.value}
          </h3>
          <p className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
            {stat.label}
          </p>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            {stat.sublabel}
          </p>
        </div>
      ))}
    </div>
  );
}
