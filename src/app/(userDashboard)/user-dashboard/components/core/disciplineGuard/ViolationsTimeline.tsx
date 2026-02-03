"use client";

import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

export default function ViolationsTimeline() {
  // This data will come from backend later
  const data = [
    { day: "Mon", value: 1, status: "normal" },
    { day: "Tue", value: 0, status: "normal" },
    { day: "Wed", value: 3, status: "caution" },
    { day: "Thu", value: 5, status: "restricted" },
    { day: "Fri", value: 2, status: "caution" },
    { day: "Sat", value: 0, status: "normal" },
    { day: "Sun", value: 0, status: "normal" },
  ];

  const getBarColor = (status: string) => {
    switch (status) {
      case "restricted":
        return "#ef4444"; // red
      case "caution":
        return "#f59e0b"; // orange
      default:
        return "#10b981"; // green
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl lg:rounded-2xl p-5 sm:p-6 border border-gray-200 dark:border-gray-700 mb-4 sm:mb-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
        <div className="flex-1">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">
            Violations Timeline
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            Daily rule breaches and session status
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              Normal
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
            <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              Caution
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              Restricted
            </span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="w-full h-64 sm:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 5, right: 10, left: -20, bottom: 5 }}
          >
            <XAxis
              dataKey="day"
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              axisLine={{ stroke: "#e5e7eb" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              domain={[0, 8]}
              ticks={[0, 2, 4, 6, 8]}
            />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getBarColor(entry.status)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
