/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface ViolationData {
  date: string;
  session_state: string | null;
  peak_state: string | null;
  violations: number;
  hard_violations: number;
  soft_violations: number;
}

interface ViolationsTimelineProps {
  violationsTimeline: ViolationData[];
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const totalViolations = data.total || 0;
    const hardViolations = data.major || 0;
    const softViolations = data.minor || 0;
    const sessionState = data.session_state;
    const peakState = data.peak_state;

    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4 min-w-50">
        <p className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-2">
          {label}
        </p>

        <div className="space-y-2">
          {/* Session State */}
          {sessionState && (
            <div className="flex justify-between items-center gap-4">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Session State:
              </span>
              <span
                className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                  sessionState === "green"
                    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                    : sessionState === "yellow"
                      ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                      : sessionState === "red"
                        ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                        : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                }`}
              >
                {sessionState?.toUpperCase() || "N/A"}
              </span>
            </div>
          )}

          {/* Peak State */}
          {peakState && (
            <div className="flex justify-between items-center gap-4">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Peak State:
              </span>
              <span
                className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                  peakState === "green"
                    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                    : peakState === "yellow"
                      ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                      : peakState === "red"
                        ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                        : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                }`}
              >
                {peakState?.toUpperCase() || "N/A"}
              </span>
            </div>
          )}

          {/* Divider */}
          <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>

          {/* Violations Summary */}
          <div className="flex justify-between items-center gap-4">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Total Violations:
            </span>
            <span className="text-sm font-bold text-gray-900 dark:text-gray-100">
              {totalViolations}
            </span>
          </div>

          {/* Hard Violations */}
          <div className="flex justify-between items-center gap-4">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Hard Violations:
              </span>
            </div>
            <span className="text-sm font-semibold text-red-600 dark:text-red-400">
              {hardViolations}
            </span>
          </div>

          {/* Soft Violations */}
          <div className="flex justify-between items-center gap-4">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Soft Violations:
              </span>
            </div>
            <span className="text-sm font-semibold text-amber-600 dark:text-amber-400">
              {softViolations}
            </span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default function ViolationsTimeline({
  violationsTimeline,
}: ViolationsTimelineProps) {
  // Transform data for chart - always show data even if all zeros
  const chartData = violationsTimeline.map((item) => ({
    name: item.date,
    minor: item.soft_violations || 0,
    major: item.hard_violations || 0,
    total: item.violations || 0,
    session_state: item.session_state,
    peak_state: item.peak_state,
    hard_violations: item.hard_violations || 0,
    soft_violations: item.soft_violations || 0,
  }));

  const maxViolations = Math.max(...chartData.map((d) => d.total), 3);

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl p-6 shadow-sm w-full mb-6">
      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-6">
        Violations Timeline
      </h3>

      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#e5e7eb"
              className="dark:stroke-gray-700"
            />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 12, fill: "#9ca3af" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#9ca3af" }}
              axisLine={false}
              tickLine={false}
              domain={[0, Math.max(maxViolations, 3)]}
              ticks={[
                0,
                Math.ceil(Math.max(maxViolations, 3) / 2),
                Math.max(maxViolations, 3),
              ]}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "transparent" }}
            />
            <Bar
              dataKey="minor"
              stackId="a"
              fill="#f59e0b"
              radius={[0, 0, 0, 0]}
              barSize={40}
              name="Soft Violations"
            />
            <Bar
              dataKey="major"
              stackId="a"
              fill="#ef4444"
              radius={[4, 4, 0, 0]}
              barSize={40}
              name="Hard Violations"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-6 mt-4 pt-2 border-t border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <span className="text-xs text-gray-600 dark:text-gray-400">
            Hard Violations
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
          <span className="text-xs text-gray-600 dark:text-gray-400">
            Soft Violations
          </span>
        </div>
      </div>
    </div>
  );
}
