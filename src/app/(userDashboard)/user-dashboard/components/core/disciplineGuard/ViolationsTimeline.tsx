/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useGetViolationsTimelineQuery } from "@/redux/features/discipline/disciplineApi";
import { Spin } from "antd";
import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function ViolationsTimeline() {
  const {
    data: violationTimelineData,
    isLoading,
    error,
  } = useGetViolationsTimelineQuery({});

  // Transform API data to chart format
  const transformData = () => {
    if (!violationTimelineData || violationTimelineData.length === 0) {
      return [];
    }

    return violationTimelineData.map((item: any) => {
      // Determine status based on violations count
      let status = "normal";
      if (item.violations_count >= 5) {
        status = "restricted";
      } else if (item.violations_count >= 2) {
        status = "caution";
      } else if (item.violations_count === 0) {
        status = "normal";
      }

      // If session_state is provided, use that instead
      if (item.session_state) {
        switch (item.session_state.toLowerCase()) {
          case "green":
            status = "normal";
            break;
          case "yellow":
            status = "caution";
            break;
          case "red":
            status = "restricted";
            break;
        }
      }

      return {
        day: item.day_label,
        fullDate: item.session_date,
        dayFull: item.day_full,
        value: item.violations_count,
        hardViolations: item.hard_violations,
        softViolations: item.soft_violations,
        status: status,
        sessionState: item.session_state,
      };
    });
  };

  const data = transformData();

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

  // Custom Tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-gray-900 dark:bg-gray-800 text-white rounded-lg p-3 shadow-lg border border-gray-700">
          <p className="font-semibold text-sm mb-1">{data.dayFull}</p>
          <p className="text-xs text-gray-300 mb-1">Date: {data.fullDate}</p>
          <p className="text-xs text-gray-300 mb-1">
            Violations:{" "}
            <span className="font-bold text-white">{data.value}</span>
          </p>
          {data.hardViolations > 0 && (
            <p className="text-xs text-red-400">Hard: {data.hardViolations}</p>
          )}
          {data.softViolations > 0 && (
            <p className="text-xs text-yellow-400">
              Soft: {data.softViolations}
            </p>
          )}
          {data.sessionState && (
            <p className="text-xs text-gray-400 mt-1">
              Session: {data.sessionState?.toUpperCase()}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl lg:rounded-2xl p-5 sm:p-6 border border-gray-200 dark:border-gray-700 mb-4 sm:mb-6">
        <div className="flex flex-col items-center justify-center gap-3 h-64">
          <Spin size="large" />
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Loading violations data...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl lg:rounded-2xl p-5 sm:p-6 border border-gray-200 dark:border-gray-700 mb-4 sm:mb-6">
        <div className="text-center py-8">
          <p className="text-red-600 dark:text-red-400 mb-2">
            Failed to load violations timeline
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Please try again later
          </p>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl lg:rounded-2xl p-5 sm:p-6 border border-gray-200 dark:border-gray-700 mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
          <div className="flex-1">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">
              Violations Timeline
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              Daily rule breaches and session status
            </p>
          </div>
        </div>
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            No violation data available for the selected period
          </p>
        </div>
      </div>
    );
  }

  // Calculate max value for YAxis
  const maxViolations = Math.max(...data.map((item: any) => item.value), 5);

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
              Normal (0 violations)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
            <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              Caution (1-4 violations)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              Restricted (5+ violations)
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
              domain={[0, Math.max(maxViolations, 5)]}
              ticks={[
                0,
                Math.floor(maxViolations / 4),
                Math.floor(maxViolations / 2),
                Math.floor(maxViolations * 0.75),
                maxViolations,
              ]}
              tickFormatter={(value) => Math.floor(value).toString()}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {data.map((entry: any, index: number) => (
                <Cell key={`cell-${index}`} fill={getBarColor(entry.status)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Summary Stats */}
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
              Total Violations
            </p>
            <p className="text-xl font-bold text-gray-900 dark:text-gray-100">
              {data.reduce((sum: number, item: any) => sum + item.value, 0)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
              Avg. Daily Violations
            </p>
            <p className="text-xl font-bold text-gray-900 dark:text-gray-100">
              {(
                data.reduce((sum: number, item: any) => sum + item.value, 0) /
                data.length
              ).toFixed(1)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
              Highest Violations
            </p>
            <p className="text-xl font-bold text-red-600 dark:text-red-400">
              {Math.max(...data.map((item: any) => item.value), 0)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
