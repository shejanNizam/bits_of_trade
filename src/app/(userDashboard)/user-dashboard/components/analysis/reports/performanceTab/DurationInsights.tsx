"use client";

interface DurationInsightsProps {
  durationInsights: {
    avg_holding_duration: string;
    best_session: string;
    best_hour: string;
    most_common_duration: string;
    trades_count: number;
  } | null;
}

export default function DurationInsights({
  durationInsights,
}: DurationInsightsProps) {
  if (!durationInsights) return null;

  const durationData = [
    {
      label: "Avg Holding Duration",
      value: durationInsights.avg_holding_duration,
    },
    { label: "Best Session", value: durationInsights.best_session },
    { label: "Best Hour", value: durationInsights.best_hour },
    {
      label: "Most Common Duration",
      value: durationInsights.most_common_duration,
    },
    { label: "Trades Count", value: durationInsights.trades_count.toString() },
  ];

  return (
    <div className="w-full bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl p-6 shadow-sm">
      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-6">
        Duration Insights
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {durationData.map((item, index) => (
          <div
            key={index}
            className="bg-gray-50/50 dark:bg-gray-900/40 border border-gray-50 dark:border-gray-800 rounded-xl p-4 transition-colors"
          >
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-tight">
              {item.label}
            </p>
            <p className="text-xl font-bold text-gray-900 dark:text-gray-100">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
