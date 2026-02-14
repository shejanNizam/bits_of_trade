"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function CumulativePL() {
  // This data will come from backend later
  const data = [
    { day: "1", value: 2000 },
    { day: "2", value: 2500 },
    { day: "3", value: 3200 },
    { day: "4", value: 3000 },
    { day: "5", value: 3500 },
    { day: "6", value: 4000 },
    { day: "7", value: 4200 },
    { day: "8", value: 6500 },
    { day: "9", value: 8500 },
    { day: "10", value: 7500 },
    { day: "11", value: 12000 },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl lg:rounded-2xl p-4 sm:p-5 lg:p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 sm:mb-6">
        Daily Net Cumulative P&L
      </h3>

      <div className="w-full h-64 sm:h-72 lg:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e5e7eb"
              className="dark:stroke-gray-700"
              vertical={false}
            />
            <XAxis
              dataKey="day"
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              axisLine={{ stroke: "#e5e7eb" }}
              className="dark:stroke-gray-700"
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => value.toLocaleString()}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                fontSize: "12px",
              }}
              formatter={(value: number | undefined) => {
                if (value === undefined) return ["N/A", "P&L"];
                return [`₹${value.toLocaleString()}`, "P&L"];
              }}
              labelFormatter={(label) => `Day ${label}`}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#10b981"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 5, fill: "#10b981" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
