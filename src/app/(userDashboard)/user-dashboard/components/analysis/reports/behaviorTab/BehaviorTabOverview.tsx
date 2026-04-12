"use client";

import {
  CheckCircleOutlined,
  HistoryOutlined,
  InfoCircleOutlined,
  LineChartOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";

interface KPIs {
  DIS?: {
    value: number;
    trend: string;
    arrow: string;
  };
  VMI?: {
    value: number;
    trend: string;
    direction: string;
    arrow: string;
  };
  DRT?: {
    value: number;
    trend: string;
    arrow: string;
  };
  ECI?: {
    value: number;
    trend: string;
    arrow: string;
  };
}

interface BehaviorTabOverviewProps {
  kpis: KPIs;
}

export default function BehaviorTabOverview({
  kpis,
}: BehaviorTabOverviewProps) {
  const behaviorStats = [
    {
      label: "DIS™ – Discipline Integrity Score",
      value: kpis.DIS?.value?.toString() || "0",
      trend: kpis.DIS?.trend || "Stable",
      trendColor: getTrendColor(kpis.DIS?.trend),
      icon: <CheckCircleOutlined />,
    },
    {
      label: "VMI – Violation Momentum Index",
      value: kpis.VMI?.value?.toString() || "0",
      trend: kpis.VMI?.trend || "Stable",
      trendColor: getTrendColor(kpis.VMI?.trend),
      icon: <ThunderboltOutlined />,
    },
    {
      label: "DRT – Recovery Discipline Time",
      value: kpis.DRT?.value === 0 ? "0 days" : `${kpis.DRT?.value || 0} days`,
      trend: kpis.DRT?.trend || "Stable",
      trendColor: getTrendColor(kpis.DRT?.trend),
      icon: <HistoryOutlined />,
    },
    {
      label: "ECI – Execution Consistency Index",
      value: kpis.ECI?.value?.toString() || "0",
      trend: kpis.ECI?.trend || "Stable",
      trendColor: getTrendColor(kpis.ECI?.trend),
      icon: <LineChartOutlined />,
    },
  ];

  function getTrendColor(trend?: string): string {
    switch (trend) {
      case "Improving":
        return "text-emerald-500";
      case "Declining":
        return "text-rose-500";
      default:
        return "text-gray-400";
    }
  }

  function getTrendIcon(trend?: string): string {
    switch (trend) {
      case "Improving":
        return "↗";
      case "Declining":
        return "↘";
      default:
        return "—";
    }
  }

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
                <span className="text-[10px]">{getTrendIcon(item.trend)}</span>
                {item.trend}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
