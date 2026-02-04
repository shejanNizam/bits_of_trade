"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const drawdownData = [
  { date: "Jan 1", value: 0 },
  { date: "Jan 2", value: -2 },
  { date: "Jan 3", value: -1 },
  { date: "Jan 4", value: -5 },
  { date: "Jan 5", value: -3 },
  { date: "Jan 6", value: -1 },
  { date: "Jan 7", value: -4 },
  { date: "Jan 8", value: -2 },
  { date: "Jan 9", value: -1 },
  { date: "Jan 10", value: 0 },
];

export default function DrawdownCurve() {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl p-6 shadow-sm h-100">
      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-6">
        Drawdown Curve
      </h3>
      <div className="h-75 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={drawdownData}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#e5e7eb"
              className="dark:stroke-gray-700"
            />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12, fill: "#9ca3af" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#9ca3af" }}
              axisLine={false}
              tickLine={false}
              domain={[-8, 0]}
            />
            <Tooltip
              contentStyle={{
                borderRadius: "12px",
                border: "none",
                backgroundColor: "#fff",
              }}
              itemStyle={{ color: "#ef4444" }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#ef4444"
              strokeWidth={2}
              fillOpacity={0.1}
              fill="#ef4444"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
