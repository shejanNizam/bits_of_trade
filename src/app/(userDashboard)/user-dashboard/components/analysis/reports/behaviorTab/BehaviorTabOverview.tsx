"use client";

import {
  CheckCircleOutlined,
  HistoryOutlined,
  InfoCircleOutlined,
  LineChartOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";

const behaviorStats = [
  {
    label: "DIS™ – Discipline Integrity Score",
    value: "87",
    trend: "Improving",
    trendColor: "text-emerald-500",
    icon: <CheckCircleOutlined />,
  },
  {
    label: "VMI – Violation Momentum Index",
    value: "12",
    trend: "Stable",
    trendColor: "text-gray-400",
    icon: <ThunderboltOutlined />,
  },
  {
    label: "DRT – Recovery Discipline Time",
    value: "3.2 days",
    trend: "Improving",
    trendColor: "text-emerald-500",
    icon: <HistoryOutlined />,
  },
  {
    label: "ECI – Execution Consistency Index",
    value: "92",
    trend: "Declining",
    trendColor: "text-rose-500",
    icon: <LineChartOutlined />,
  },
];

export default function BehaviorTabOverview() {
  return (
    <div className="w-full space-y-6">
      {/* Informative Banner */}
      <div className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 rounded-2xl">
        <InfoCircleOutlined className="text-blue-500 text-lg" />
        <p className="text-sm text-blue-700 dark:text-blue-300">
          Behavior analysis requires tagged trades, defined rules, and journal
          entries. Some data may be limited.
        </p>
      </div>

      {/* Behavioral Score Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {behaviorStats.map((item, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl p-6 shadow-sm transition-all hover:shadow-md"
          >
            <div className="flex flex-col h-full">
              <span className="text-[11px] font-medium text-gray-400 dark:text-gray-500 mb-4 uppercase tracking-wider">
                {item.label}
              </span>

              <div className="flex items-baseline gap-2 mb-4">
                <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                  {item.value}
                </h3>
              </div>

              <div
                className={`flex items-center gap-1.5 text-xs font-bold ${item.trendColor}`}
              >
                {item.trend === "Improving" && (
                  <span className="text-[10px]">↗</span>
                )}
                {item.trend === "Declining" && (
                  <span className="text-[10px]">↘</span>
                )}
                {item.trend === "Stable" && (
                  <span className="text-[10px]">—</span>
                )}
                {item.trend}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
